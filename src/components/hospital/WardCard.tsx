import { Building2, IndianRupee, Minus, Pencil, Plus, Trash2, Wind } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"

import { getFreeBeds, getOccupancy, getWardAvailability, isCriticalCare } from "../../services/helper/hospitalHelper/hospitalBed.helper"
import type { WardCardProps } from "../../types/interface/hospitalInterface/HospitalBed.interface"
import { bedCategoryLabels, wardAvailabilityStyles } from "../../constants/hospitalConstants/hospitalBed.constants"

const barColors = {
  available: "bg-hospital-primary",
  low: "bg-amber-500",
  full: "bg-red-500",
}

const WardCard = ({ ward, onEdit, onDelete, onChangeOccupied }: WardCardProps) => {
  const free = getFreeBeds(ward)
  const percent = getOccupancy(ward.occupied, ward.total)
  const availability = getWardAvailability(ward)
  const style = wardAvailabilityStyles[availability]
  const hasPatients = ward.occupied > 0

  return (
    <article className={`${hospitalCardClass} flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-hospital-navy">{ward.name}</h3>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              isCriticalCare(ward.category) ? "bg-hospital-primary text-white" : "bg-hospital-bg-soft text-hospital-primary-dark"
            }`}
          >
            {bedCategoryLabels[ward.category]}
          </span>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-extrabold leading-none text-hospital-navy">
            {free}
            <span className="text-base font-semibold text-hospital-muted"> / {ward.total} free</span>
          </p>
          <p className="text-xs text-hospital-muted">{percent}% full</p>
        </div>
        <div className="mt-2 h-2 rounded-full bg-hospital-bg-soft">
          {/* width changes with data, so it uses inline style */}
          <div className={`h-2 rounded-full ${barColors[availability]}`} style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-hospital-navy">
        <li className="flex items-center gap-2">
          <Building2 size={16} className="shrink-0 text-hospital-primary-dark" /> {ward.floor}
        </li>
        <li className="flex items-center gap-2">
          <IndianRupee size={16} className="shrink-0 text-hospital-primary-dark" /> {ward.pricePerDay} per day
        </li>
        {ward.ventilators > 0 && (
          <li className="flex items-center gap-2">
            <Wind size={16} className="shrink-0 text-hospital-primary-dark" /> {ward.ventilators} ventilators
          </li>
        )}
      </ul>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChangeOccupied(ward.id, 1)}
          disabled={free === 0}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-hospital-primary px-3 py-2 text-xs font-semibold text-white hover:bg-hospital-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={14} /> Admit
        </button>
        <button
          type="button"
          onClick={() => onChangeOccupied(ward.id, -1)}
          disabled={!hasPatients}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-hospital-primary px-3 py-2 text-xs font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={14} /> Discharge
        </button>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-hospital-border pt-4">
        <button
          type="button"
          onClick={() => onEdit(ward)}
          className="flex items-center gap-1.5 rounded-md border border-hospital-border px-3 py-1.5 text-xs font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(ward)}
          disabled={hasPatients}
          title={hasPatients ? "Discharge all patients before deleting" : undefined}
          className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </article>
  )
}

export default WardCard