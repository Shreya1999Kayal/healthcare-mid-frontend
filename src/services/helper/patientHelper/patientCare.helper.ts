import { PATIENT_TODAY } from "../../../constants/patientConstants/patientDashboard.constants"
import {
  PATIENT_ALL,
  PATIENT_MAX_BLOOD_UNITS,
  PATIENT_REVIEW_MIN,
} from "../../../constants/patientConstants/patientCare.constants"
import { doctorsList } from "../../../constants/public/doctors.constants"
import { formatPatientDate } from "./patientDashboard.helper"
import type { BloodGroup } from "../../../types/type/public/Blood.type"
import type {
  PatientAppointment,
  PatientAppointmentTab,
  PatientBloodRequest,
  PatientBloodRequestErrors,
  PatientBloodRequestValues,
  PatientBookingErrors,
  PatientBookingValues,
  PatientCampVisit,
  PatientRecord,
  PatientRecordErrors,
  PatientRecordType,
  PatientRecordValues,
  PatientReview,
  PatientReviewErrors,
  PatientReviewOption,
  PatientReviewValues,
} from "../../../types/type/patientType/PatientCare.type"

// ---------- Appointments ----------

// "yyyy-mm-dd" strings can be compared directly
export const getAppointmentTab = (appointment: PatientAppointment): PatientAppointmentTab => {
  if (appointment.status === "cancelled") return "cancelled"
  if (appointment.status === "completed" || appointment.date < PATIENT_TODAY) return "past"
  return "upcoming"
}

// Earliest first
export const sortAppointments = (appointments: PatientAppointment[]) =>
  [...appointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))

// Cancel or reschedule only while pending / confirmed and not in the past
export const canChangeAppointment = (appointment: PatientAppointment) =>
  (appointment.status === "pending" || appointment.status === "confirmed") && appointment.date >= PATIENT_TODAY

export const getNextAppointment = (appointments: PatientAppointment[]) =>
  sortAppointments(appointments.filter((appointment) => getAppointmentTab(appointment) === "upcoming"))[0]

export const validateBooking = (
  form: PatientBookingValues,
  appointments: PatientAppointment[],
  editingId: string,
): PatientBookingErrors => {
  const errors: PatientBookingErrors = {}

  if (!form.doctorId) errors.doctorId = "Pick a doctor"
  if (!form.date) errors.date = "Pick a date"
  else if (form.date < PATIENT_TODAY) errors.date = "Date can't be in the past"
  if (!form.time) errors.time = "Pick a time"
  if (!form.reason.trim()) errors.reason = "Tell the doctor the reason for the visit"

  // Same doctor, same date and time, not cancelled = slot taken
  const slotTaken = appointments.some(
    (appointment) =>
      appointment.id !== editingId &&
      appointment.doctorId === form.doctorId &&
      appointment.date === form.date &&
      appointment.time === form.time &&
      appointment.status !== "cancelled",
  )
  if (form.doctorId && form.date && form.time && slotTaken) errors.time = "You already have this slot with this doctor"

  return errors
}

// New booking; doctor details come from doctorsList
export const fromBookingValues = (form: PatientBookingValues): PatientAppointment => {
  const doctor = doctorsList.find((item) => item.id === form.doctorId)

  return {
    id: `pa${Date.now()}`,
    doctorId: form.doctorId,
    doctor: doctor?.name ?? "",
    speciality: doctor?.speciality ?? "",
    hospital: doctor?.hospital ?? "",
    location: doctor?.location ?? "",
    date: form.date,
    time: form.time,
    reason: form.reason.trim(),
    status: "pending",
  }
}

// ---------- Blood requests ----------

export const isActiveBloodRequest = (request: PatientBloodRequest) =>
  request.status === "pending" || request.status === "accepted"

export const validateBloodRequest = (form: PatientBloodRequestValues): PatientBloodRequestErrors => {
  const errors: PatientBloodRequestErrors = {}
  const units = Number(form.units)

  if (!form.bloodGroup) errors.bloodGroup = "Pick a blood group"
  if (form.units === "" || units < 1 || units > PATIENT_MAX_BLOOD_UNITS) errors.units = `Enter 1 to ${PATIENT_MAX_BLOOD_UNITS} units`
  if (!form.neededBy) errors.neededBy = "Pick a date"
  else if (form.neededBy < PATIENT_TODAY) errors.neededBy = "Date can't be in the past"
  if (!form.hospital) errors.hospital = "Pick the hospital"

  return errors
}

