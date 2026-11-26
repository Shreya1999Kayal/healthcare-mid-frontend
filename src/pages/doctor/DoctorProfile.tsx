import { useState } from "react"
import ProfileForm from "../../components/doctor/ProfileForm"
import ProfileView from "../../components/doctor/ProfileView"
import { doctorProfileDetails } from "../../constants/doctorConstants/doctorProfile.constants"
import type { DoctorProfileDetails } from "../../types/type/doctorType/DoctorProfile.type"

const DoctorProfile = () => {
  // Local copy (UI only, nothing is saved)
  const [profile, setProfile] = useState<DoctorProfileDetails>(doctorProfileDetails)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  const saveProfile = (updated: DoctorProfileDetails) => {
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
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">{editing ? "Edit profile" : "My profile"}</h1>
        <p className="text-sm text-doctor-muted">Your details as patients see them.</p>
      </div>

      {message && !editing && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {editing ? (
        <ProfileForm profile={profile} onSave={saveProfile} onCancel={() => setEditing(false)} />
      ) : (
        <ProfileView profile={profile} onEdit={startEditing} />
      )}
    </div>
  )
}

export default DoctorProfile