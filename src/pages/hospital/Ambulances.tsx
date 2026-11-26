import { useState } from "react"
import { Ambulance, CircleCheck, Navigation, Plus, Search, Wrench } from "lucide-react"
import AmbulanceCard from "../../components/hospital/AmbulanceCard"
import AmbulanceForm from "../../components/hospital/AmbulanceForm"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { ambulanceFilters, hospitalAmbulanceList } from "../../constants/hospitalConstants/hospitalAmbulance.constants"
import { filterAmbulances, fromAmbulanceForm } from "../../services/helper/hospitalHelper/hospitalAmbulance.helper"
import type { AmbulanceFilter, AmbulanceFormValues, AmbulanceTrip, AmbulanceVehicle } from "../../types/type/hospitalType/HospitalAmbulance.type"

const Ambulances = () => {
  // Local copy (UI only, nothing is saved)
  const [ambulances, setAmbulances] = useState<AmbulanceVehicle[]>(hospitalAmbulanceList)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<AmbulanceVehicle | undefined>()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<AmbulanceFilter>("all")
  const [message, setMessage] = useState("")

  const shownAmbulances = filterAmbulances(ambulances, search, filter)
  const countByStatus = (status: AmbulanceVehicle["status"]) => ambulances.filter((item) => item.status === status).length

  // Changes one ambulance and shows a message
  const updateAmbulance = (ambulanceId: string, change: Partial<AmbulanceVehicle>, text: string) => {
    setAmbulances((prev) => prev.map((item) => (item.id === ambulanceId ? { ...item, ...change } : item)))
    setMessage(text)
  }

  const getVehicleNo = (ambulanceId: string) => ambulances.find((item) => item.id === ambulanceId)?.vehicleNo ?? ""

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (ambulance: AmbulanceVehicle) => {
    setEditing(ambulance)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveAmbulance = (values: AmbulanceFormValues) => {
    const saved = fromAmbulanceForm(values, editing)

    if (editing) {
      setAmbulances((prev) => prev.map((item) => (item.id === editing.id ? saved : item)))
      setMessage(`${saved.vehicleNo} updated.`)
    } else {
      setAmbulances((prev) => [...prev, saved])
      setMessage(`${saved.vehicleNo} added.`)
    }
    closeForm()
  }

  const deleteAmbulance = (ambulance: AmbulanceVehicle) => {
    if (!window.confirm(`Delete ambulance ${ambulance.vehicleNo}?`)) return
    setAmbulances((prev) => prev.filter((item) => item.id !== ambulance.id))
    setMessage(`${ambulance.vehicleNo} deleted.`)
  }

  const dispatchAmbulance = (ambulanceId: string, trip: AmbulanceTrip) =>
    updateAmbulance(ambulanceId, { status: "on-duty", trip }, `${getVehicleNo(ambulanceId)} sent to ${trip.pickup}.`)

  const completeTrip = (ambulanceId: string) =>
    updateAmbulance(ambulanceId, { status: "available", trip: undefined }, `${getVehicleNo(ambulanceId)} is back and available.`)

  const toggleMaintenance = (ambulanceId: string) => {
    const current = ambulances.find((item) => item.id === ambulanceId)
    if (!current) return

    if (current.status === "maintenance") {
      updateAmbulance(ambulanceId, { status: "available" }, `${current.vehicleNo} is back in service.`)
    } else {
      updateAmbulance(ambulanceId, { status: "maintenance" }, `${current.vehicleNo} sent to maintenance.`)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Ambulances</h1>
          <p className="text-sm text-hospital-muted">Vehicles, drivers and live status.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Add ambulance
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Total ambulances" value={ambulances.length} hint="In the fleet" icon={Ambulance} />
        <HospitalSummaryCard label="Available" value={countByStatus("available")} hint="Ready to go" icon={CircleCheck} />
        <HospitalSummaryCard label="On duty" value={countByStatus("on-duty")} hint="On a trip now" icon={Navigation} />
        <HospitalSummaryCard label="Maintenance" value={countByStatus("maintenance")} hint="Not in service" icon={Wrench} />
      </div>

      {formOpen && (
        <AmbulanceForm key={editing?.id ?? "new"} ambulance={editing} ambulances={ambulances} onSave={saveAmbulance} onCancel={closeForm} />
      )}

      <div className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vehicle number or driver"
            aria-label="Search ambulances"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {ambulanceFilters.map((option) => (
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

      {shownAmbulances.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No ambulances match your search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shownAmbulances.map((ambulance) => (
            <AmbulanceCard
              key={ambulance.id}
              ambulance={ambulance}
              onDispatch={dispatchAmbulance}
              onCompleteTrip={completeTrip}
              onToggleMaintenance={toggleMaintenance}
              onEdit={openEdit}
              onDelete={deleteAmbulance}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Ambulances