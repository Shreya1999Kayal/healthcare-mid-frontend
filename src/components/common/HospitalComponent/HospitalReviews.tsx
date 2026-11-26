import { Star } from "lucide-react"
import type { HospitalReviewsProps } from "../../../types/interface/public/Hospital.interface"
import { getInitials } from "../../../services/helper/public/doctor.helper"



const Stars = ({ value }: { value: number }) => (
  <div className="flex gap-0.5" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={16}
        className={n <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-medical-border"}
      />
    ))}
  </div>
)

const HospitalReviews = ({ rating, reviews }: HospitalReviewsProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Summary */}
      <div className="flex h-fit flex-col items-center rounded-2xl border border-medical-border bg-white p-8 text-center shadow-sm shadow-medical-navy/5">
        <p className="text-5xl font-extrabold text-medical-navy">{rating.toFixed(1)}</p>
        <div className="mt-3">
          <Stars value={rating} />
        </div>
        <p className="mt-3 text-sm text-medical-muted">Based on {reviews.length} patient reviews</p>
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-4 lg:col-span-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-medical-border bg-white p-5 shadow-sm shadow-medical-navy/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-medical-primary to-medical-navy text-sm font-bold text-white">
                {getInitials(review.name)}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-medical-navy">{review.name}</p>
                <p className="text-xs text-medical-muted">
                  {new Date(`${review.date}T00:00:00`).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Stars value={review.rating} />
            </div>
            <p className="mt-3 text-sm text-medical-navy">{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default HospitalReviews