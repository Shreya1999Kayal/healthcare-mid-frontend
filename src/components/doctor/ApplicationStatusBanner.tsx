import { BadgeCheck, MessageSquareWarning } from "lucide-react"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { applicationStatusStyles } from "../../constants/doctorConstants/doctorApplication.constants"
import type { ApplicationStatusBannerProps } from "../../types/interface/doctorInterface/DoctorApplication.interface"

const ApplicationStatusBanner = ({ application }: ApplicationStatusBannerProps) => {
  const style = applicationStatusStyles[application.status]
  const isRejected = application.status === "rejected"

  return (
    <section className={`${doctorCardClass} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-doctor-primary to-doctor-primary-dark text-white">
            <BadgeCheck size={24} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-doctor-navy">Application status</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
            </div>
            <p className="mt-1 text-sm text-doctor-muted">{style.description}</p>
          </div>
        </div>

        {application.status !== "not-submitted" && (
          <div className="text-right text-xs text-doctor-muted">
            <p>Submitted: {application.submittedOn || "—"}</p>
            <p>Reviewed: {application.reviewedOn || "—"}</p>
          </div>
        )}
      </div>

      {isRejected && application.adminRemarks && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <MessageSquareWarning size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-bold text-red-700">Reason from the admin</p>
            <p className="text-sm text-red-700">{application.adminRemarks}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ApplicationStatusBanner