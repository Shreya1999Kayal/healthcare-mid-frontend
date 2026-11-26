import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { HospitalSummaryCardProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const HospitalSummaryCard = ({ label, value, hint, icon: Icon }: HospitalSummaryCardProps) => {
  return (
    <article className={`${hospitalCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-hospital-primary to-hospital-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-hospital-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-hospital-navy">{label}</p>
        <p className="text-xs text-hospital-muted">{hint}</p>
      </div>
    </article>
  )
}

export default HospitalSummaryCard