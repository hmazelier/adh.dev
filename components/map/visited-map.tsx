'use client'
import { Map, Source, Layer } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import visitedGeoJson from '~/json/countries.geojson'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import type { MapMouseEvent } from 'mapbox-gl'

let visited = visitedGeoJson

visited.features = visited.features.map((feature) => {
  feature.properties.id = feature.properties.name.toLowerCase().replace(/ /g, '-')
  return feature
})
const ids = visited.features.map((f) => f.properties.id)

export default function VisitedMap() {
  const { resolvedTheme } = useTheme()
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

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
      if (selectedCountry !== feature.properties.id) {
        setSelectedCountry(feature.properties.id)
      } else {
        setSelectedCountry(null)
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
    >
      <Source id="visited" type="geojson" data={visited}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  )
}
