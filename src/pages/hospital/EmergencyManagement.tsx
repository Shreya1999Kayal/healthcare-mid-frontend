import { useState } from "react"
import { Ambulance, CircleCheck, Plus, Search, Siren, TriangleAlert } from "lucide-react"
import EmergencyCaseCard from "../../components/hospital/EmergencyCaseCard"
import EmergencyCaseForm from "../../components/hospital/EmergencyCaseForm"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { emergencyFilters, emergencyStatusStyles, hospitalEmergencyCases } from "../../constants/hospitalConstants/hospitalEmergency.constants"
import {
  filterEmergencyCases,
  fromEmergencyForm,
  isActiveEmergency,
  sortEmergencyCases,
} from "../../services/helper/hospitalHelper/hospitalEmergency.helper"
import type {
  EmergencyCase,
  EmergencyCaseFormValues,
  EmergencyFilter,
  EmergencyStatus,
} from "../../types/type/hospitalType/HospitalEmergency.type"

const EmergencyManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [cases, setCases] = useState<EmergencyCase[]>(hospitalEmergencyCases)
  const [accepting, setAccepting] = useState(true) // false = ambulances go to other hospitals
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState<EmergencyFilter>("active")
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")

  const shownCases = sortEmergencyCases(filterEmergencyCases(cases, filter, search))

  const activeCases = cases.filter((item) => isActiveEmergency(item.status))
  const criticalCases = activeCases.filter((item) => item.priority === "critical")
  const incomingCount = activeCases.filter((item) => item.status === "incoming").length
  const closedCount = cases.length - activeCases.length

  const saveCase = (values: EmergencyCaseFormValues) => {
    const newCase = fromEmergencyForm(values)
    setCases((prev) => [newCase, ...prev])
    setFormOpen(false)
    setFilter("active")
    setMessage(`Emergency case registered for ${newCase.patient}.`)
  }

  const changeStatus = (caseId: string, next: EmergencyStatus) => {
    const current = cases.find((item) => item.id === caseId)
    if (!current) return

    setCases((prev) => prev.map((item) => (item.id === caseId ? { ...item, status: next } : item)))
    setMessage(`${current.patient}: ${emergencyStatusStyles[next].label.toLowerCase()}.`)
  }

  const assignDoctor = (caseId: string, doctor: string) => {
    setCases((prev) => prev.map((item) => (item.id === caseId ? { ...item, assignedDoctor: doctor } : item)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Emergency</h1>
          <p className="text-sm text-hospital-muted">Incoming emergency cases and ambulance arrivals.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true)
              setMessage("")
            }}
            className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <Plus size={16} /> Register case
          </button>
        )}
      </div>

      {/* ER status switch */}
      <section
        className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-4 ${
          accepting ? "" : "border-red-300 bg-red-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${accepting ? "bg-emerald-600" : "bg-red-600"}`}
          >
            <Siren size={24} />
          </span>
          <div>
            <p className="text-lg font-bold text-hospital-navy">{accepting ? "Accepting patients" : "Diverting ambulances"}</p>
            <p className="text-sm text-hospital-muted">
              {accepting ? "Ambulances can bring patients here." : "The ER is full. New ambulances are sent to other hospitals."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setAccepting((prev) => !prev)
            setMessage(accepting ? "ER set to diverting." : "ER is accepting patients again.")
          }}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            accepting ? "border border-red-300 bg-white text-red-600 hover:bg-red-50" : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {accepting ? "Set to diverting" : "Start accepting"}
        </button>
      </section>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Active cases" value={activeCases.length} hint="In the ER now" icon={Siren} />
        <HospitalSummaryCard label="Critical" value={criticalCases.length} hint="Need care first" icon={TriangleAlert} />
        <HospitalSummaryCard label="Incoming" value={incomingCount} hint="Ambulances on the way" icon={Ambulance} />
        <HospitalSummaryCard label="Closed today" value={closedCount} hint="Admitted, discharged or moved" icon={CircleCheck} />
      </div>

      {criticalCases.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">
            <span className="font-bold">Critical: </span>
            {criticalCases.map((item) => item.patient).join(", ")}
          </p>
        </div>
      )}

      {formOpen && <EmergencyCaseForm onSave={saveCase} onCancel={() => setFormOpen(false)} />}

      <div className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient or what happened"
            aria-label="Search emergency cases"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <div className="flex gap-2">
          {emergencyFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                filter === option.value
                  ? "bg-hospital-primary text-white"
                  : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {shownCases.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No emergency cases here.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shownCases.map((item) => (
            <EmergencyCaseCard key={item.id} emergencyCase={item} onStatusChange={changeStatus} onAssignDoctor={assignDoctor} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EmergencyManagement