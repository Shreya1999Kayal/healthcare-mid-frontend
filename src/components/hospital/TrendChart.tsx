import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { TrendChartProps } from "../../types/interface/hospitalInterface/HospitalReport.interface"

// Simple bar chart made with divs: dark bar = appointments, light bar = admissions
const TrendChart = ({ title, points }: TrendChartProps) => {
  const max = Math.max(1, ...points.map((point) => Math.max(point.appointments, point.admissions)))

  return (
    <section className={hospitalCardClass}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-hospital-navy">{title}</h2>
        <div className="flex gap-4 text-xs font-semibold text-hospital-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-hospital-primary" /> Appointments
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-hospital-border" /> Admissions
          </span>
        </div>
      </div>

      <div className="flex h-64 gap-2">
        {points.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end justify-center gap-1 border-b border-hospital-border">
              {/* heights change with data, so they use inline style */}
              <div
                title={`${point.appointments} appointments`}
                className="w-1/3 max-w-8 rounded-t bg-hospital-primary"
                style={{ height: `${(point.appointments / max) * 100}%` }}
              />
              <div
                title={`${point.admissions} admissions`}
                className="w-1/3 max-w-8 rounded-t bg-hospital-border"
                style={{ height: `${(point.admissions / max) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-hospital-muted">{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrendChart