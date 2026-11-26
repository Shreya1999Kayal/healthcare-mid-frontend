import type { HospitalReview, HospitalReviewStarFilter } from "../../../types/type/hospitalType/HospitalReview.type"

// Only this hospital's reviews that the admin has approved
export const getPublishedHospitalReviews = (reviews: HospitalReview[], hospitalId: string) =>
  reviews.filter((review) => review.hospitalId === hospitalId && review.status === "approved")

export const filterHospitalReviewsByStars = (reviews: HospitalReview[], filter: HospitalReviewStarFilter) =>
  filter === "all" ? reviews : reviews.filter((review) => review.rating === Number(filter))

// Newest first ("yyyy-mm-dd" strings can be compared directly)
export const sortHospitalReviews = (reviews: HospitalReview[]) => [...reviews].sort((a, b) => b.date.localeCompare(a.date))

// [5, 4, 3] -> "4.0", no reviews -> "0.0"
export const getHospitalAverageRating = (reviews: HospitalReview[]) => {
  if (reviews.length === 0) return "0.0"
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}
