import { useState } from "react"
import HospitalSwitch from "./HospitalSwitch"
import { notificationTypeStyles } from "../../constants/hospitalConstants/hospitalNotification.constants"
import { hospitalChannelLabels, hospitalNotificationTypeList } from "../../constants/hospitalConstants/hospitalSettings.constants"
import type { HospitalNotificationPreferencesFormProps } from "../../types/interface/hospitalInterface/HospitalSettings.interface"
import type { HospitalNotificationType } from "../../types/type/hospitalType/HospitalDashboard.type"
import type { HospitalNotificationChannel, HospitalNotificationPreferences } from "../../types/type/hospitalType/HospitalSettings.type"

const channels = Object.keys(hospitalChannelLabels) as HospitalNotificationChannel[]

const HospitalNotificationPreferencesForm = ({ preferences, onSave }: HospitalNotificationPreferencesFormProps) => {
  const [form, setForm] = useState<HospitalNotificationPreferences>(preferences)
  const [saved, setSaved] = useState(false)

  const toggleType = (type: HospitalNotificationType) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, types: { ...prev.types, [type]: !prev.types[type] } }))
  }

  const toggleChannel = (channel: HospitalNotificationChannel) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, channels: { ...prev.channels, [channel]: !prev.channels[channel] } }))
  }

  const save = () => {
    onSave(form)
    setSaved(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <ul className="divide-y divide-hospital-border rounded-xl border border-hospital-border">
        {hospitalNotificationTypeList.map((type) => {
          const { label, icon: Icon, className } = notificationTypeStyles[type]

          return (
            <li key={type} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="flex items-center gap-3 text-sm text-hospital-navy">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${className}`}>
                  <Icon size={16} />
                </span>
                {label}
              </span>
              <HospitalSwitch checked={form.types[type]} label={label} onChange={() => toggleType(type)} />
            </li>
          )
        })}
      </ul>

      {!form.types.emergency && (
        <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-700">Emergency alerts are off. You may miss incoming cases.</p>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-hospital-navy">Also send to</p>
        <div className="flex flex-wrap gap-6">
          {channels.map((channel) => (
            <div key={channel} className="flex items-center gap-3">
              <HospitalSwitch checked={form.channels[channel]} label={hospitalChannelLabels[channel]} onChange={() => toggleChannel(channel)} />
              <span className="text-sm text-hospital-navy">{hospitalChannelLabels[channel]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className="w-fit rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          Save preferences
        </button>
        {saved && <p className="text-sm font-semibold text-emerald-700">Saved.</p>}
      </div>
    </div>
  )
}

export default HospitalNotificationPreferencesForm