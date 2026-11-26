import { useEffect } from "react"
import { Printer, X } from "lucide-react"
import { doctorProfile } from "../../constants/doctorConstants/doctorDashboard.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { PrescriptionViewProps } from "../../types/interface/doctorInterface/DoctorPrescriptions.interface"

const columns = ["#", "Medicine", "Dosage", "Frequency", "Duration", "Instructions"]

const PrescriptionView = ({ prescription, chambers, onClose }: PrescriptionViewProps) => {
  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-doctor-navy/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Prescription for ${prescription.patient}`}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex justify-end gap-2 border-b border-doctor-border p-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-md bg-doctor-primary px-4 py-2 text-sm font-semibold text-white hover:bg-doctor-primary-dark"
          >
            <Printer size={16} /> Print
          </button>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-doctor-muted hover:bg-doctor-bg">
            <X size={18} />
          </button>
        </div>

        {/* Only this part is printed (see index.css) */}
        <div className="print-area bg-white p-8 text-doctor-navy">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-doctor-primary pb-4">
            <div>
              <p className="text-2xl font-extrabold">{doctorProfile.name}</p>
              <p className="text-sm text-doctor-muted">{doctorProfile.speciality}</p>
              <p className="text-xs text-doctor-muted">Reg. no. {doctorProfile.registrationNo}</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">{getChamberName(chambers, prescription.chamberId)}</p>
              <p className="text-doctor-muted">{prescription.date}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            <p>
              <span className="text-doctor-muted">Patient: </span>
              <span className="font-semibold">{prescription.patient}</span>
            </p>
            <p>
              <span className="text-doctor-muted">Age / Gender: </span>
              <span className="font-semibold">
                {prescription.age} yrs / {prescription.gender}
              </span>
            </p>
            <p>
              <span className="text-doctor-muted">Diagnosis: </span>
              <span className="font-semibold">{prescription.diagnosis}</span>
            </p>
          </div>

          <p className="mt-6 text-3xl font-bold text-doctor-primary-dark">℞</p>
          <table className="mt-2 w-full text-left text-sm">
            <thead className="bg-doctor-bg-soft">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-3 py-2 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((medicine, index) => (
                <tr key={medicine.id} className="border-t border-doctor-border">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2 font-semibold">{medicine.name}</td>
                  <td className="px-3 py-2">{medicine.dosage}</td>
                  <td className="px-3 py-2">{medicine.frequency}</td>
                  <td className="px-3 py-2">{medicine.duration}</td>
                  <td className="px-3 py-2">{medicine.instructions || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {prescription.advice && (
            <div className="mt-6">
              <p className="text-sm font-bold">Advice</p>
              <p className="text-sm text-doctor-muted">{prescription.advice}</p>
            </div>
          )}

          <div className="mt-12 flex justify-end">
            <div className="w-48 border-t border-doctor-navy pt-1 text-center text-xs">{doctorProfile.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionView