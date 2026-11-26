import { useState } from "react"
import { CircleCheck, CircleX, FileText, X } from "lucide-react"
import { adminFieldClass } from "../../constants/adminConstants/adminDashboard.constants"
import { adminRoleLabels, adminVerificationStatusStyles } from "../../constants/adminConstants/adminVerification.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { validateRejectReason } from "../../services/helper/adminHelper/adminVerification.helper"
import type { AdminReviewModalProps } from "../../types/interface/adminInterface/AdminVerification.interface"

const AdminReviewModal = ({ application, onReview, onClose }: AdminReviewModalProps) => {
  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const status = adminVerificationStatusStyles[application.status]
  const isPending = application.status === "pending"

  const approve = () => {
    if (!window.confirm(`Approve ${application.name}? Their dashboard will unlock.`)) return
    onReview("approved", "")
  }

  const reject = () => {
    const message = validateRejectReason(reason)
    if (message) {
      setError(message)
      return
    }
    onReview("rejected", reason)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-admin-navy">{application.name}</h2>
            <p className="text-sm text-admin-muted">
              {adminRoleLabels[application.role]} · {application.city} · ID: {application.applicantId}
            </p>
            <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-admin-muted hover:bg-admin-bg">
            <X size={20} />
          </button>
        </div>

        {/* Dates */}
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <p className="text-admin-muted">
            Submitted: <span className="font-semibold text-admin-navy">{formatAdminDate(application.submittedOn)}</span>
          </p>
          <p className="text-admin-muted">
            Reviewed: <span className="font-semibold text-admin-navy">{formatAdminDate(application.reviewedOn)}</span>
          </p>
        </div>

        {/* Details */}
        <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-admin-muted">Details</h3>
        <dl className="mt-2 grid gap-3 sm:grid-cols-2">
          {application.details.map((detail) => (
            <div key={detail.label} className="rounded-lg bg-admin-bg px-3 py-2">
              <dt className="text-xs text-admin-muted">{detail.label}</dt>
              <dd className="text-sm font-semibold text-admin-navy">{detail.value || "—"}</dd>
            </div>
          ))}
        </dl>

        {/* Documents (file links come from the backend later) */}
        <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-admin-muted">Documents</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {application.documents.map((document) => (
            <li key={document.title} className="flex items-center gap-3 rounded-lg border border-admin-border px-3 py-2 text-sm">
              <FileText size={18} className="shrink-0 text-admin-primary" />
              <span className="font-semibold text-admin-navy">{document.title}</span>
              <span className={`ml-auto text-xs ${document.fileName ? "text-admin-muted" : "font-semibold text-red-600"}`}>
                {document.fileName || "Not uploaded"}
              </span>
            </li>
          ))}
        </ul>

        {/* Rejected: reason the applicant sees */}
        {application.status === "rejected" && (
          <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="font-semibold">Reason sent: </span>
            {application.adminRemarks}
          </p>
        )}

        {/* Actions only while pending */}
        {isPending && !rejecting && (
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setRejecting(true)}
              className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <CircleX size={16} /> Reject
            </button>
            <button
              type="button"
              onClick={approve}
              className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <CircleCheck size={16} /> Approve
            </button>
          </div>
        )}

        {isPending && rejecting && (
          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="reject-reason" className="text-sm font-semibold text-admin-navy">
              Reason for rejection <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reject-reason"
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setError("")
              }}
              placeholder="Example: Aadhaar image is not clear. Upload a clear copy."
              className={`${adminFieldClass} w-full`}
            />
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setRejecting(false)
                  setReason("")
                  setError("")
                }}
                className="rounded-md border border-admin-border px-4 py-2 text-sm font-semibold text-admin-navy hover:bg-admin-bg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={reject}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Send rejection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminReviewModal
