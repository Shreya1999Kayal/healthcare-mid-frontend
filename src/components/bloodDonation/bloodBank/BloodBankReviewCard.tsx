import StarRating from "../../doctor/StarRating"
import BloodBankAvatar from "./BloodBankAvatar"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { formatIsoDate } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { BloodBankReviewCardProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankReview.interface"

const BloodBankReviewCard = ({ review }: BloodBankReviewCardProps) => {
  return (
    <article className={`${bloodBankCardClass} flex flex-col gap-3`}>
      <div className="flex items-center gap-3">
        <BloodBankAvatar name={review.patient} />
        <div>
          <p className="text-sm font-semibold text-blood-navy">{review.patient}</p>
          <p className="text-xs text-blood-muted">{formatIsoDate(review.date)}</p>
        </div>
        <span className="ml-auto">
          <StarRating rating={review.rating} />
        </span>
      </div>
      <p className="text-sm text-blood-navy">{review.comment}</p>
    </article>
  )
}

export default BloodBankReviewCard