export type BloodService = {
  id: string
  title: string
  description: string
  highlight: string // short privacy-safe line, e.g. "120+ donors registered"
  image: string
  path: string
  buttonLabel: string
}

// export type BloodTab = "camps" | "donors" | "blood-banks"
export type CampView = "upcoming" | "existing"
export type BankView = "hospital" | "organisation"
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"

export type SwitchOption<T extends string> = {
  id: T
  label: string
}

export type BloodCamp = {
  id: string
  title: string
  organiser: string,
  organiserId: string
  date: string // yyyy-mm-dd
  time: string
  venue: string
  city: string
  status: CampView
  note: string
}

// Hospital blood banks only store the extra details; name, location and address come from hospitalsList
export type BloodStock = Record<BloodGroup, number> // units available per blood group

export type HospitalBloodBank = {
  hospitalId: string
  phone: string
  timings: string
  stock: BloodStock
}

// What the card shows (hospital and other-organisation banks both become this)
export type BloodBankItem = {
  id: string
  name: string
  location: string
  address: string
  phone: string
  timings: string
  availableGroups: BloodGroup[]
  hospitalId?: string // only for blood banks that belong to a Seva hospital
}

export type CampReview = {
  id: string
  name: string
  rating: number // 1 to 5
  comment: string
}

export type CampPastEvent = {
  id: string
  title: string
  date: string // yyyy-mm-dd
  units: number
}

export type CampOrganiser = {
  id: string
  name: string
  image: string // put the file in public/camps and use "/camps/file.jpg"
  since: number // year they started organising camps
  about: string
  totalKg: number // blood received in total
  donatedTo: string[] // hospital names
  pastEvents: CampPastEvent[]
  reviews: CampReview[]
}
