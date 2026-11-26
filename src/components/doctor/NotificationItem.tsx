import { Link } from "react-router-dom"
import { notificationTypeStyles } from "../../constants/doctorConstants/doctorNotifications.constants"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { NotificationItemProps } from "../../types/interface/doctorInterface/DoctorNotifications.interface"

const NotificationItem = ({ notification, doctorId, onMarkRead }: NotificationItemProps) => {
  const style = notificationTypeStyles[notification.type]
  const Icon = style.icon

  return (
    <li className={`flex flex-wrap items-start justify-between gap-3 p-4 ${notification.unread ? "bg-doctor-bg-soft/40" : ""}`}>
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style.className}`}>
          <Icon size={18} />
        </span>
        <div>
          <p className={`text-sm text-doctor-navy ${notification.unread ? "font-semibold" : ""}`}>{notification.message}</p>
          <p className="text-xs text-doctor-muted">
            {style.label} · {notification.time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {notification.unread && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="rounded-md px-3 py-1.5 text-xs font-semibold text-doctor-muted hover:bg-doctor-bg"
          >
            Mark as read
          </button>
        )}
        <Link
          to={doctorPath(notification.link, doctorId)}
          onClick={() => onMarkRead(notification.id)}
          className="rounded-md border border-doctor-primary px-3 py-1.5 text-xs font-semibold text-doctor-primary-dark no-underline hover:bg-doctor-bg-soft"
        >
          Open
        </Link>
        {notification.unread && <span className="h-2.5 w-2.5 rounded-full bg-doctor-primary" aria-label="Unread" />}
      </div>
    </li>
  )
}

export default NotificationItem