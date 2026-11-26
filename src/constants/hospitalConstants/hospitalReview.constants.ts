import type { HospitalReview, HospitalReviewStarFilter } from "../../types/type/hospitalType/HospitalReview.type"

export const hospitalReviewStarTabs: { value: HospitalReviewStarFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
]

// Placeholder data, replace with real data from the API later
export const hospitalReviews: HospitalReview[] = [
  { id: "hr1", hospitalId: "h1", patient: "Rahul Sen", department: "General Medicine", rating: 5, comment: "Clean wards and the nurses checked on me often.", date: "2026-11-22", status: "approved" },
  { id: "hr2", hospitalId: "h1", patient: "Imran Khan", department: "Cardiology", rating: 4, comment: "Quick ECG and clear explanation from the doctor.", date: "2026-11-18", status: "approved" },
  { id: "hr3", hospitalId: "h1", patient: "Priya Das", department: "General Medicine", rating: 3, comment: "Good treatment, but the billing counter was slow.", date: "2026-11-10", status: "approved" },
  { id: "hr4", hospitalId: "h1", patient: "Meera Bose", department: "Paediatrics", rating: 5, comment: "The children's ward staff were very kind.", date: "2026-11-03", status: "approved" },
  { id: "hr5", hospitalId: "h2", patient: "Tania Dey", department: "Orthopaedics", rating: 4, comment: "Physiotherapy team was helpful.", date: "2026-11-01", status: "approved" },
  // Not shown: waiting for the admin, or rejected
  { id: "hr6", hospitalId: "h1", patient: "Kabir Sinha", department: "Emergency", rating: 1, comment: "Worst place ever, the staff are useless idiots.", date: "2026-11-25", status: "pending" },
  { id: "hr7", hospitalId: "h1", patient: "Anonymous", department: "General Medicine", rating: 1, comment: "Spam: buy cheap medicines at this link", date: "2026-11-19", status: "rejected" },
]
