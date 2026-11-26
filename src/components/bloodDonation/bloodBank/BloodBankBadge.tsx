import type { BloodBankBadgeProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"

const BloodBankBadge = ({ style }: BloodBankBadgeProps) => {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
}

export default BloodBankBadge