import type { HospitalNotification } from "../../type/hospitalType/HospitalDashboard.type"

export interface HospitalNotificationItemProps {
  notification: HospitalNotification
  hospitalId: string
  onMarkRead: (notificationId: string) => void
}