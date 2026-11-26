// pending = waiting for the admin; the hospital sees only approved reviews
export type HospitalReviewStatus = "pending" | "approved" | "rejected"

export type HospitalReviewStarFilter = "all" | "5" | "4" | "3" | "2" | "1"

export type HospitalReview = {
  id: string
  hospitalId: string // review is about this hospital (h1, h2 ...)
  patient: string
  department: string
  rating: number // 1 to 5
  comment: string
  date: string // yyyy-mm-dd
  status: HospitalReviewStatus
}
