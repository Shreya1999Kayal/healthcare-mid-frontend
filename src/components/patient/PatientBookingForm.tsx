import { useState, type FormEvent } from "react"
import PatientFormField from "./PatientFormField"
import {
  PATIENT_TODAY,
  patientCardClass,
  patientFieldClass,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { emptyBookingValues, patientTimeSlots } from "../../constants/patientConstants/patientCare.constants"
import { doctorsList } from "../../constants/public/doctors.constants"
import { formatPatientTime, hasErrors } from "../../services/helper/patientHelper/patientDashboard.helper"
import { validateBooking } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientBookingFormProps } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientBookingErrors, PatientBookingValues } from "../../types/type/patientType/PatientCare.type"

// Book a new appointment, or reschedule one (doctor locked)
const PatientBookingForm = ({
  title,
  appointments,
  initial = emptyBookingValues,
  editingId = "",
  lockDoctor = false,
  onSave,
  onCancel,
}: PatientBookingFormProps) => {
  const [form, setForm] = useState<PatientBookingValues>(initial)
  const [errors, setErrors] = useState<PatientBookingErrors>({})

  const doctor = doctorsList.find((item) => item.id === form.doctorId)

  const change = (name: keyof PatientBookingValues, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBooking(form, appointments, editingId)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
      <h2 className="text-lg font-bold text-patient-navy">{title}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <PatientFormField label="Doctor" required error={errors.doctorId} className="md:col-span-2">
          <select
            value={form.doctorId}
            onChange={(e) => change("doctorId", e.target.value)}
            disabled={lockDoctor}
            className={patientFieldClass}
          >
            <option value="">Choose a doctor</option>
            {doctorsList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.speciality}
              </option>
            ))}
          </select>
        </PatientFormField>

        {doctor && (
          <p className="rounded-md bg-patient-bg px-3 py-2 text-sm text-patient-navy md:col-span-2">
            Chamber: <span className="font-semibold">{doctor.hospital}</span>, {doctor.location} · Fee ₹{doctor.fee}
          </p>
        )}

        <PatientFormField label="Date" required error={errors.date}>
          <input
            type="date"
            min={PATIENT_TODAY}
            value={form.date}
            onChange={(e) => change("date", e.target.value)}
            className={patientFieldClass}
          />
        </PatientFormField>

        <PatientFormField label="Time slot" required error={errors.time}>
          <select value={form.time} onChange={(e) => change("time", e.target.value)} className={patientFieldClass}>
            <option value="">Choose a slot</option>
            {patientTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {formatPatientTime(slot)}
              </option>
            ))}
          </select>
        </PatientFormField>

        <PatientFormField label="Reason for visit" required error={errors.reason} className="md:col-span-2">
          <textarea
            rows={3}
            value={form.reason}
            onChange={(e) => change("reason", e.target.value)}
            placeholder="Example: fever for 3 days"
            className={patientFieldClass}
          />
        </PatientFormField>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={patientOutlineButtonClass}>
          Cancel
        </button>
        <button type="submit" className={patientPrimaryButtonClass}>
          {editingId ? "Save new time" : "Request appointment"}
        </button>
      </div>
    </form>
  )
}

export default PatientBookingForm
