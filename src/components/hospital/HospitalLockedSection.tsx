import { Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { HOSPITAL_LOCKED_MESSAGE, VERIFICATION_SECTION, verificationStatusStyles } from "../../constants/hospitalConstants/hospitalVerification.constants"
import { hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalLockedSectionProps } from "../../types/interface/hospitalInterface/HospitalVerification.interface"

const actionLabels = {
  "not-submitted": "Fill verification form",
  pending: "View verification",
  rejected: "Fix and resubmit",
  approved: "View verification",
}

const HospitalLockedSection = ({ hospitalId, status }: HospitalLockedSectionProps) => {
  const style = verificationStatusStyles[status]

  return (
    <div className={`${hospitalCardClass} mx-auto flex max-w-lg flex-col items-center py-12 text-center`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hospital-bg-soft text-hospital-primary-dark">
        <Lock size={26} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-hospital-navy">This section is locked</h1>
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>Verification: {style.label}</span>
      <p className="mt-3 text-sm font-semibold text-hospital-navy">{HOSPITAL_LOCKED_MESSAGE}</p>
      <p className="mt-1 text-sm text-hospital-muted">{style.description}</p>
      <Link
        to={hospitalPath(VERIFICATION_SECTION, hospitalId)}
        className="mt-5 rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-hospital-primary-dark"
      >
        {actionLabels[status]}
      </Link>
    </div>
  )
}

export default HospitalLockedSection