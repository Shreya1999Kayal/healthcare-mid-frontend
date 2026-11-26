import type { DonorAccount, DonorDocumentConfig, DonorDocuments, DonorField, DonorFieldName, DonorVerificationStatus, DonorVerificationStatusStyle, DonorVerificationValues } from "../../../types/type/blood/donorType/DonorVerification.type"
import { bloodGroups } from "../../public/bloods.constants"


// The only sidebar section that opens before the admin approves
export const DONOR_VERIFICATION_SECTION = "verification"

export const DONOR_LOCKED_MESSAGE = "Wait for the admin to verify and approve your account. Other sections open after approval."

export const donorStatusStyles: Record<DonorVerificationStatus, DonorVerificationStatusStyle> = {
  "not-submitted": {
    label: "Not submitted",
    className: "bg-slate-100 text-slate-600",
    description: "Fill in your details and upload the documents to send for verification.",
  },
  pending: {
    label: "Under review",
    className: "bg-amber-50 text-amber-700",
    description: "The admin is checking your details. This usually takes 1 to 2 working days.",
  },
  approved: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700",
    description: "You are a verified donor. All sections of the dashboard are open.",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    description: "Your verification was not approved. Read the reason, fix the details and resubmit.",
  },
}

export const genderOptions = ["Female", "Male", "Other"]

export const donorPersonalFields: DonorField<DonorFieldName>[] = [
  { name: "fullName", label: "Full name", required: true, placeholder: "As on your ID" },
  { name: "dateOfBirth", label: "Date of birth", required: true, type: "date" },
  { name: "gender", label: "Gender", required: true, options: genderOptions },
  { name: "bloodGroup", label: "Blood group", required: true, options: bloodGroups },
  { name: "weight", label: "Weight (kg)", required: true, type: "number", placeholder: "e.g. 62" },
]

export const donorContactFields: DonorField<DonorFieldName>[] = [
  { name: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 98300 00000" },
  { name: "email", label: "Email", required: true, type: "email", placeholder: "you@email.com" },
  { name: "city", label: "City / area", required: true },
  { name: "pincode", label: "Pincode", required: true, placeholder: "700091" },
  { name: "address", label: "Full address", required: true, type: "textarea", fullWidth: true },
]

export const donorDocuments: DonorDocumentConfig[] = [
  { key: "identityProof", title: "Identity proof", hint: "Aadhaar, PAN or voter ID", required: true },
  { key: "bloodGroupReport", title: "Blood group report", hint: "Lab report that shows your blood group", required: true },
]

export const emptyDonorVerification: DonorVerificationValues = {
  fullName: "", dateOfBirth: "", gender: "", bloodGroup: "", weight: "", phone: "", email: "", city: "", pincode: "", address: "",
}

export const emptyDonorDocuments: DonorDocuments = {
  identityProof: { fileName: "", uploadedOn: "" },
  bloodGroupReport: { fileName: "", uploadedOn: "" },
}

// Placeholder donors (replace with the logged-in donor from the API later). Ids match donorsList.
export const donorAccounts: DonorAccount[] = [
  {
    id: "d1",
    name: "Rahul Sen",
    city: "Salt Lake",
    bloodGroup: "O+",
    verification: {
      status: "approved",
      submittedOn: "02 Jan 2025",
      reviewedOn: "03 Jan 2025",
      adminRemarks: "",
      details: {
        fullName: "Rahul Sen", dateOfBirth: "1994-06-18", gender: "Male", bloodGroup: "O+", weight: "72",
        phone: "+91 98300 12345", email: "rahul.sen@email.com", city: "Salt Lake", pincode: "700091", address: "BE Block, Salt Lake, Kolkata",
      },
      documents: {
        identityProof: { fileName: "aadhaar.pdf", uploadedOn: "02 Jan 2025" },
        bloodGroupReport: { fileName: "blood-group.pdf", uploadedOn: "02 Jan 2025" },
      },
    },
  },
  {
    id: "d8",
    name: "Meera Thakur",
    city: "Park Circus",
    bloodGroup: "O+",
    verification: {
      status: "approved",
      submittedOn: "10 Jan 2026",
      reviewedOn: "11 Jan 2026",
      adminRemarks: "",
      details: {
        fullName: "Meera Thakur", dateOfBirth: "1998-02-03", gender: "Female", bloodGroup: "O+", weight: "56",
        phone: "+91 98311 22334", email: "meera.t@email.com", city: "Park Circus", pincode: "700017", address: "Park Circus, Kolkata",
      },
      documents: {
        identityProof: { fileName: "voter-id.pdf", uploadedOn: "10 Jan 2026" },
        bloodGroupReport: { fileName: "report.pdf", uploadedOn: "10 Jan 2026" },
      },
    },
  },
  {
    id: "d2",
    name: "Ananya Mukherjee",
    city: "Park Street",
    bloodGroup: "A+",
    verification: {
      status: "pending",
      submittedOn: "22 Nov 2026",
      reviewedOn: "",
      adminRemarks: "",
      details: {
        fullName: "Ananya Mukherjee", dateOfBirth: "2000-09-12", gender: "Female", bloodGroup: "A+", weight: "54",
        phone: "+91 98100 55667", email: "ananya.m@email.com", city: "Park Street", pincode: "700016", address: "Park Street, Kolkata",
      },
      documents: {
        identityProof: { fileName: "aadhaar.pdf", uploadedOn: "22 Nov 2026" },
        bloodGroupReport: { fileName: "lab-report.pdf", uploadedOn: "22 Nov 2026" },
      },
    },
  },
  {
    id: "d6",
    name: "Neha Roy",
    city: "Salt Lake",
    bloodGroup: "A-",
    verification: {
      status: "rejected",
      submittedOn: "15 Nov 2026",
      reviewedOn: "17 Nov 2026",
      adminRemarks: "The blood group report is not readable. Upload a clear copy of the lab report.",
      details: {
        fullName: "Neha Roy", dateOfBirth: "1996-12-01", gender: "Female", bloodGroup: "A-", weight: "58",
        phone: "+91 98741 88990", email: "neha.roy@email.com", city: "Salt Lake", pincode: "700064", address: "CK Block, Salt Lake, Kolkata",
      },
      documents: {
        identityProof: { fileName: "pan.pdf", uploadedOn: "15 Nov 2026" },
        bloodGroupReport: { fileName: "blurry-report.jpg", uploadedOn: "15 Nov 2026" },
      },
    },
  },
  {
    id: "d3",
    name: "Imran Khan",
    city: "Howrah",
    bloodGroup: "B+",
    verification: {
      status: "not-submitted",
      submittedOn: "",
      reviewedOn: "",
      adminRemarks: "",
      details: emptyDonorVerification,
      documents: emptyDonorDocuments,
    },
  },
]