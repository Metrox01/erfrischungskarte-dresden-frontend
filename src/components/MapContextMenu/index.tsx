import React, { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'

interface MapContextMenuProps {
  x: number
  y: number
  latitude: number
  longitude: number
  poiName?: string
  onClose: () => void
}

export const MapContextMenu: FC<MapContextMenuProps> = ({
  x,
  y,
  latitude,
  longitude,
  poiName,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleScroll = (): void => onClose()
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('scroll', handleScroll, true)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude.toFixed(
    6
  )},${longitude.toFixed(6)}`

  return (
    <div
      ref={menuRef}
      className={classNames(
        'fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200',
        'py-1 min-w-[220px]'
      )}
      style={{ left: x, top: y }}
    >
      {poiName && (
        <div className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-b border-gray-100">
          {poiName}
        </div>
      )}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          'flex items-center px-4 py-2 text-sm text-gray-700',
          'hover:bg-gray-100 cursor-pointer w-full'
        )}
        onClick={onClose}
      >
        <svg
          className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        In Google Maps öffnen
      </a>
      <div className="px-4 py-1.5 text-xs text-gray-400 border-t border-gray-100">
        {latitude.toFixed(5)}, {longitude.toFixed(5)}
      </div>
    </div>
  )
}
