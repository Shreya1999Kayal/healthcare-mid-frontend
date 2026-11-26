import type { AdminApplicantRole, AdminApplication, AdminReviewDecision } from "../../type/adminType/AdminVerification.type"

export interface AdminVerificationPanelProps {
  title: string
  subtitle: string
  roles: AdminApplicantRole[] // more than one role = role filter is shown
}

export interface AdminApplicationsTableProps {
  applications: AdminApplication[]
  showRole: boolean
  onOpen: (applicationId: string) => void
}

export interface AdminReviewModalProps {
  application: AdminApplication
  onReview: (decision: AdminReviewDecision, remarks: string) => void
  onClose: () => void
}
