import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import { buildBloodBankProfile } from "../../../services/helper/blood/bloodBankHelper/bloodBankProfile.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodBankProfileDetails } from "../../../types/type/blood/bloodBankType/BloodBankProfile.type"
import BloodBankProfileView from "../../../components/bloodDonation/bloodBank/BloodBankProfileView"
import BloodBankProfileForm from "../../../components/bloodDonation/bloodBank/BloodBankProfileForm"

const BloodBankProfile = () => {
  const { bank } = useOutletContext<BloodBankOutletContext>()

  // Local copy (UI only, nothing is saved)
  const [profile, setProfile] = useState<BloodBankProfileDetails>(() => buildBloodBankProfile(bank))
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  const saveProfile = (updated: BloodBankProfileDetails) => {
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
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">{editing ? "Edit profile" : "Blood bank profile"}</h1>
        <p className="text-sm text-blood-muted">These details show on the public Blood page.</p>
      </div>

      {message && !editing && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {editing ? (
        <BloodBankProfileForm profile={profile} onSave={saveProfile} onCancel={() => setEditing(false)} />
      ) : (
        <BloodBankProfileView profile={profile} onEdit={startEditing} />
      )}
    </div>
  )
}

export default BloodBankProfile