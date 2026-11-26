import StarRating from "../doctor/StarRating"
import HospitalAvatar from "./HospitalAvatar"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { formatIsoDate } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalReviewCardProps } from "../../types/interface/hospitalInterface/HospitalReview.interface"

// Read only: no edit or delete
const HospitalReviewCard = ({ review }: HospitalReviewCardProps) => {
  return (
    <article className={`${hospitalCardClass} flex flex-col gap-3`}>
      <div className="flex items-center gap-3">
        <HospitalAvatar name={review.patient} />
        <div>
          <p className="text-sm font-semibold text-hospital-navy">{review.patient}</p>
          <p className="text-xs text-hospital-muted">
            {review.department} · {formatIsoDate(review.date)}
          </p>
        </div>
        <span className="ml-auto">
          <StarRating rating={review.rating} />
        </span>
      </div>
      <p className="text-sm text-hospital-navy">{review.comment}</p>
    </article>
  )
}

export default HospitalReviewCard
