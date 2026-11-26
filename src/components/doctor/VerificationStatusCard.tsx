import { MessageSquareWarning, ShieldCheck } from "lucide-react"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { verificationStatusStyles } from "../../constants/doctorConstants/doctorVerification.constants"
import type { VerificationStatusCardProps } from "../../types/interface/doctorInterface/DoctorVerification.interface"

const VerificationStatusCard = ({ verification, blockingCount, onSubmit }: VerificationStatusCardProps) => {
  const style = verificationStatusStyles[verification.status]
  const isRejected = verification.status === "rejected"

  return (
    <section className={`${doctorCardClass} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-doctor-primary to-doctor-primary-dark text-white">
            <ShieldCheck size={24} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-doctor-navy">Account status</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
            </div>
            <p className="mt-1 text-sm text-doctor-muted">{style.description}</p>
          </div>
        </div>
        <div className="text-right text-xs text-doctor-muted">
          <p>Submitted: {verification.submittedOn || "—"}</p>
          <p>Reviewed: {verification.reviewedOn || "—"}</p>
        </div>
      </div>

      {isRejected && verification.adminRemarks && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <MessageSquareWarning size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-bold text-red-700">Remarks from the Seva team</p>
            <p className="text-sm text-red-700">{verification.adminRemarks}</p>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={blockingCount > 0}
            className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit for review
          </button>
          {blockingCount > 0 && (
            <p className="text-sm text-doctor-muted">
              Fix {blockingCount} required {blockingCount === 1 ? "document" : "documents"} first.
            </p>
          )}
        </div>
      )}
    </section>
  )
}

export default VerificationStatusCard