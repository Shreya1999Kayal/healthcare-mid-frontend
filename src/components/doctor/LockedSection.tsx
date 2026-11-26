import { Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { APPLICATION_SECTION, LOCKED_MESSAGE, applicationStatusStyles } from "../../constants/doctorConstants/doctorApplication.constants"
import type { LockedSectionProps } from "../../types/interface/doctorInterface/DoctorApplication.interface"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"

const actionLabels = {
  "not-submitted": "Fill application",
  pending: "View application",
  rejected: "Fix and resubmit",
  approved: "View application",
}

const LockedSection = ({ doctorId, status }: LockedSectionProps) => {
  const style = applicationStatusStyles[status]

  return (
    <div className={`${doctorCardClass} mx-auto flex max-w-lg flex-col items-center py-12 text-center`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-doctor-bg-soft text-doctor-primary-dark">
        <Lock size={26} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-doctor-navy">This section is locked</h1>
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>Application: {style.label}</span>
      <p className="mt-3 text-sm font-semibold text-doctor-navy">{LOCKED_MESSAGE}</p>
      <p className="mt-1 text-sm text-doctor-muted">{style.description}</p>
      <Link
        to={doctorPath(APPLICATION_SECTION, doctorId)}
        className="mt-5 rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-doctor-primary-dark"
      >
        {actionLabels[status]}
      </Link>
    </div>
  )
}

export default LockedSection