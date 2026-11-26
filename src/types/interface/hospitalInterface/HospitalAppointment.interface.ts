import type { HospitalAppointmentStatus } from "../../type/hospitalType/HospitalDashboard.type"
import type { BookingFormValues, HospitalBooking } from "../../type/hospitalType/HospitalAppointment.type"

export interface BookingsTableProps {
  bookings: HospitalBooking[]
  onStatusChange: (bookingId: string, status: HospitalAppointmentStatus) => void
}

export interface BookingFormProps {
  bookings: HospitalBooking[] // used to stop double booking of a slot
  onSave: (values: BookingFormValues) => void
  onCancel: () => void
}