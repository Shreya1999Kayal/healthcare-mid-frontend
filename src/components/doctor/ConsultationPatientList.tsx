import StatusBadge from "./StatusBadge"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { ConsultationPatientListProps } from "../../types/interface/doctorInterface/DoctorConsultations.interface"

const ConsultationPatientList = ({ appointments, chambers, selectedId, onSelect }: ConsultationPatientListProps) => {
  return (
    <section className={doctorCardClass}>
      <h2 className="mb-4 text-lg font-bold text-doctor-navy">Today's patients</h2>

      {appointments.length === 0 ? (
        <p className="text-sm text-doctor-muted">No patients left for today.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {appointments.map((appointment) => {
            const active = appointment.id === selectedId

            return (
              <li key={appointment.id}>
                <button
                  type="button"
                  onClick={() => onSelect(appointment.id)}
                  aria-pressed={active}
                  className={`w-full rounded-xl border p-3 text-left transition-colors ${
                    active ? "border-doctor-primary bg-doctor-bg-soft" : "border-doctor-border bg-white hover:bg-doctor-bg"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-doctor-navy">{appointment.patient}</p>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <p className="mt-1 text-xs text-doctor-muted">
                    {appointment.time} · {getChamberName(chambers, appointment.chamberId)} · {appointment.mode}
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default ConsultationPatientList