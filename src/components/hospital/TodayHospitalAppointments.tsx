import { hospitalAppointmentStatusStyles, hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { TodayHospitalAppointmentsProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const TodayHospitalAppointments = ({ appointments }: TodayHospitalAppointmentsProps) => {
  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-4 text-lg font-bold text-hospital-navy">Today's appointments</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-130 text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">Time</th>
              <th className="py-2 font-medium">Patient</th>
              <th className="py-2 font-medium">Doctor</th>
              <th className="py-2 font-medium">Department</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const style = hospitalAppointmentStatusStyles[appointment.status]

              return (
                <tr key={appointment.id} className="border-b border-hospital-border/60 last:border-0">
                  <td className="py-3 font-semibold text-hospital-navy">{appointment.time}</td>
                  <td className="py-3 text-hospital-navy">{appointment.patient}</td>
                  <td className="py-3 text-hospital-muted">{appointment.doctor}</td>
                  <td className="py-3 text-hospital-muted">{appointment.department}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
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

export default TodayHospitalAppointments