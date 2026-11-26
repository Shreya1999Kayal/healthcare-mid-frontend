// The admin only sees sent applications, so no "not-submitted" here
export type AdminVerificationStatus = "pending" | "approved" | "rejected"

export type AdminReviewDecision = "approved" | "rejected"

export type AdminApplicantRole = "doctor" | "hospital" | "bloodBank" | "camp" | "donor"

// One row in the "Details" part of the review modal
export type AdminDetail = {
  label: string
  value: string
}

export type AdminDocument = {
  title: string
  fileName: string // empty when not uploaded
}

export type AdminApplication = {
  id: string
  applicantId: string // id of the doctor / hospital / bank / donor account
  name: string
  city: string
  role: AdminApplicantRole
  status: AdminVerificationStatus
  submittedOn: string // yyyy-mm-dd
  reviewedOn: string // empty until reviewed
  adminRemarks: string // reason the applicant sees when rejected
  details: AdminDetail[]
  documents: AdminDocument[]
}
