'use client'

import { useState, useRef } from 'react'
import type { VisitedCountry } from '~/types/data'
import { visitedCountries } from '~/raw-data/countries/visited-countries'
import VisitedCountriesMap from './visited-countries-map'
import VisitedCountriesList, { type VisitedCountriesListRef } from './visited-countries-list'

interface VisitedCountriesProps {
  className?: string
}

export default function VisitedCountries({ className }: VisitedCountriesProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined)
  const listRef = useRef<VisitedCountriesListRef>(null)

  const handleCountrySelect = (country: VisitedCountry) => {
    setSelectedCountry(country.id)
  }

  const handleMapCountrySelect = (countryId: string) => {
    const newSelection = countryId || undefined
    setSelectedCountry(newSelection)
    // Focus the corresponding country in the list if a country is selected
    if (countryId) {
      listRef.current?.focusCountry(countryId)
    }
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        <VisitedCountriesMap
          selectedCountry={selectedCountry}
          onCountrySelect={handleMapCountrySelect}
        />
        <VisitedCountriesList
          ref={listRef}
          countries={visitedCountries}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
      </div>
    </div>
  )
}
