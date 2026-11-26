import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { CalendarOff, Trash2 } from "lucide-react"
import DoctorFormField from "./DoctorFormField"
import { ALL_CHAMBERS, DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { initialLeaveForm } from "../../constants/doctorConstants/doctorSchedule.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { formatDateRange } from "../../services/helper/doctorHelper/doctorSchedule.helper"
import type { LeaveManagerProps } from "../../types/interface/doctorInterface/DoctorSchedule.interface"
import type { LeaveFormValues } from "../../types/type/doctorType/DoctorSchedule.type"

const inputClass = `${doctorFieldClass} w-full`

const LeaveManager = ({ leaves, chambers, defaultChamberId, onAdd, onRemove }: LeaveManagerProps) => {
  const [form, setForm] = useState<LeaveFormValues>({ ...initialLeaveForm, chamberId: defaultChamberId })
  const [error, setError] = useState("")

  const chamberLabel = (chamberId: string) =>
    chamberId === ALL_CHAMBERS ? "All chambers" : getChamberName(chambers, chamberId)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.to < form.from) {
      setError("End date can't be before the start date.")
      return
    }
    setError("")
    onAdd(form)
    setForm({ ...initialLeaveForm, chamberId: defaultChamberId })
  }

  return (
    <section className={`${doctorCardClass} flex flex-col gap-4`}>
      <div>
        <h2 className="text-lg font-bold text-doctor-navy">Blocked dates and leave</h2>
        <p className="text-sm text-doctor-muted">No slots are offered on these dates.</p>
      </div>

      {leaves.length === 0 ? (
        <p className="text-sm text-doctor-muted">No leave planned.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {leaves.map((leave) => (
            <li key={leave.id} className="flex items-center justify-between gap-3 rounded-xl border border-doctor-border p-3">
              <div className="flex items-start gap-3">
                <CalendarOff size={18} className="mt-0.5 shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-doctor-navy">{formatDateRange(leave.from, leave.to)}</p>
                  <p className="text-xs text-doctor-muted">
                    {chamberLabel(leave.chamberId)} · {leave.reason}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(leave.id)}
                aria-label={`Remove leave on ${formatDateRange(leave.from, leave.to)}`}
                className="rounded-md p-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 border-t border-doctor-border pt-4 sm:grid-cols-2">
        <DoctorFormField label="Chamber">
          <select name="chamberId" value={form.chamberId} onChange={handleChange} className={inputClass}>
            <option value={ALL_CHAMBERS}>All chambers</option>
            {chambers.map((chamber) => (
              <option key={chamber.id} value={chamber.id}>
                {chamber.hospital}
              </option>
            ))}
          </select>
        </DoctorFormField>
        <DoctorFormField label="Reason" required>
          <input name="reason" value={form.reason} onChange={handleChange} required placeholder="Conference, holiday..." className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="From" required>
          <input type="date" name="from" value={form.from} min={DOCTOR_TODAY} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        <DoctorFormField label="To" required>
          <input type="date" name="to" value={form.to} min={form.from || DOCTOR_TODAY} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
        {error && <p className="text-sm font-semibold text-red-600 sm:col-span-2">{error}</p>}
        <button
          type="submit"
          className="w-fit rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft"
        >
          Block dates
        </button>
      </form>
    </section>
  )
}

export default LeaveManager