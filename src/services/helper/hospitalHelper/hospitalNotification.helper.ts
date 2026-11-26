import type { HospitalNotification } from "../../../types/type/hospitalType/HospitalDashboard.type"
import type { HospitalNotificationFilter } from "../../../types/type/hospitalType/HospitalNotification.type"

export const filterHospitalNotifications = (notifications: HospitalNotification[], filter: HospitalNotificationFilter) => {
  if (filter === "all") return notifications
  if (filter === "unread") return notifications.filter((notification) => notification.unread)
  return notifications.filter((notification) => notification.type === filter)
}

// Number shown on each tab
export const countNotifications = (notifications: HospitalNotification[], filter: HospitalNotificationFilter) =>
  filterHospitalNotifications(notifications, filter).length