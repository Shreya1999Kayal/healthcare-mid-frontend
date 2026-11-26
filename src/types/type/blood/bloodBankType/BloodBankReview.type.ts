// pending = waiting for the admin; the bank / camp sees only approved reviews
export type BloodBankReviewStatus = "pending" | "approved" | "rejected"

export type BloodBankReview = {
  id: string
  bankId: string // blood bank or camp account id (bb1, bc1 ...)
  patient: string
  rating: number // 1 to 5
  comment: string
  date: string // yyyy-mm-dd
  status: BloodBankReviewStatus
}

export type ReviewStarFilter = "all" | "5" | "4" | "3" | "2" | "1"
