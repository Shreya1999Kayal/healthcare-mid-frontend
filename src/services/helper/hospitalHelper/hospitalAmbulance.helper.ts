import { HOSPITAL_TODAY } from "../../../constants/hospitalConstants/hospitalDashboard.constants"
import type {
  AmbulanceFilter,
  AmbulanceFormErrors,
  AmbulanceFormValues,
  AmbulanceType,
  AmbulanceVehicle,
  TripFormErrors,
} from "../../../types/type/hospitalType/HospitalAmbulance.type"

// "wb 02 ab 1234" -> "WB 02 AB 1234" (extra spaces removed)
export const cleanVehicleNo = (vehicleNo: string) => vehicleNo.trim().replace(/\s+/g, " ").toUpperCase()

// currentId = ambulance being edited (so it doesn't count as a duplicate of itself)
export const validateAmbulance = (
  form: AmbulanceFormValues,
  ambulances: AmbulanceVehicle[],
  currentId?: string,
): AmbulanceFormErrors => {
  const errors: AmbulanceFormErrors = {}
  const vehicleNo = cleanVehicleNo(form.vehicleNo)

  if (!vehicleNo) errors.vehicleNo = "Vehicle number is required"
  else if (ambulances.some((item) => item.vehicleNo === vehicleNo && item.id !== currentId)) {
    errors.vehicleNo = "This ambulance is already added"
  }

  if (!form.type) errors.type = "Pick an ambulance type"
  if (!form.driver.trim()) errors.driver = "Driver name is required"
  if (!/^\+?[\d\s-]{10,15}$/.test(form.driverPhone.trim())) errors.driverPhone = "Enter a valid phone number"

  // "yyyy-mm-dd" strings can be compared directly
  if (!form.lastServiced) errors.lastServiced = "Pick the last service date"
  else if (form.lastServiced > HOSPITAL_TODAY) errors.lastServiced = "Date can't be in the future"

  return errors
}

export const validateTrip = (patient: string, pickup: string): TripFormErrors => {
  const errors: TripFormErrors = {}
  if (!patient.trim()) errors.patient = "Patient name is required"
  if (!pickup.trim()) errors.pickup = "Pickup place is required"
  return errors
}

export const toAmbulanceForm = (ambulance: AmbulanceVehicle): AmbulanceFormValues => ({
  vehicleNo: ambulance.vehicleNo,
  type: ambulance.type,
  driver: ambulance.driver,
  driverPhone: ambulance.driverPhone,
  lastServiced: ambulance.lastServiced,
  equipment: ambulance.equipment,
})

// current = ambulance being edited; empty when adding a new one
export const fromAmbulanceForm = (form: AmbulanceFormValues, current?: AmbulanceVehicle): AmbulanceVehicle => ({
  id: current?.id ?? `amb${Date.now()}`,
  status: current?.status ?? "available",
  trip: current?.trip,
  vehicleNo: cleanVehicleNo(form.vehicleNo),
  type: form.type as AmbulanceType,
  driver: form.driver.trim(),
  driverPhone: form.driverPhone.trim(),
  lastServiced: form.lastServiced,
  equipment: form.equipment,
})

// Current time, e.g. "10:45 pm"
export const getTimeNow = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

// Status tab + search box (vehicle number or driver)
export const filterAmbulances = (ambulances: AmbulanceVehicle[], search: string, filter: AmbulanceFilter) => {
  const text = search.trim().toLowerCase()

  return ambulances.filter((ambulance) => {
    const matchesFilter = filter === "all" || ambulance.status === filter
    const matchesSearch =
      !text || ambulance.vehicleNo.toLowerCase().includes(text) || ambulance.driver.toLowerCase().includes(text)

    return matchesFilter && matchesSearch
  })
}