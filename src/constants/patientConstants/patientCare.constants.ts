import type { PatientStatusStyle } from "../../types/type/patientType/PatientDashboard.type"
import type {
  PatientAppointment,
  PatientAppointmentStatus,
  PatientAppointmentTab,
  PatientBloodRequest,
  PatientBloodRequestStatus,
  PatientBloodRequestValues,
  PatientBookingValues,
  PatientCampVisit,
  PatientFavorite,
  PatientFavoriteType,
  PatientPrescription,
  PatientRecord,
  PatientRecordType,
  PatientRecordValues,
  PatientReview,
  PatientReviewStatus,
  PatientReviewTarget,
  PatientReviewValues,
} from "../../types/type/patientType/PatientCare.type"

// Value of the "All ..." option in selects
export const PATIENT_ALL = "all"

export const PATIENT_MAX_BLOOD_UNITS = 6
export const PATIENT_REVIEW_MIN = 10

export const patientAppointmentTabs: { value: PatientAppointmentTab; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
]

export const patientAppointmentStatusStyles: Record<PatientAppointmentStatus, PatientStatusStyle> = {
  pending: { label: "Waiting for doctor", className: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", className: "bg-patient-bg-soft text-patient-primary-dark" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600" },
}

export const patientBloodRequestStatusStyles: Record<PatientBloodRequestStatus, PatientStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accepted", className: "bg-sky-50 text-sky-700" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-600" },
}

export const patientReviewStatusStyles: Record<PatientReviewStatus, PatientStatusStyle> = {
  pending: { label: "Waiting for admin", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Published", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Not published", className: "bg-red-50 text-red-600" },
}

export const patientRecordTypeLabels: Record<PatientRecordType, string> = {
  lab: "Lab report",
  scan: "Scan / X-ray",
  discharge: "Discharge summary",
  other: "Other",
}

export const patientFavoriteTypeLabels: Record<PatientFavoriteType, string> = {
  doctor: "Doctors",
  hospital: "Hospitals",
  bloodBank: "Blood banks",
}

export const patientReviewTargetLabels: Record<PatientReviewTarget, string> = {
  doctor: "Doctor",
  hospital: "Hospital",
  bloodBank: "Blood bank",
  camp: "Camp",
}

// 9:00 to 17:30, every 30 minutes -> "09:00", "09:30" ...
export const patientTimeSlots = Array.from({ length: 18 }, (_, index) => {
  const minutes = 9 * 60 + index * 30
  const hour = String(Math.floor(minutes / 60)).padStart(2, "0")
  return `${hour}:${minutes % 60 === 0 ? "00" : "30"}`
})

export const emptyBookingValues: PatientBookingValues = { doctorId: "", date: "", time: "", reason: "" }

export const emptyBloodRequestValues: PatientBloodRequestValues = {
  bloodGroup: "", units: "1", neededBy: "", hospital: "", emergency: false, note: "",
}

export const emptyRecordValues: PatientRecordValues = { title: "", recordType: "", date: "", fileName: "" }

export const emptyReviewValues: PatientReviewValues = { optionKey: "", rating: 0, comment: "" }

// ---------- Placeholder data (today = PATIENT_TODAY = 2026-11-26), same for every sample patient until the API ----------

export const patientAppointments: PatientAppointment[] = [
  { id: "pa1", doctorId: "2", doctor: "Dr. Kathryn Murphy", speciality: "Pediatric Medicine", hospital: "Seva City Hospital", location: "Salt Lake, Kolkata", date: "2026-11-28", time: "10:30", reason: "Fever follow-up", status: "confirmed" },
  { id: "pa2", doctorId: "5", doctor: "Dr. Jenny Wilson", speciality: "Cardiologist", hospital: "HeartCare Institute", location: "Howrah, West Bengal", date: "2026-12-02", time: "16:00", reason: "Chest pain check", status: "pending" },
  { id: "pa3", doctorId: "3", doctor: "Dr. Robert Fox", speciality: "Gastroenterologist", hospital: "Seva City Hospital", location: "Salt Lake, Kolkata", date: "2026-11-15", time: "11:00", reason: "Stomach pain", status: "completed" },
  { id: "pa4", doctorId: "1", doctor: "Dr. Leslie Alexander", speciality: "Dental Surgery", hospital: "Green Cross Medical Centre", location: "Dum Dum, Kolkata", date: "2026-11-05", time: "12:30", reason: "Tooth ache", status: "completed" },
  { id: "pa5", doctorId: "6", doctor: "Dr. Cody Fisher", speciality: "Neurologist", hospital: "Lifeline Trauma Centre", location: "Park Street, Kolkata", date: "2026-11-20", time: "09:30", reason: "Headache", status: "cancelled" },
]

