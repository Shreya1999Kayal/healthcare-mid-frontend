import type { DoctorTabOption } from "../../types/type/doctorType/DoctorAppointments.type"
import type { DoctorReview, ReviewSort, ReviewStarFilter } from "../../types/type/doctorType/DoctorReviews.type"

export const reviewSortOptions: { value: ReviewSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "highest", label: "Highest rating" },
  { value: "lowest", label: "Lowest rating" },
]

export const reviewStarTabs: DoctorTabOption<ReviewStarFilter>[] = [
  { id: "all", label: "All" },
  { id: "5", label: "5 ★" },
  { id: "4", label: "4 ★" },
  { id: "3", label: "3 ★" },
  { id: "2", label: "2 ★" },
  { id: "1", label: "1 ★" },
]

// Placeholder data, every appointmentId is a completed visit in doctorAppointments
export const doctorReviews: DoctorReview[] = [
  { id: "r1", doctorId: "d1", appointmentId: "a2", patientId: "p2", patient: "Ananya Mitra", chamberId: "ch1", rating: 5, comment: "Listened patiently and explained what was causing the rash. The cream worked in two days.", date: "2026-11-19", status: "approved" },
  { id: "r2", doctorId: "d1", appointmentId: "a13", patientId: "p1", patient: "Rahul Sen", chamberId: "ch1", rating: 4, comment: "Good advice for the flu. Had to wait about 20 minutes past my slot.", date: "2026-11-13", status: "approved" },
  { id: "r3", doctorId: "d1", appointmentId: "a17", patientId: "p7", patient: "Arjun Paul", chamberId: "ch2", rating: 4, comment: "Clear diet plan for my sugar. Very practical suggestions.", date: "2026-11-09", status: "approved" },
  { id: "r4", doctorId: "d1", appointmentId: "a14", patientId: "p3", patient: "Imran Khan", chamberId: "ch1", rating: 5, comment: "I was scared it was my heart. Doctor checked everything and calmed me down.", date: "2026-11-06", status: "approved" },
  { id: "r5", doctorId: "d1", appointmentId: "a18", patientId: "p8", patient: "Meera Bose", chamberId: "ch3", rating: 5, comment: "Very gentle with my daughter. She was not scared at all.", date: "2026-11-02", status: "approved" },
  { id: "r6", doctorId: "d1", appointmentId: "a15", patientId: "p4", patient: "Priya Das", chamberId: "ch1", rating: 3, comment: "Helpful treatment, but the clinic was crowded and the visit felt rushed.", date: "2026-10-30", status: "approved" },
  // Not shown to the doctor: still waiting for the admin, or rejected
  { id: "r7", doctorId: "d1", appointmentId: "a2", patientId: "p2", patient: "Ananya Mitra", chamberId: "ch1", rating: 2, comment: "Waited two hours past my slot.", date: "2026-11-25", status: "pending" },
  { id: "r8", doctorId: "d1", appointmentId: "a13", patientId: "p1", patient: "Rahul Sen", chamberId: "ch1", rating: 1, comment: "Spam link removed by admin", date: "2026-11-20", status: "rejected" },
]
