import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Info } from "lucide-react"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import DoctorTabs from "../../components/doctor/DoctorTabs"
import RatingSummary from "../../components/doctor/RatingSummary"
import ReviewCard from "../../components/doctor/ReviewCard"
import { doctorAppointments, doctorChambers, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorReviews, reviewSortOptions, reviewStarTabs } from "../../constants/doctorConstants/doctorReviews.constants"
import { filterByChamber, getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { filterByStars, getPublishedReviews, getVerifiedReviews, sortReviews } from "../../services/helper/doctorHelper/doctorReviews.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { ReviewSort, ReviewStarFilter } from "../../types/type/doctorType/DoctorReviews.type"

const DoctorReviews = () => {
  const { doctor, chamberId } = useOutletContext<DoctorOutletContext>()

  // Own reviews, approved by the admin, tied to a completed visit
  const verifiedReviews = getVerifiedReviews(getPublishedReviews(doctorReviews, doctor.id), doctorAppointments)
  const [stars, setStars] = useState<ReviewStarFilter>("all")
  const [sort, setSort] = useState<ReviewSort>("newest")

  const chamberReviews = filterByChamber(verifiedReviews, chamberId)
  const visibleReviews = sortReviews(filterByStars(chamberReviews, stars), sort)
  const tabs = reviewStarTabs.map((tab) => ({ ...tab, count: filterByStars(chamberReviews, tab.id).length }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Reviews</h1>
        <p className="text-sm text-doctor-muted">What your patients say after their visit.</p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-doctor-border bg-doctor-bg-soft/60 p-4 text-sm text-doctor-navy">
        <Info size={18} className="mt-0.5 shrink-0 text-doctor-primary-dark" />
        <p>Only patients who completed a visit can leave a review. Reviews appear here after the admin approves them, and they can't be edited or deleted.</p>
      </div>

      <RatingSummary reviews={chamberReviews} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DoctorTabs options={tabs} value={stars} onChange={setStars} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as ReviewSort)}
          aria-label="Sort reviews"
          className={doctorFieldClass}
        >
          {reviewSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {visibleReviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} chamberName={getChamberName(doctorChambers, review.chamberId)} />
          ))}
        </div>
      ) : (
        <DoctorEmptyState
          title="No reviews here"
          message="Try another star filter or choose All chambers."
          actionLabel={stars !== "all" ? "Show all" : undefined}
          onAction={() => setStars("all")}
        />
      )}
    </div>
  )
}

export default DoctorReviews