// upcoming = date is today or later, existing = already held (worked out from the date)
export type CampEvent = {
  id: string
  title: string
  date: string // yyyy-mm-dd
  time: string
  venue: string
  city: string
  note: string
  registrations: number // donors who registered
  unitsCollected: number | null // null until the camp is held
}

// Everything is text in the form
export type CampEventFormValues = {
  title: string
  date: string
  time: string
  venue: string
  city: string
  note: string
  unitsCollected: string
}

export type CampEventFieldName = keyof CampEventFormValues

export type CampEventFormErrors = Partial<Record<CampEventFieldName, string>>