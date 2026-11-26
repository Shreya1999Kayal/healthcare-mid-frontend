import DoctorAvatar from "./DoctorAvatar"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { genderLabel } from "../../constants/doctorConstants/doctorPatients.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { PatientSummaryProps } from "../../types/interface/doctorInterface/DoctorConsultations.interface"

const PatientSummary = ({ patient, appointment, chambers, consultations }: PatientSummaryProps) => {
  const info = [
    { label: "Age", value: `${patient.age} yrs` },
    { label: "Gender", value: genderLabel[patient.gender] },
    { label: "Blood group", value: patient.bloodGroup },
    { label: "Phone", value: patient.phone },
  ]

  return (
    <section className={doctorCardClass}>
      <div className="flex flex-wrap items-center gap-4">
        <DoctorAvatar name={patient.name} image="" className="h-14 w-14" />
        <div>
          <h2 className="text-xl font-bold text-doctor-navy">{patient.name}</h2>
          <p className="text-sm text-doctor-muted">
            {appointment.reason} · {appointment.time} · {getChamberName(chambers, appointment.chamberId)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {info.map((item) => (
          <div key={item.label} className="rounded-xl bg-doctor-bg p-3">
            <p className="text-xs text-doctor-muted">{item.label}</p>
            <p className="text-sm font-semibold text-doctor-navy">{item.value}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-doctor-muted">Past visits</h3>
      {consultations.length === 0 ? (
        <p className="text-sm text-doctor-muted">First visit with you.</p>
      ) : (
        <ul className="divide-y divide-doctor-border">
          {consultations.map((consultation) => (
            <li key={consultation.id} className="py-2.5">
              <p className="text-sm font-semibold text-doctor-navy">
                {consultation.date} · {consultation.diagnosis}
              </p>
              <p className="text-xs text-doctor-muted">{consultation.symptoms}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PatientSummary