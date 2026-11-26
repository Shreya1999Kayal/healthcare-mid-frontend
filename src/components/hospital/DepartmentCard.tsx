import { Building2, Clock, Pencil, Phone, Power, Trash2, UserRound, Users } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { departmentStatusStyles } from "../../constants/hospitalConstants/hospitalDepartment.constants"
import type { DepartmentCardProps } from "../../types/interface/hospitalInterface/HospitalDepartment.interface"

const DepartmentCard = ({ department, onEdit, onDelete, onToggleStatus }: DepartmentCardProps) => {
  const style = departmentStatusStyles[department.status]
  const isOpen = department.status === "open"

  const details = [
    { icon: UserRound, value: `Head: ${department.head}` },
    { icon: Users, value: `${department.doctors} ${department.doctors === 1 ? "doctor" : "doctors"}` },
    { icon: Building2, value: department.floor },
    { icon: Clock, value: department.opdTimings },
    { icon: Phone, value: department.phone || "Main hospital number" },
  ]

  return (
    <article className={`${hospitalCardClass} flex flex-col gap-4 ${isOpen ? "" : "opacity-75"}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-hospital-navy">{department.name}</h3>
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

      {department.services.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {department.services.map((service) => (
            <span key={service} className="rounded-full bg-hospital-bg-soft px-3 py-1 text-xs font-semibold text-hospital-primary-dark">
              {service}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 border-t border-hospital-border pt-4">
        <button
          type="button"
          onClick={() => onEdit(department)}
          className="flex items-center gap-1.5 rounded-md border border-hospital-primary px-3 py-1.5 text-xs font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          type="button"
          onClick={() => onToggleStatus(department.id)}
          className="flex items-center gap-1.5 rounded-md border border-hospital-border px-3 py-1.5 text-xs font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          <Power size={14} /> {isOpen ? "Close" : "Open"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(department)}
          className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </article>
  )
}

export default DepartmentCard