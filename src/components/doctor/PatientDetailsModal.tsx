import { useEffect, useState } from "react"
import { FileText, X } from "lucide-react"
import DoctorAvatar from "./DoctorAvatar"
import DoctorTabs from "./DoctorTabs"
import { genderLabel, patientDetailTabs } from "../../constants/doctorConstants/doctorPatients.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getPatientAppointments } from "../../services/helper/doctorHelper/doctorPatients.helper"
import type { PatientDetailsModalProps } from "../../types/interface/doctorInterface/DoctorPatients.interface"
import type { PatientDetailTab } from "../../types/type/doctorType/DoctorPatients.type"

const emptyText: Record<PatientDetailTab, string> = {
  visits: "No completed visits yet.",
  prescriptions: "No prescriptions written yet.",
  documents: "No documents uploaded.",
}

const PatientDetailsModal = ({ patient, appointments, chambers, onClose }: PatientDetailsModalProps) => {
  const [tab, setTab] = useState<PatientDetailTab>("visits")
  const patientAppointments = getPatientAppointments(patient.id, appointments)
  const upcoming = patientAppointments.filter((appointment) => appointment.day === "upcoming").length
  const tabs = patientDetailTabs.map((option) => ({ ...option, count: patient[option.id].length }))

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const info = [
    { label: "Age", value: `${patient.age} yrs` },
    { label: "Gender", value: genderLabel[patient.gender] },
    { label: "Blood group", value: patient.bloodGroup },
    { label: "Appointments", value: `${patientAppointments.length} (${upcoming} upcoming)` },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-doctor-navy/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${patient.name} details`}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <DoctorAvatar name={patient.name} image="" className="h-14 w-14" />
            <div>
              <h3 className="text-xl font-bold text-doctor-navy">{patient.name}</h3>
              <p className="text-sm text-doctor-muted">{patient.phone}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-doctor-muted hover:bg-doctor-bg">
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {info.map((item) => (
            <div key={item.label} className="rounded-xl bg-doctor-bg p-3">
              <p className="text-xs text-doctor-muted">{item.label}</p>
              <p className="text-sm font-semibold text-doctor-navy">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <DoctorTabs options={tabs} value={tab} onChange={setTab} />
        </div>

        <div className="mt-4">
          {patient[tab].length === 0 && <p className="text-sm text-doctor-muted">{emptyText[tab]}</p>}

          {tab === "visits" && (
            <ul className="divide-y divide-doctor-border">
              {patient.visits.map((visit) => (
                <li key={visit.id} className="py-3">
                  <p className="text-sm font-semibold text-doctor-navy">
                    {visit.date} · {getChamberName(chambers, visit.chamberId)}
                  </p>
                  <p className="text-xs text-doctor-muted">
                    {visit.reason} · Diagnosis: {visit.diagnosis}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {tab === "prescriptions" && (
            <ul className="divide-y divide-doctor-border">
              {patient.prescriptions.map((prescription) => (
                <li key={prescription.id} className="py-3">
                  <p className="text-sm font-semibold text-doctor-navy">{prescription.date}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {prescription.medicines.map((medicine) => (
                      <span key={medicine} className="rounded-full bg-doctor-bg-soft px-3 py-1 text-xs font-medium text-doctor-primary-dark">
                        {medicine}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "documents" && (
            <ul className="flex flex-col gap-2">
              {patient.documents.map((document) => (
                <li key={document.id} className="flex items-center gap-3 rounded-xl border border-doctor-border p-3">
                  <FileText size={20} className="shrink-0 text-doctor-primary-dark" />
                  <div>
                    <p className="text-sm font-semibold text-doctor-navy">{document.name}</p>
                    <p className="text-xs text-doctor-muted">
                      {document.kind} · {document.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDetailsModal