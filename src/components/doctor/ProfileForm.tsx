import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Camera } from "lucide-react"
import DoctorAvatar from "./DoctorAvatar"
import DoctorFormField from "./DoctorFormField"
import { doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { consultationTypeOptions } from "../../constants/doctorConstants/doctorProfile.constants"
import { fromProfileForm, toProfileForm } from "../../services/helper/doctorHelper/doctorProfile.helper"
import type { ProfileFormProps } from "../../types/interface/doctorInterface/DoctorProfile.interface"
import type { ProfileFormValues } from "../../types/type/doctorType/DoctorProfile.type"

const inputClass = `${doctorFieldClass} w-full`

const listFields: { name: keyof ProfileFormValues; label: string }[] = [
  { name: "qualifications", label: "Qualifications" },
  { name: "expertise", label: "Expertise" },
  { name: "awards", label: "Awards" },
  { name: "certifications", label: "Certifications" },
]

const ProfileForm = ({ profile, onSave, onCancel }: ProfileFormProps) => {
  const [form, setForm] = useState<ProfileFormValues>(() => toProfileForm(profile))
  const [photo, setPhoto] = useState(profile.image)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: shows the picked photo, nothing is uploaded
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave({ ...fromProfileForm(form, profile), image: photo })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className={`${doctorCardClass} flex flex-wrap items-center gap-5`}>
        <DoctorAvatar key={photo} name={form.name || profile.name} image={photo} className="h-24 w-24" />
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft">
          <Camera size={16} /> Change photo
          <input type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />
        </label>
      </section>

      <section className={`${doctorCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-doctor-navy md:col-span-2">Basic details</h2>
        <DoctorFormField label="Full name" required>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Registration number" required>
          <input name="registrationNo" value={form.registrationNo} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Specialisation" required>
          <input name="speciality" value={form.speciality} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Sub-specialisation">
          <input name="subSpeciality" value={form.subSpeciality} onChange={handleChange} className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Experience (years)" required>
          <input type="number" min={0} name="experience" value={form.experience} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Languages">
          <input name="languages" value={form.languages} onChange={handleChange} placeholder="Separate with commas" className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Email">
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Phone">
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Bio" className="md:col-span-2">
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} className={inputClass} />
        </DoctorFormField>
      </section>

      <section className={`${doctorCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-doctor-navy md:col-span-2">Consultation and fees</h2>
        <fieldset className="md:col-span-2">
          <legend className="mb-2 text-sm font-medium text-doctor-navy">Consultation type</legend>
          <div className="flex flex-wrap gap-3">
            {consultationTypeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm ${
                  form.consultationType === option.value
                    ? "border-doctor-primary bg-doctor-bg-soft font-semibold text-doctor-primary-dark"
                    : "border-doctor-border text-doctor-navy"
                }`}
              >
                <input
                  type="radio"
                  name="consultationType"
                  value={option.value}
                  checked={form.consultationType === option.value}
                  onChange={handleChange}
                  className="accent-doctor-primary"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <DoctorFormField label="In-person fee (₹)">
          <input type="number" min={0} name="inPersonFee" value={form.inPersonFee} onChange={handleChange} className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Online fee (₹)">
          <input type="number" min={0} name="onlineFee" value={form.onlineFee} onChange={handleChange} className={inputClass} />
        </DoctorFormField>
      </section>

      <section className={`${doctorCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-doctor-navy">Qualifications and achievements</h2>
          <p className="text-sm text-doctor-muted">Write one item per line.</p>
        </div>
        {listFields.map((field) => (
          <DoctorFormField key={field.name} label={field.label}>
            <textarea name={field.name} value={form[field.name]} onChange={handleChange} rows={4} className={inputClass} />
          </DoctorFormField>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          Save profile
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-doctor-border bg-white px-5 py-2.5 text-sm font-semibold text-doctor-navy hover:bg-doctor-bg">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProfileForm