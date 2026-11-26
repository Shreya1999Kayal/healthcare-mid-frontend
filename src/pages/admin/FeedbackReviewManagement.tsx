import { useState } from "react"
import { CircleCheck, CircleX, Clock, Star } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminRejectModal from "../../components/admin/AdminRejectModal"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import { ADMIN_TODAY } from "../../constants/adminConstants/adminDashboard.constants"
import {
  ADMIN_ALL,
  adminCellClass,
  adminDangerButtonClass,
  adminFeedback,
  adminFeedbackTabs,
  adminReviewTargetLabels,
  adminRowClass,
  adminSuccessButtonClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { labelOptions, matchesOption, matchesSearch } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminFeedback, AdminFeedbackStatus } from "../../types/type/adminType/AdminManagement.type"
import type { AdminReviewDecision } from "../../types/type/adminType/AdminVerification.type"

// Reviews are published only after the admin approves them; the admin cannot edit them
const FeedbackReviewManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [reviews, setReviews] = useState<AdminFeedback[]>(adminFeedback)
  const [tab, setTab] = useState<AdminFeedbackStatus>("pending")
  const [search, setSearch] = useState("")
  const [target, setTarget] = useState(ADMIN_ALL)
  const [rejectId, setRejectId] = useState("")
  const [message, setMessage] = useState("")

  // Newest first
  const shownReviews = reviews
    .filter(
      (review) =>
        review.status === tab &&
        matchesSearch(search, [review.author, review.targetName, review.comment]) &&
        matchesOption(target, review.target),
    )
    .sort((a, b) => b.postedOn.localeCompare(a.postedOn))

  const rejectReview = reviews.find((review) => review.id === rejectId)
  const countStatus = (value: AdminFeedbackStatus) => reviews.filter((review) => review.status === value).length

  const saveDecision = (reviewId: string, decision: AdminReviewDecision, remarks: string) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === reviewId ? { ...item, status: decision, reviewedOn: ADMIN_TODAY, adminRemarks: remarks } : item,
      ),
    )
  }

  const approve = (review: AdminFeedback) => {
    if (!window.confirm(`Publish the review by ${review.author} for ${review.targetName}?`)) return
    saveDecision(review.id, "approved", "")
    setMessage(`Review by ${review.author} is now published.`)
  }

  const reject = (reason: string) => {
    if (!rejectReview) return
    saveDecision(rejectReview.id, "rejected", reason)
    setRejectId("")
    setMessage(`Review by ${rejectReview.author} was rejected.`)
  }

  const isPendingTab = tab === "pending"

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Feedback and reviews"
        subtitle="New reviews wait here. Only approved reviews are published to doctors, hospitals, blood banks and camps."
      />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Pending" value={countStatus("pending")} hint="Waiting for review" icon={Clock} />
        <AdminSummaryCard label="Published" value={countStatus("approved")} hint="Visible to everyone" icon={CircleCheck} />
        <AdminSummaryCard label="Rejected" value={countStatus("rejected")} hint="Never published" icon={CircleX} />
      </div>

      <div className="flex flex-wrap gap-2">
        {adminFeedbackTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === option.value
                ? "bg-admin-primary text-white"
                : "border border-admin-border bg-white text-admin-navy hover:bg-admin-bg"
            }`}
          >
            {option.label} ({countStatus(option.value)})
          </button>
        ))}
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search author, name or text"
        filters={[{ label: "All types", value: target, options: labelOptions(adminReviewTargetLabels), onChange: setTarget }]}
      />

      <AdminTable
        headers={["Review", "For", "Rating", "Posted", isPendingTab ? "Actions" : "Reviewed"]}
        isEmpty={shownReviews.length === 0}
      >
        {shownReviews.map((review) => (
          <tr key={review.id} className={adminRowClass}>
            <td className={`${adminCellClass} max-w-sm`}>
              <p className="text-admin-navy">"{review.comment}"</p>
              <p className="mt-1 text-xs text-admin-muted">by {review.author}</p>
            </td>
            <td className={adminCellClass}>
              <p className="font-semibold text-admin-navy">{review.targetName}</p>
              <p className="text-xs text-admin-muted">{adminReviewTargetLabels[review.target]}</p>
            </td>
            <td className={adminCellClass}>
              <span className="flex items-center gap-1 font-semibold text-admin-navy">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {review.rating}
              </span>
            </td>
            <td className={`${adminCellClass} text-admin-navy`}>{formatAdminDate(review.postedOn)}</td>
            <td className={adminCellClass}>
              {isPendingTab ? (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => approve(review)} className={adminSuccessButtonClass}>
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRejectId(review.id)
                      setMessage("")
                    }}
                    className={adminDangerButtonClass}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-admin-navy">{formatAdminDate(review.reviewedOn)}</p>
                  {review.adminRemarks && <p className="mt-1 text-xs text-red-600">Reason: {review.adminRemarks}</p>}
                </>
              )}
            </td>
          </tr>
        ))}
      </AdminTable>

      {rejectReview && (
        <AdminRejectModal title={`Reject review by ${rejectReview.author}`} onReject={reject} onClose={() => setRejectId("")} />
      )}
    </div>
  )
}

export default FeedbackReviewManagement
