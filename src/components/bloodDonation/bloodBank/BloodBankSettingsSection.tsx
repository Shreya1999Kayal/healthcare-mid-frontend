import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import type { BloodBankSettingsSectionProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankSettings.interface"

const BloodBankSettingsSection = ({ title, description, children }: BloodBankSettingsSectionProps) => {
  return (
    <section className={`${bloodBankCardClass} grid gap-5 lg:grid-cols-[16rem_1fr]`}>
      <div>
        <h2 className="text-lg font-bold text-blood-navy">{title}</h2>
        <p className="text-sm text-blood-muted">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  )
}

export default BloodBankSettingsSection