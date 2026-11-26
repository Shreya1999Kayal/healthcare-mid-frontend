import { hospitalsList } from "../../../constants/public/hospital.constants"
import type { DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { ChamberCounts } from "../../../types/type/doctorType/DoctorChambers.type"

export const getHospital = (hospitalId: string) => hospitalsList.find((hospital) => hospital.id === hospitalId)

// Active bookings only (cancelled and rejected are left out)
export const getChamberCounts = (chamberId: string, appointments: DoctorAppointment[]): ChamberCounts => {
  const active = appointments.filter(
    (appointment) =>
      appointment.chamberId === chamberId && appointment.status !== "cancelled" && appointment.status !== "rejected",
  )

  return {
    today: active.filter((appointment) => appointment.day === "today").length,
    upcoming: active.filter((appointment) => appointment.day === "upcoming").length,
  }
}