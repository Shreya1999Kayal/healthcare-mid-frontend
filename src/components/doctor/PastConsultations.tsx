import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { formatIsoDate, getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { PastConsultationsProps } from "../../types/interface/doctorInterface/DoctorConsultations.interface"

const columns = ["Date", "Patient", "Chamber", "Diagnosis", "Tests advised", "Follow-up"]

const PastConsultations = ({ consultations, chambers }: PastConsultationsProps) => {
  return (
    <section className={doctorCardClass}>
      <h2 className="mb-4 text-lg font-bold text-doctor-navy">Past consultations</h2>

      {consultations.length === 0 ? (
        <p className="text-sm text-doctor-muted">No consultations yet for this chamber.</p>
      ) : (
        <div className="overflow-x-auto">
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
              {consultations.map((consultation) => (
                <tr key={consultation.id} className="border-t border-doctor-border">
                  <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">{consultation.date}</td>
                  <td className="px-4 py-3 font-semibold text-doctor-navy">{consultation.patient}</td>
                  <td className="px-4 py-3 text-doctor-muted">{getChamberName(chambers, consultation.chamberId)}</td>
                  <td className="px-4 py-3 text-doctor-navy">{consultation.diagnosis}</td>
                  <td className="px-4 py-3 text-doctor-muted">{consultation.testsAdvised.join(", ") || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">
                    {consultation.followUpDate ? formatIsoDate(consultation.followUpDate) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default PastConsultations