import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { HospitalSettingsSectionProps } from "../../types/interface/hospitalInterface/HospitalSettings.interface"

const HospitalSettingsSection = ({ title, description, children }: HospitalSettingsSectionProps) => {
  return (
    <section className={`${hospitalCardClass} grid gap-5 lg:grid-cols-[16rem_1fr]`}>
      <div>
        <h2 className="text-lg font-bold text-hospital-navy">{title}</h2>
        <p className="text-sm text-hospital-muted">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  )
}

export default HospitalSettingsSection