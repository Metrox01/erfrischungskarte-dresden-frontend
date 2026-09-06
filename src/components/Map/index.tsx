import { FC, useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps, MapEvent, MapRef } from 'react-map-gl'
import type { Map as MapboxMap } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map'
import { FlyToInterpolator } from 'react-map-gl'
import { MapContextMenu } from '@components/MapContextMenu'

interface MapProps extends InteractiveMapProps {
  initialViewportProps: Partial<ViewportProps>
  staticViewportProps?: Partial<ViewportProps>
  mapStyle?: string
  handleHover?: (event: MapEvent) => void
  handleMouseLeave?: (event: MapEvent) => void
}

type URLViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>

interface ContextMenuState {
  x: number
  y: number
  latitude: number
  longitude: number
  poiName?: string
}

const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const Map: FC<MapProps> = ({
  initialViewportProps,
  staticViewportProps,
  mapStyle,
  interactiveLayerIds,
  handleHover,
  handleMouseLeave,
  children,
  ...otherMapProps
}) => {
  const { pathname, query, replace } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const mapRef = useRef<MapRef>(null)
  const transitionProps = {
    transitionDuration: 2000,
    transitionEasing: easeInOutQuad,
    transitionInterpolator: new FlyToInterpolator(),
  }
  const [viewport, setViewport] = useState<ViewportProps>({
    ...staticViewportProps,
    ...initialViewportProps,
  })
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // react-map-gl 6.x typisiert getMap() selbst als `any`,
      // daher der explizite Cast auf den echten Mapbox-Typ.
      const map = mapRef.current?.getMap() as MapboxMap | undefined
      if (!map) return

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const point: [number, number] = [
        e.clientX - rect.left,
        e.clientY - rect.top,
      ]

      // Check if a POI feature is under the cursor
      const features = map.queryRenderedFeatures(point, {
        layers: interactiveLayerIds || [],
      })

      const feature = features[0]
      if (feature && feature.geometry.type === 'Point') {
        const [longitude, latitude] = feature.geometry.coordinates
        const properties = feature.properties as { name?: string } | null
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          latitude,
          longitude,
          poiName: properties?.name || undefined,
        })
        return
      }

      // Fallback: use map coordinates at mouse position
      const lngLat = map.unproject(point)
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      })
    },
    [interactiveLayerIds]
  )

  const closeContextMenu = useCallback(() => {
    setContextMenu(null)
  }, [])

  const debouncedViewportChange = useDebouncedCallback(
    (viewport: URLViewportType): void => {
      const newQuery = { ...mappedQuery, ...viewport }
      void replace({ pathname, query: newQuery }, undefined, { shallow: true })
    },
    1000
  )

  useEffect(() => {
    // Cancel any pending debounced URL sync from prior map interaction
    // to prevent it from overwriting the new target coordinates
    debouncedViewportChange.cancel()
    setViewport((prev) => {
      const targetLat = mappedQuery.latitude ?? prev.latitude
      const targetLng = mappedQuery.longitude ?? prev.longitude
      const targetZoom = mappedQuery.zoom ?? prev.zoom

      // Skip if already at target (prevents jitter from URL re-sync)
      if (
        Math.abs((prev.latitude ?? 0) - (targetLat ?? 0)) < 0.00001 &&
        Math.abs((prev.longitude ?? 0) - (targetLng ?? 0)) < 0.00001 &&
        Math.abs((prev.zoom ?? 0) - (targetZoom ?? 0)) < 0.1
      ) {
        return prev
      }

      return {
        ...prev,
        ...transitionProps,
        latitude: targetLat,
        longitude: targetLng,
        zoom: targetZoom,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedQuery.latitude, mappedQuery.longitude, mappedQuery.zoom])

  return (
    <div onContextMenu={handleContextMenu}>
      <ReactMapGL
        {...otherMapProps}
        {...viewport}
        ref={mapRef}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport: ViewportProps) => {
          delete nextViewport.width
          delete nextViewport.height
          setViewport(nextViewport)
          closeContextMenu()
          debouncedViewportChange({
            latitude: nextViewport.latitude,
            longitude: nextViewport.longitude,
            zoom: nextViewport.zoom,
          })
        }}
        interactiveLayerIds={interactiveLayerIds}
        onHover={handleHover}
        onMouseLeave={handleMouseLeave}
        width="100vw"
        height="100vh"
      >
        {children}
      </ReactMapGL>
      {contextMenu && (
        <MapContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          latitude={contextMenu.latitude}
          longitude={contextMenu.longitude}
          poiName={contextMenu.poiName}
          onClose={closeContextMenu}
        />
      )}
    </div>
  )
}
