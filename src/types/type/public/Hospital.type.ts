export type Hospital = {
  id: string
  name: string
  category: string
  location: string
  rating: number
  bio: string
  image: string
  // extra details, shown only on the Hospitals page and the details page
  address: string
  phone: string
  beds: number
  emergency: boolean // 24x7 emergency care
  timings: string
  departments: string[]
  facilities: string[]
}

export type HospitalSort = "relevance" | "rating" | "beds" | "name"

export type DoctorDesignation = "Senior Doctor" | "Junior Doctor" | "Consultant"

export type HospitalDoctor = {
  id: string
  hospitalId: string
  doctorId?: string // set when the doctor also has a profile in doctorsList (name links to it)
  name: string
  department: string
  designation: DoctorDesignation
  chamberDays: string
  chamberTime: string
}

export type HospitalReview = {
  id: string
  name: string
  rating: number
  comment: string
  date: string // yyyy-mm-dd
}

// Extra details shown only on the hospital details page
export type HospitalExtra = {
  hospitalId: string
  email: string
  ambulancesAvailable: number
  bedsAvailable: number
  reviews: HospitalReview[]
}