export const patientRecords: PatientRecord[] = [
  { id: "rec1", title: "Complete blood count", recordType: "lab", date: "2026-11-15", fileName: "cbc-report.pdf", addedBy: "doctor", doctor: "Dr. Robert Fox" },
  { id: "rec2", title: "Abdomen ultrasound", recordType: "scan", date: "2026-11-15", fileName: "usg-abdomen.jpg", addedBy: "doctor", doctor: "Dr. Robert Fox" },
  { id: "rec3", title: "Dental X-ray", recordType: "scan", date: "2026-11-05", fileName: "dental-xray.png", addedBy: "patient", doctor: "" },
  { id: "rec4", title: "Thyroid test", recordType: "lab", date: "2026-10-12", fileName: "thyroid.pdf", addedBy: "patient", doctor: "" },
]

export const patientPrescriptions: PatientPrescription[] = [
  {
    id: "rx1", appointmentId: "pa3", doctor: "Dr. Robert Fox", speciality: "Gastroenterologist", hospital: "Seva City Hospital", date: "2026-11-15",
    diagnosis: "Acid reflux",
    medicines: [
      { name: "Pantoprazole 40 mg", dose: "1 tablet", timing: "Before breakfast", days: 14 },
      { name: "Antacid syrup", dose: "10 ml", timing: "After lunch and dinner", days: 7 },
    ],
    advice: "Avoid spicy and oily food. Do not lie down right after meals.",
  },
  {
    id: "rx2", appointmentId: "pa4", doctor: "Dr. Leslie Alexander", speciality: "Dental Surgery", hospital: "Green Cross Medical Centre", date: "2026-11-05",
    diagnosis: "Tooth decay (lower molar)",
    medicines: [
      { name: "Amoxicillin 500 mg", dose: "1 capsule", timing: "Three times a day", days: 5 },
      { name: "Paracetamol 650 mg", dose: "1 tablet", timing: "When in pain", days: 3 },
    ],
    advice: "Rinse with warm salt water twice a day. Come back after 1 week.",
  },
]

export const patientBloodRequests: PatientBloodRequest[] = [
  { id: "pbr1", bloodGroup: "O-", units: 2, neededBy: "2026-11-28", hospital: "Seva City Hospital", bloodBank: "", emergency: true, note: "Surgery on Friday", requestedOn: "2026-11-26", status: "pending" },
  { id: "pbr2", bloodGroup: "A+", units: 1, neededBy: "2026-11-30", hospital: "HeartCare Institute", bloodBank: "Red Drop Blood Bank", emergency: false, note: "", requestedOn: "2026-11-24", status: "accepted" },
  { id: "pbr3", bloodGroup: "B+", units: 2, neededBy: "2026-11-10", hospital: "Seva City Hospital", bloodBank: "Lifespring Voluntary Blood Bank", emergency: false, note: "For my father", requestedOn: "2026-11-07", status: "delivered" },
  { id: "pbr4", bloodGroup: "AB-", units: 1, neededBy: "2026-11-02", hospital: "Lifeline Trauma Centre", bloodBank: "", emergency: false, note: "", requestedOn: "2026-10-30", status: "rejected" },
]

export const patientFavorites: PatientFavorite[] = [
  { id: "fav1", favoriteType: "doctor", itemId: "2", name: "Dr. Kathryn Murphy", detail: "Pediatric Medicine · Seva City Hospital", phone: "+91 33 0000 0001" },
  { id: "fav2", favoriteType: "doctor", itemId: "5", name: "Dr. Jenny Wilson", detail: "Cardiologist · HeartCare Institute", phone: "+91 33 0000 0005" },
  { id: "fav3", favoriteType: "hospital", itemId: "1", name: "Seva City Hospital", detail: "Salt Lake, Kolkata", phone: "+91 33 0000 0001" },
  { id: "fav4", favoriteType: "bloodBank", itemId: "ob1", name: "Red Drop Blood Bank", detail: "Kolkata", phone: "+91 33 0000 0201" },
]

export const patientCampVisits: PatientCampVisit[] = [
  { id: "cv1", campName: "Salt Lake Winter Blood Drive", date: "2026-11-08" },
]

export const patientReviews: PatientReview[] = [
  { id: "pr1", target: "doctor", targetName: "Dr. Leslie Alexander", sourceId: "pa4", rating: 5, comment: "Explained the treatment clearly and the pain was gone in two days.", postedOn: "2026-11-06", status: "approved" },
  { id: "pr2", target: "bloodBank", targetName: "Lifespring Voluntary Blood Bank", sourceId: "pbr3", rating: 4, comment: "Blood was delivered on time for my father's operation.", postedOn: "2026-11-11", status: "pending" },
]
