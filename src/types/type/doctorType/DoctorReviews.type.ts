export type ReviewSort = "newest" | "highest" | "lowest"
export type ReviewStarFilter = "all" | "5" | "4" | "3" | "2" | "1"

// pending = waiting for the admin; the doctor sees only approved reviews
export type ReviewStatus = "pending" | "approved" | "rejected"

export type DoctorReview = {
  id: string
  doctorId: string // review is about this doctor
  appointmentId: string // must be a completed appointment
  patientId: string
  patient: string
  chamberId: string
  rating: number // 1 to 5
  comment: string
  date: string // yyyy-mm-dd
  status: ReviewStatus
}

export type RatingBreakdownRow = {
  stars: number
  count: number
  percent: number
}