import { useState } from "react"
import { Ban, Mail, Search, UserPlus, UserRoundCheck, Users } from "lucide-react"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import StaffForm from "../../components/hospital/StaffForm"
import StaffTable from "../../components/hospital/StaffTable"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { ALL_ROLES, hospitalStaff, staffRoleLabels, staffRoleOptions } from "../../constants/hospitalConstants/hospitalStaff.constants"
import { filterStaff, fromStaffForm } from "../../services/helper/hospitalHelper/hospitalStaff.helper"
import type { HospitalStaff, StaffFormValues, StaffStatus } from "../../types/type/hospitalType/HospitalStaff.type"

const StaffPermissions = () => {
  // Local copy (UI only, nothing is saved)
  const [staff, setStaff] = useState<HospitalStaff[]>(hospitalStaff)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<HospitalStaff | undefined>()
  const [search, setSearch] = useState("")
  const [role, setRole] = useState(ALL_ROLES)
  const [message, setMessage] = useState("")

  const shownStaff = filterStaff(staff, search, role)
  const countByStatus = (status: StaffStatus) => staff.filter((member) => member.status === status).length

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (member: HospitalStaff) => {
    setEditing(member)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveStaff = (values: StaffFormValues) => {
    const saved = fromStaffForm(values, editing)

    if (editing) {
      setStaff((prev) => prev.map((member) => (member.id === editing.id ? saved : member)))
      setMessage(`Access updated for ${saved.name}.`)
    } else {
      setStaff((prev) => [...prev, saved])
      setMessage(`Invite sent to ${saved.email}.`)
    }
    closeForm()
  }

  const toggleStatus = (member: HospitalStaff) => {
    const next: StaffStatus = member.status === "active" ? "suspended" : "active"
    if (next === "suspended" && !window.confirm(`Suspend ${member.name}? They won't be able to log in.`)) return

    setStaff((prev) => prev.map((item) => (item.id === member.id ? { ...item, status: next } : item)))
    setMessage(next === "suspended" ? `${member.name} is suspended.` : `${member.name} is active again.`)
  }

  const resendInvite = (member: HospitalStaff) => setMessage(`Invite sent again to ${member.email}.`)

  const removeStaff = (member: HospitalStaff) => {
    if (!window.confirm(`Remove ${member.name}? They will lose all access.`)) return
    setStaff((prev) => prev.filter((item) => item.id !== member.id))
    setMessage(`${member.name} removed.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Staff and permissions</h1>
          <p className="text-sm text-hospital-muted">Staff accounts and what each one can access.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <UserPlus size={16} /> Invite staff
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Total staff" value={staff.length} hint="Including you" icon={Users} />
        <HospitalSummaryCard label="Active" value={countByStatus("active")} hint="Can log in" icon={UserRoundCheck} />
        <HospitalSummaryCard label="Invited" value={countByStatus("invited")} hint="Not joined yet" icon={Mail} />
        <HospitalSummaryCard label="Suspended" value={countByStatus("suspended")} hint="Can't log in" icon={Ban} />
      </div>

      {formOpen && <StaffForm key={editing?.id ?? "new"} member={editing} staff={staff} onSave={saveStaff} onCancel={closeForm} />}

      <div className={`${hospitalCardClass} flex flex-wrap items-center gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            aria-label="Search staff"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role" className={hospitalFieldClass}>
          <option value={ALL_ROLES}>All roles</option>
          {staffRoleOptions.map((option) => (
            <option key={option} value={option}>
              {staffRoleLabels[option]}
            </option>
          ))}
        </select>
      </div>

      {shownStaff.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No staff match your search.</p>
      ) : (
        <StaffTable
          staff={shownStaff}
          onEdit={openEdit}
          onToggleStatus={toggleStatus}
          onResendInvite={resendInvite}
          onRemove={removeStaff}
        />
      )}
    </div>
  )
}

export default StaffPermissions