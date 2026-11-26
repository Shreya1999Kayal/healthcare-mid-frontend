import { SearchX } from "lucide-react"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { DoctorEmptyStateProps } from "../../types/interface/doctorInterface/DoctorAppointments.interface"

const DoctorEmptyState = ({ title, message, actionLabel, onAction }: DoctorEmptyStateProps) => {
  return (
    <div className={`${doctorCardClass} flex flex-col items-center py-12 text-center`}>
      <SearchX size={44} className="text-doctor-primary" />
      <p className="mt-3 text-lg font-bold text-doctor-navy">{title}</p>
      <p className="mt-1 text-sm text-doctor-muted">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default DoctorEmptyState