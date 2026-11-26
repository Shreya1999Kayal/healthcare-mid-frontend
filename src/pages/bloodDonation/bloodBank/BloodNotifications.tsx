import { useState } from "react"
import { CheckCheck } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodBankNotificationFilter } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"
import { countBloodBankNotifications, filterBloodBankNotifications } from "../../../services/helper/blood/bloodBankHelper/bloodBankNotification.helper"
import { bloodBankNotificationFilters } from "../../../constants/blood/bloodBankConstants/bloodBankNotification.constants"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import BloodBankNotificationItem from "../../../components/bloodDonation/bloodBank/BloodBankNotificationItem"
import BloodBankEmptyState from "../../../components/bloodDonation/bloodBank/BloodBankEmptyState"
import BloodBankFilterTabs from "../../../components/bloodDonation/bloodBank/BloodBankFilterTabs"



const BloodNotifications = () => {
  // Notifications live in BloodBankLayout, so the bell count stays in sync
  const { bank, notifications, onMarkRead, onMarkAllRead } = useOutletContext<BloodBankOutletContext>()
  const [filter, setFilter] = useState<BloodBankNotificationFilter>("all")

  const shownNotifications = filterBloodBankNotifications(notifications, filter)
  const unreadCount = countBloodBankNotifications(notifications, "unread")
  const tabs = bloodBankNotificationFilters.map((option) => ({ ...option, count: countBloodBankNotifications(notifications, option.value) }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Notifications</h1>
          <p className="text-sm text-blood-muted">
            {unreadCount > 0 ? `You have ${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}.` : "You're all caught up."}
          </p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 rounded-md bg-blood-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blood-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      <BloodBankFilterTabs options={tabs} value={filter} onChange={setFilter} />

      {shownNotifications.length === 0 ? (
        <BloodBankEmptyState title="No notifications here" message="Try another tab." />
      ) : (
        <ul className={`${bloodBankCardClass} divide-y divide-blood-border overflow-hidden p-0`}>
          {shownNotifications.map((notification) => (
            <BloodBankNotificationItem key={notification.id} notification={notification} bankId={bank.id} onMarkRead={onMarkRead} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default BloodNotifications