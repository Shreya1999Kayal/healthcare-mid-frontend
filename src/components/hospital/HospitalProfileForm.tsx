import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { ImagePlus, X } from "lucide-react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalTypeOptions, ownershipOptions } from "../../constants/hospitalConstants/hospitalVerification.constants"
import { fromHospitalProfileForm, toHospitalProfileForm } from "../../services/helper/hospitalHelper/hospitalProfile.helper"
import type { HospitalProfileFormProps } from "../../types/interface/hospitalInterface/HospitalProfile.interface"
import type { HospitalProfileFormValues } from "../../types/type/hospitalType/HospitalProfile.type"

const inputClass = `${hospitalFieldClass} w-full`
const readOnlyClass = `${inputClass} cursor-not-allowed bg-hospital-bg text-hospital-muted`

const listFields: { name: keyof HospitalProfileFormValues; label: string }[] = [
  { name: "specialities", label: "Specialities" },
  { name: "facilities", label: "Facilities" },
  { name: "insurance", label: "Insurance accepted" },
  { name: "accreditations", label: "Accreditations" },
]

const HospitalProfileForm = ({ profile, onSave, onCancel }: HospitalProfileFormProps) => {
  const [form, setForm] = useState<HospitalProfileFormValues>(() => toHospitalProfileForm(profile))
  const [emergency24x7, setEmergency24x7] = useState(profile.emergency24x7)
  const [photos, setPhotos] = useState<string[]>(profile.photos)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: shows the picked photos, nothing is uploaded
  const addPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setPhotos((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))])
    e.target.value = ""
  }

  const removePhoto = (photo: string) => setPhotos((prev) => prev.filter((item) => item !== photo))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave({ ...fromHospitalProfileForm(form, profile), emergency24x7, photos })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className={`${hospitalCardClass} flex flex-col gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-hospital-navy">Photos</h2>
          <p className="text-sm text-hospital-muted">The first photo is used as the cover.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo} className="relative">
              <img src={photo} alt="Hospital" className="h-28 w-full rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo)}
                aria-label="Remove photo"
                className="absolute right-2 top-2 rounded-full bg-white p-1 text-red-600 shadow"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-hospital-primary text-sm font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft">
            <ImagePlus size={20} /> Add photos
            <input type="file" accept="image/*" multiple onChange={addPhotos} className="sr-only" />
          </label>
        </div>
      </section>

      <section className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-hospital-navy">Basic details</h2>
          <p className="text-sm text-hospital-muted">Name and registration number can only be changed through Verification.</p>
        </div>
        <HospitalFormField label="Hospital name">
          <input value={profile.name} readOnly className={readOnlyClass} />
        </HospitalFormField>
        <HospitalFormField label="Registration number">
          <input value={profile.registrationNo} readOnly className={readOnlyClass} />
        </HospitalFormField>
        <HospitalFormField label="Tagline" className="md:col-span-2">
          <input name="tagline" value={form.tagline} onChange={handleChange} className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Hospital type" required>
          <select name="hospitalType" value={form.hospitalType} onChange={handleChange} required className={inputClass}>
            {hospitalTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </HospitalFormField>
        <HospitalFormField label="Ownership" required>
          <select name="ownership" value={form.ownership} onChange={handleChange} required className={inputClass}>
            {ownershipOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </HospitalFormField>
        <HospitalFormField label="Established year" required>
          <input type="number" min={1800} name="establishedYear" value={form.establishedYear} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Total beds" required>
          <input type="number" min={1} name="totalBeds" value={form.totalBeds} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="About" className="md:col-span-2">
          <textarea name="about" value={form.about} onChange={handleChange} rows={4} className={inputClass} />
        </HospitalFormField>
      </section>

      <section className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-hospital-navy md:col-span-2">Contact and timings</h2>
        <HospitalFormField label="Phone" required>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Emergency phone" required>
          <input type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Email" required>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Website">
          <input name="website" value={form.website} onChange={handleChange} className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="City" required>
          <input name="city" value={form.city} onChange={handleChange} required className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Pincode" required>
          <input name="pincode" value={form.pincode} onChange={handleChange} required pattern="\d{6}" className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Address" required className="md:col-span-2">
          <textarea name="address" value={form.address} onChange={handleChange} required rows={2} className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="OPD timings">
          <input name="openingHours" value={form.openingHours} onChange={handleChange} placeholder="e.g. Mon to Sat, 9 AM to 8 PM" className={inputClass} />
        </HospitalFormField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm font-semibold text-hospital-navy">
          <input
            type="checkbox"
            checked={emergency24x7}
            onChange={(e) => setEmergency24x7(e.target.checked)}
            className="h-4 w-4 accent-hospital-primary"
          />
          Emergency open 24x7
        </label>
      </section>

      <section className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-hospital-navy">Services</h2>
          <p className="text-sm text-hospital-muted">Write one item per line.</p>
        </div>
        {listFields.map((field) => (
          <HospitalFormField key={field.name} label={field.label}>
            <textarea name={field.name} value={form[field.name]} onChange={handleChange} rows={4} className={inputClass} />
          </HospitalFormField>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          Save profile
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-hospital-border bg-white px-5 py-2.5 text-sm font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default HospitalProfileForm