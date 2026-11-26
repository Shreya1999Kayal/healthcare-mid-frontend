import { Pencil } from "lucide-react"
import BloodBankAvatar from "./BloodBankAvatar"

import type { BloodBankProfileViewProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankProfile.interface"
import { bloodBankProfileFields } from "../../../constants/blood/bloodBankConstants/bloodBankProfile.constants"
import { bloodBankCardClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"

const BloodBankProfileView = ({ profile, onEdit }: BloodBankProfileViewProps) => {
  // Name and type are in the header, so the list skips them
  const listFields = bloodBankProfileFields.filter((field) => field.name !== "bankName" && field.name !== "bankType")

  return (
    <section className={`${bloodBankCardClass} flex flex-col gap-6`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BloodBankAvatar name={profile.bankName} className="h-16 w-16 text-lg" />
          <div>
            <h2 className="text-xl font-bold text-blood-navy">{profile.bankName}</h2>
            <p className="text-sm text-blood-muted">{profile.bankType || "Type not set"}</p>
          </div>
        </div>
        <button type="button" onClick={onEdit} className={`${primaryButtonClass} flex items-center gap-2`}>
          <Pencil size={16} /> Edit profile
        </button>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {listFields.map((field) => (
          <div key={field.name} className={field.fullWidth ? "sm:col-span-2 xl:col-span-3" : ""}>
            <dt className="text-xs font-medium uppercase tracking-wide text-blood-muted">{field.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-blood-navy">{profile[field.name] || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default BloodBankProfileView