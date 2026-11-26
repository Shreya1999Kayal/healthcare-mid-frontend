import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Info, PenLine } from "lucide-react"
import StarRating from "../../components/doctor/StarRating"
import PatientReviewForm from "../../components/patient/PatientReviewForm"
import PatientStatusBadge from "../../components/patient/PatientStatusBadge"
import { patientCardClass, patientPrimaryButtonClass } from "../../constants/patientConstants/patientDashboard.constants"
import {
  patientCampVisits,
  patientReviewStatusStyles,
  patientReviewTargetLabels,
  patientReviews,
} from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate } from "../../services/helper/patientHelper/patientDashboard.helper"
import { fromReviewValues, getReviewOptions } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientReview, PatientReviewValues } from "../../types/type/patientType/PatientCare.type"

// Reviews wait for the admin; no edit or delete after submitting
const FeedbackReviews = () => {
  const { appointments, bloodRequests } = useOutletContext<PatientOutletContext>()
  // Local copy (UI only, nothing is saved)
  const [reviews, setReviews] = useState<PatientReview[]>(patientReviews)
  const [formOpen, setFormOpen] = useState(false)
  const [message, setMessage] = useState("")

  const options = getReviewOptions(appointments, bloodRequests, patientCampVisits, reviews)
  const shownReviews = [...reviews].sort((a, b) => b.postedOn.localeCompare(a.postedOn))

  const save = (values: PatientReviewValues) => {
    const review = fromReviewValues(values, options)
    setReviews((prev) => [review, ...prev])
    setFormOpen(false)
    setMessage(`Review for ${review.targetName} sent. It will be published after the admin approves it.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Feedback and reviews</h1>
          <p className="text-sm text-patient-muted">Review doctors, hospitals, blood banks and camps you visited.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true)
              setMessage("")
            }}
            disabled={options.length === 0}
            className={patientPrimaryButtonClass}
          >
            <PenLine size={16} /> Write a review
          </button>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-patient-border bg-patient-bg-soft/60 p-4 text-sm text-patient-navy">
        <Info size={18} className="mt-0.5 shrink-0 text-patient-primary-dark" />
        <p>
          You can review only after a completed visit, a delivered blood request or a camp donation. The admin checks each review
          before it is published, and it can't be edited or deleted.
        </p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {formOpen && <PatientReviewForm options={options} onSave={save} onCancel={() => setFormOpen(false)} />}

      {shownReviews.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>You haven't written any reviews yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownReviews.map((review) => (
            <article key={review.id} className={`${patientCardClass} flex flex-col gap-3`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-patient-navy">{review.targetName}</p>
                  <p className="text-xs text-patient-muted">
                    {patientReviewTargetLabels[review.target]} · {formatPatientDate(review.postedOn)}
                  </p>
                </div>
                <PatientStatusBadge style={patientReviewStatusStyles[review.status]} />
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-patient-navy">{review.comment}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeedbackReviews
