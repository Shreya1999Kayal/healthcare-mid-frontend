import { Inbox } from "lucide-react"
import type { BloodBankEmptyStateProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"


const BloodBankEmptyState = ({ title, message }: BloodBankEmptyStateProps) => {
  return (
    <div className={`${bloodBankCardClass} flex flex-col items-center py-12 text-center`}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blood-bg-soft text-blood-primary-dark">
        <Inbox size={26} />
      </span>
      <p className="mt-4 font-semibold text-blood-navy">{title}</p>
      <p className="text-sm text-blood-muted">{message}</p>
    </div>
  )
}

export default BloodBankEmptyState