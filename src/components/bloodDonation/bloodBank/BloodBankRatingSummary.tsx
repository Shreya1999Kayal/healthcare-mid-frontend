import StarRating from "../../doctor/StarRating"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { getBloodBankAverage } from "../../../services/helper/blood/bloodBankHelper/bloodBankReview.helper"
import type { BloodBankRatingSummaryProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankReview.interface"

const BloodBankRatingSummary = ({ reviews }: BloodBankRatingSummaryProps) => {
  const average = getBloodBankAverage(reviews)

  return (
    <section className={`${bloodBankCardClass} grid gap-6 md:grid-cols-[12rem_1fr]`}>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-5xl font-extrabold text-blood-navy">{average.toFixed(1)}</p>
        <StarRating rating={average} size={18} />
        <p className="mt-1 text-sm text-blood-muted">{reviews.length} reviews</p>
      </div>

      <ul className="flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((review) => review.rating === star).length
          const percent = reviews.length === 0 ? 0 : (count / reviews.length) * 100

          return (
            <li key={star} className="flex items-center gap-3 text-sm">
              <span className="w-12 font-semibold text-blood-navy">{star} star</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-blood-bg-soft">
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
              </span>
              <span className="w-6 text-right text-blood-muted">{count}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default BloodBankRatingSummary