import { Bell } from "lucide-react"
import { Link } from "react-router-dom"

import { bloodBankPath } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { BloodBankTopbarProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import BloodBankAvatar from "../../../components/bloodDonation/bloodBank/BloodBankAvatar"

const BloodBankTopbar = ({ bank, unread }: BloodBankTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-blood-border bg-white px-4 py-3 md:px-8">
      <div>
        <p className="text-sm font-bold text-blood-navy">Blood donation dashboard</p>
        <p className="text-xs text-blood-muted">{bank.city}</p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={bloodBankPath("notifications", bank.id)}
          aria-label="Notifications"
          className="relative rounded-full border border-blood-border bg-white p-2 text-blood-navy hover:bg-blood-bg"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blood-primary px-1 text-[11px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <BloodBankAvatar name={bank.name} />
          <p className="hidden text-sm font-semibold text-blood-navy sm:block">{bank.name}</p>
        </div>
      </div>
    </header>
  )
}

export default BloodBankTopbar