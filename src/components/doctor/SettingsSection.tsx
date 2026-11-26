import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { SettingsSectionProps } from "../../types/interface/doctorInterface/DoctorSettings.interface"

const SettingsSection = ({ title, description, children }: SettingsSectionProps) => {
  return (
    <section className={`${doctorCardClass} grid gap-5 lg:grid-cols-[16rem_1fr]`}>
      <div>
        <h2 className="text-lg font-bold text-doctor-navy">{title}</h2>
        <p className="text-sm text-doctor-muted">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  )
}

export default SettingsSection