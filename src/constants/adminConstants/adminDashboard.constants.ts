import {
  BedDouble,
  Building2,
  CalendarCheck,
  Droplet,
  Droplets,
  Heart,
  HeartHandshake,
  Hospital,
  MessageSquare,
  Siren,
  Stethoscope,
  Syringe,
  UserRound,
  Users,
} from "lucide-react"
import type { AdminAccount, AdminNavLink } from "../../types/type/adminType/AdminDashboard.type"

// Start of every admin dashboard URL
export const ADMIN_BASE_PATH = "/adminDashboard"

// Placeholder "today" that matches the sample data. Replace when data comes from the API.
export const ADMIN_TODAY = "2026-11-26"

// Card used on every admin page
export const adminCardClass = "rounded-2xl border border-admin-border bg-white p-5 shadow-sm shadow-admin-navy/10"

// Input / select used on admin pages
export const adminFieldClass =
  "rounded-md border border-admin-border bg-white px-3 py-2 text-sm text-admin-navy outline-none focus:border-admin-primary"

// Only the built sections for now; add the management pages here as they are built
export const adminNavLinks: AdminNavLink[] = [
  // Verification
  { label: "Doctor verification", section: "doctorVerification", icon: Stethoscope, roles: ["doctor"] },
  { label: "Hospital verification", section: "hospitalVerification", icon: Building2, roles: ["hospital"] },
  { label: "Blood bank and camps", section: "bloodBankVerification", icon: Droplet, roles: ["bloodBank", "camp"] },
  { label: "Donor verification", section: "donorVerification", icon: HeartHandshake, roles: ["donor"] },
  // Management
  { label: "Users", section: "users", icon: Users },
  { label: "Doctors", section: "doctors", icon: UserRound },
  { label: "Hospitals", section: "hospitals", icon: Hospital },
  { label: "Blood banks", section: "bloodBanks", icon: Droplets },
  { label: "Donors", section: "donors", icon: Heart },
  { label: "Appointments", section: "appointments", icon: CalendarCheck },
  { label: "Blood requests", section: "bloodRequests", icon: Syringe },
  { label: "Emergency", section: "emergency", icon: Siren },
  { label: "Beds and ambulances", section: "bedsAmbulances", icon: BedDouble },
  { label: "Feedback and reviews", section: "feedback", icon: MessageSquare },
]

// The only admin (placeholder until login is built)
export const adminAccount: AdminAccount = { id: "a1", name: "Seva Admin", email: "admin@seva.in" }
