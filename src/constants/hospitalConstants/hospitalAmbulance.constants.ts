import type {
  AmbulanceField,
  AmbulanceFilter,
  AmbulanceFormValues,
  AmbulanceType,
  AmbulanceVehicle,
} from "../../types/type/hospitalType/HospitalAmbulance.type"

export const ambulanceTypeLabels: Record<AmbulanceType, string> = {
  bls: "Basic life support",
  als: "Advanced life support",
  "patient-transport": "Patient transport",
  neonatal: "Neonatal",
}

export const ambulanceTypeOptions = (Object.keys(ambulanceTypeLabels) as AmbulanceType[]).map((value) => ({
  value,
  label: ambulanceTypeLabels[value],
}))

export const ambulanceFilters: { value: AmbulanceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "on-duty", label: "On duty" },
  { value: "maintenance", label: "Maintenance" },
]

export const ambulanceEquipmentOptions = [
  "Oxygen cylinder", "Stretcher", "First aid kit", "Defibrillator", "Ventilator", "Cardiac monitor", "Incubator",
]

export const ambulanceFields: AmbulanceField[] = [
  { name: "vehicleNo", label: "Vehicle number", placeholder: "e.g. WB 02 AB 1234" },
  { name: "type", label: "Ambulance type", options: ambulanceTypeOptions },
  { name: "driver", label: "Driver name" },
  { name: "driverPhone", label: "Driver phone", type: "tel", placeholder: "+91 98300 00000" },
  { name: "lastServiced", label: "Last serviced on", type: "date" },
]

export const emptyAmbulanceForm: AmbulanceFormValues = {
  vehicleNo: "", type: "", driver: "", driverPhone: "", lastServiced: "", equipment: [],
}

// Placeholder data, replace with real data from the API later
export const hospitalAmbulanceList: AmbulanceVehicle[] = [
  {
    id: "amb1", vehicleNo: "WB 02 AB 1234", type: "bls", driver: "Ramesh Yadav", driverPhone: "+91 98300 12121",
    equipment: ["Oxygen cylinder", "Stretcher", "First aid kit"], lastServiced: "2026-10-28", status: "available",
  },
  {
    id: "amb2", vehicleNo: "WB 06 CD 5678", type: "als", driver: "Sunil Mondal", driverPhone: "+91 98300 34343",
    equipment: ["Oxygen cylinder", "Stretcher", "Defibrillator", "Ventilator", "Cardiac monitor"], lastServiced: "2026-11-05",
    status: "on-duty", trip: { patient: "Arjun Paul", pickup: "Gariahat crossing", startedAt: "10:40 pm" },
  },
  {
    id: "amb3", vehicleNo: "WB 04 EF 9012", type: "bls", driver: "Bikash Halder", driverPhone: "+91 98300 56565",
    equipment: ["Oxygen cylinder", "Stretcher", "First aid kit"], lastServiced: "2026-09-30", status: "available",
  },
  {
    id: "amb4", vehicleNo: "WB 08 GH 3456", type: "patient-transport", driver: "Pintu Saha", driverPhone: "+91 98300 78787",
    equipment: ["Stretcher", "First aid kit"], lastServiced: "2026-08-15", status: "maintenance",
  },
  {
    id: "amb5", vehicleNo: "WB 02 JK 7788", type: "neonatal", driver: "Abdul Karim", driverPhone: "+91 98300 90909",
    equipment: ["Oxygen cylinder", "Incubator", "Ventilator"], lastServiced: "2026-11-10", status: "available",
  },
]