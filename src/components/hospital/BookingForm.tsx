import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { HOSPITAL_TODAY, hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { bookingGenderOptions, bookingTimeSlots, emptyBookingForm } from "../../constants/hospitalConstants/hospitalAppointment.constants"
import { hospitalDoctors } from "../../constants/hospitalConstants/hospitalDoctor.constants"
import { formatTime, validateBooking } from "../../services/helper/hospitalHelper/hospitalAppointment.helper"
import type { BookingFormProps } from "../../types/interface/hospitalInterface/HospitalAppointment.interface"
import type { BookingFieldName, BookingFormErrors, BookingFormValues } from "../../types/type/hospitalType/HospitalAppointment.type"

const inputClass = `${hospitalFieldClass} w-full`

// Only doctors who are available can take new bookings
const bookableDoctors = hospitalDoctors.filter((doctor) => doctor.availability === "available")

const BookingForm = ({ bookings, onSave, onCancel }: BookingFormProps) => {
  const [form, setForm] = useState<BookingFormValues>(emptyBookingForm)
  const [errors, setErrors] = useState<BookingFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as BookingFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBooking(form, bookings)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const error = (name: BookingFieldName) =>
    errors[name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[name]}</span>

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      <div className="md:col-span-2 xl:col-span-4">
        <h2 className="text-lg font-bold text-hospital-navy">Book a walk-in appointment</h2>
        <p className="text-sm text-hospital-muted">The booking is confirmed straight away.</p>
      </div>

      <HospitalFormField label="Patient name" required>
        <input name="patient" value={form.patient} onChange={handleChange} className={inputClass} />
        {error("patient")}
      </HospitalFormField>
      <HospitalFormField label="Phone" required>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98300 00000" className={inputClass} />
        {error("phone")}
      </HospitalFormField>
      <HospitalFormField label="Age" required>
        <input type="number" min={0} name="age" value={form.age} onChange={handleChange} className={inputClass} />
        {error("age")}
      </HospitalFormField>
      <HospitalFormField label="Gender" required>
        <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {bookingGenderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error("gender")}
      </HospitalFormField>

      <HospitalFormField label="Doctor" required className="md:col-span-2">
        <select name="doctorId" value={form.doctorId} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {bookableDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} ({doctor.department})
            </option>
          ))}
        </select>
        {error("doctorId")}
      </HospitalFormField>
      <HospitalFormField label="Date" required>
        <input type="date" min={HOSPITAL_TODAY} name="date" value={form.date} onChange={handleChange} className={inputClass} />
        {error("date")}
      </HospitalFormField>
      <HospitalFormField label="Time" required>
        <select name="time" value={form.time} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {bookingTimeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {formatTime(slot)}
            </option>
          ))}
        </select>
        {error("time")}
      </HospitalFormField>

      <HospitalFormField label="Reason for visit" required className="md:col-span-2 xl:col-span-4">
        <input name="reason" value={form.reason} onChange={handleChange} placeholder="e.g. Fever since 3 days" className={inputClass} />
        {error("reason")}
      </HospitalFormField>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-4">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          Book appointment
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

export default BookingForm