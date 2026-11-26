import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { SummaryCardProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"


const SummaryCard = ({ label, value, hint, icon: Icon }: SummaryCardProps) => {
  return (
    <article className={`${doctorCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-doctor-primary to-doctor-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-doctor-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-doctor-navy">{label}</p>
        <p className="text-xs text-doctor-muted">{hint}</p>
      </div>
    </article>
  )
}

export default SummaryCard