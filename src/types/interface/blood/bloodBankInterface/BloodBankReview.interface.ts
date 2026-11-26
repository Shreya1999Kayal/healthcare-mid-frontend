import type { BloodBankReview } from "../../../type/blood/bloodBankType/BloodBankReview.type"

export interface BloodBankRatingSummaryProps {
  reviews: BloodBankReview[]
}

export interface BloodBankReviewCardProps {
  review: BloodBankReview
}