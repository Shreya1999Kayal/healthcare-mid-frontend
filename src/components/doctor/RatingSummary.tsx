import StarRating from "./StarRating"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { getAverageRating } from "../../services/helper/public/blood.helper"
import { getRatingBreakdown } from "../../services/helper/doctorHelper/doctorReviews.helper"
import type { RatingSummaryProps } from "../../types/interface/doctorInterface/DoctorReviews.interface"

const RatingSummary = ({ reviews }: RatingSummaryProps) => {
  const average = getAverageRating(reviews.map((review) => review.rating))
  const breakdown = getRatingBreakdown(reviews)

  return (
    <section className={`${doctorCardClass} grid gap-6 md:grid-cols-[12rem_1fr] md:items-center`}>
      <div className="flex flex-col items-center text-center">
        <p className="text-5xl font-extrabold text-doctor-navy">{average.toFixed(1)}</p>
        <StarRating rating={average} size={20} />
        <p className="mt-1 text-sm text-doctor-muted">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {breakdown.map((row) => (
          <li key={row.stars} className="flex items-center gap-3 text-sm">
            <span className="w-8 shrink-0 font-semibold text-doctor-navy">{row.stars} ★</span>
            <div className="h-2.5 flex-1 rounded-full bg-doctor-bg-soft">
              <div className="h-2.5 rounded-full bg-amber-400" style={{ width: `${row.percent}%` }} />
            </div>
            <span className="w-8 shrink-0 text-right text-doctor-muted">{row.count}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RatingSummary