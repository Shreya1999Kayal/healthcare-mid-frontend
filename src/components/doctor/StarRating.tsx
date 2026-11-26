import { Star } from "lucide-react"
import type { StarRatingProps } from "../../types/interface/doctorInterface/DoctorReviews.interface"

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  const filled = Math.round(rating)

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= filled ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </span>
  )
}

export default StarRating