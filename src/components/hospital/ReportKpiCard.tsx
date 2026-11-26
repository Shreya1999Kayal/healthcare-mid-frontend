import { TrendingDown, TrendingUp } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { formatKpiValue, getChange } from "../../services/helper/hospitalHelper/hospitalReport.helper"
import type { ReportKpiCardProps } from "../../types/interface/hospitalInterface/HospitalReport.interface"

const ReportKpiCard = ({ kpi, icon: Icon }: ReportKpiCardProps) => {
  const change = getChange(kpi.value, kpi.previous)
  const ChangeIcon = change.up ? TrendingUp : TrendingDown

  return (
    <article className={`${hospitalCardClass} flex items-start gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-hospital-primary to-hospital-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-hospital-muted">{kpi.label}</p>
        <p className="truncate text-2xl font-extrabold text-hospital-navy">{formatKpiValue(kpi.value, kpi.format)}</p>
        <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${change.up ? "text-emerald-600" : "text-red-600"}`}>
          <ChangeIcon size={14} />
          {change.percent}% {change.up ? "up" : "down"}
          <span className="font-normal text-hospital-muted">from {formatKpiValue(kpi.previous, kpi.format)}</span>
        </p>
      </div>
    </article>
  )
}

export default ReportKpiCard