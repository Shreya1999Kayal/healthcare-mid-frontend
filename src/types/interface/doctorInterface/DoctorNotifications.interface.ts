import type { DoctorNotification } from "../../type/doctorType/DoctorDashboard.type"

export interface NotificationItemProps {
  notification: DoctorNotification
  doctorId: string
  onMarkRead: (notificationId: string) => void
}