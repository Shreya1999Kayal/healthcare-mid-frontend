export type ContactTabId = "feedback" | "queries"

export type ContactFormConfig = {
  id: ContactTabId
  tabLabel: string
  typeLabel: string
  typePlaceholder: string
  typeOptions: string[]
  messageLabel: string
}

export type ContactFormValues = {
  type: string
  firstName: string
  lastName: string
  mobile: string
  email: string
  hospital: string
  message: string
}

export type CallbackFormValues = {
  firstName: string
  lastName: string
  mobile: string
  email: string
  hospital: string
  comments: string
}

export type CompanyEmail = {
  label: string
  email: string
}

export type CompanyDetails = {
  name: string
  address: string
  appointmentPhone: string
  corporatePhones: string
  emails: CompanyEmail[]
}