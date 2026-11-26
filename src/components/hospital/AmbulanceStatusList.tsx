import { Ambulance } from "lucide-react"
import { ambulanceStatusStyles, hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { AmbulanceStatusListProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const AmbulanceStatusList = ({ ambulances }: AmbulanceStatusListProps) => {
  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-4 text-lg font-bold text-hospital-navy">Ambulances</h2>
      <ul className="flex flex-col gap-3">
        {ambulances.map((ambulance) => {
          const style = ambulanceStatusStyles[ambulance.status]

          return (
            <li key={ambulance.id} className="flex items-center gap-3 rounded-xl bg-hospital-bg p-3">
              <Ambulance size={20} className="shrink-0 text-hospital-primary-dark" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-hospital-navy">{ambulance.vehicleNo}</p>
                <p className="truncate text-xs text-hospital-muted">
                  {ambulance.driver} · {ambulance.type}
                </p>
              </div>
              <span className={`ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default AmbulanceStatusList