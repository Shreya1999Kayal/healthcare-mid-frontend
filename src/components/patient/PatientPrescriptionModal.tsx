import { Printer, X } from "lucide-react"
import { patientOutlineButtonClass, patientPrimaryButtonClass } from "../../constants/patientConstants/patientDashboard.constants"
import { formatPatientDate } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientPrescriptionModalProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

// Only the .print-area part is printed (rule in index.css)
const PatientPrescriptionModal = ({ prescription, onClose }: PatientPrescriptionModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex justify-end">
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-patient-muted hover:bg-patient-bg">
            <X size={20} />
          </button>
        </div>

        <div className="print-area flex flex-col gap-4">
          <div className="border-b border-patient-border pb-3">
            <h2 className="text-xl font-bold text-patient-navy">{prescription.doctor}</h2>
            <p className="text-sm text-patient-muted">
              {prescription.speciality} · {prescription.hospital}
            </p>
            <p className="text-sm text-patient-muted">Date: {formatPatientDate(prescription.date)}</p>
          </div>

          <p className="text-sm text-patient-navy">
            <span className="font-semibold">Diagnosis:</span> {prescription.diagnosis}
          </p>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-patient-border text-xs uppercase text-patient-muted">
                <th className="py-2">Medicine</th>
                <th className="py-2">Dose</th>
                <th className="py-2">When</th>
                <th className="py-2">Days</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((medicine) => (
                <tr key={medicine.name} className="border-b border-patient-border/60 last:border-0">
                  <td className="py-2 font-semibold text-patient-navy">{medicine.name}</td>
                  <td className="py-2 text-patient-navy">{medicine.dose}</td>
                  <td className="py-2 text-patient-navy">{medicine.timing}</td>
                  <td className="py-2 text-patient-navy">{medicine.days}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {prescription.advice && (
            <p className="rounded-md bg-patient-bg px-3 py-2 text-sm text-patient-navy">
              <span className="font-semibold">Advice:</span> {prescription.advice}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className={patientOutlineButtonClass}>
            Close
          </button>
          <button type="button" onClick={() => window.print()} className={patientPrimaryButtonClass}>
            <Printer size={16} /> Print
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientPrescriptionModal
