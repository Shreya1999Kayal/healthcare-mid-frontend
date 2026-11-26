import { Pencil, UserMinus } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { doctorAvailabilityOptions, doctorAvailabilityStyles } from "../../constants/hospitalConstants/hospitalDoctor.constants"
import { getDoctorInitials } from "../../services/helper/hospitalHelper/hospitalDoctor.helper"
import type { HospitalDoctorsTableProps } from "../../types/interface/hospitalInterface/HospitalDoctor.interface"
import type { DoctorAvailability } from "../../types/type/hospitalType/HospitalDoctor.type"

const HospitalDoctorsTable = ({ doctors, onEdit, onRemove, onAvailabilityChange }: HospitalDoctorsTableProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">Doctor</th>
              <th className="py-2 font-medium">Department</th>
              <th className="py-2 font-medium">Experience</th>
              <th className="py-2 font-medium">Fee</th>
              <th className="py-2 font-medium">Timings</th>
              <th className="py-2 font-medium">Availability</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const style = doctorAvailabilityStyles[doctor.availability]

              return (
                <tr key={doctor.id} className="border-b border-hospital-border/60 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hospital-bg-soft text-sm font-bold text-hospital-primary-dark">
                        {getDoctorInitials(doctor.name)}
                      </span>
                      <div>
                        <p className="font-semibold text-hospital-navy">{doctor.name}</p>
                        <p className="text-xs text-hospital-muted">
                          {doctor.doctorCode} · {doctor.qualification}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-hospital-navy">{doctor.department}</p>
                    <p className="text-xs text-hospital-muted">{doctor.speciality}</p>
                  </td>
                  <td className="py-3 text-hospital-navy">{doctor.experience} yrs</td>
                  <td className="py-3 font-semibold text-hospital-navy">₹{doctor.fee}</td>
                  <td className="py-3 text-xs text-hospital-muted">{doctor.timings}</td>
                  <td className="py-3">
                    <select
                      value={doctor.availability}
                      onChange={(e) => onAvailabilityChange(doctor.id, e.target.value as DoctorAvailability)}
                      aria-label={`Availability of ${doctor.name}`}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none ${style.className}`}
                    >
                      {doctorAvailabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {doctorAvailabilityStyles[option].label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(doctor)}
                        aria-label={`Edit ${doctor.name}`}
                        className="rounded-md border border-hospital-primary p-1.5 text-hospital-primary-dark hover:bg-hospital-bg-soft"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(doctor)}
                        aria-label={`Remove ${doctor.name}`}
                        className="rounded-md border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <UserMinus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default HospitalDoctorsTable