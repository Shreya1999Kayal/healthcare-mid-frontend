import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import DoctorAvatar from "../../components/doctor/DoctorAvatar"
import type { DoctorTopbarProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { ALL_CHAMBERS } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"


const DoctorTopbar = ({ doctor, chambers, chamberId, unread, onChamberChange }: DoctorTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-doctor-border bg-white px-4 py-3 md:px-8">
      <select
        value={chamberId}
        onChange={(event) => onChamberChange(event.target.value)}
        aria-label="Choose chamber"
        className="rounded-md border border-doctor-border bg-doctor-bg-soft/50 px-3 py-2 text-sm text-doctor-navy outline-none focus:border-doctor-primary"
      >
        <option value={ALL_CHAMBERS}>All chambers</option>
        {chambers.map((chamber) => (
          <option key={chamber.id} value={chamber.id}>
            {chamber.hospital}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-4">
        <Link
          to={doctorPath("notifications", doctor.id)}
          aria-label="Notifications"
          className="relative rounded-full border border-doctor-border bg-white p-2 text-doctor-navy hover:bg-doctor-bg"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <DoctorAvatar name={doctor.name} image={doctor.image} />
          <p className="hidden text-sm font-semibold text-doctor-navy sm:block">{doctor.name}</p>
        </div>
      </div>
    </header>
  )
}

export default DoctorTopbar