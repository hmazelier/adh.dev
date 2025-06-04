'use client'
import { Map, Source, Layer, type MapRef } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import visitedGeoJson from '~/json/countries.geojson'
import { useTheme } from 'next-themes'
import { useState, useEffect, useRef } from 'react'
import type { MapMouseEvent } from 'mapbox-gl'

let visited = visitedGeoJson

visited.features = visited.features.map((feature) => {
  feature.properties.id = feature.properties.name.toLowerCase().replace(/ /g, '-')
  return feature
})
const ids = visited.features.map((f) => f.properties.id)

interface VisitedCountriesMapProps {
  selectedCountry?: string | null
  onCountrySelect?: (countryId: string) => void
}

export default function VisitedCountriesMap({
  selectedCountry: externalSelectedCountry,
  onCountrySelect,
}: VisitedCountriesMapProps = {}) {
  const { resolvedTheme } = useTheme()
  const [internalSelectedCountry, setInternalSelectedCountry] = useState<string | null>(null)
  const mapRef = useRef<MapRef>(null)

  // Use external selection if provided, otherwise use internal state
  const selectedCountry =
    externalSelectedCountry !== undefined ? externalSelectedCountry : internalSelectedCountry

  // Focus map on selected country
  useEffect(() => {
    if (selectedCountry && mapRef.current) {
      const selectedFeature = visited.features.find(
        (feature) => feature.properties.id === selectedCountry
      )

      if (selectedFeature && selectedFeature.geometry) {
        const map = mapRef.current.getMap()

        // Calculate bounds of the country
        const coordinates = selectedFeature.geometry.coordinates
        let bounds: [[number, number], [number, number]] | undefined

        if (selectedFeature.geometry.type === 'Polygon') {
          bounds = getBoundsFromCoordinates(coordinates[0])
        } else if (selectedFeature.geometry.type === 'MultiPolygon') {
          let allCoords: [number, number][] = []
          coordinates.forEach((polygon: any) => {
            allCoords = allCoords.concat(polygon[0])
          })
          bounds = getBoundsFromCoordinates(allCoords)
        }

        if (bounds) {
          map.fitBounds(bounds, {
            padding: 50,
            maxZoom: 6,
            duration: 1000,
          })
        }
      }
    }
  }, [selectedCountry])

  // Helper function to calculate bounds from coordinates
  const getBoundsFromCoordinates = (
    coords: [number, number][]
  ): [[number, number], [number, number]] => {
    let minLng = coords[0][0],
      maxLng = coords[0][0]
    let minLat = coords[0][1],
      maxLat = coords[0][1]

    coords.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng)
      maxLng = Math.max(maxLng, lng)
      minLat = Math.min(minLat, lat)
      maxLat = Math.max(maxLat, lat)
    })

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ]
  }

  const layerStyle = {
    id: 'visited-countries',
    type: 'fill' as const,
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'id'], selectedCountry || ''],
        '#FF0000',
        '#00AEEF',
      ] as any,
      'fill-opacity': 0.4,
    },
    interactive: true,
  }

  const handleMapClick = (event) => {
    const features = event.features || []
    if (features.length > 0) {
      const feature = features[0]
      const countryId = feature.properties.id

      if (onCountrySelect) {
        // Use external callback
        onCountrySelect(selectedCountry !== countryId ? countryId : '')
      } else {
        // Use internal state
        if (selectedCountry !== countryId) {
          setInternalSelectedCountry(countryId)
        } else {
          setInternalSelectedCountry(null)
        }
      }
    }
  }

  return (
    <Map
      initialViewState={{
        latitude: 20,
        longitude: 0,
        zoom: 1.5,
      }}
      interactiveLayerIds={['visited-countries']}
      onClick={handleMapClick}
      mapStyle={
        resolvedTheme === 'dark'
          ? 'mapbox://styles/hmazelier/cmafawei700uf01s40uk66fg4'
          : 'mapbox://styles/hmazelier/cmafap3dz00u501sk0eslbn00'
      }
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100%', height: '600px' }}
      ref={mapRef}
    >
      <Source id="visited" type="geojson" data={visited}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  )
}
