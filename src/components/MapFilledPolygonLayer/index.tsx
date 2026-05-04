import { FC } from 'react'
import { Source, Layer, LayerProps } from 'react-map-gl'
export interface MapFilledPolygonLayerType {
  id: string
  tileset: {
    url: string
    layerName: string
  }
  fillColorMap: Map<number | string, string>
  fillColorProperty: string
  fillColorMode?: 'match' | 'step'
  isVisible?: boolean
}

export const MapFilledPolygonLayer: FC<MapFilledPolygonLayerType> = ({
  id,
  tileset,
  fillColorMap,
  fillColorProperty,
  fillColorMode = 'match',
  isVisible = true,
}) => {
  const fillColorExpression =
    fillColorMode === 'step'
      ? [
          'step',
          ['get', fillColorProperty],
          'rgba(255,255,255,0)',
          ...Array.from(fillColorMap)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .flat(),
        ]
      : [
          'match',
          ['get', fillColorProperty],
          ...Array.from(fillColorMap).flat(2),
          'rgba(255,255,255,0)',
        ]

  const layerStyle: LayerProps = {
    id,
    type: 'fill',
    'source-layer': tileset.layerName,
    paint: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      'fill-color': fillColorExpression as any,
      'fill-opacity': 0.5,
    },
    layout: {
      visibility: isVisible ? 'visible' : 'none',
    },
  }

  return (
    <Source id={id} type="vector" url={tileset.url}>
      <Layer {...layerStyle} id={id} />
    </Source>
  )
}
