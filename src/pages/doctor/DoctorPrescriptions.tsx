import { useState } from "react"
import { useOutletContext, useSearchParams } from "react-router-dom"
import { Plus, Search } from "lucide-react"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import PrescriptionForm from "../../components/doctor/PrescriptionForm"
import PrescriptionsTable from "../../components/doctor/PrescriptionsTable"
import PrescriptionView from "../../components/doctor/PrescriptionView"
import { ALL_CHAMBERS, doctorAppointments, doctorChambers, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPatients } from "../../constants/doctorConstants/doctorPatients.constants"
import { doctorPrescriptions } from "../../constants/doctorConstants/doctorPrescriptions.constants"
import { filterByChamber } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getVisiblePatients } from "../../services/helper/doctorHelper/doctorPatients.helper"
import { searchPrescriptions } from "../../services/helper/doctorHelper/doctorPrescriptions.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { DoctorPrescription } from "../../types/type/doctorType/DoctorPrescriptions.type"

// Access rule: prescriptions only for patients who have an appointment with this doctor
const allowedPatients = getVisiblePatients(doctorPatients, doctorAppointments, ALL_CHAMBERS, "")

const DoctorPrescriptions = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()
  // ?patient=p3 opens the form for that patient (used by "Write prescription")
  const [searchParams, setSearchParams] = useSearchParams()
  const presetParam = searchParams.get("patient") ?? ""
  const presetPatient = allowedPatients.some((patient) => patient.id === presetParam) ? presetParam : ""

  const [prescriptions, setPrescriptions] = useState<DoctorPrescription[]>(doctorPrescriptions)
  const [showForm, setShowForm] = useState(presetPatient !== "")
  const [viewId, setViewId] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [message, setMessage] = useState("")

  const visiblePrescriptions = searchPrescriptions(filterByChamber(prescriptions, chamberId), query)
  const viewing = prescriptions.find((prescription) => prescription.id === viewId)

  const closeForm = () => {
    setShowForm(false)
    if (presetParam) setSearchParams({}, { replace: true })
  }

  const savePrescription = (prescription: DoctorPrescription) => {
    setPrescriptions((prev) => [prescription, ...prev])
    closeForm()
    setMessage(`Prescription saved for ${prescription.patient}.`)
    setViewId(prescription.id) // open it so it can be printed straight away
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Prescriptions</h1>
          <p className="text-sm text-doctor-muted" aria-live="polite">
            {visiblePrescriptions.length} {visiblePrescriptions.length === 1 ? "prescription" : "prescriptions"}
          </p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={() => {
              setMessage("")
              setShowForm(true)
            }}
            className="flex items-center gap-2 rounded-md bg-doctor-primary px-4 py-2 text-sm font-semibold text-white hover:bg-doctor-primary-dark"
          >
            <Plus size={16} /> New prescription
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {showForm && (
        <PrescriptionForm
          key={presetPatient}
          patients={allowedPatients}
          chambers={doctorChambers}
          appointments={doctorAppointments}
          initialPatientId={presetPatient}
          onSave={savePrescription}
          onCancel={closeForm}
        />
      )}

      <label className="relative w-full sm:w-72">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-doctor-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search patient name"
          aria-label="Search patient name"
          className={`${doctorFieldClass} w-full pl-9`}
        />
      </label>

      {visiblePrescriptions.length > 0 ? (
        <PrescriptionsTable prescriptions={visiblePrescriptions} chambers={doctorChambers} onView={setViewId} />
      ) : (
        <DoctorEmptyState
          title="No prescriptions found"
          message="Try another name or choose All chambers."
          actionLabel={query ? "Clear search" : undefined}
          onAction={() => setQuery("")}
        />
      )}

      {viewing && <PrescriptionView prescription={viewing} chambers={doctorChambers} onClose={() => setViewId(null)} />}
    </div>
  )
}

export default DoctorPrescriptions