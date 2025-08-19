export interface Films {
  message: string
  result: Result[]
  apiVersion: string
  timestamp: Date
  support: Support
  social: Social
}

export interface Result {
  properties: Film
  _id: string
  description: string
  uid: string
  __v: number
}

export interface Film {
  created: Date
  edited: Date
  starships: string[]
  vehicles: string[]
  planets: string[]
  producer: string
  title: string
  episode_id: number
  director: string
  release_date: Date
  opening_crawl: string
  characters: string[]
  species: string[]
  url: string
}

export interface Social {
  discord: string
  reddit: string
  github: string
}

export interface Support {
  contact: string
  donate: string
  partnerDiscounts: PartnerDiscounts
}

export interface PartnerDiscounts {
  saberMasters: HeartMath
  heartMath: HeartMath
}

export interface HeartMath {
  link: string
  details: string
}
