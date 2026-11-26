import { ADMIN_ALL_ROLES, ADMIN_REJECT_MIN_LENGTH } from "../../../constants/adminConstants/adminVerification.constants"
import type {
  AdminApplicantRole,
  AdminApplication,
  AdminVerificationStatus,
} from "../../../types/type/adminType/AdminVerification.type"

// Applications of these roles with this status
export const countApplications = (
  applications: AdminApplication[],
  roles: AdminApplicantRole[],
  status: AdminVerificationStatus,
) => applications.filter((application) => roles.includes(application.role) && application.status === status).length

// Badge number for one sidebar link (links without roles get no badge)
export const countPendingForLink = (applications: AdminApplication[], roles?: AdminApplicantRole[]) =>
  roles ? countApplications(applications, roles, "pending") : 0

// Page roles + tab + search (name, city or account id) + role filter
export const filterApplications = (
  applications: AdminApplication[],
  roles: AdminApplicantRole[],
  tab: AdminVerificationStatus,
  search: string,
  role: string,
) => {
  const text = search.trim().toLowerCase()

  return applications.filter((application) => {
    const matchesPage = roles.includes(application.role)
    const matchesTab = application.status === tab
    const matchesRole = role === ADMIN_ALL_ROLES || application.role === role
    const matchesSearch =
      !text ||
      application.name.toLowerCase().includes(text) ||
      application.city.toLowerCase().includes(text) ||
      application.applicantId.toLowerCase().includes(text)

    return matchesPage && matchesTab && matchesRole && matchesSearch
  })
}

// Newest first ("yyyy-mm-dd" strings can be compared directly)
export const sortApplications = (applications: AdminApplication[]) =>
  [...applications].sort((a, b) => b.submittedOn.localeCompare(a.submittedOn))

// Empty string = no error
export const validateRejectReason = (reason: string) => {
  const text = reason.trim()
  if (!text) return "Write the reason for rejecting"
  if (text.length < ADMIN_REJECT_MIN_LENGTH) return `Write at least ${ADMIN_REJECT_MIN_LENGTH} characters`
  return ""
}
