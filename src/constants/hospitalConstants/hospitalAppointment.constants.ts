import type { HospitalAppointmentStatus } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  AppointmentDayTab,
  BookedVia,
  BookingAction,
  BookingFormValues,
  HospitalBooking,
} from "../../types/type/hospitalType/HospitalAppointment.type"

export const appointmentDayTabs: { value: AppointmentDayTab; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
]

export const appointmentStatusOptions: HospitalAppointmentStatus[] = ["pending", "confirmed", "checked-in", "completed", "cancelled"]

// Buttons shown for each status
export const bookingActions: Record<HospitalAppointmentStatus, BookingAction[]> = {
  pending: [
    { label: "Confirm", next: "confirmed" },
    { label: "Cancel", next: "cancelled" },
  ],
  confirmed: [
    { label: "Check in", next: "checked-in" },
    { label: "Cancel", next: "cancelled" },
  ],
  "checked-in": [{ label: "Complete", next: "completed" }],
  completed: [],
  cancelled: [],
}

export const bookedViaLabels: Record<BookedVia, string> = {
  online: "Online",
  "walk-in": "Walk-in",
}

export const bookingGenderOptions = ["Male", "Female", "Other"]

// 9:00 to 17:30, every 30 minutes -> "09:00", "09:30" ...
export const bookingTimeSlots = Array.from({ length: 18 }, (_, index) => {
  const minutes = 9 * 60 + index * 30
  const hour = String(Math.floor(minutes / 60)).padStart(2, "0")
  return `${hour}:${minutes % 60 === 0 ? "00" : "30"}`
})

export const emptyBookingForm: BookingFormValues = {
  patient: "", phone: "", age: "", gender: "", doctorId: "", date: "", time: "", reason: "",
}

// Placeholder data (today is HOSPITAL_TODAY = 2026-11-21), replace with the API later
export const hospitalBookings: HospitalBooking[] = [
  // past
  { id: "bk1", patient: "Tania Dey", phone: "+91 98300 11001", age: 26, gender: "Female", doctorId: "hd1", doctor: "Dr. Leslie Alexander", department: "General Medicine", date: "2026-11-19", time: "10:00", reason: "Thyroid report", bookedVia: "online", status: "completed" },
  { id: "bk2", patient: "Kabir Sinha", phone: "+91 98300 11002", age: 41, gender: "Male", doctorId: "hd4", doctor: "Dr. Rakesh Jain", department: "Orthopaedics", date: "2026-11-20", time: "11:30", reason: "Back pain", bookedVia: "online", status: "cancelled" },
  { id: "bk3", patient: "Neha Roy", phone: "+91 98300 11003", age: 31, gender: "Female", doctorId: "hd2", doctor: "Dr. Amit Roy", department: "Cardiology", date: "2026-11-20", time: "15:00", reason: "Chest discomfort", bookedVia: "walk-in", status: "completed" },
  // today
  { id: "bk4", patient: "Rahul Sen", phone: "+91 98300 11004", age: 34, gender: "Male", doctorId: "hd1", doctor: "Dr. Leslie Alexander", department: "General Medicine", date: "2026-11-21", time: "09:30", reason: "Fever and cough", bookedVia: "online", status: "completed" },
  { id: "bk5", patient: "Imran Khan", phone: "+91 98300 11005", age: 45, gender: "Male", doctorId: "hd2", doctor: "Dr. Amit Roy", department: "Cardiology", date: "2026-11-21", time: "10:30", reason: "Chest pain follow-up", bookedVia: "online", status: "checked-in" },
  { id: "bk6", patient: "Priya Das", phone: "+91 98300 11006", age: 52, gender: "Female", doctorId: "hd1", doctor: "Dr. Leslie Alexander", department: "General Medicine", date: "2026-11-21", time: "11:00", reason: "Blood pressure check", bookedVia: "walk-in", status: "confirmed" },
  { id: "bk7", patient: "Meera Bose", phone: "+91 98300 11007", age: 7, gender: "Female", doctorId: "hd3", doctor: "Dr. Kavita Shah", department: "Paediatrics", date: "2026-11-21", time: "12:00", reason: "Child vaccination", bookedVia: "online", status: "pending" },
  { id: "bk8", patient: "Rohit Das", phone: "+91 98300 11008", age: 36, gender: "Male", doctorId: "hd2", doctor: "Dr. Amit Roy", department: "Cardiology", date: "2026-11-21", time: "16:00", reason: "ECG review", bookedVia: "online", status: "cancelled" },
  // upcoming
  { id: "bk9", patient: "Arjun Paul", phone: "+91 98300 11009", age: 60, gender: "Male", doctorId: "hd6", doctor: "Dr. Sourav Pal", department: "Cardiology", date: "2026-11-24", time: "16:30", reason: "Heart check-up", bookedVia: "online", status: "pending" },
  { id: "bk10", patient: "Ananya Mitra", phone: "+91 98300 11010", age: 28, gender: "Female", doctorId: "hd5", doctor: "Dr. Nisha Verma", department: "Dermatology", date: "2026-11-28", time: "10:30", reason: "Skin allergy", bookedVia: "online", status: "confirmed" },
]