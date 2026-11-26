
import { LOW_BED_LIMIT } from "../../../constants/hospitalConstants/hospitalBed.constants"
import type {
  BedCategory,
  HospitalWard,
  WardAvailability,
  WardFilter,
  WardFormErrors,
  WardFormValues,
} from "../../../types/type/hospitalType/HospitalBed.type"

export const getFreeBeds = (ward: HospitalWard) => ward.total - ward.occupied

// 0 to 100
export const getOccupancy = (occupied: number, total: number) => (total === 0 ? 0 : Math.round((occupied / total) * 100))

export const getWardAvailability = (ward: HospitalWard): WardAvailability => {
  const free = getFreeBeds(ward)
  if (free === 0) return "full"
  if (free <= LOW_BED_LIMIT) return "low"
  return "available"
}

export const isCriticalCare = (category: BedCategory) => category === "icu" || category === "nicu"

export const validateWard = (form: WardFormValues): WardFormErrors => {
  const errors: WardFormErrors = {}
  const total = Number(form.total)
  const occupied = Number(form.occupied)

  if (!form.name.trim()) errors.name = "Ward name is required"
  if (!form.category) errors.category = "Pick a bed type"
  if (!form.floor.trim()) errors.floor = "Floor is required"
  if (!form.total || total < 1) errors.total = "Add at least 1 bed"
  if (form.occupied === "" || occupied < 0) errors.occupied = "Enter occupied beds (0 or more)"
  else if (occupied > total) errors.occupied = "Occupied can't be more than total beds"
  if (form.pricePerDay === "" || Number(form.pricePerDay) < 0) errors.pricePerDay = "Enter the price per day"
  if (Number(form.ventilators) < 0) errors.ventilators = "Can't be negative"

  return errors
}

export const toWardForm = (ward: HospitalWard): WardFormValues => ({
  name: ward.name,
  category: ward.category,
  floor: ward.floor,
  total: String(ward.total),
  occupied: String(ward.occupied),
  pricePerDay: String(ward.pricePerDay),
  ventilators: String(ward.ventilators),
})

// current = ward being edited; empty when adding a new one
export const fromWardForm = (form: WardFormValues, current?: HospitalWard): HospitalWard => ({
  id: current?.id ?? `w${Date.now()}`,
  name: form.name.trim(),
  category: form.category as BedCategory,
  floor: form.floor.trim(),
  total: Number(form.total),
  occupied: Number(form.occupied),
  pricePerDay: Number(form.pricePerDay),
  ventilators: Number(form.ventilators) || 0,
})

export const filterWards = (wards: HospitalWard[], filter: WardFilter) =>
  filter === "all" ? wards : wards.filter((ward) => ward.category === filter)