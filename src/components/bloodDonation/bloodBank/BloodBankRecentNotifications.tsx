import { Link } from "react-router-dom"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { notificationTypeStyles } from "../../../constants/blood/bloodBankConstants/bloodBankNotification.constants"
import { bloodBankPath } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { BloodBankRecentNotificationsProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"

const BloodBankRecentNotifications = ({ notifications, bankId }: BloodBankRecentNotificationsProps) => {
  return (
    <section className={bloodBankCardClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blood-navy">Recent notifications</h2>
        <Link to={bloodBankPath("notifications", bankId)} className="text-sm font-semibold text-blood-primary-dark no-underline">
          View all
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {notifications.slice(0, 3).map((notification) => {
          const type = notificationTypeStyles[notification.type]
          const Icon = type.icon

          return (
            <li key={notification.id} className="flex items-start gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${type.className}`}>
                <Icon size={16} />
              </span>
              <div>
                <p className={`text-sm text-blood-navy ${notification.unread ? "font-semibold" : ""}`}>{notification.message}</p>
                <p className="text-xs text-blood-muted">{notification.time}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default BloodBankRecentNotifications