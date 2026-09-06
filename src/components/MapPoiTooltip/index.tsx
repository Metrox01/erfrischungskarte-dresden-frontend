import { FC } from 'react'
import { Popup } from 'react-map-gl'

export interface MapPoiTooltipType {
  title: string
  category: string
  info?:
    | string
    | {
        [key: string]: string | undefined
      }
  address?: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

/**
    This block is there to handle the info field which can be either a string or an object.
    If it's a string that looks like a JSON object, we try to parse it.
    This way the info property is a lot more flexible for different categories of POIs.
    @info can be a simple string, a JSON string, or an already parsed object. We extract all string values to display in the tooltip.
  */
export const MapPoiTooltip: FC<MapPoiTooltipType> = ({
  title,
  category,
  info,
  address,
  coordinates,
}) => {
  const infoLines: string[] = []

  if (info) {
    if (typeof info === 'object') {
      // If it's already an object, extract values
      Object.values(info).forEach((value: unknown) => {
        if (value && typeof value === 'string') {
          infoLines.push(value)
        }
      })
    } else if (typeof info === 'string') {
      // Try to parse if it looks like a JSON object
      const trimmed = info.trim()
      if (trimmed.startsWith('{') && trimmed.includes(':')) {
        try {
          const parsed = JSON.parse(trimmed) as Record<string, unknown>
          Object.values(parsed).forEach((value: unknown) => {
            if (value && typeof value === 'string') {
              infoLines.push(value)
            }
          })
        } catch {
          // If parsing fails, just use the string as-is
          infoLines.push(info)
        }
      } else {
        infoLines.push(info)
      }
    }
  }

  return (
    <Popup
      latitude={coordinates.latitude}
      longitude={coordinates.longitude}
      closeButton={false}
      className="w-64"
    >
      <h4 className="text-xl leading-6 text-gray-900">{title}</h4>

      {category.toLowerCase() !== title.toLowerCase() && (
        <p className="text-gray-400">{category}</p>
      )}

      {infoLines.length > 0 && (
        <div className="pt-2 mt-2 border-t">
          {infoLines.map((line, index) => (
            <p key={index} className="text-xs text-gray-900">
              {line}
            </p>
          ))}
        </div>
      )}

      {address && (
        <p className="text-xs text-gray-900 pt-2 mt-2 border-t">{address}</p>
      )}
    </Popup>
  )
}
