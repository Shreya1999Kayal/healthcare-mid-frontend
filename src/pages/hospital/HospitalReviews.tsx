import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { MessageSquare, Star } from "lucide-react"
import HospitalReviewCard from "../../components/hospital/HospitalReviewCard"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalReviewStarTabs, hospitalReviews } from "../../constants/hospitalConstants/hospitalReview.constants"
import {
  filterHospitalReviewsByStars,
  getHospitalAverageRating,
  getPublishedHospitalReviews,
  sortHospitalReviews,
} from "../../services/helper/hospitalHelper/hospitalReview.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { HospitalReviewStarFilter } from "../../types/type/hospitalType/HospitalReview.type"

const HospitalReviews = () => {
  const { hospital } = useOutletContext<HospitalOutletContext>()
  const [stars, setStars] = useState<HospitalReviewStarFilter>("all")

  // Own reviews only, approved by the admin
  const myReviews = getPublishedHospitalReviews(hospitalReviews, hospital.id)
  const shownReviews = sortHospitalReviews(filterHospitalReviewsByStars(myReviews, stars))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Reviews</h1>
        <p className="text-sm text-hospital-muted">
          Reviews appear here after the admin approves them. They can't be edited or deleted.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <HospitalSummaryCard label="Average rating" value={getHospitalAverageRating(myReviews)} hint="Out of 5" icon={Star} />
        <HospitalSummaryCard label="Total reviews" value={myReviews.length} hint="Published reviews" icon={MessageSquare} />
      </div>

      <div className="flex flex-wrap gap-2">
        {hospitalReviewStarTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStars(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              stars === option.value
                ? "bg-hospital-primary text-white"
                : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
            }`}
          >
            {option.label} ({filterHospitalReviewsByStars(myReviews, option.value).length})
          </button>
        ))}
      </div>

      {shownReviews.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No reviews here.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownReviews.map((review) => (
            <HospitalReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HospitalReviews
