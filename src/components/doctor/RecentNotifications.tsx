import { Link, useParams } from "react-router-dom"
import type { RecentNotificationsProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"


const RecentNotifications = ({ notifications }: RecentNotificationsProps) => {
  const { id = "" } = useParams()
  return (
    <section className={doctorCardClass}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-doctor-navy">Latest notifications</h2>
        <Link to={doctorPath("notifications", id)} className="text-sm font-semibold text-doctor-primary-dark no-underline hover:underline">
          View all
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                notification.unread ? "bg-doctor-primary" : "bg-doctor-border"
              }`}
            />
            <div>
              <p className="text-sm text-doctor-navy">{notification.message}</p>
              <p className="text-xs text-doctor-muted">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentNotifications