import { Pencil } from "lucide-react"
import DonorAvatar from "./DonorAvatar"
import type { DonorProfileViewProps } from "../../../types/interface/blood/donorInterface/DonorProfile.interface"
import { donorProfileFields } from "../../../constants/blood/donorConstants/donorProfile.constants"
import { DONOR_TODAY, donorCardClass, donorPrimaryButtonClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { getAge } from "../../../services/helper/blood/donorHelper/donorVerification.helper"
import { formatDonorDate } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"


const DonorProfileView = ({ profile, onEdit }: DonorProfileViewProps) => {
  // Name and blood group are in the header, so the list skips them
  const listFields = donorProfileFields.filter((field) => field.name !== "fullName" && field.name !== "bloodGroup")

  return (
    <section className={`${donorCardClass} flex flex-col gap-6`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <DonorAvatar name={profile.fullName} className="h-16 w-16 text-lg" />
          <div>
            <h2 className="text-xl font-bold text-blood-navy">{profile.fullName}</h2>
            <p className="text-sm text-blood-muted">
              Blood group <span className="font-bold text-blood-primary-dark">{profile.bloodGroup || "—"}</span>
              {profile.dateOfBirth && ` · ${getAge(profile.dateOfBirth, DONOR_TODAY)} years`}
            </p>
          </div>
        </div>
        <button type="button" onClick={onEdit} className={`${donorPrimaryButtonClass} flex items-center gap-2`}>
          <Pencil size={16} /> Edit profile
        </button>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {listFields.map((field) => (
          <div key={field.name}>
            <dt className="text-xs font-medium uppercase tracking-wide text-blood-muted">{field.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-blood-navy">
              {field.type === "date" ? formatDonorDate(profile[field.name]) : profile[field.name] || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default DonorProfileView