import type { BloodBankReview, ReviewStarFilter } from "../../../types/type/blood/bloodBankType/BloodBankReview.type"

// Placeholder data, replace with real data from the API later
export const bloodBankReviews: BloodBankReview[] = [
  { id: "rv1", bankId: "bb1", patient: "Anita Sen", rating: 5, comment: "Blood was ready within an hour for my father's surgery.", date: "2026-11-22", status: "approved" },
  { id: "rv2", bankId: "bb1", patient: "Rahul Das", rating: 4, comment: "Helpful staff, the process was clear.", date: "2026-11-18", status: "approved" },
  { id: "rv3", bankId: "bb1", patient: "Sneha Roy", rating: 5, comment: "They picked up the phone at 2 AM and arranged O- units.", date: "2026-11-12", status: "approved" },
  { id: "rv4", bankId: "bb2", patient: "Amit Ghosh", rating: 3, comment: "Good service, but we waited a while at the counter.", date: "2026-11-05", status: "approved" },
  { id: "rv5", bankId: "bc1", patient: "Priya Mitra", rating: 5, comment: "Clean, organised camp and very quick.", date: "2026-10-28", status: "approved" },
  { id: "rv6", bankId: "bc1", patient: "Sourav Paul", rating: 4, comment: "Volunteers explained everything before donation.", date: "2026-10-15", status: "approved" },
  // Not shown: waiting for the admin, or rejected
  { id: "rv7", bankId: "bb1", patient: "Kabir Sinha", rating: 1, comment: "Rude staff.", date: "2026-11-25", status: "pending" },
  { id: "rv8", bankId: "bc1", patient: "Anonymous", rating: 1, comment: "Spam link", date: "2026-11-20", status: "rejected" },
]

export const reviewStarTabs: { value: ReviewStarFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
]

