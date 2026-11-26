import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Lock, Search } from "lucide-react"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import PatientDetailsModal from "../../components/doctor/PatientDetailsModal"
import PatientsTable from "../../components/doctor/PatientsTable"
import { doctorAppointments, doctorChambers, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPatients } from "../../constants/doctorConstants/doctorPatients.constants"
import { getVisiblePatients } from "../../services/helper/doctorHelper/doctorPatients.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"

const DoctorPatients = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const patients = getVisiblePatients(doctorPatients, doctorAppointments, chamberId, query)
  const selectedPatient = doctorPatients.find((patient) => patient.id === selectedId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Patients</h1>
          <p className="text-sm text-doctor-muted" aria-live="polite">
            {patients.length} {patients.length === 1 ? "patient" : "patients"}
          </p>
        </div>

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
      </div>

      {/* Access rule from the scope */}
      <div className="flex items-start gap-3 rounded-xl border border-doctor-border bg-doctor-bg-soft/60 p-4 text-sm text-doctor-navy">
        <Lock size={18} className="mt-0.5 shrink-0 text-doctor-primary-dark" />
        <p>You can see records only for patients who have booked an appointment with you. Other patients' records stay private.</p>
      </div>

      {patients.length > 0 ? (
        <PatientsTable patients={patients} appointments={doctorAppointments} chambers={doctorChambers} onView={setSelectedId} />
      ) : (
        <DoctorEmptyState
          title="No patients found"
          message="Try another name or choose All chambers."
          actionLabel={query ? "Clear search" : undefined}
          onAction={() => setQuery("")}
        />
      )}

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          appointments={doctorAppointments}
          chambers={doctorChambers}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}

export default DoctorPatients