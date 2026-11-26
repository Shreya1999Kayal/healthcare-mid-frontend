import type { BloodBankNotification, BloodBankNotificationFilter } from "../../../../types/type/blood/bloodBankType/BloodBankDashboard.type"

export const filterBloodBankNotifications = (notifications: BloodBankNotification[], filter: BloodBankNotificationFilter) => {
  if (filter === "unread") return notifications.filter((notification) => notification.unread)
  if (filter === "read") return notifications.filter((notification) => !notification.unread)
  return notifications
}

export const countBloodBankNotifications = (notifications: BloodBankNotification[], filter: BloodBankNotificationFilter) =>
  filterBloodBankNotifications(notifications, filter).length