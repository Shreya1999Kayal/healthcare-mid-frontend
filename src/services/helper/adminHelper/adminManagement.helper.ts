import { ADMIN_TODAY } from "../../../constants/adminConstants/adminDashboard.constants"
import {
  ADMIN_ALL,
  ADMIN_DONATION_GAP_DAYS,
  ADMIN_LOW_STOCK_UNITS,
  adminBloodGroups,
} from "../../../constants/adminConstants/adminManagement.constants"
import type { AdminStatusStyle } from "../../../types/type/adminType/AdminDashboard.type"
import type {
  AdminBloodStock,
  AdminDonorEligibility,
  AdminFilterOption,
} from "../../../types/type/adminType/AdminManagement.type"

// Search box: true when the box is empty or any value contains the text
export const matchesSearch = (search: string, values: string[]) => {
  const text = search.trim().toLowerCase()
  return !text || values.some((value) => value.toLowerCase().includes(text))
}

// Select: "all" matches everything
export const matchesOption = (selected: string, value: string) => selected === ADMIN_ALL || selected === value

// { active: { label: "Active" } } -> [{ value: "active", label: "Active" }]
export const styleOptions = (styles: Record<string, AdminStatusStyle>): AdminFilterOption[] =>
  Object.entries(styles).map(([value, style]) => ({ value, label: style.label }))

// { doctor: "Doctor" } -> [{ value: "doctor", label: "Doctor" }]
export const labelOptions = (labels: Record<string, string>): AdminFilterOption[] =>
  Object.entries(labels).map(([value, label]) => ({ value, label }))

// ["Kolkata", "Howrah", "Kolkata"] -> Howrah, Kolkata (no repeats, A to Z)
export const listOptions = (values: string[]): AdminFilterOption[] =>
  values
    .filter((value, index) => values.indexOf(value) === index)
    .sort()
    .map((value) => ({ value, label: value }))

// ("2026-08-01", 90) -> "2026-10-30"
export const addDays = (iso: string, days: number) => {
  const date = new Date(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

// Donor can donate again 90 days after the last donation
export const getDonorEligibility = (lastDonation: string): AdminDonorEligibility => {
  if (!lastDonation) return { eligible: true, nextDate: "" }
  const nextDate = addDays(lastDonation, ADMIN_DONATION_GAP_DAYS)
  return { eligible: nextDate <= ADMIN_TODAY, nextDate }
}

// Blood groups below the low-stock limit
export const getLowStockGroups = (stock: AdminBloodStock) =>
  adminBloodGroups.filter((group) => stock[group] < ADMIN_LOW_STOCK_UNITS)

export const getTotalUnits = (stock: AdminBloodStock) =>
  adminBloodGroups.reduce((total, group) => total + stock[group], 0)

// (34, 120) -> 28
export const getPercent = (part: number, total: number) => (total === 0 ? 0 : Math.round((part / total) * 100))

// 4.56 -> "4.6"
export const formatRating = (rating: number) => rating.toFixed(1)
