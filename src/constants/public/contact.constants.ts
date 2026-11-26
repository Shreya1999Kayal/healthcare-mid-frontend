import type {
  CallbackFormValues,
  CompanyDetails,
  ContactFormConfig,
  ContactFormValues,
} from "../../types/type/public/Contact.type"

export const feedbackForm: ContactFormConfig = {
  id: "feedback",
  tabLabel: "Feedback / Complaints",
  typeLabel: "Type of Feedback",
  typePlaceholder: "Select Type of Feedback",
  typeOptions: ["Complaints", "Compliments"],
  messageLabel: "Feedback",
}

export const queryForm: ContactFormConfig = {
  id: "queries",
  tabLabel: "Queries",
  typeLabel: "Type of Query",
  typePlaceholder: "Select Type of Query",
  typeOptions: ["Appointment", "Enquiry", "Doctor opinion", "Request for surgery estimate", "Others"],
  messageLabel: "Query",
}

export const contactTabs: ContactFormConfig[] = [feedbackForm, queryForm]

// Replace with the hospitals from your hospital constants file if you want
export const contactHospitals: string[] = [
  "Seva City Hospital",
  "Seva Heart Institute",
  "Seva Children's Hospital",
  "Seva Care Centre",
]

// Placeholder details: put Seva's real ones here
export const companyDetails: CompanyDetails = {
  name: "Seva Healthcare Ltd.",
  address: "Seva Tower, Health Park, Main Road, Your City - 000000",
  appointmentPhone: "For Appointment Related Queries - 1800 000 0000",
  corporatePhones: "Corporate Office - +91-000 0000000 / +91-000 0000001",
  emails: [
    { label: "For feedback/complaints please write to:", email: "feedback@seva.com" },
    { label: "For general/business related queries contact:", email: "contact@seva.com" },
    { label: "For blood bank related queries contact:", email: "blood@seva.com" },
  ],
}

export const initialContactForm: ContactFormValues = {
  type: "",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  hospital: "",
  message: "",
}

export const initialCallbackForm: CallbackFormValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  hospital: "",
  comments: "",
}