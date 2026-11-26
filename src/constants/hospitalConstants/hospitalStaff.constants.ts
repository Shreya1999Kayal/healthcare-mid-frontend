import { hospitalNavLinks } from "./hospitalDashboard.constants"
import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  HospitalStaff,
  StaffFormValues,
  StaffPermissionOption,
  StaffRole,
  StaffStatus,
} from "../../types/type/hospitalType/HospitalStaff.type"

// Value of the role filter that shows everyone
export const ALL_ROLES = "all"

// Dashboard is open for everyone; Verification, Staff and Settings are only for the owner
const ownerOnlySections = ["dashboard", "verification", "staff", "settings"]

// Sections that can be given to staff (taken from the sidebar)
export const staffPermissionOptions: StaffPermissionOption[] = hospitalNavLinks
  .filter((link) => !ownerOnlySections.includes(link.section))
  .map((link) => ({ value: link.section, label: link.label }))

const allSections = staffPermissionOptions.map((option) => option.value)

export const staffRoleLabels: Record<StaffRole, string> = {
  admin: "Hospital admin",
  receptionist: "Receptionist",
  nurse: "Nurse",
  "bed-manager": "Bed manager",
  "ambulance-coordinator": "Ambulance coordinator",
  "blood-officer": "Blood bank officer",
}

export const staffRoleOptions = Object.keys(staffRoleLabels) as StaffRole[]

// Sections ticked when a role is picked
export const roleDefaultPermissions: Record<StaffRole, string[]> = {
  admin: allSections,
  receptionist: ["appointments", "doctors", "departments", "notifications"],
  nurse: ["beds", "emergency", "appointments", "notifications"],
  "bed-manager": ["beds", "notifications"],
  "ambulance-coordinator": ["ambulances", "emergency", "notifications"],
  "blood-officer": ["blood", "notifications"],
}

export const staffStatusStyles: Record<StaffStatus, HospitalStatusStyle> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700" },
  invited: { label: "Invited", className: "bg-amber-50 text-amber-700" },
  suspended: { label: "Suspended", className: "bg-slate-100 text-slate-600" },
}

export const emptyStaffForm: StaffFormValues = {
  name: "", email: "", phone: "", role: "", permissions: [],
}

// Placeholder data, replace with real data from the API later
export const hospitalStaff: HospitalStaff[] = [
  {
    id: "st1", name: "Anirban Ghosh", email: "admin@sevacity.in", phone: "+91 98300 10101",
    role: "admin", permissions: allSections, status: "active", lastActive: "Online now", isOwner: true,
  },
  {
    id: "st2", name: "Riya Chatterjee", email: "riya@sevacity.in", phone: "+91 98300 20202",
    role: "receptionist", permissions: roleDefaultPermissions.receptionist, status: "active", lastActive: "10 min ago", isOwner: false,
  },
  {
    id: "st3", name: "Sister Mary Joseph", email: "mary@sevacity.in", phone: "+91 98300 30303",
    role: "nurse", permissions: roleDefaultPermissions.nurse, status: "active", lastActive: "1 hour ago", isOwner: false,
  },
  {
    id: "st4", name: "Sanjay Kumar", email: "sanjay@sevacity.in", phone: "+91 98300 40404",
    role: "ambulance-coordinator", permissions: roleDefaultPermissions["ambulance-coordinator"], status: "active", lastActive: "Yesterday", isOwner: false,
  },
  {
    id: "st5", name: "Pooja Sen", email: "pooja@sevacity.in", phone: "+91 98300 50505",
    role: "blood-officer", permissions: roleDefaultPermissions["blood-officer"], status: "invited", lastActive: "Never", isOwner: false,
  },
  {
    id: "st6", name: "Ravi Mehta", email: "ravi@sevacity.in", phone: "+91 98300 60606",
    role: "bed-manager", permissions: roleDefaultPermissions["bed-manager"], status: "suspended", lastActive: "2 weeks ago", isOwner: false,
  },
]