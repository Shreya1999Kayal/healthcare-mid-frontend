import { appointmentStatusStyles } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { StatusBadgeProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"


const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = appointmentStatusStyles[status]

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  )
}

export default StatusBadge