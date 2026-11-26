import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { CalendarCog, Trash2 } from "lucide-react"
import DoctorFormField from "./DoctorFormField"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { initialSpecialForm } from "../../constants/doctorConstants/doctorSchedule.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { formatTimeRange, toMinutes } from "../../services/helper/doctorHelper/doctorSchedule.helper"
import type { SpecialScheduleManagerProps } from "../../types/interface/doctorInterface/DoctorSchedule.interface"
import type { SpecialFormValues } from "../../types/type/doctorType/DoctorSchedule.type"

const inputClass = `${doctorFieldClass} w-full`

const SpecialScheduleManager = ({ specials, onAdd, onRemove }: SpecialScheduleManagerProps) => {
  const [form, setForm] = useState<SpecialFormValues>(initialSpecialForm)
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (toMinutes(form.end) <= toMinutes(form.start)) {
      setError("End time must be after the start time.")
      return
    }
    setError("")
    onAdd(form)
    setForm(initialSpecialForm)
  }

  return (
    <section className={`${doctorCardClass} flex flex-col gap-4`}>
      <div>
        <h2 className="text-lg font-bold text-doctor-navy">Special schedules</h2>
        <p className="text-sm text-doctor-muted">One-day changes to your hours at this chamber.</p>
      </div>

      {specials.length === 0 ? (
        <p className="text-sm text-doctor-muted">No special days added.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {specials.map((special) => (
            <li key={special.id} className="flex items-center justify-between gap-3 rounded-xl border border-doctor-border p-3">
              <div className="flex items-start gap-3">
                <CalendarCog size={18} className="mt-0.5 shrink-0 text-doctor-primary-dark" />
                <div>
                  <p className="text-sm font-semibold text-doctor-navy">
                    {formatIsoDate(special.date)} · {formatTimeRange(special.start, special.end)}
                  </p>
                  <p className="text-xs text-doctor-muted">{special.note}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(special.id)}
                aria-label={`Remove special schedule on ${formatIsoDate(special.date)}`}
                className="rounded-md p-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 border-t border-doctor-border pt-4 sm:grid-cols-3">
        <DoctorFormField label="Date" required>
          <input type="date" name="date" value={form.date} min={DOCTOR_TODAY} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Start" required>
          <input type="time" name="start" value={form.start} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="End" required>
          <input type="time" name="end" value={form.end} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Note" required className="sm:col-span-3">
          <input name="note" value={form.note} onChange={handleChange} required placeholder="Why the hours change" className={inputClass} />
        </DoctorFormField>
        {error && <p className="text-sm font-semibold text-red-600 sm:col-span-3">{error}</p>}
        <button
          type="submit"
          className="w-fit rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft"
        >
          Add special day
        </button>
      </form>
    </section>
  )
}

export default SpecialScheduleManager