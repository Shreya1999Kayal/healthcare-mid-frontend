import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus, Siren } from "lucide-react"
import PatientBloodRequestForm from "../../components/patient/PatientBloodRequestForm"
import PatientStatusBadge from "../../components/patient/PatientStatusBadge"
import {
  patientCardClass,
  patientDangerButtonClass,
  patientFieldClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { PATIENT_ALL, patientBloodRequestStatusStyles } from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientBloodRequest, PatientBloodRequestValues } from "../../types/type/patientType/PatientCare.type"

const BloodRequests = () => {
  const { bloodRequests, onRequestBlood, onCancelBloodRequest } = useOutletContext<PatientOutletContext>()
  const [formOpen, setFormOpen] = useState(false)
  const [status, setStatus] = useState(PATIENT_ALL)
  const [message, setMessage] = useState("")

  // Newest request first
  const shownRequests = bloodRequests
    .filter((request) => status === PATIENT_ALL || request.status === status)
    .sort((a, b) => b.requestedOn.localeCompare(a.requestedOn))

  const save = (values: PatientBloodRequestValues) => {
    onRequestBlood(values)
    setFormOpen(false)
    setMessage(`Request for ${values.units} units of ${values.bloodGroup} sent. Blood banks will reply soon.`)
  }

  const cancel = (request: PatientBloodRequest) => {
    if (!window.confirm(`Cancel your ${request.bloodGroup} blood request?`)) return
    onCancelBloodRequest(request.id)
    setMessage(`${request.bloodGroup} request cancelled.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Blood requests</h1>
          <p className="text-sm text-patient-muted">Ask blood banks for blood and track every request.</p>
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
            <Plus size={16} /> Request blood
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {formOpen && <PatientBloodRequestForm onSave={save} onCancel={() => setFormOpen(false)} />}

      <div className={`${patientCardClass} flex flex-wrap items-center gap-3`}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={patientFieldClass}>
          <option value={PATIENT_ALL}>All statuses</option>
          {Object.entries(patientBloodRequestStatusStyles).map(([value, style]) => (
            <option key={value} value={value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      {shownRequests.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>No blood requests here.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownRequests.map((request) => (
            <article
              key={request.id}
              className={`${patientCardClass} flex flex-col gap-3 ${request.emergency && request.status === "pending" ? "ring-2 ring-red-300" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-extrabold text-red-600">{request.bloodGroup}</p>
                  <p className="text-sm text-patient-muted">{request.units} units</p>
                </div>
                <PatientStatusBadge style={patientBloodRequestStatusStyles[request.status]} />
              </div>

              {request.emergency && (
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                  <Siren size={12} /> Emergency
                </span>
              )}

              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-patient-muted">Hospital</dt>
                  <dd className="font-semibold text-patient-navy">{request.hospital}</dd>
                </div>
                <div>
                  <dt className="text-xs text-patient-muted">Needed by</dt>
                  <dd className="font-semibold text-patient-navy">{formatPatientDate(request.neededBy)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-patient-muted">Blood bank</dt>
                  <dd className="font-semibold text-patient-navy">{request.bloodBank || "Not assigned yet"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-patient-muted">Requested on</dt>
                  <dd className="font-semibold text-patient-navy">{formatPatientDate(request.requestedOn)}</dd>
                </div>
              </dl>

              {request.note && <p className="text-sm italic text-patient-muted">"{request.note}"</p>}

              {request.status === "pending" && (
                <button type="button" onClick={() => cancel(request)} className={`${patientDangerButtonClass} self-start`}>
                  Cancel request
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default BloodRequests
