import { hospitalsList } from "../../../constants/public/hospital.constants"
import { hospitalDoctors } from "../../../constants/public/hospitalDetails.constants"
import type { DoctorChamber } from "../../../types/type/public/Doctor.type"

// "Dr. Leslie Alexander" -> "LA"
export const getInitials = (name: string) =>
  name
    .replace("Dr.", "")
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

// 1200 -> "₹1,200"
export const formatFee = (fee: number) => `₹${fee.toString()}`

// All hospitals where one doctor sits, with days and time (first one is the main hospital)
export const getDoctorChambers = (doctorId: string): DoctorChamber[] =>
  hospitalDoctors.flatMap((row) => {
    if (row.doctorId !== doctorId) return []
    const hospital = hospitalsList.find((item) => item.id === row.hospitalId)
    if (!hospital) return []
    return [
      {
        id: row.id,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        location: hospital.location,
        designation: row.designation,
        days: row.chamberDays,
        time: row.chamberTime,
      },
    ]
  })