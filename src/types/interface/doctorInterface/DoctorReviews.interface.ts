import type { DoctorReview } from "../../type/doctorType/DoctorReviews.type"

export interface StarRatingProps {
  rating: number
  size?: number
}

export interface RatingSummaryProps {
  reviews: DoctorReview[]
}

export interface ReviewCardProps {
  review: DoctorReview
  chamberName: string
}