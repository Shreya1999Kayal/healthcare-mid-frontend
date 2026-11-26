import { getAverageRating } from "../../public/blood.helper"
import type { BloodBankReview, ReviewStarFilter } from "../../../../types/type/blood/bloodBankType/BloodBankReview.type"

// Reuses the public rating helper so the numbers match the Blood page
export const getBloodBankAverage = (reviews: BloodBankReview[]) => getAverageRating(reviews.map((review) => review.rating))

export const filterReviewsByStars = (reviews: BloodBankReview[], filter: ReviewStarFilter) =>
  filter === "all" ? reviews : reviews.filter((review) => review.rating === Number(filter))

export const sortNewestFirst = (reviews: BloodBankReview[]) => [...reviews].sort((a, b) => b.date.localeCompare(a.date))

// Only this bank's / camp's reviews that the admin has approved
export const getPublishedBankReviews = (reviews: BloodBankReview[], bankId: string) =>
  reviews.filter((review) => review.bankId === bankId && review.status === "approved")
