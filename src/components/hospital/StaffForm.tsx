import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  emptyStaffForm,
  roleDefaultPermissions,
  staffPermissionOptions,
  staffRoleLabels,
  staffRoleOptions,
} from "../../constants/hospitalConstants/hospitalStaff.constants"
import { toStaffForm, validateStaff } from "../../services/helper/hospitalHelper/hospitalStaff.helper"
import type { StaffFormProps } from "../../types/interface/hospitalInterface/HospitalStaff.interface"
import type { StaffFieldName, StaffFormErrors, StaffFormValues, StaffRole } from "../../types/type/hospitalType/HospitalStaff.type"

const inputClass = `${hospitalFieldClass} w-full`

const StaffForm = ({ member, staff, onSave, onCancel }: StaffFormProps) => {
  // Starts from the person being edited, or empty for a new invite
  const [form, setForm] = useState<StaffFormValues>(() => (member ? toStaffForm(member) : emptyStaffForm))
  const [errors, setErrors] = useState<StaffFormErrors>({})

  const isAdmin = form.role === "admin"

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as StaffFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Picking a role ticks that role's usual sections
  const handleRole = (e: ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as StaffRole
    setForm((prev) => ({ ...prev, role, permissions: role ? roleDefaultPermissions[role] : [] }))
    setErrors((prev) => ({ ...prev, role: undefined, permissions: undefined }))
  }

  const togglePermission = (section: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(section)
        ? prev.permissions.filter((item) => item !== section)
        : [...prev.permissions, section],
    }))
    setErrors((prev) => ({ ...prev, permissions: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateStaff(form, staff, member?.id)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const error = (name: StaffFieldName | "permissions") =>
    errors[name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[name]}</span>

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      <div className="md:col-span-2 xl:col-span-4">
        <h2 className="text-lg font-bold text-hospital-navy">{member ? "Edit staff access" : "Invite a staff member"}</h2>
        <p className="text-sm text-hospital-muted">
          {member ? "Change the role or the sections this person can open." : "They will get an email to set their password."}
        </p>
      </div>

      <HospitalFormField label="Full name" required>
        <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        {error("name")}
      </HospitalFormField>
      <HospitalFormField label="Email" required>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@hospital.com" className={inputClass} />
        {error("email")}
      </HospitalFormField>
      <HospitalFormField label="Phone" required>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98300 00000" className={inputClass} />
        {error("phone")}
      </HospitalFormField>
      <HospitalFormField label="Role" required>
        <select name="role" value={form.role} onChange={handleRole} className={inputClass}>
          <option value="">Select</option>
          {staffRoleOptions.map((role) => (
            <option key={role} value={role}>
              {staffRoleLabels[role]}
            </option>
          ))}
        </select>
        {error("role")}
      </HospitalFormField>

      <fieldset className="md:col-span-2 xl:col-span-4">
        <legend className="mb-1 text-sm font-semibold text-hospital-navy">
          Sections they can open<span className="text-red-500">*</span>
        </legend>
        <p className="mb-2 text-xs text-hospital-muted">
          {isAdmin ? "A hospital admin can open every section." : "Dashboard is always open. Pick a role first, then change the ticks if needed."}
        </p>
        <div className="flex flex-wrap gap-2">
          {staffPermissionOptions.map((option) => {
            const checked = isAdmin || form.permissions.includes(option.value)

            return (
              <label
                key={option.value}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
                  isAdmin ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                } ${
                  checked ? "border-hospital-primary bg-hospital-bg-soft font-semibold text-hospital-primary-dark" : "border-hospital-border text-hospital-navy"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={isAdmin}
                  onChange={() => togglePermission(option.value)}
                  className="accent-hospital-primary"
                />
                {option.label}
              </label>
            )
          })}
        </div>
        {error("permissions")}
      </fieldset>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-4">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {member ? "Save changes" : "Send invite"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-hospital-border bg-white px-5 py-2.5 text-sm font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default StaffForm