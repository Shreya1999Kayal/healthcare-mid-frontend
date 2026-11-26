import { useState } from "react"
import { CircleCheck, Navigation, Pencil, Phone, Trash2, UserRound, Wrench } from "lucide-react"
import { ambulanceStatusStyles, hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { ambulanceTypeLabels } from "../../constants/hospitalConstants/hospitalAmbulance.constants"
import { formatIsoDate } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { getTimeNow, validateTrip } from "../../services/helper/hospitalHelper/hospitalAmbulance.helper"
import type { AmbulanceCardProps } from "../../types/interface/hospitalInterface/HospitalAmbulance.interface"
import type { TripFormErrors } from "../../types/type/hospitalType/HospitalAmbulance.type"

const AmbulanceCard = ({ ambulance, onDispatch, onCompleteTrip, onToggleMaintenance, onEdit, onDelete }: AmbulanceCardProps) => {
  const style = ambulanceStatusStyles[ambulance.status]
  const isOnDuty = ambulance.status === "on-duty"
  const isAvailable = ambulance.status === "available"

  // Small dispatch form inside the card
  const [dispatching, setDispatching] = useState(false)
  const [patient, setPatient] = useState("")
  const [pickup, setPickup] = useState("")
  const [errors, setErrors] = useState<TripFormErrors>({})

  const closeDispatch = () => {
    setDispatching(false)
    setPatient("")
    setPickup("")
    setErrors({})
  }

  const sendAmbulance = () => {
    const found = validateTrip(patient, pickup)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onDispatch(ambulance.id, { patient: patient.trim(), pickup: pickup.trim(), startedAt: getTimeNow() })
    closeDispatch()
  }

  return (
    <article className={`${hospitalCardClass} flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold tracking-wide text-hospital-navy">{ambulance.vehicleNo}</h3>
          <p className="text-sm text-hospital-muted">{ambulanceTypeLabels[ambulance.type]}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-hospital-navy">
        <li className="flex items-center gap-2">
          <UserRound size={16} className="shrink-0 text-hospital-primary-dark" /> {ambulance.driver}
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} className="shrink-0 text-hospital-primary-dark" /> {ambulance.driverPhone}
        </li>
        <li className="flex items-center gap-2">
          <Wrench size={16} className="shrink-0 text-hospital-primary-dark" /> Serviced on {formatIsoDate(ambulance.lastServiced)}
        </li>
      </ul>

      <div className="flex flex-wrap gap-2">
        {ambulance.equipment.map((item) => (
          <span key={item} className="rounded-full bg-hospital-bg-soft px-3 py-1 text-xs font-semibold text-hospital-primary-dark">
            {item}
          </span>
        ))}
      </div>

      {/* Current trip */}
      {isOnDuty && ambulance.trip && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-bold">On a trip since {ambulance.trip.startedAt}</p>
          <p>Patient: {ambulance.trip.patient}</p>
          <p>Pickup: {ambulance.trip.pickup}</p>
        </div>
      )}

      {/* Dispatch form */}
      {dispatching && (
        <div className="flex flex-col gap-2 rounded-xl bg-hospital-bg p-3">
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Patient name"
            aria-label="Patient name"
            className={`${hospitalFieldClass} w-full`}
          />
          {errors.patient && <span className="text-xs font-semibold text-red-600">{errors.patient}</span>}
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Pickup place"
            aria-label="Pickup place"
            className={`${hospitalFieldClass} w-full`}
          />
          {errors.pickup && <span className="text-xs font-semibold text-red-600">{errors.pickup}</span>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={sendAmbulance}
              className="flex-1 rounded-md bg-hospital-primary px-3 py-2 text-xs font-semibold text-white hover:bg-hospital-primary-dark"
            >
              Send ambulance
            </button>
            <button
              type="button"
              onClick={closeDispatch}
              className="rounded-md border border-hospital-border bg-white px-3 py-2 text-xs font-semibold text-hospital-navy hover:bg-hospital-bg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main action changes with the status */}
      {!dispatching && (
        <div className="flex gap-2">
          {isAvailable && (
            <button
              type="button"
              onClick={() => setDispatching(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-hospital-primary px-3 py-2 text-xs font-semibold text-white hover:bg-hospital-primary-dark"
            >
              <Navigation size={14} /> Dispatch
            </button>
          )}
          {isOnDuty && (
            <button
              type="button"
              onClick={() => onCompleteTrip(ambulance.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-hospital-primary px-3 py-2 text-xs font-semibold text-white hover:bg-hospital-primary-dark"
            >
              <CircleCheck size={14} /> Complete trip
            </button>
          )}
          {!isOnDuty && (
            <button
              type="button"
              onClick={() => onToggleMaintenance(ambulance.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-hospital-primary px-3 py-2 text-xs font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft"
            >
              <Wrench size={14} /> {isAvailable ? "Send to maintenance" : "Back in service"}
            </button>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 border-t border-hospital-border pt-4">
        <button
          type="button"
          onClick={() => onEdit(ambulance)}
          className="flex items-center gap-1.5 rounded-md border border-hospital-border px-3 py-1.5 text-xs font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(ambulance)}
          disabled={isOnDuty}
          title={isOnDuty ? "Complete the trip before deleting" : undefined}
          className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </article>
  )
}

export default AmbulanceCard