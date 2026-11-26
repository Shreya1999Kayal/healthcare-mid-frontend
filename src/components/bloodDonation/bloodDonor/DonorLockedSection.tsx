import { Lock } from "lucide-react"
import { Link } from "react-router-dom"

import type { DonorLockedSectionProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { DONOR_LOCKED_MESSAGE, DONOR_VERIFICATION_SECTION, donorStatusStyles } from "../../../constants/blood/donorConstants/donorVerification.constants"
import { donorCardClass, donorPrimaryButtonClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { donorPath } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"

const actionLabels = {
  "not-submitted": "Fill verification form",
  pending: "View verification",
  rejected: "Fix and resubmit",
  approved: "View verification",
}

const DonorLockedSection = ({ donorId, status }: DonorLockedSectionProps) => {
  const style = donorStatusStyles[status]

  return (
    <div className={`${donorCardClass} mx-auto flex max-w-lg flex-col items-center py-12 text-center`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blood-bg-soft text-blood-primary-dark">
        <Lock size={26} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-blood-navy">This section is locked</h1>
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>Verification: {style.label}</span>
      <p className="mt-3 text-sm font-semibold text-blood-navy">{DONOR_LOCKED_MESSAGE}</p>
      <p className="mt-1 text-sm text-blood-muted">{style.description}</p>
      <Link to={donorPath(DONOR_VERIFICATION_SECTION, donorId)} className={`${donorPrimaryButtonClass} mt-5 no-underline`}>
        {actionLabels[status]}
      </Link>
    </div>
  )
}

export default DonorLockedSection