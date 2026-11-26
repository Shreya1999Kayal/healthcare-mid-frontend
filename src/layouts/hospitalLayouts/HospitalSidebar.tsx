import { Hospital, Lock, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import HospitalAvatar from "../../components/hospital/HospitalAvatar"
import HospitalNavItem from "../../components/hospital/HospitalNavItem"
import { hospitalNavLinks } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { HOSPITAL_LOCKED_MESSAGE, verificationStatusStyles } from "../../constants/hospitalConstants/hospitalVerification.constants"
import { hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { isHospitalApproved, isHospitalSectionLocked } from "../../services/helper/hospitalHelper/hospitalVerification.helper"
import type { HospitalSidebarProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import { useLogout } from "../../hooks/useLogout"

const HospitalSidebar = ({ hospital }: HospitalSidebarProps) => {
  const logout = useLogout()
  const status = hospital.verification.status
  const statusStyle = verificationStatusStyles[status]

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-linear-to-b from-hospital-primary to-hospital-primary-dark text-white lg:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 text-white no-underline">
        <Hospital size={26} className="text-hospital-bg-soft" />
        <span className="text-xl font-extrabold">Seva</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">Hospital</span>
      </Link>

      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-white/15 p-3">
        <HospitalAvatar name={hospital.name} className="h-11 w-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{hospital.name}</p>
          <p className="truncate text-xs text-white/75">{hospital.city}</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyle.className}`}>
            {statusStyle.label}
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {hospitalNavLinks.map(({ label, section, icon }) => (
          <HospitalNavItem
            key={section}
            label={label}
            icon={icon}
            to={hospitalPath(section, hospital.id)}
            locked={isHospitalSectionLocked(section, status)}
          />
        ))}
      </nav>

      {!isHospitalApproved(status) && (
        <p className="mx-3 my-3 flex items-start gap-2 rounded-lg bg-white/15 p-3 text-xs text-white/90">
          <Lock size={14} className="mt-0.5 shrink-0" />
          {HOSPITAL_LOCKED_MESSAGE}
        </p>
      )}

      <div className="flex flex-col gap-1 border-t border-white/20 p-3">
        <Link to="/" className="rounded-lg px-3 py-2.5 text-sm text-white/85 no-underline hover:bg-white/15 hover:text-white">
          Back to website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/15 hover:text-white text-left"
        >
          <LogOut size={18} /> Log out
        </button>
      </div>
    </aside>
  )
}

export default HospitalSidebar