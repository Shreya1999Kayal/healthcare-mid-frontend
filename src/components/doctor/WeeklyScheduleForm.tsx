import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import DoctorFormField from "./DoctorFormField"
import { doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { slotLengths, weekDays } from "../../constants/doctorConstants/doctorSchedule.constants"
import { buildSlots, formatTimeRange, toMinutes } from "../../services/helper/doctorHelper/doctorSchedule.helper"
import type { WeeklyScheduleFormProps } from "../../types/interface/doctorInterface/DoctorSchedule.interface"
import type { ChamberSchedule, WeekDay } from "../../types/type/doctorType/DoctorSchedule.type"

const inputClass = `${doctorFieldClass} w-full`

const WeeklyScheduleForm = ({ schedule, onSave }: WeeklyScheduleFormProps) => {
  const [form, setForm] = useState<ChamberSchedule>(schedule)
  const [error, setError] = useState("")

  const slotCount = buildSlots(form.start, form.end, form.slotMinutes).length

  // keeps the days in week order
  const toggleDay = (day: WeekDay) =>
    setForm((prev) => ({
      ...prev,
      days: weekDays.filter((item) => (item === day ? !prev.days.includes(day) : prev.days.includes(item))),
    }))

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.days.length === 0) {
      setError("Pick at least one day.")
      return
    }
    if (toMinutes(form.end) - toMinutes(form.start) < form.slotMinutes) {
      setError("End time must be at least one slot after the start time.")
      return
    }
    setError("")
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className={`${doctorCardClass} flex flex-col gap-4`}>
      <div>
        <h2 className="text-lg font-bold text-doctor-navy">Weekly schedule</h2>
        <p className="text-sm text-doctor-muted">Days and hours you sit at this chamber.</p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-doctor-navy">Days</p>
        <div className="flex flex-wrap gap-2">
          {weekDays.map((day) => {
            const active = form.days.includes(day)

            return (
              <button
                key={day}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDay(day)}
                className={`w-14 rounded-md border py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-doctor-primary bg-doctor-primary text-white"
                    : "border-doctor-border bg-white text-doctor-navy hover:bg-doctor-bg"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DoctorFormField label="Start time" required>
          <input type="time" name="start" value={form.start} onChange={handleTime} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="End time" required>
          <input type="time" name="end" value={form.end} onChange={handleTime} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="Slot length">
          <select
            value={form.slotMinutes}
            onChange={(e) => setForm((prev) => ({ ...prev, slotMinutes: Number(e.target.value) }))}
            className={inputClass}
          >
            {slotLengths.map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </DoctorFormField>
      </div>

      {slotCount > 0 && (
        <p className="text-sm text-doctor-muted">
          {slotCount} slots per day · {formatTimeRange(form.start, form.end)}
        </p>
      )}
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button type="submit" className="w-fit rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
        Save schedule
      </button>
    </form>
  )
}

export default WeeklyScheduleForm