import { BadgeCheck, ClipboardList, LayoutDashboard, User } from "lucide-react"
import type { DonorNavLink } from "../../../types/type/blood/donorType/DonorDashboard.type"


// Start of every donor dashboard URL
export const DONOR_BASE_PATH = "/donorDashboard"

// Placeholder "today" that matches the sample data. Replace when data comes from the API.
export const DONOR_TODAY = "2026-11-24"

// Card used on every donor page
export const donorCardClass = "rounded-2xl border border-blood-border bg-white p-5 shadow-sm shadow-blood-navy/10"

// Input / select used on donor pages
export const donorFieldClass =
  "rounded-md border border-blood-border bg-white px-3 py-2 text-sm text-blood-navy outline-none focus:border-blood-primary"

export const donorPrimaryButtonClass =
  "rounded-md bg-blood-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blood-primary-dark"

export const donorOutlineButtonClass =
  "rounded-md border border-blood-border bg-white px-5 py-2.5 text-sm font-semibold text-blood-navy hover:bg-blood-bg"

export const donorNavLinks: DonorNavLink[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { label: "Verification", section: "verification", icon: BadgeCheck },
  { label: "Profile", section: "profile", icon: User },
  { label: "Donation records", section: "records", icon: ClipboardList },
]