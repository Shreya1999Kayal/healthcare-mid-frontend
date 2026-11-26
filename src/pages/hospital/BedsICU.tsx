import { useState } from "react"
import { Activity, BedDouble, CircleAlert, Gauge, Plus } from "lucide-react"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import WardCard from "../../components/hospital/WardCard"
import WardForm from "../../components/hospital/WardForm"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalWards, wardFilters } from "../../constants/hospitalConstants/hospitalBed.constants"
import {
  filterWards,
  fromWardForm,
  getFreeBeds,
  getOccupancy,
  getWardAvailability,
  isCriticalCare,
} from "../../services/helper/hospitalHelper/hospitalBed.helper"
import type { HospitalWard, WardFilter, WardFormValues } from "../../types/type/hospitalType/HospitalBed.type"

const BedsICU = () => {
  // Local copy (UI only, nothing is saved)
  const [wards, setWards] = useState<HospitalWard[]>(hospitalWards)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<HospitalWard | undefined>()
  const [filter, setFilter] = useState<WardFilter>("all")
  const [message, setMessage] = useState("")

  const shownWards = filterWards(wards, filter)

  const totalBeds = wards.reduce((sum, ward) => sum + ward.total, 0)
  const occupiedBeds = wards.reduce((sum, ward) => sum + ward.occupied, 0)
  const criticalWards = wards.filter((ward) => isCriticalCare(ward.category))
  const criticalFree = criticalWards.reduce((sum, ward) => sum + getFreeBeds(ward), 0)
  const criticalTotal = criticalWards.reduce((sum, ward) => sum + ward.total, 0)

  // Wards that need attention
  const fullWards = wards.filter((ward) => getWardAvailability(ward) === "full")
  const lowWards = wards.filter((ward) => getWardAvailability(ward) === "low")

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (ward: HospitalWard) => {
    setEditing(ward)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveWard = (values: WardFormValues) => {
    if (editing) {
      setWards((prev) => prev.map((ward) => (ward.id === editing.id ? fromWardForm(values, ward) : ward)))
      setMessage(`${values.name} updated.`)
    } else {
      setWards((prev) => [...prev, fromWardForm(values)])
      setMessage(`${values.name} added.`)
    }
    closeForm()
  }

  const deleteWard = (ward: HospitalWard) => {
    if (!window.confirm(`Delete ${ward.name}?`)) return
    setWards((prev) => prev.filter((item) => item.id !== ward.id))
    setMessage(`${ward.name} deleted.`)
  }

  // +1 admit, -1 discharge (stays between 0 and total)
  const changeOccupied = (wardId: string, change: number) => {
    setWards((prev) =>
      prev.map((ward) => {
        if (ward.id !== wardId) return ward
        const occupied = Math.min(ward.total, Math.max(0, ward.occupied + change))
        return { ...ward, occupied }
      }),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Beds and ICU</h1>
          <p className="text-sm text-hospital-muted">Bed types, total count and live availability.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Add ward
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Total beds" value={totalBeds} hint={`${wards.length} wards`} icon={BedDouble} />
        <HospitalSummaryCard label="Free beds" value={totalBeds - occupiedBeds} hint="Ready for patients" icon={BedDouble} />
        <HospitalSummaryCard label="Occupancy" value={`${getOccupancy(occupiedBeds, totalBeds)}%`} hint="All wards" icon={Gauge} />
        <HospitalSummaryCard label="ICU / NICU free" value={`${criticalFree}/${criticalTotal}`} hint="Critical care beds" icon={Activity} />
      </div>

      {(fullWards.length > 0 || lowWards.length > 0) && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-amber-700" />
          <div className="text-sm text-amber-800">
            {fullWards.length > 0 && (
              <p>
                <span className="font-bold">Full:</span> {fullWards.map((ward) => ward.name).join(", ")}
              </p>
            )}
            {lowWards.length > 0 && (
              <p>
                <span className="font-bold">Almost full:</span> {lowWards.map((ward) => ward.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {formOpen && <WardForm key={editing?.id ?? "new"} ward={editing} onSave={saveWard} onCancel={closeForm} />}

      <div className={`${hospitalCardClass} flex flex-wrap gap-2`}>
        {wardFilters.map((option) => (
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

      {shownWards.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No wards of this type yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shownWards.map((ward) => (
            <WardCard key={ward.id} ward={ward} onEdit={openEdit} onDelete={deleteWard} onChangeOccupied={changeOccupied} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BedsICU