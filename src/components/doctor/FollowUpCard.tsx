import { useState } from "react"
import { BellRing, CalendarClock, Check } from "lucide-react"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { actionToneClass } from "../../constants/doctorConstants/doctorAppointments.constants"
import { followUpStatusStyles } from "../../constants/doctorConstants/doctorFollowUps.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getDaysLeft, getDueLabel } from "../../services/helper/doctorHelper/doctorFollowUps.helper"
import type { FollowUpCardProps } from "../../types/interface/doctorInterface/DoctorFollowUps.interface"

const smallButton =
  "flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"

const FollowUpCard = ({ followUp, chamberName, onRemind, onReschedule, onDone }: FollowUpCardProps) => {
  const [editing, setEditing] = useState(false)
  const [newDate, setNewDate] = useState(followUp.dueDate)

  const style = followUpStatusStyles[followUp.status]
  const isOpen = followUp.status !== "done"
  const overdue = isOpen && getDaysLeft(followUp.dueDate) < 0

  const saveDate = () => {
    onReschedule(followUp.id, newDate)
    setEditing(false)
  }

  return (
    <article className={`${doctorCardClass} flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-doctor-navy">{followUp.patient}</p>
          <p className="text-xs text-doctor-muted">
            {chamberName} · Last visit {followUp.lastVisit}
          </p>
        </div>
        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
      </div>

      <p className="text-sm text-doctor-navy">{followUp.reason}</p>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <CalendarClock size={16} className="text-doctor-primary-dark" />
        <span className="font-semibold text-doctor-navy">{formatIsoDate(followUp.dueDate)}</span>
        {isOpen && (
          <span className={overdue ? "font-semibold text-red-600" : "text-doctor-muted"}>· {getDueLabel(followUp.dueDate)}</span>
        )}
      </div>

      {editing && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={newDate}
            min={DOCTOR_TODAY}
            onChange={(event) => setNewDate(event.target.value)}
            aria-label="New follow-up date"
            className={doctorFieldClass}
          />
          <button type="button" onClick={saveDate} disabled={!newDate} className={`${smallButton} ${actionToneClass.primary}`}>
            Save
          </button>
          <button type="button" onClick={() => setEditing(false)} className={`${smallButton} ${actionToneClass.neutral}`}>
            Cancel
          </button>
        </div>
      )}

      {isOpen && !editing && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onRemind(followUp.id)}
            disabled={followUp.status === "reminded"}
            className={`${smallButton} ${actionToneClass.neutral}`}
          >
            <BellRing size={14} /> {followUp.status === "reminded" ? "Reminder sent" : "Send reminder"}
          </button>
          <button type="button" onClick={() => setEditing(true)} className={`${smallButton} ${actionToneClass.neutral}`}>
            <CalendarClock size={14} /> Reschedule
          </button>
          <button type="button" onClick={() => onDone(followUp.id)} className={`${smallButton} ${actionToneClass.primary}`}>
            <Check size={14} /> Mark done
          </button>
        </div>
      )}
    </article>
  )
}

export default FollowUpCard