import { HOSPITAL_TODAY } from "../../../constants/hospitalConstants/hospitalDashboard.constants"
import { bookingActions } from "../../../constants/hospitalConstants/hospitalAppointment.constants"
import { ALL_OPTION, hospitalDoctors } from "../../../constants/hospitalConstants/hospitalDoctor.constants"
import type {
  AppointmentDayTab,
  BookingFormErrors,
  BookingFormValues,
  HospitalBooking,
} from "../../../types/type/hospitalType/HospitalAppointment.type"

// "14:30" -> "2:30 PM"
export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)
  const suffix = hour >= 12 ? "PM" : "AM"
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`
}

// "yyyy-mm-dd" strings can be compared directly
export const getBookingDay = (date: string): AppointmentDayTab => {
  if (date === HOSPITAL_TODAY) return "today"
  return date > HOSPITAL_TODAY ? "upcoming" : "past"
}

// Earliest first
export const sortBookings = (bookings: HospitalBooking[]) =>
  [...bookings].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))

// Past visits can't change; check in / complete only on the day of the visit
export const getBookingActions = (booking: HospitalBooking) => {
  const day = getBookingDay(booking.date)
  if (day === "past") return []

  const actions = bookingActions[booking.status]
  return day === "today" ? actions : actions.filter((action) => action.next === "confirmed" || action.next === "cancelled")
}

export const validateBooking = (form: BookingFormValues, bookings: HospitalBooking[]): BookingFormErrors => {
  const errors: BookingFormErrors = {}
  const age = Number(form.age)

  if (!form.patient.trim()) errors.patient = "Patient name is required"
  if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number"
  if (form.age === "" || age < 0 || age > 120) errors.age = "Enter an age between 0 and 120"
  if (!form.gender) errors.gender = "Pick a gender"
  if (!form.doctorId) errors.doctorId = "Pick a doctor"
  if (!form.date) errors.date = "Pick a date"
  else if (form.date < HOSPITAL_TODAY) errors.date = "Date can't be in the past"
  if (!form.time) errors.time = "Pick a time"
  if (!form.reason.trim()) errors.reason = "Reason is required"

  // Same doctor, same date and time, not cancelled = slot taken
  const slotTaken = bookings.some(
    (booking) =>
      booking.doctorId === form.doctorId && booking.date === form.date && booking.time === form.time && booking.status !== "cancelled",
  )
  if (form.doctorId && form.date && form.time && slotTaken) errors.time = "This doctor is already booked at this time"

  return errors
}

// New walk-in booking; doctor name and department come from the doctor list
export const fromBookingForm = (form: BookingFormValues): HospitalBooking => {
  const doctor = hospitalDoctors.find((item) => item.id === form.doctorId)

  return {
    id: `bk${Date.now()}`,
    patient: form.patient.trim(),
    phone: form.phone.trim(),
    age: Number(form.age),
    gender: form.gender,
    doctorId: form.doctorId,
    doctor: doctor?.name ?? "",
    department: doctor?.department ?? "",
    date: form.date,
    time: form.time,
    reason: form.reason.trim(),
    bookedVia: "walk-in",
    status: "confirmed",
  }
}

// Day tab + search (patient or phone) + department + status
export const filterBookings = (
  bookings: HospitalBooking[],
  tab: AppointmentDayTab,
  search: string,
  department: string,
  status: string,
) => {
  const text = search.trim().toLowerCase()

  return bookings.filter((booking) => {
    const matchesTab = getBookingDay(booking.date) === tab
    const matchesSearch = !text || booking.patient.toLowerCase().includes(text) || booking.phone.includes(text)
    const matchesDepartment = department === ALL_OPTION || booking.department === department
    const matchesStatus = status === ALL_OPTION || booking.status === status

    return matchesTab && matchesSearch && matchesDepartment && matchesStatus
  })
}