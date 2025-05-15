import type { VisitedCountry } from '~/types/data'

export const visitedCountries: VisitedCountry[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    visited_places: ['Rio de Janeiro', 'Petropolis', 'Secretario'],
    comments: [
      'Lots of fun in Leblon but be careful, not really safe',
      'Had good dopamine detox in secretario jungle',
    ],
  },
  {
    id: 'argentina',
    name: 'Argentina',
    visited_places: ['Buenos Aires'],
    comments: ['During 2022 World Cup', 'Amazing food, amazing people'],
  },
  {
    id: 'united-states',
    name: 'United States',
    visited_places: ['Miami', 'Key West', 'New-York', 'San Jose'],
    comments: [
      'Living in Miami was chill, but I was young and broke',
      'Had fun in San Jose for WWDC',
      'New York is tiring but that was a while ago',
    ],
  },
  {
    id: 'cuba',
    name: 'Cuba',
    visited_places: ['La Havane', 'Varadero'],
    comments: [
      'Not for me : everything is more expensive for tourists, food is bad, internet is awful',
    ],
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    visited_places: ['London'],
    comments: [
      'Had lot of fun working for Starling there (2 years)',
      'London is vibrant',
      'Air quality is awful',
    ],
  },
]
