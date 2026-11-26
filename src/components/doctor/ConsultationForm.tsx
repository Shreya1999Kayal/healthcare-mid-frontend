import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import DoctorFormField from "./DoctorFormField"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { initialConsultationForm } from "../../constants/doctorConstants/doctorConsultations.constants"
import type { ConsultationFormProps } from "../../types/interface/doctorInterface/DoctorConsultations.interface"
import type { ConsultationFormValues } from "../../types/type/doctorType/DoctorConsultations.type"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"

const inputClass = `${doctorFieldClass} w-full`

const ConsultationForm = ({ patientId, onComplete }: ConsultationFormProps) => {
  const [form, setForm] = useState<ConsultationFormValues>(initialConsultationForm)

  const {id=" "}= useParams()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: the page adds the record to the list
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onComplete(form)
  }

  return (
    <form onSubmit={handleSubmit} className={`${doctorCardClass} flex flex-col gap-4`}>
      <h2 className="text-lg font-bold text-doctor-navy">Consultation notes</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <DoctorFormField label="Symptoms" required>
          <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} required placeholder="What the patient reports" className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Observations">
          <textarea name="observations" value={form.observations} onChange={handleChange} rows={3} placeholder="BP, temperature, findings" className={inputClass} />
        </DoctorFormField>
      </div>

      <DoctorFormField label="Clinical notes">
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={inputClass} />
      </DoctorFormField>

      <div className="grid gap-4 md:grid-cols-2">
        <DoctorFormField label="Diagnosis" required>
          <input name="diagnosis" value={form.diagnosis} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Tests advised">
          <input name="testsAdvised" value={form.testsAdvised} onChange={handleChange} placeholder="Separate with commas, e.g. CBC, ECG" className={inputClass} />
        </DoctorFormField>
      </div>

      <DoctorFormField label="Follow-up date" className="md:w-1/2">
        <input type="date" name="followUpDate" value={form.followUpDate} min={DOCTOR_TODAY} onChange={handleChange} className={inputClass} />
      </DoctorFormField>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`${doctorPath("prescriptions", id)}?patient=${patientId}`}
          className="rounded-md border border-doctor-primary px-5 py-2.5 text-sm font-semibold text-doctor-primary-dark no-underline hover:bg-doctor-bg-soft"
        >
          Write prescription
        </Link>
        <button type="submit" className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          Complete consultation
        </button>
      </div>
    </form>
  )
}

export default ConsultationForm