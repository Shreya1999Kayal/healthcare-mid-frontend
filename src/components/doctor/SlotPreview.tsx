import { useState } from "react"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getSlotPreview, getWeekDay } from "../../services/helper/doctorHelper/doctorSchedule.helper"
import type { SlotPreviewProps } from "../../types/interface/doctorInterface/DoctorSchedule.interface"

const SlotPreview = ({ schedule, leaves, specials, appointments }: SlotPreviewProps) => {
  const [date, setDate] = useState(DOCTOR_TODAY)
  const preview = getSlotPreview(schedule, leaves, specials, appointments, date)
  const free = preview.slots.filter((slot) => !slot.booked).length

  return (
    <section className={doctorCardClass}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-doctor-navy">Slot preview</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => e.target.value && setDate(e.target.value)}
          aria-label="Preview date"
          className={doctorFieldClass}
        />
      </div>
      <p className="mt-1 text-sm text-doctor-muted">
        {getWeekDay(date)}, {formatIsoDate(date)}
      </p>

      {preview.status !== "open" ? (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
            preview.status === "leave" ? "bg-red-50 text-red-600" : "bg-doctor-bg text-doctor-muted"
          }`}
        >
          {preview.label}
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-doctor-navy">
            <span className="font-semibold">{preview.hours}</span> · {preview.label} · {free} of {preview.slots.length} free
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {preview.slots.map((slot) => (
              <span
                key={slot.time}
                className={`rounded-md px-2 py-2 text-center text-xs font-semibold ${
                  slot.booked
                    ? "bg-doctor-navy text-white"
                    : "border border-doctor-border bg-doctor-bg-soft/50 text-doctor-primary-dark"
                }`}
              >
                {slot.time}
                {slot.booked && <span className="block text-[10px] font-normal text-white/70">Booked</span>}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-doctor-muted">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-sm border border-doctor-border bg-doctor-bg-soft" /> Free
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-sm bg-doctor-navy" /> Booked
            </span>
          </div>
        </>
      )}
    </section>
  )
}

export default SlotPreview