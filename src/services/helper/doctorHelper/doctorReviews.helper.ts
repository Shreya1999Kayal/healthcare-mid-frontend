import type { DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorReview, RatingBreakdownRow, ReviewSort, ReviewStarFilter } from "../../../types/type/doctorType/DoctorReviews.type"

// Scope rule: a review counts only if its visit was completed
export const getVerifiedReviews = (reviews: DoctorReview[], appointments: DoctorAppointment[]) =>
  reviews.filter((review) =>
    appointments.some((appointment) => appointment.id === review.appointmentId && appointment.status === "completed"),
  )

export const getRatingBreakdown = (reviews: DoctorReview[]): RatingBreakdownRow[] =>
  [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length
    return { stars, count, percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0 }
  })

export const filterByStars = (reviews: DoctorReview[], filter: ReviewStarFilter) =>
  filter === "all" ? reviews : reviews.filter((review) => review.rating === Number(filter))

// Ties are broken by date, newest first
export const sortReviews = (reviews: DoctorReview[], sort: ReviewSort) =>
  [...reviews].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    if (sort === "highest") return b.rating - a.rating || byDate
    if (sort === "lowest") return a.rating - b.rating || byDate
    return byDate
  })

// Only this doctor's reviews that the admin has approved
export const getPublishedReviews = (reviews: DoctorReview[], doctorId: string) =>
  reviews.filter((review) => review.doctorId === doctorId && review.status === "approved")
