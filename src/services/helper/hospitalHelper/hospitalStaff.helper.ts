import { ALL_ROLES, roleDefaultPermissions, staffPermissionOptions } from "../../../constants/hospitalConstants/hospitalStaff.constants"
import type { HospitalStaff, StaffFormErrors, StaffFormValues, StaffRole } from "../../../types/type/hospitalType/HospitalStaff.type"

// "Riya Chatterjee" -> "RC"
export const getStaffInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

// "beds" -> "Beds and ICU"
export const getPermissionLabel = (section: string) =>
  staffPermissionOptions.find((option) => option.value === section)?.label ?? section

// currentId = person being edited (so the email doesn't count as a duplicate of itself)
export const validateStaff = (form: StaffFormValues, staff: HospitalStaff[], currentId?: string): StaffFormErrors => {
  const errors: StaffFormErrors = {}
  const email = form.email.trim().toLowerCase()

  if (!form.name.trim()) errors.name = "Name is required"

  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email"
  else if (staff.some((member) => member.email === email && member.id !== currentId)) errors.email = "This email is already used"

  if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number"
  if (!form.role) errors.role = "Pick a role"
  if (form.permissions.length === 0) errors.permissions = "Give access to at least 1 section"

  return errors
}

export const toStaffForm = (member: HospitalStaff): StaffFormValues => ({
  name: member.name,
  email: member.email,
  phone: member.phone,
  role: member.role,
  permissions: member.permissions,
})

// current = person being edited; empty when inviting a new one
export const fromStaffForm = (form: StaffFormValues, current?: HospitalStaff): HospitalStaff => {
  const role = form.role as StaffRole

  return {
    id: current?.id ?? `st${Date.now()}`,
    status: current?.status ?? "invited",
    lastActive: current?.lastActive ?? "Never",
    isOwner: current?.isOwner ?? false,
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    role,
    // Admin always has every section
    permissions: role === "admin" ? roleDefaultPermissions.admin : form.permissions,
  }
}

// Search (name or email) + role
export const filterStaff = (staff: HospitalStaff[], search: string, role: string) => {
  const text = search.trim().toLowerCase()

  return staff.filter((member) => {
    const matchesSearch = !text || member.name.toLowerCase().includes(text) || member.email.includes(text)
    const matchesRole = role === ALL_ROLES || member.role === role

    return matchesSearch && matchesRole
  })
}