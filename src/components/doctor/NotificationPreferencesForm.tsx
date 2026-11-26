import { useState } from "react"
import AvailabilitySwitch from "./AvailabilitySwitch"
import { notificationTypeList, notificationTypeStyles } from "../../constants/doctorConstants/doctorNotifications.constants"
import { channelLabels } from "../../constants/doctorConstants/doctorSettings.constants"
import type { NotificationPreferencesFormProps } from "../../types/interface/doctorInterface/DoctorSettings.interface"
import type { DoctorNotificationType } from "../../types/type/doctorType/DoctorDashboard.type"
import type { NotificationChannel, NotificationPreferences } from "../../types/type/doctorType/DoctorSettings.type"

const channels = Object.keys(channelLabels) as NotificationChannel[]

const NotificationPreferencesForm = ({ preferences, onSave }: NotificationPreferencesFormProps) => {
  const [form, setForm] = useState<NotificationPreferences>(preferences)
  const [saved, setSaved] = useState(false)

  const toggleType = (type: DoctorNotificationType) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, types: { ...prev.types, [type]: !prev.types[type] } }))
  }

  const toggleChannel = (channel: NotificationChannel) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, channels: { ...prev.channels, [channel]: !prev.channels[channel] } }))
  }

  const save = () => {
    onSave(form)
    setSaved(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <ul className="divide-y divide-doctor-border rounded-xl border border-doctor-border">
        {notificationTypeList.map((type) => (
          <li key={type} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm text-doctor-navy">{notificationTypeStyles[type].label}</span>
            <AvailabilitySwitch checked={form.types[type]} label={notificationTypeStyles[type].label} onChange={() => toggleType(type)} />
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-2 text-sm font-medium text-doctor-navy">Also send to</p>
        <div className="flex flex-wrap gap-6">
          {channels.map((channel) => (
            <div key={channel} className="flex items-center gap-3">
              <AvailabilitySwitch checked={form.channels[channel]} label={channelLabels[channel]} onChange={() => toggleChannel(channel)} />
              <span className="text-sm text-doctor-navy">{channelLabels[channel]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className="w-fit rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          Save preferences
        </button>
        {saved && <p className="text-sm font-semibold text-emerald-700">Saved.</p>}
      </div>
    </div>
  )
}

export default NotificationPreferencesForm