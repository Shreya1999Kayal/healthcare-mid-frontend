import type { DoctorChamberDetail } from "../../types/type/doctorType/DoctorChambers.type"

// hospitalId links each chamber to the public hospitalsList (address, phone, hospital page)
export const chamberDetails: DoctorChamberDetail[] = [
  { chamberId: "ch1", hospitalId: "1", room: "OPD Block A, Room 12", fee: 800, available: true },
  { chamberId: "ch2", hospitalId: "6", room: "Ground floor, Room 3", fee: 600, available: true },
  { chamberId: "ch3", hospitalId: "3", room: "Paediatric wing, Room 7", fee: 700, available: true },
]