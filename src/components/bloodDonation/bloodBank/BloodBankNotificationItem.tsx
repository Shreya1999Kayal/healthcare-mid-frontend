import { Check } from "lucide-react"
import { Link } from "react-router-dom"
import { notificationTypeStyles } from "../../../constants/blood/bloodBankConstants/bloodBankNotification.constants"
import { bloodBankPath } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { BloodBankNotificationItemProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"

const BloodBankNotificationItem = ({ notification, bankId, onMarkRead }: BloodBankNotificationItemProps) => {
  const type = notificationTypeStyles[notification.type]
  const Icon = type.icon

  return (
    <li className={`flex flex-wrap items-start gap-4 p-4 sm:flex-nowrap ${notification.unread ? "bg-blood-bg/60" : ""}`}>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${type.className}`}>
        <Icon size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {notification.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-blood-primary" aria-label="Unread" />}
          <p className={`text-sm text-blood-navy ${notification.unread ? "font-semibold" : ""}`}>{notification.message}</p>
        </div>
        <p className="mt-0.5 text-xs text-blood-muted">
          {type.label} · {notification.time}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        {notification.unread && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="flex items-center gap-1.5 rounded-md border border-blood-border bg-white px-3 py-1.5 text-xs font-semibold text-blood-navy hover:bg-blood-bg"
          >
            <Check size={14} /> Mark as read
          </button>
        )}
        {/* Opening the section also marks it as read */}
        <Link
          to={bloodBankPath(notification.link, bankId)}
          onClick={() => onMarkRead(notification.id)}
          className="rounded-md bg-blood-primary px-3 py-1.5 text-xs font-semibold text-white no-underline hover:bg-blood-primary-dark"
        >
          Open
        </Link>
      </div>
    </li>
  )
}

export default BloodBankNotificationItem