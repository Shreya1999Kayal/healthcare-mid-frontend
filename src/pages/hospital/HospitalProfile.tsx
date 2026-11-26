import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import HospitalProfileForm from "../../components/hospital/HospitalProfileForm"
import HospitalProfileView from "../../components/hospital/HospitalProfileView"
import { buildHospitalProfile } from "../../services/helper/hospitalHelper/hospitalProfile.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { HospitalProfileDetails } from "../../types/type/hospitalType/HospitalProfile.type"

const HospitalProfile = () => {
  const { hospital } = useOutletContext<HospitalOutletContext>()

  // Local copy (UI only, nothing is saved)
  const [profile, setProfile] = useState<HospitalProfileDetails>(() => buildHospitalProfile(hospital))
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  const saveProfile = (updated: HospitalProfileDetails) => {
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
        <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">{editing ? "Edit profile" : "Hospital profile"}</h1>
        <p className="text-sm text-hospital-muted">Your hospital details as patients see them.</p>
      </div>

      {message && !editing && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {editing ? (
        <HospitalProfileForm profile={profile} onSave={saveProfile} onCancel={() => setEditing(false)} />
      ) : (
        <HospitalProfileView profile={profile} onEdit={startEditing} />
      )}
    </div>
  )
}

export default HospitalProfile