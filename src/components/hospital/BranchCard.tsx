import { BedDouble, MapPin, Pencil, Phone, Power, Siren, Trash2, UserRound } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { branchStatusStyles } from "../../constants/hospitalConstants/hospitalBranch.constants"
import type { BranchCardProps } from "../../types/interface/hospitalInterface/HospitalBranch.interface"

const BranchCard = ({ branch, onEdit, onDelete, onToggleStatus }: BranchCardProps) => {
  const style = branchStatusStyles[branch.status]
  const isActive = branch.status === "active"

  const details = [
    { icon: MapPin, value: `${branch.address}, ${branch.city} ${branch.pincode}` },
    { icon: Phone, value: branch.phone },
    { icon: UserRound, value: `Manager: ${branch.manager}` },
    { icon: BedDouble, value: `${branch.beds} beds` },
    { icon: Siren, value: branch.emergency24x7 ? "Emergency open 24x7" : "No 24x7 emergency" },
  ]

  return (
    <article className={`${hospitalCardClass} flex flex-col gap-4 ${isActive ? "" : "opacity-75"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-hospital-navy">{branch.name}</h3>
            {branch.isMain && (
              <span className="rounded-full bg-hospital-primary px-2 py-0.5 text-[11px] font-semibold text-white">Main</span>
            )}
          </div>
          <p className="text-sm text-hospital-muted">{branch.city}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {details.map(({ icon: Icon, value }) => (
          <li key={value} className="flex items-start gap-2 text-sm text-hospital-navy">
            <Icon size={16} className="mt-0.5 shrink-0 text-hospital-primary-dark" />
            {value}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-hospital-border pt-4">
        <button
          type="button"
          onClick={() => onEdit(branch)}
          className="flex items-center gap-1.5 rounded-md border border-hospital-primary px-3 py-1.5 text-xs font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft"
        >
          <Pencil size={14} /> Edit
        </button>

        {!branch.isMain && (
          <>
            <button
              type="button"
              onClick={() => onToggleStatus(branch.id)}
              className="flex items-center gap-1.5 rounded-md border border-hospital-border px-3 py-1.5 text-xs font-semibold text-hospital-navy hover:bg-hospital-bg"
            >
              <Power size={14} /> {isActive ? "Turn off" : "Turn on"}
            </button>
            <button
              type="button"
              onClick={() => onDelete(branch)}
              className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} /> Delete
            </button>
          </>
        )}
      </div>
    </article>
  )
}

export default BranchCard