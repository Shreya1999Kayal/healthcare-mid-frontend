import { BadgeCheck, MessageSquareWarning } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { verificationStatusStyles } from "../../constants/hospitalConstants/hospitalVerification.constants"
import type { VerificationStatusBannerProps } from "../../types/interface/hospitalInterface/HospitalVerification.interface"

const VerificationStatusBanner = ({ verification }: VerificationStatusBannerProps) => {
  const style = verificationStatusStyles[verification.status]
  const isRejected = verification.status === "rejected"

  return (
    <section className={`${hospitalCardClass} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-hospital-primary to-hospital-primary-dark text-white">
            <BadgeCheck size={24} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-hospital-navy">Verification status</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
            </div>
            <p className="mt-1 text-sm text-hospital-muted">{style.description}</p>
          </div>
        </div>

        {verification.status !== "not-submitted" && (
          <div className="text-right text-xs text-hospital-muted">
            <p>Submitted: {verification.submittedOn || "—"}</p>
            <p>Reviewed: {verification.reviewedOn || "—"}</p>
          </div>
        )}
      </div>

      {isRejected && verification.adminRemarks && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <MessageSquareWarning size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-bold text-red-700">Reason from the admin</p>
            <p className="text-sm text-red-700">{verification.adminRemarks}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default VerificationStatusBanner