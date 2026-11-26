export type HospitalProfileDetails = {
  name: string
  tagline: string
  hospitalType: string
  ownership: string
  establishedYear: number
  totalBeds: number
  registrationNo: string
  email: string
  phone: string
  emergencyPhone: string
  website: string
  address: string
  city: string
  pincode: string
  about: string
  openingHours: string
  emergency24x7: boolean
  specialities: string[]
  facilities: string[]
  insurance: string[]
  accreditations: string[]
  photos: string[] // image URLs
}

// Extra details that are not in the verification form
export type HospitalProfileExtras = Pick<
  HospitalProfileDetails,
  "tagline" | "website" | "about" | "openingHours" | "emergency24x7" | "specialities" | "facilities" | "insurance" | "accreditations" | "photos"
>

// Everything is text in the form; lists are one item per line
export type HospitalProfileFormValues = {
  tagline: string
  hospitalType: string
  ownership: string
  establishedYear: string
  totalBeds: string
  email: string
  phone: string
  emergencyPhone: string
  website: string
  address: string
  city: string
  pincode: string
  about: string
  openingHours: string
  specialities: string
  facilities: string
  insurance: string
  accreditations: string
}