import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import HospitalAvatar from "../../components/hospital/HospitalAvatar"
import { hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalTopbarProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const HospitalTopbar = ({ hospital, unread }: HospitalTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-hospital-border bg-white px-4 py-3 md:px-8">
      <div>
        <p className="text-sm font-bold text-hospital-navy">Hospital dashboard</p>
        <p className="text-xs text-hospital-muted">{hospital.city}</p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={hospitalPath("notifications", hospital.id)}
          aria-label="Notifications"
          className="relative rounded-full border border-hospital-border bg-white p-2 text-hospital-navy hover:bg-hospital-bg"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <HospitalAvatar name={hospital.name} />
          <p className="hidden text-sm font-semibold text-hospital-navy sm:block">{hospital.name}</p>
        </div>
      </div>
    </header>
  )
}

export default HospitalTopbar