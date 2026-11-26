import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import type { BloodBankSummaryCardProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"


const BloodBankSummaryCard = ({ label, value, hint, icon: Icon }: BloodBankSummaryCardProps) => {
  return (
    <article className={`${bloodBankCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blood-primary to-blood-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-blood-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-blood-navy">{label}</p>
        <p className="text-xs text-blood-muted">{hint}</p>
      </div>
    </article>
  )
}

export default BloodBankSummaryCard