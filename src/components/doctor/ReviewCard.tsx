import { BadgeCheck } from "lucide-react"
import DoctorAvatar from "./DoctorAvatar"
import StarRating from "./StarRating"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { ReviewCardProps } from "../../types/interface/doctorInterface/DoctorReviews.interface"

const ReviewCard = ({ review, chamberName }: ReviewCardProps) => {
  return (
    <article className={`${doctorCardClass} flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <DoctorAvatar name={review.patient} image="" />
          <div>
            <p className="font-semibold text-doctor-navy">{review.patient}</p>
            <p className="text-xs text-doctor-muted">
              {chamberName} · {formatIsoDate(review.date)}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <BadgeCheck size={14} /> Verified visit
        </span>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-sm leading-relaxed text-doctor-navy">{review.comment}</p>
    </article>
  )
}

export default ReviewCard