export const fromBloodRequestValues = (form: PatientBloodRequestValues): PatientBloodRequest => ({
  id: `pbr${Date.now()}`,
  bloodGroup: form.bloodGroup as BloodGroup,
  units: Number(form.units),
  neededBy: form.neededBy,
  hospital: form.hospital,
  bloodBank: "",
  emergency: form.emergency,
  note: form.note.trim(),
  requestedOn: PATIENT_TODAY,
  status: "pending",
})

// ---------- Medical records ----------

export const validateRecord = (form: PatientRecordValues): PatientRecordErrors => {
  const errors: PatientRecordErrors = {}

  if (!form.title.trim()) errors.title = "Title is required"
  if (!form.recordType) errors.recordType = "Pick a type"
  if (!form.date) errors.date = "Pick the report date"
  else if (form.date > PATIENT_TODAY) errors.date = "Date can't be in the future"
  if (!form.fileName) errors.fileName = "Choose a PDF or image"

  return errors
}

export const fromRecordValues = (form: PatientRecordValues): PatientRecord => ({
  id: `rec${Date.now()}`,
  title: form.title.trim(),
  recordType: form.recordType as PatientRecordType,
  date: form.date,
  fileName: form.fileName,
  addedBy: "patient",
  doctor: "",
})

// Type + "from" date, newest first
export const filterRecords = (records: PatientRecord[], recordType: string, fromDate: string) =>
  records
    .filter(
      (record) =>
        (recordType === PATIENT_ALL || record.recordType === recordType) && (!fromDate || record.date >= fromDate),
    )
    .sort((a, b) => b.date.localeCompare(a.date))

// ---------- Reviews ----------

// What the patient may review: completed visits (doctor + hospital), delivered blood, camps donated at.
// One review per visit and target; already reviewed ones are left out.
export const getReviewOptions = (
  appointments: PatientAppointment[],
  bloodRequests: PatientBloodRequest[],
  campVisits: PatientCampVisit[],
  reviews: PatientReview[],
): PatientReviewOption[] => {
  const options: PatientReviewOption[] = []

  appointments
    .filter((appointment) => appointment.status === "completed")
    .forEach((appointment) => {
      const visit = `visit on ${formatPatientDate(appointment.date)}`
      options.push({ key: `doctor-${appointment.id}`, target: "doctor", targetName: appointment.doctor, sourceId: appointment.id, label: `${appointment.doctor} (${visit})` })
      options.push({ key: `hospital-${appointment.id}`, target: "hospital", targetName: appointment.hospital, sourceId: appointment.id, label: `${appointment.hospital} (${visit})` })
    })

  bloodRequests
    .filter((request) => request.status === "delivered" && request.bloodBank)
    .forEach((request) => {
      options.push({ key: `bloodBank-${request.id}`, target: "bloodBank", targetName: request.bloodBank, sourceId: request.id, label: `${request.bloodBank} (${request.bloodGroup} delivered)` })
    })

  campVisits.forEach((visit) => {
    options.push({ key: `camp-${visit.id}`, target: "camp", targetName: visit.campName, sourceId: visit.id, label: `${visit.campName} (donated on ${formatPatientDate(visit.date)})` })
  })

  return options.filter((option) => !reviews.some((review) => review.target === option.target && review.sourceId === option.sourceId))
}

export const validateReview = (form: PatientReviewValues): PatientReviewErrors => {
  const errors: PatientReviewErrors = {}

  if (!form.optionKey) errors.optionKey = "Pick what you are reviewing"
  if (form.rating < 1 || form.rating > 5) errors.rating = "Give 1 to 5 stars"
  if (form.comment.trim().length < PATIENT_REVIEW_MIN) errors.comment = `Write at least ${PATIENT_REVIEW_MIN} characters`

  return errors
}

// New reviews always wait for the admin
export const fromReviewValues = (form: PatientReviewValues, options: PatientReviewOption[]): PatientReview => {
  const option = options.find((item) => item.key === form.optionKey)

  return {
    id: `pr${Date.now()}`,
    target: option?.target ?? "doctor",
    targetName: option?.targetName ?? "",
    sourceId: option?.sourceId ?? "",
    rating: form.rating,
    comment: form.comment.trim(),
    postedOn: PATIENT_TODAY,
    status: "pending",
  }
}
