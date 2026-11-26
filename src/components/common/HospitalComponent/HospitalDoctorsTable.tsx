import { Link } from "react-router-dom"
import type { DoctorDesignation } from "../../../types/type/public/Hospital.type"
import type { HospitalDoctorsTableProps } from "../../../types/interface/public/Hospital.interface"




const designationStyles: Record<DoctorDesignation, string> = {
  "Senior Doctor": "bg-medical-navy/10 text-medical-navy",
  Consultant: "bg-medical-bg-soft text-medical-primary-dark",
  "Junior Doctor": "bg-amber-50 text-amber-700",
}

const columns = ["Doctor", "Department", "Recognition", "Chamber days", "Chamber time"]

const HospitalDoctorsTable = ({ doctors }: HospitalDoctorsTableProps) => {
  if (doctors.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-medical-muted">
        Doctor details for this hospital will be added soon.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-medical-border bg-white shadow-sm shadow-medical-navy/5">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="bg-medical-bg-soft text-medical-navy">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-4 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="border-t border-medical-border">
              <td className="px-5 py-4 font-semibold text-medical-navy">
                {doctor.doctorId ? (
                  <Link
                    to={`/doctors/${doctor.doctorId}`}
                    className="text-medical-navy no-underline hover:text-medical-primary-dark"
                  >
                    {doctor.name}
                  </Link>
                ) : (
                  doctor.name
                )}
              </td>
              <td className="px-5 py-4 text-medical-muted">{doctor.department}</td>
              <td className="px-5 py-4">
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${designationStyles[doctor.designation]}`}
                >
                  {doctor.designation}
                </span>
              </td>
              <td className="px-5 py-4 text-medical-muted">{doctor.chamberDays}</td>
              <td className="whitespace-nowrap px-5 py-4 text-medical-muted">{doctor.chamberTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HospitalDoctorsTable