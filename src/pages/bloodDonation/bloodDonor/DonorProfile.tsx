import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import type { DonorOutletContext } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import type { DonorProfileDetails } from "../../../types/type/blood/donorType/DonorProfile.type"
import { buildDonorProfile } from "../../../services/helper/blood/donorHelper/donorProfile.helper"
import DonorProfileForm from "../../../components/bloodDonation/bloodDonor/DonorProfileForm"
import DonorProfileView from "../../../components/bloodDonation/bloodDonor/DonorProfileView"


const DonorProfile = () => {
  const { donor } = useOutletContext<DonorOutletContext>()

  // Local copy (UI only, nothing is saved)
  const [profile, setProfile] = useState<DonorProfileDetails>(() => buildDonorProfile(donor))
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  const saveProfile = (updated: DonorProfileDetails) => {
    setProfile(updated)
    setEditing(false)
    setMessage("Profile updated.")
  }

  const startEditing = () => {
    setMessage("")
    setEditing(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">{editing ? "Edit profile" : "My profile"}</h1>
        <p className="text-sm text-blood-muted">Only your first name, blood group and area show on the public Blood page.</p>
      </div>

      {message && !editing && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {editing ? (
        <DonorProfileForm profile={profile} onSave={saveProfile} onCancel={() => setEditing(false)} />
      ) : (
        <DonorProfileView profile={profile} onEdit={startEditing} />
      )}
    </div>
  )
}

export default DonorProfile