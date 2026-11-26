import { useState, type FormEvent } from "react"
import { useOutletContext } from "react-router-dom"
import { Pencil } from "lucide-react"
import PatientAvatar from "../../components/patient/PatientAvatar"
import PatientFormField from "../../components/patient/PatientFormField"
import {
  patientCardClass,
  patientFieldClass,
  patientGenderOptions,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { bloodGroups } from "../../constants/public/bloods.constants"
import { hasErrors, validateProfile } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientProfileErrors, PatientProfileValues } from "../../types/type/patientType/PatientDashboard.type"

const PatientProfile = () => {
  const { patient, onSaveProfile } = useOutletContext<PatientOutletContext>()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<PatientProfileValues>(patient.profile)
  const [errors, setErrors] = useState<PatientProfileErrors>({})
  const [message, setMessage] = useState("")

  const profile = patient.profile

  const change = (name: keyof PatientProfileValues, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateProfile(form)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    onSaveProfile(form)
    setEditing(false)
    setMessage("Profile saved.")
  }

  const details = [
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Age", value: profile.age ? `${profile.age} years` : "" },
    { label: "Gender", value: profile.gender },
    { label: "Blood group", value: profile.bloodGroup },
    { label: "Address", value: profile.address },
    { label: "Emergency contact", value: `${profile.emergencyName} · ${profile.emergencyPhone}` },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Profile</h1>
          <p className="text-sm text-patient-muted">Your personal and emergency details.</p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setForm(profile)
              setEditing(true)
              setMessage("")
            }}
            className={patientPrimaryButtonClass}
          >
            <Pencil size={16} /> Edit profile
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {!editing ? (
        <section className={`${patientCardClass} flex flex-col gap-5`}>
          <div className="flex items-center gap-4">
            <PatientAvatar name={profile.name} className="h-16 w-16 text-lg" />
            <div>
              <p className="text-xl font-bold text-patient-navy">{profile.name}</p>
              <p className="text-sm text-patient-muted">Patient ID: {patient.id}</p>
            </div>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-lg bg-patient-bg px-3 py-2">
                <dt className="text-xs text-patient-muted">{detail.label}</dt>
                <dd className="text-sm font-semibold text-patient-navy">{detail.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : (
        <form onSubmit={submit} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <PatientFormField label="Full name" required error={errors.name}>
              <input value={form.name} onChange={(e) => change("name", e.target.value)} className={patientFieldClass} />
            </PatientFormField>
            <PatientFormField label="Email" required error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => change("email", e.target.value)} className={patientFieldClass} />
            </PatientFormField>
            <PatientFormField label="Phone (10 digits)" required error={errors.phone}>
              <input
                type="tel"
                maxLength={10}
                value={form.phone}
                onChange={(e) => change("phone", e.target.value)}
                className={patientFieldClass}
              />
            </PatientFormField>
            <PatientFormField label="Age" required error={errors.age}>
              <input type="number" min={1} max={120} value={form.age} onChange={(e) => change("age", e.target.value)} className={patientFieldClass} />
            </PatientFormField>
            <PatientFormField label="Gender" required error={errors.gender}>
              <select value={form.gender} onChange={(e) => change("gender", e.target.value)} className={patientFieldClass}>
                <option value="">Choose</option>
                {patientGenderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </PatientFormField>
            <PatientFormField label="Blood group" required error={errors.bloodGroup}>
              <select value={form.bloodGroup} onChange={(e) => change("bloodGroup", e.target.value)} className={patientFieldClass}>
                <option value="">Choose</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </PatientFormField>
            <PatientFormField label="Address" required error={errors.address} className="md:col-span-2">
              <textarea rows={2} value={form.address} onChange={(e) => change("address", e.target.value)} className={patientFieldClass} />
            </PatientFormField>
            <PatientFormField label="Emergency contact name" required error={errors.emergencyName}>
              <input value={form.emergencyName} onChange={(e) => change("emergencyName", e.target.value)} className={patientFieldClass} />
            </PatientFormField>
            <PatientFormField label="Emergency contact phone (10 digits)" required error={errors.emergencyPhone}>
              <input
                type="tel"
                maxLength={10}
                value={form.emergencyPhone}
                onChange={(e) => change("emergencyPhone", e.target.value)}
                className={patientFieldClass}
              />
            </PatientFormField>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setEditing(false)
                setErrors({})
              }}
              className={patientOutlineButtonClass}
            >
              Cancel
            </button>
            <button type="submit" className={patientPrimaryButtonClass}>
              Save profile
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PatientProfile
