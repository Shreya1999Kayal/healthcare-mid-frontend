


export type Doctor = {
  id: string
  name: string
  speciality: string
  image: string
  experience: number // years
  hospital: string
  location: string
  rating: number
  fee: number // consultation fee in INR
  qualifications: string
  languages: string[]
  availability: string
  about: string
}

export type DoctorSort = "relevance" | "rating" | "experience" | "fee"

export type DoctorChamber = {
  id: string
  hospitalId: string
  hospitalName: string
  location: string
  designation: string
  days: string
  time: string
}