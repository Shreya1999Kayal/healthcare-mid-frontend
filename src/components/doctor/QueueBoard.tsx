import { Check, PhoneCall, SkipForward, UserCheck } from "lucide-react"
import QueueStatusBadge from "./QueueStatusBadge"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { actionToneClass } from "../../constants/doctorConstants/doctorAppointments.constants"
import { AVG_CONSULT_MINUTES } from "../../constants/doctorConstants/doctorQueue.constants"
import { getWaitMinutes, isInLine, sortQueue } from "../../services/helper/doctorHelper/doctorQueue.helper"
import type { QueueBoardProps } from "../../types/interface/doctorInterface/DoctorQueue.interface"

const smallButton = "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors"

const QueueBoard = ({ chamberName, items, onCallNext, onSkip, onMarkDone, onCheckIn }: QueueBoardProps) => {
  const ordered = sortQueue(items)
  const current = items.find((item) => item.status === "in-consultation")
  const inLine = items.filter(isInLine)
  const callLabel = inLine.length === 0 && current ? "Finish current" : "Call next"

  return (
    <section className={doctorCardClass}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-doctor-navy">{chamberName}</h2>
          <p className="text-sm text-doctor-muted">
            {inLine.length} waiting · about {inLine.length * AVG_CONSULT_MINUTES} min to clear
          </p>
        </div>
        <button
          type="button"
          onClick={onCallNext}
          disabled={!current && inLine.length === 0}
          className="flex items-center gap-2 rounded-md bg-doctor-primary px-4 py-2 text-sm font-semibold text-white hover:bg-doctor-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PhoneCall size={16} /> {callLabel}
        </button>
      </div>

      <div className="mb-4 rounded-xl bg-linear-to-br from-doctor-navy to-doctor-primary-dark p-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Now serving</p>
        {current ? (
          <p className="mt-1 text-lg font-bold">
            Token {current.token} · {current.patient}
          </p>
        ) : (
          <p className="mt-1 text-sm text-white/80">Nobody inside. Press "Call next".</p>
        )}
      </div>

      {ordered.length === 0 ? (
        <p className="text-sm text-doctor-muted">No patients in this queue today.</p>
      ) : (
        <ul className="divide-y divide-doctor-border">
          {ordered.map((item) => (
            <li
              key={item.id}
              className={`flex flex-wrap items-center justify-between gap-3 py-3 ${item.status === "done" ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-doctor-bg-soft text-sm font-extrabold text-doctor-primary-dark">
                  {item.token}
                </span>
                <div>
                  <p className="font-semibold text-doctor-navy">
                    {item.patient}
                    <span className="font-normal text-doctor-muted">
                      {" "}
                      · {item.age} yrs, {item.gender}
                    </span>
                  </p>
                  <p className="text-xs text-doctor-muted">
                    {item.time} · {item.mode} · {item.reason}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {isInLine(item) && (
                  <span className="text-xs font-semibold text-doctor-muted">~{getWaitMinutes(items, item.id)} min</span>
                )}
                <QueueStatusBadge status={item.status} />

                {item.status === "waiting" && (
                  <button type="button" onClick={() => onCheckIn(item.id)} className={`${smallButton} ${actionToneClass.neutral}`}>
                    <UserCheck size={14} /> Check in
                  </button>
                )}
                {isInLine(item) && (
                  <button type="button" onClick={() => onSkip(item.id)} className={`${smallButton} ${actionToneClass.neutral}`}>
                    <SkipForward size={14} /> Skip
                  </button>
                )}
                {item.status === "in-consultation" && (
                  <button type="button" onClick={() => onMarkDone(item.id)} className={`${smallButton} ${actionToneClass.primary}`}>
                    <Check size={14} /> Mark done
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default QueueBoard