import type { PatientStatusBadgeProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

const PatientStatusBadge = ({ style }: PatientStatusBadgeProps) => {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  )
}

export default PatientStatusBadge
