import { BadgeCheck, Bell, Building2, ClipboardList, Droplet, LayoutDashboard, Settings, Star, Tent, TrendingUp, Users } from "lucide-react"
import type { BloodBankNavLink, BloodBankNotification, BloodBankRole } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"

// Start of every blood donation dashboard URL
export const BLOOD_BANK_BASE_PATH = "/bloodDonationDashboard"

// Placeholder "today" that matches the sample data. Replace when data comes from the API.
export const BLOOD_BANK_TODAY = "2026-11-23"

// Card used on every blood bank page
export const bloodBankCardClass =
  "rounded-2xl border border-blood-border bg-white p-5 shadow-sm shadow-blood-navy/10"

// Input / select used on blood bank pages
export const bloodBankFieldClass =
  "rounded-md border border-blood-border bg-white px-3 py-2 text-sm text-blood-navy outline-none focus:border-blood-primary"

export const primaryButtonClass =
  "rounded-md bg-blood-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blood-primary-dark disabled:cursor-not-allowed disabled:opacity-40"

export const outlineButtonClass =
  "rounded-md border border-blood-border bg-white px-5 py-2.5 text-sm font-semibold text-blood-navy hover:bg-blood-bg"

export const roleLabels: Record<BloodBankRole, string> = {
  bloodBank: "Blood bank",
  bloodCamp: "Blood camp",
}

const bothRoles: BloodBankRole[] = ["bloodBank", "bloodCamp"]

// roles = who sees the link (same idea as the admin-only Category link)
export const bloodBankNavLinks: BloodBankNavLink[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard, roles: bothRoles },
  { label: "Verification", section: "verification", icon: BadgeCheck, roles: bothRoles },
  { label: "Profile", section: "profile", icon: Building2, roles: bothRoles },
  { label: "Blood inventory", section: "inventory", icon: Droplet, roles: bothRoles },
  { label: "Blood requests", section: "requests", icon: ClipboardList, roles: bothRoles },
  // Step 2 (camp role only):
  { label: "Donation camps", section: "camps", icon: Tent, roles: ["bloodCamp"] },
  { label: "Donors", section: "donors", icon: Users, roles: ["bloodCamp"] },
  { label: "Reviews", section: "reviews", icon: Star, roles: bothRoles },
  { label: "Reports", section: "reports", icon: TrendingUp, roles: bothRoles },
  { label: "Notifications", section: "notifications", icon: Bell, roles: bothRoles },
  { label: "Settings", section: "settings", icon: Settings, roles: bothRoles },
]

// Placeholder data, replace with real data from the API later
export const bloodBankNotifications: BloodBankNotification[] = [
  { id: "bn1", type: "request", message: "Emergency request: 2 units O- from Lifeline Trauma Centre", time: "5 min ago", unread: true, link: "requests" },
  { id: "bn2", type: "stock", message: "B- is out of stock", time: "1 hour ago", unread: true, link: "inventory" },
  { id: "bn3", type: "request", message: "New request: 1 unit AB+ from Seva City Hospital", time: "2 hours ago", unread: true, link: "requests" },
  { id: "bn4", type: "review", message: "New 5-star review from Anita Sen", time: "Yesterday", unread: false, link: "reviews" },
  { id: "bn5", type: "system", message: "Your report for October is ready", time: "2 days ago", unread: false, link: "reports" },
]