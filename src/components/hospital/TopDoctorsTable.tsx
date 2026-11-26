import { Star } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { TopDoctorsTableProps } from "../../types/interface/hospitalInterface/HospitalReport.interface"

const TopDoctorsTable = ({ doctors }: TopDoctorsTableProps) => {
  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-4 text-lg font-bold text-hospital-navy">Top doctors by patients</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">#</th>
              <th className="py-2 font-medium">Doctor</th>
              <th className="py-2 font-medium">Department</th>
              <th className="py-2 font-medium">Patients</th>
              <th className="py-2 font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.name} className="border-b border-hospital-border/60 last:border-0">
                <td className="py-3 font-bold text-hospital-primary-dark">{index + 1}</td>
                <td className="py-3 font-semibold text-hospital-navy">{doctor.name}</td>
                <td className="py-3 text-hospital-muted">{doctor.department}</td>
                <td className="py-3 font-semibold text-hospital-navy">{doctor.patients.toLocaleString("en-IN")}</td>
                <td className="py-3">
                  <span className="flex items-center gap-1 font-semibold text-hospital-navy">
                    <Star size={14} className="fill-amber-400 text-amber-400" /> {doctor.rating.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TopDoctorsTable