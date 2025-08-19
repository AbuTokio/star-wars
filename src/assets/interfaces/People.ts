export interface People {
  message: string
  total_records: number
  total_pages: number
  previous: null
  next: string
  results: Person[]
  apiVersion: string
  timestamp: Date
  support: Support
  social: Social
}

export interface Person {
  uid: string
  name: string
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
