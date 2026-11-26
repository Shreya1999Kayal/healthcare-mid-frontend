export type BedCategory = "general" | "semi-private" | "private" | "icu" | "nicu" | "emergency"

export type WardFilter = "all" | BedCategory

// full = no bed free, low = only a few free
export type WardAvailability = "available" | "low" | "full"

export type HospitalWard = {
  id: string
  name: string
  category: BedCategory
  floor: string
  total: number
  occupied: number
  pricePerDay: number // ₹
  ventilators: number // mainly for ICU / NICU
}

// Everything is text in the form
export type WardFormValues = {
  name: string
  category: string
  floor: string
  total: string
  occupied: string
  pricePerDay: string
  ventilators: string
}

export type WardFieldName = keyof WardFormValues

export type WardFormErrors = Partial<Record<WardFieldName, string>>

export type WardField = {
  name: WardFieldName
  label: string
  required?: boolean
  type?: "text" | "number"
  options?: { value: string; label: string }[] // shows a select
  placeholder?: string
}