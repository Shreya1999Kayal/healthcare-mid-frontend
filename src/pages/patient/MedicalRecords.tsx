import { useState } from "react"
import { FileText, Upload } from "lucide-react"
import PatientRecordForm from "../../components/patient/PatientRecordForm"
import PatientStatusBadge from "../../components/patient/PatientStatusBadge"
import {
  patientCardClass,
  patientFieldClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { PATIENT_ALL, patientRecordTypeLabels, patientRecords } from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate } from "../../services/helper/patientHelper/patientDashboard.helper"
import { filterRecords, fromRecordValues } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientRecord, PatientRecordValues } from "../../types/type/patientType/PatientCare.type"

const MedicalRecords = () => {
  // Local copy (UI only, nothing is saved)
  const [records, setRecords] = useState<PatientRecord[]>(patientRecords)
  const [formOpen, setFormOpen] = useState(false)
  const [recordType, setRecordType] = useState(PATIENT_ALL)
  const [fromDate, setFromDate] = useState("")
  const [message, setMessage] = useState("")

  const shownRecords = filterRecords(records, recordType, fromDate)

  const save = (values: PatientRecordValues) => {
    setRecords((prev) => [fromRecordValues(values), ...prev])
    setFormOpen(false)
    setMessage(`"${values.title.trim()}" uploaded.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Medical records</h1>
          <p className="text-sm text-patient-muted">Your reports. Records added by doctors are read only.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true)
              setMessage("")
            }}
            className={patientPrimaryButtonClass}
          >
            <Upload size={16} /> Upload report
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {formOpen && <PatientRecordForm onSave={save} onCancel={() => setFormOpen(false)} />}

      <div className={`${patientCardClass} flex flex-wrap items-center gap-3`}>
        <select value={recordType} onChange={(e) => setRecordType(e.target.value)} aria-label="Filter by type" className={patientFieldClass}>
          <option value={PATIENT_ALL}>All types</option>
          {Object.entries(patientRecordTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-patient-navy">
          From
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className={patientFieldClass} />
        </label>
        {fromDate && (
          <button type="button" onClick={() => setFromDate("")} className="text-sm font-semibold text-patient-primary-dark">
            Clear date
          </button>
        )}
      </div>

      {shownRecords.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>No records here.</p>
      ) : (
        <section className={patientCardClass}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead>
                <tr className="border-b border-patient-border text-xs uppercase tracking-wide text-patient-muted">
                  <th className="py-2 pr-3 font-medium">Report</th>
                  <th className="py-2 pr-3 font-medium">Type</th>
                  <th className="py-2 pr-3 font-medium">Date</th>
                  <th className="py-2 pr-3 font-medium">Added by</th>
                  <th className="py-2 pr-3 font-medium">File</th>
                </tr>
              </thead>
              <tbody>
                {shownRecords.map((record) => (
                  <tr key={record.id} className="border-b border-patient-border/60 align-top last:border-0">
                    <td className="py-3 pr-3 font-semibold text-patient-navy">{record.title}</td>
                    <td className="py-3 pr-3 text-patient-navy">{patientRecordTypeLabels[record.recordType]}</td>
                    <td className="py-3 pr-3 text-patient-navy">{formatPatientDate(record.date)}</td>
                    <td className="py-3 pr-3">
                      {record.addedBy === "doctor" ? (
                        <PatientStatusBadge style={{ label: record.doctor, className: "bg-sky-50 text-sky-700" }} />
                      ) : (
                        <PatientStatusBadge style={{ label: "You", className: "bg-patient-bg-soft text-patient-primary-dark" }} />
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <span className="flex items-center gap-1.5 text-patient-navy">
                        <FileText size={16} className="text-patient-primary" /> {record.fileName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

export default MedicalRecords
