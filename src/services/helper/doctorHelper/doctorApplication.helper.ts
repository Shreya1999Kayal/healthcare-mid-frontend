import { DOCTOR_TODAY } from "../../../constants/doctorConstants/doctorDashboard.constants"
import { APPLICATION_SECTION, applicationDocuments, personalFields, professionalFields } from "../../../constants/doctorConstants/doctorApplication.constants"
import type { ApplicationDocuments, ApplicationFormErrors, ApplicationFormValues, ApplicationStatus } from "../../../types/type/doctorType/DoctorApplication.type"

const currentYear = Number(DOCTOR_TODAY.slice(0, 4))

export const isApproved = (status: ApplicationStatus) => status === "approved"

// Before approval every section except Application is locked
export const isSectionLocked = (section: string, status: ApplicationStatus) =>
  !isApproved(status) && section !== APPLICATION_SECTION

// The form can be filled before sending it, or again after a rejection
export const canEditApplication = (status: ApplicationStatus) => status === "not-submitted" || status === "rejected"

export const validateApplication = (form: ApplicationFormValues, documents: ApplicationDocuments): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {}

  for (const field of [...professionalFields, ...personalFields]) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  for (const document of applicationDocuments) {
    if (document.required && !documents[document.key].fileName) errors[document.key] = `Upload your ${document.title.toLowerCase()}`
  }

  const passoutYear = Number(form.passoutYear)
  if (form.passoutYear && (Number.isNaN(passoutYear) || passoutYear < 1960 || passoutYear > currentYear)) {
    errors.passoutYear = `Enter a year between 1960 and ${currentYear}`
  }

  const experience = Number(form.experience)
  if (form.experience) {
    if (experience < 0) errors.experience = "Experience can't be negative"
    else if (passoutYear && experience > currentYear - passoutYear) errors.experience = "Experience can't be more than the years since you passed out"
  }

  if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errors.phone = "Enter a 10-digit phone number" 

  return errors
}