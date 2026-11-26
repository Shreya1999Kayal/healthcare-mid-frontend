import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import type { ReviewStarFilter } from "../../../types/type/blood/bloodBankType/BloodBankReview.type"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import { bloodBankReviews, reviewStarTabs } from "../../../constants/blood/bloodBankConstants/bloodBankReview.constants"
import {
  filterReviewsByStars,
  getPublishedBankReviews,
  sortNewestFirst,
} from "../../../services/helper/blood/bloodBankHelper/bloodBankReview.helper"
import BloodBankRatingSummary from "../../../components/bloodDonation/bloodBank/BloodBankRatingSummary"
import BloodBankFilterTabs from "../../../components/bloodDonation/bloodBank/BloodBankFilterTabs"
import BloodBankEmptyState from "../../../components/bloodDonation/bloodBank/BloodBankEmptyState"
import BloodBankReviewCard from "../../../components/bloodDonation/bloodBank/BloodBankReviewCard"

const BloodReviews = () => {
  const { bank } = useOutletContext<BloodBankOutletContext>()
  const [stars, setStars] = useState<ReviewStarFilter>("all")

  // Own reviews only (blood bank or camp), approved by the admin
  const myReviews = getPublishedBankReviews(bloodBankReviews, bank.id)
  const shownReviews = sortNewestFirst(filterReviewsByStars(myReviews, stars))
  const tabs = reviewStarTabs.map((tab) => ({ ...tab, count: filterReviewsByStars(myReviews, tab.value).length }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Reviews</h1>
        <p className="text-sm text-blood-muted">
          Reviews appear here after the admin approves them. They can't be edited or deleted.
        </p>
      </div>

      <BloodBankRatingSummary reviews={myReviews} />

      <BloodBankFilterTabs options={tabs} value={stars} onChange={setStars} />

      {shownReviews.length === 0 ? (
        <BloodBankEmptyState title="No reviews here" message="Try another star filter." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownReviews.map((review) => (
            <BloodBankReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BloodReviews
