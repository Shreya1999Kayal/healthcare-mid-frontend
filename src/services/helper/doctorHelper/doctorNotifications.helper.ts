import { ALL_TYPES } from "../../../constants/doctorConstants/doctorNotifications.constants"
import type { DoctorNotification } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { NotificationReadFilter, NotificationTypeFilter } from "../../../types/type/doctorType/DoctorNotifications.type"

export const filterNotifications = (
  notifications: DoctorNotification[],
  readFilter: NotificationReadFilter,
  typeFilter: NotificationTypeFilter,
) =>
  notifications.filter(
    (notification) =>
      (readFilter === "all" || notification.unread) && (typeFilter === ALL_TYPES || notification.type === typeFilter),
  )