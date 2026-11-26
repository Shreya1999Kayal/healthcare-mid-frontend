import { useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { CheckCheck } from "lucide-react"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import DoctorTabs from "../../components/doctor/DoctorTabs"
import NotificationItem from "../../components/doctor/NotificationItem"
import { doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { ALL_TYPES, notificationReadTabs, notificationTypeList, notificationTypeStyles } from "../../constants/doctorConstants/doctorNotifications.constants"
import { filterNotifications } from "../../services/helper/doctorHelper/doctorNotifications.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { NotificationReadFilter, NotificationTypeFilter } from "../../types/type/doctorType/DoctorNotifications.type"

const DoctorNotifications = () => {
  // Notifications live in DoctorLayout, so the bell count updates too
  const { notifications, onMarkRead, onMarkAllRead } = useOutletContext<DoctorOutletContext>()
  const { id = "" } = useParams()
  const [readFilter, setReadFilter] = useState<NotificationReadFilter>("all")
  const [typeFilter, setTypeFilter] = useState<NotificationTypeFilter>(ALL_TYPES)

  const unread = notifications.filter((notification) => notification.unread).length
  const visibleNotifications = filterNotifications(notifications, readFilter, typeFilter)
  const tabs = notificationReadTabs.map((tab) => ({
    ...tab,
    count: tab.id === "unread" ? unread : notifications.length,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Notifications</h1>
          <p className="text-sm text-doctor-muted">{unread} unread</p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unread === 0}
          className="flex items-center gap-2 rounded-md border border-doctor-primary bg-white px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DoctorTabs options={tabs} value={readFilter} onChange={setReadFilter} />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as NotificationTypeFilter)}
          aria-label="Filter by type"
          className={doctorFieldClass}
        >
          <option value={ALL_TYPES}>All types</option>
          {notificationTypeList.map((type) => (
            <option key={type} value={type}>
              {notificationTypeStyles[type].label}
            </option>
          ))}
        </select>
      </div>

      {visibleNotifications.length > 0 ? (
        <ul className={`${doctorCardClass} divide-y divide-doctor-border overflow-hidden p-0!`}>
          {visibleNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} doctorId={id} onMarkRead={onMarkRead} />
          ))}
        </ul>
      ) : (
        <DoctorEmptyState
          title="You're all caught up"
          message="No notifications match this filter."
          actionLabel={readFilter !== "all" || typeFilter !== ALL_TYPES ? "Show all" : undefined}
          onAction={() => {
            setReadFilter("all")
            setTypeFilter(ALL_TYPES)
          }}
        />
      )}
    </div>
  )
}

export default DoctorNotifications