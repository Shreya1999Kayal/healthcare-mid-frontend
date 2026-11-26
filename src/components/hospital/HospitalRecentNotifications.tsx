import { Link } from "react-router-dom"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalRecentNotificationsProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const HospitalRecentNotifications = ({ notifications, hospitalId }: HospitalRecentNotificationsProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-hospital-navy">Recent notifications</h2>
        <Link to={hospitalPath("notifications", hospitalId)} className="text-xs font-semibold text-hospital-primary no-underline">
          View all
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <Link
              to={hospitalPath(notification.link, hospitalId)}
              className="flex items-start gap-3 rounded-lg p-2 no-underline hover:bg-hospital-bg"
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.unread ? "bg-hospital-primary" : "bg-hospital-border"}`}
              />
              <div>
                <p className={`text-sm text-hospital-navy ${notification.unread ? "font-semibold" : ""}`}>{notification.message}</p>
                <p className="text-xs text-hospital-muted">{notification.time}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HospitalRecentNotifications