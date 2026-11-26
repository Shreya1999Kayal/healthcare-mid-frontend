import { Droplet, Lock, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import type { DonorSidebarProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { DONOR_LOCKED_MESSAGE, donorStatusStyles } from "../../../constants/blood/donorConstants/donorVerification.constants"
import DonorAvatar from "../../../components/bloodDonation/bloodDonor/DonorAvatar"
import { donorNavLinks } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import DonorNavItem from "../../../components/bloodDonation/bloodDonor/DonorNavItem"
import { donorPath } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import { isDonorApproved, isDonorSectionLocked } from "../../../services/helper/blood/donorHelper/donorVerification.helper"
import { useLogout } from "../../../hooks/useLogout"


const DonorSidebar = ({ donor }: DonorSidebarProps) => {
  const logout = useLogout()
  const status = donor.verification.status
  const statusStyle = donorStatusStyles[status]

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-linear-to-b from-blood-primary from-47% to-blood-accent text-white lg:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 text-white no-underline">
        <Droplet size={26} className="text-blood-bg-soft" />
        <span className="text-xl font-extrabold">Seva</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">Donor</span>
      </Link>

      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-white/15 p-3">
        <DonorAvatar name={donor.name} className="h-11 w-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{donor.name}</p>
          <p className="truncate text-xs text-white/75">
            {donor.bloodGroup} · {donor.city}
          </p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyle.className}`}>{statusStyle.label}</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {donorNavLinks.map(({ label, section, icon }) => (
          <DonorNavItem
            key={section}
            label={label}
            icon={icon}
            to={donorPath(section, donor.id)}
            locked={isDonorSectionLocked(section, status)}
          />
        ))}
      </nav>

      {!isDonorApproved(status) && (
        <p className="mx-3 my-3 flex items-start gap-2 rounded-lg bg-white/15 p-3 text-xs text-white/90">
          <Lock size={14} className="mt-0.5 shrink-0" />
          {DONOR_LOCKED_MESSAGE}
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

export default DonorSidebar