'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import type { VisitedCountry } from '~/types/data'
import { clsx } from 'clsx'

interface VisitedCountriesListProps {
  countries: VisitedCountry[]
  onCountryTap?: (country: VisitedCountry) => void
  onCountrySelect?: (country: VisitedCountry) => void
  selectedCountry?: string
  className?: string
}

export interface VisitedCountriesListRef {
  focusCountry: (countryId: string) => void
}

const VisitedCountriesList = forwardRef<VisitedCountriesListRef, VisitedCountriesListProps>(
  ({ countries, onCountryTap, onCountrySelect, selectedCountry, className }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const countryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

    useImperativeHandle(ref, () => ({
      focusCountry: (countryId: string) => {
        const countryElement = countryRefs.current[countryId]
        if (countryElement && scrollContainerRef.current) {
          countryElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          })
          countryElement.focus()
        }
      },
    }))

    const handleCountryClick = (country: VisitedCountry) => {
      onCountryTap?.(country)
      onCountrySelect?.(country)
    }

    return (
      <div
        ref={scrollContainerRef}
        className={clsx(
          'scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 flex gap-3 overflow-x-auto pb-4',
          className
        )}
      >
        {countries.map((country) => {
          const isSelected = selectedCountry === country.id
          return (
            <button
              key={country.id}
              ref={(el) => {
                countryRefs.current[country.id] = el
              }}
              onClick={() => handleCountryClick(country)}
              className={clsx(
                'group flex min-w-[200px] flex-col rounded-lg border p-4 shadow-sm transition-all focus:outline-none focus:ring-2',
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-500/20 dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400'
              )}
            >
              <div className="mb-2 text-left">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {country.name}
                </h3>
                {country.year_visited && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {country.year_visited}
                  </span>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Places visited:
                  </p>
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {country.visited_places.join(', ')}
                  </p>
                </div>

                {country.comments.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Notes:</p>
                    <p className="line-clamp-3 text-xs text-gray-500 dark:text-gray-400">
                      {country.comments[0]}
                    </p>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )
  }
)

VisitedCountriesList.displayName = 'VisitedCountriesList'

export default VisitedCountriesList
