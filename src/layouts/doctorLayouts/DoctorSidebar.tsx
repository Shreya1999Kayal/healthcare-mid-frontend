import { HeartPulse, Lock, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import DoctorAvatar from "../../components/doctor/DoctorAvatar"
import DoctorNavItem from "../../components/doctor/DoctorNavItem"
import { doctorNavLinks } from "../../constants/doctorConstants/doctorDashboard.constants"
import { LOCKED_MESSAGE, applicationStatusStyles } from "../../constants/doctorConstants/doctorApplication.constants"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { isApproved, isSectionLocked } from "../../services/helper/doctorHelper/doctorApplication.helper"
import type { DoctorSidebarProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { useLogout } from "../../hooks/useLogout"

const DoctorSidebar = ({ doctor }: DoctorSidebarProps) => {
  const logout = useLogout()
  const status = doctor.application.status
  const statusStyle = applicationStatusStyles[status]

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-linear-to-b from-doctor-navy to-doctor-navy-dark text-white lg:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 text-white no-underline">
        <HeartPulse size={26} className="text-doctor-bg-soft" />
        <span className="text-xl font-extrabold">Seva</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">Doctor</span>
      </Link>

      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-white/10 p-3">
        <DoctorAvatar name={doctor.name} image={doctor.image} className="h-11 w-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{doctor.name}</p>
          <p className="truncate text-xs text-white/70">{doctor.speciality}</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyle.className}`}>
            {statusStyle.label}
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {doctorNavLinks.map(({ label, section, icon }) => (
          <DoctorNavItem
            key={section}
            label={label}
            icon={icon}
            to={doctorPath(section, doctor.id)}
            locked={isSectionLocked(section, status)}
          />
        ))}
      </nav>

      {!isApproved(status) && (
        <p className="mx-3 my-3 flex items-start gap-2 rounded-lg bg-white/10 p-3 text-xs text-white/80">
          <Lock size={14} className="mt-0.5 shrink-0" />
          {LOCKED_MESSAGE}
        </p>
      )}

      <div className="flex flex-col gap-1 border-t border-white/10 p-3">
        <Link to="/" className="rounded-lg px-3 py-2.5 text-sm text-white/75 no-underline hover:bg-white/10 hover:text-white">
          Back to website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white text-left"
        >
          <LogOut size={18} /> Log out
        </button>
      </div>
    </aside>
  )
}

export default DoctorSidebar