import { patientCardClass } from "../../constants/patientConstants/patientDashboard.constants"
import type { PatientSummaryCardProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

const PatientSummaryCard = ({ label, value, hint, icon: Icon }: PatientSummaryCardProps) => {
  return (
    <article className={`${patientCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-patient-primary to-patient-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-patient-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-patient-navy">{label}</p>
        <p className="text-xs text-patient-muted">{hint}</p>
      </div>
    </article>
  )
}

export default PatientSummaryCard
