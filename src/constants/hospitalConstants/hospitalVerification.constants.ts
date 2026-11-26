import type {
  HospitalAccount,
  VerificationDocumentConfig,
  VerificationDocuments,
  VerificationField,
  VerificationFormValues,
  VerificationStatus,
  VerificationStatusStyle,
} from "../../types/type/hospitalType/HospitalVerification.type"

// The only sidebar section that opens before the admin approves
export const VERIFICATION_SECTION = "verification"

export const HOSPITAL_LOCKED_MESSAGE =
  "Wait for the admin to verify and approve your hospital. Other sections open after approval."

export const verificationStatusStyles: Record<VerificationStatus, VerificationStatusStyle> = {
  "not-submitted": {
    label: "Not submitted",
    className: "bg-slate-100 text-slate-600",
    description: "Fill in the hospital details and upload the documents to send for verification.",
  },
  pending: {
    label: "Under review",
    className: "bg-amber-50 text-amber-700",
    description: "The admin is checking your hospital details. This usually takes 2 to 3 working days.",
  },
  approved: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700",
    description: "Your hospital is verified. All sections of the dashboard are open.",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    description: "Your verification was not approved. Read the reason, fix the details and resubmit.",
  },
}

export const hospitalTypeOptions = [
  "Multi-speciality", "General", "Children's hospital", "Maternity", "Eye hospital",
  "Cancer centre", "Heart institute", "Nursing home",
]
export const ownershipOptions = ["Private", "Government", "Trust / NGO"]

export const hospitalFields: VerificationField[] = [
  { name: "hospitalName", label: "Hospital name", required: true, placeholder: "e.g. Seva City Hospital" },
  { name: "registrationNo", label: "Registration number", required: true, placeholder: "e.g. WB-HOSP-2010-0042" },
  { name: "hospitalType", label: "Hospital type", required: true, options: hospitalTypeOptions },
  { name: "ownership", label: "Ownership", required: true, options: ownershipOptions },
  { name: "establishedYear", label: "Established year", required: true, type: "number", placeholder: "e.g. 2005" },
  { name: "totalBeds", label: "Total beds", required: true, type: "number" },
]

export const contactFields: VerificationField[] = [
  { name: "contactPerson", label: "Contact person", required: true, placeholder: "Hospital admin name" },
  { name: "email", label: "Email", required: true, type: "email", placeholder: "admin@hospital.com" },
  { name: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 33 4000 0000" },
  { name: "emergencyPhone", label: "Emergency phone", required: true, type: "tel", placeholder: "+91 98300 00000" },
  { name: "city", label: "City", required: true },
  { name: "pincode", label: "Pincode", required: true, placeholder: "700016" },
  { name: "address", label: "Full address", required: true, type: "textarea", fullWidth: true },
]

export const verificationDocuments: VerificationDocumentConfig[] = [
  { key: "registrationCertificate", title: "Registration certificate", hint: "Clinical establishment registration from the state", required: true },
  { key: "nabhCertificate", title: "NABH certificate", hint: "Accreditation certificate, if the hospital has one", required: false },
  { key: "fireSafetyCertificate", title: "Fire safety certificate", hint: "Valid fire NOC from the fire department", required: true },
]

export const emptyVerificationForm: VerificationFormValues = {
  hospitalName: "", registrationNo: "", hospitalType: "", ownership: "", establishedYear: "", totalBeds: "",
  contactPerson: "", email: "", phone: "", emergencyPhone: "", city: "", pincode: "", address: "",
}

export const emptyVerificationDocuments: VerificationDocuments = {
  registrationCertificate: { fileName: "", uploadedOn: "" },
  nabhCertificate: { fileName: "", uploadedOn: "" },
  fireSafetyCertificate: { fileName: "", uploadedOn: "" },
}

// Placeholder hospitals (replace with the logged-in hospital from the API later)
export const hospitalAccounts: HospitalAccount[] = [
  {
    id: "h1",
    name: "Seva City Hospital",
    city: "Kolkata",
    verification: {
      status: "approved",
      submittedOn: "01 Nov 2026",
      reviewedOn: "04 Nov 2026",
      adminRemarks: "",
      details: {
        hospitalName: "Seva City Hospital", registrationNo: "WB-HOSP-2010-0042", hospitalType: "Multi-speciality",
        ownership: "Private", establishedYear: "2010", totalBeds: "185", contactPerson: "Anirban Ghosh",
        email: "admin@sevacity.in", phone: "+91 33 4000 1234", emergencyPhone: "+91 98300 11122",
        city: "Kolkata", pincode: "700016", address: "22 Park Street, Kolkata",
      },
      documents: {
        registrationCertificate: { fileName: "registration.pdf", uploadedOn: "01 Nov 2026" },
        nabhCertificate: { fileName: "nabh.pdf", uploadedOn: "01 Nov 2026" },
        fireSafetyCertificate: { fileName: "fire-noc.pdf", uploadedOn: "01 Nov 2026" },
      },
    },
  },
  {
    id: "h2",
    name: "Green Cross Medical Centre",
    city: "Kolkata",
    verification: {
      status: "pending",
      submittedOn: "18 Nov 2026",
      reviewedOn: "",
      adminRemarks: "",
      details: {
        hospitalName: "Green Cross Medical Centre", registrationNo: "WB-HOSP-2015-0187", hospitalType: "General",
        ownership: "Trust / NGO", establishedYear: "2015", totalBeds: "90", contactPerson: "Mousumi Pal",
        email: "info@greencross.in", phone: "+91 33 4100 5678", emergencyPhone: "+91 98311 44556",
        city: "Kolkata", pincode: "700091", address: "Salt Lake Sector V, Kolkata",
      },
      documents: {
        registrationCertificate: { fileName: "gc-registration.pdf", uploadedOn: "18 Nov 2026" },
        nabhCertificate: { fileName: "", uploadedOn: "" },
        fireSafetyCertificate: { fileName: "gc-fire-noc.pdf", uploadedOn: "18 Nov 2026" },
      },
    },
  },
  {
    id: "h3",
    name: "Little Steps Children's Hospital",
    city: "Kolkata",
    verification: {
      status: "rejected",
      submittedOn: "09 Nov 2026",
      reviewedOn: "13 Nov 2026",
      adminRemarks: "The fire safety certificate expired in 2025. Please upload a valid fire NOC.",
      details: {
        hospitalName: "Little Steps Children's Hospital", registrationNo: "WB-HOSP-2018-0310", hospitalType: "Children's hospital",
        ownership: "Private", establishedYear: "2018", totalBeds: "60", contactPerson: "Dr. Kavita Shah",
        email: "care@littlesteps.in", phone: "+91 33 4200 9988", emergencyPhone: "+91 98100 22334",
        city: "Kolkata", pincode: "700089", address: "8 Lake Town, Kolkata",
      },
      documents: {
        registrationCertificate: { fileName: "ls-registration.pdf", uploadedOn: "09 Nov 2026" },
        nabhCertificate: { fileName: "", uploadedOn: "" },
        fireSafetyCertificate: { fileName: "fire-noc-2025.pdf", uploadedOn: "09 Nov 2026" },
      },
    },
  },
  {
    id: "h4",
    name: "New Life Hospital",
    city: "Howrah",
    verification: {
      status: "not-submitted",
      submittedOn: "",
      reviewedOn: "",
      adminRemarks: "",
      details: emptyVerificationForm,
      documents: emptyVerificationDocuments,
    },
  },
]