import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { patientCardClass, patientOutlineButtonClass } from "../../constants/patientConstants/patientDashboard.constants"
import { patientPath } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"

const Notifications = () => {
  const { patient, notifications, onMarkRead, onMarkAllRead } = useOutletContext<PatientOutletContext>()
  const [unreadOnly, setUnreadOnly] = useState(false)

  const unread = notifications.filter((notification) => notification.unread).length
  const shownNotifications = unreadOnly ? notifications.filter((notification) => notification.unread) : notifications

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Notifications</h1>
          <p className="text-sm text-patient-muted">{unread} unread</p>
        </div>
        <button type="button" onClick={onMarkAllRead} disabled={unread === 0} className={`${patientOutlineButtonClass} disabled:opacity-50`}>
          Mark all as read
        </button>
      </div>

      <div className="flex gap-2">
        {[false, true].map((value) => (
          <button
            key={String(value)}
            type="button"
            onClick={() => setUnreadOnly(value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              unreadOnly === value
                ? "bg-patient-primary text-white"
                : "border border-patient-border bg-white text-patient-navy hover:bg-patient-bg"
            }`}
          >
            {value ? `Unread (${unread})` : `All (${notifications.length})`}
          </button>
        ))}
      </div>

      {shownNotifications.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>No notifications here.</p>
      ) : (
        <ul className={`${patientCardClass} flex flex-col divide-y divide-patient-border/60 p-0`}>
          {shownNotifications.map((notification) => (
            <li key={notification.id}>
              <Link
                to={patientPath(notification.link, patient.id)}
                onClick={() => onMarkRead(notification.id)}
                className={`flex items-start gap-3 px-5 py-4 no-underline hover:bg-patient-bg ${notification.unread ? "bg-patient-bg/60" : ""}`}
              >
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.unread ? "bg-patient-primary" : "bg-slate-300"}`} />
                <span className="flex-1">
                  <span className={`block text-sm text-patient-navy ${notification.unread ? "font-semibold" : ""}`}>{notification.message}</span>
                  <span className="text-xs text-patient-muted">{notification.time}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications
