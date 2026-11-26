import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { getShare } from "../../services/helper/hospitalHelper/hospitalReport.helper"
import type { BreakdownBarsProps } from "../../types/interface/hospitalInterface/HospitalReport.interface"

// Horizontal bars, one row per item
const BreakdownBars = ({ title, items, suffix = "", max, showShare = false }: BreakdownBarsProps) => {
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const fullWidth = max ?? Math.max(1, ...items.map((item) => item.value))

  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-4 text-lg font-bold text-hospital-navy">{title}</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex justify-between gap-3 text-sm">
              <span className="font-semibold text-hospital-navy">{item.label}</span>
              <span className="text-hospital-muted">
                {item.value.toLocaleString("en-IN")}
                {suffix}
                {showShare && <span className="ml-1 font-semibold text-hospital-navy">({getShare(item.value, total)}%)</span>}
              </span>
            </div>
            <div className="h-2 rounded-full bg-hospital-bg-soft">
              {/* width changes with data, so it uses inline style */}
              <div
                className={`h-2 rounded-full ${item.colorClass ?? "bg-hospital-primary"}`}
                style={{ width: `${Math.min(100, (item.value / fullWidth) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BreakdownBars