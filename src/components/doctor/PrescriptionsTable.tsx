import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { PrescriptionsTableProps } from "../../types/interface/doctorInterface/DoctorPrescriptions.interface"

const columns = ["Date", "Patient", "Chamber", "Diagnosis", "Medicines", ""]

const PrescriptionsTable = ({ prescriptions, chambers, onView }: PrescriptionsTableProps) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-doctor-border bg-white shadow-sm shadow-doctor-navy/10">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-doctor-bg-soft text-doctor-navy">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id} className="border-t border-doctor-border">
              <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">{prescription.date}</td>
              <td className="px-4 py-3">
                <p className="font-semibold text-doctor-navy">{prescription.patient}</p>
                <p className="text-xs text-doctor-muted">
                  {prescription.age} yrs, {prescription.gender}
                </p>
              </td>
              <td className="px-4 py-3 text-doctor-muted">{getChamberName(chambers, prescription.chamberId)}</td>
              <td className="px-4 py-3 text-doctor-navy">{prescription.diagnosis}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-doctor-bg-soft px-2.5 py-1 text-xs font-semibold text-doctor-primary-dark">
                  {prescription.medicines.length} {prescription.medicines.length === 1 ? "medicine" : "medicines"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onView(prescription.id)}
                  className="rounded-md border border-doctor-primary px-3 py-1.5 text-xs font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrescriptionsTable