import { Lock } from "lucide-react"
import { Link } from "react-router-dom"
import type { BloodBankLockedSectionProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import { BLOOD_BANK_LOCKED_MESSAGE, VERIFICATION_SECTION, verificationStatusStyles } from "../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"
import { bloodBankCardClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bloodBankPath } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"



const actionLabels = {
  "not-submitted": "Fill verification form",
  pending: "View verification",
  rejected: "Fix and resubmit",
  approved: "View verification",
}

const BloodBankLockedSection = ({ bankId, status }: BloodBankLockedSectionProps) => {
  const style = verificationStatusStyles[status]

  return (
    <div className={`${bloodBankCardClass} mx-auto flex max-w-lg flex-col items-center py-12 text-center`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blood-bg-soft text-blood-primary-dark">
        <Lock size={26} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-blood-navy">This section is locked</h1>
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>Verification: {style.label}</span>
      <p className="mt-3 text-sm font-semibold text-blood-navy">{BLOOD_BANK_LOCKED_MESSAGE}</p>
      <p className="mt-1 text-sm text-blood-muted">{style.description}</p>
      <Link to={bloodBankPath(VERIFICATION_SECTION, bankId)} className={`${primaryButtonClass} mt-5 no-underline`}>
        {actionLabels[status]}
      </Link>
    </div>
  )
}

export default BloodBankLockedSection