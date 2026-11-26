import { genderLabel } from "../../constants/doctorConstants/doctorPatients.constants"
import { getLastVisit, getPatientChamberNames } from "../../services/helper/doctorHelper/doctorPatients.helper"
import type { PatientsTableProps } from "../../types/interface/doctorInterface/DoctorPatients.interface"

const columns = ["Patient", "Age", "Gender", "Blood group", "Last visit", "Chamber", ""]

const PatientsTable = ({ patients, appointments, chambers, onView }: PatientsTableProps) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-doctor-border bg-white shadow-sm shadow-doctor-navy/10">
      <table className="w-full min-w-[48rem] text-left text-sm">
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
          {patients.map((patient) => (
            <tr key={patient.id} className="border-t border-doctor-border">
              <td className="px-4 py-3">
                <p className="font-semibold text-doctor-navy">{patient.name}</p>
                <p className="text-xs text-doctor-muted">{patient.phone}</p>
              </td>
              <td className="px-4 py-3 text-doctor-muted">{patient.age}</td>
              <td className="px-4 py-3 text-doctor-muted">{genderLabel[patient.gender]}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">{patient.bloodGroup}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">{getLastVisit(patient)}</td>
              <td className="px-4 py-3 text-doctor-muted">
                {getPatientChamberNames(patient.id, appointments, chambers).join(", ")}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onView(patient.id)}
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

export default PatientsTable