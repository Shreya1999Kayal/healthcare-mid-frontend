import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { BedAvailabilityProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const BedAvailability = ({ beds }: BedAvailabilityProps) => {
  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-4 text-lg font-bold text-hospital-navy">Bed availability</h2>
      <ul className="flex flex-col gap-4">
        {beds.map((bed) => {
          const free = bed.total - bed.occupied
          const percent = Math.round((bed.occupied / bed.total) * 100)

          return (
            <li key={bed.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold text-hospital-navy">{bed.type}</span>
                <span className="text-hospital-muted">
                  {free} free of {bed.total}
                </span>
              </div>
              <div className="h-2 rounded-full bg-hospital-bg-soft">
                {/* width changes with data, so it uses inline style */}
                <div
                  className={`h-2 rounded-full ${percent >= 90 ? "bg-red-500" : "bg-hospital-primary"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default BedAvailability