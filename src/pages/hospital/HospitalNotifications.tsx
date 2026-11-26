import { useState } from "react"
import { BellOff, CheckCheck } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import HospitalNotificationItem from "../../components/hospital/HospitalNotificationItem"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalNotificationFilters } from "../../constants/hospitalConstants/hospitalNotification.constants"
import { countNotifications, filterHospitalNotifications } from "../../services/helper/hospitalHelper/hospitalNotification.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { HospitalNotificationFilter } from "../../types/type/hospitalType/HospitalNotification.type"

const HospitalNotifications = () => {
  // Notifications live in HospitalLayout, so the bell count stays in sync
  const { hospital, notifications, onMarkRead, onMarkAllRead } = useOutletContext<HospitalOutletContext>()
  const [filter, setFilter] = useState<HospitalNotificationFilter>("all")

  const shownNotifications = filterHospitalNotifications(notifications, filter)
  const unreadCount = countNotifications(notifications, "unread")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Notifications</h1>
          <p className="text-sm text-hospital-muted">
            {unreadCount > 0 ? `You have ${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}.` : "You're all caught up."}
          </p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {hospitalNotificationFilters.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
              filter === option.value
                ? "bg-hospital-primary text-white"
                : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
            }`}
          >
            {option.label} ({countNotifications(notifications, option.value)})
          </button>
        ))}
      </div>

      {shownNotifications.length === 0 ? (
        <div className={`${hospitalCardClass} flex flex-col items-center py-12 text-center`}>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hospital-bg-soft text-hospital-primary-dark">
            <BellOff size={26} />
          </span>
          <p className="mt-4 font-semibold text-hospital-navy">No notifications here</p>
          <p className="text-sm text-hospital-muted">Try another tab.</p>
        </div>
      ) : (
        <ul className={`${hospitalCardClass} divide-y divide-hospital-border overflow-hidden p-0`}>
          {shownNotifications.map((notification) => (
            <HospitalNotificationItem key={notification.id} notification={notification} hospitalId={hospital.id} onMarkRead={onMarkRead} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default HospitalNotifications