import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import PatientAvatar from "../../components/patient/PatientAvatar"
import { patientPath } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientTopbarProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

const PatientTopbar = ({ patient, unread }: PatientTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-patient-border bg-white px-4 py-3 md:px-8">
      <div>
        <p className="text-sm font-bold text-patient-navy">My health</p>
        <p className="text-xs text-patient-muted">Patient dashboard</p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={patientPath("notifications", patient.id)}
          aria-label="Notifications"
          className="relative rounded-full border border-patient-border bg-white p-2 text-patient-navy hover:bg-patient-bg"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <PatientAvatar name={patient.profile.name} />
          <p className="hidden text-sm font-semibold text-patient-navy sm:block">{patient.profile.name}</p>
        </div>
      </div>
    </header>
  )
}

export default PatientTopbar
