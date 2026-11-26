import { queueStatusStyles } from "../../constants/doctorConstants/doctorQueue.constants"
import type { QueueStatusBadgeProps } from "../../types/interface/doctorInterface/DoctorQueue.interface"

const QueueStatusBadge = ({ status }: QueueStatusBadgeProps) => {
  const style = queueStatusStyles[status]

  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  )
}

export default QueueStatusBadge