import type { AdminStatusStyle } from "../../types/type/adminType/AdminDashboard.type"
import type {
  AdminApplicantRole,
  AdminApplication,
  AdminVerificationStatus,
} from "../../types/type/adminType/AdminVerification.type"

export const ADMIN_ALL_ROLES = "all"

export const ADMIN_REJECT_MIN_LENGTH = 10

export const adminVerificationTabs: { value: AdminVerificationStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export const adminVerificationStatusStyles: Record<AdminVerificationStatus, AdminStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
}

export const adminRoleLabels: Record<AdminApplicantRole, string> = {
  doctor: "Doctor",
  hospital: "Hospital",
  bloodBank: "Blood bank",
  camp: "Camp organiser",
  donor: "Donor",
}

// Placeholder data, replace with verificationController data later
export const adminApplications: AdminApplication[] = [
  // doctors
  {
    id: "ap1", applicantId: "d1", name: "Dr. Leslie Alexander", city: "Kolkata", role: "doctor", status: "pending",
    submittedOn: "2026-11-24", reviewedOn: "", adminRemarks: "",
    details: [
      { label: "Doctor ID", value: "DOC-1021" },
      { label: "Registration no", value: "WBMC-45821" },
      { label: "Medical council", value: "West Bengal Medical Council" },
      { label: "Specialisation", value: "General Medicine" },
      { label: "Qualification", value: "MBBS, MD" },
      { label: "Medical college", value: "Calcutta Medical College" },
      { label: "Passout year", value: "2012" },
      { label: "Blood group", value: "B+" },
      { label: "Phone", value: "9830012001" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "registration-leslie.pdf" },
      { title: "Aadhaar (identity proof)", fileName: "aadhaar-leslie.pdf" },
      { title: "Experience certificate", fileName: "" },
    ],
  },
  {
    id: "ap2", applicantId: "d2", name: "Dr. Amit Roy", city: "Howrah", role: "doctor", status: "approved",
    submittedOn: "2026-11-18", reviewedOn: "2026-11-19", adminRemarks: "",
    details: [
      { label: "Doctor ID", value: "DOC-1008" },
      { label: "Registration no", value: "WBMC-39012" },
      { label: "Specialisation", value: "Cardiology" },
      { label: "Qualification", value: "MBBS, DM" },
      { label: "Medical college", value: "NRS Medical College" },
      { label: "Passout year", value: "2009" },
      { label: "Blood group", value: "O+" },
      { label: "Phone", value: "9830012002" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "registration-amit.pdf" },
      { title: "Aadhaar (identity proof)", fileName: "aadhaar-amit.pdf" },
      { title: "Experience certificate", fileName: "experience-amit.pdf" },
    ],
  },
  {
    id: "ap3", applicantId: "d3", name: "Dr. Kavita Shah", city: "Kolkata", role: "doctor", status: "rejected",
    submittedOn: "2026-11-15", reviewedOn: "2026-11-16", adminRemarks: "Aadhaar image is not clear. Upload a clear copy.",
    details: [
      { label: "Doctor ID", value: "DOC-1033" },
      { label: "Specialisation", value: "Paediatrics" },
      { label: "Qualification", value: "MBBS, DCH" },
      { label: "Medical college", value: "IPGMER" },
      { label: "Passout year", value: "2015" },
      { label: "Phone", value: "9830012003" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "registration-kavita.pdf" },
      { title: "Aadhaar (identity proof)", fileName: "aadhaar-kavita.jpg" },
    ],
  },

  // hospitals
  {
    id: "ap4", applicantId: "h2", name: "Green Valley Hospital", city: "Durgapur", role: "hospital", status: "pending",
    submittedOn: "2026-11-25", reviewedOn: "", adminRemarks: "",
    details: [
      { label: "Registration no", value: "HOS-WB-2291" },
      { label: "Hospital type", value: "Multi-speciality" },
      { label: "Ownership", value: "Private" },
      { label: "Established", value: "2004" },
      { label: "Total beds", value: "180" },
      { label: "Contact person", value: "Suman Ghosh" },
      { label: "Phone", value: "9830013001" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "reg-greenvalley.pdf" },
      { title: "NABH certificate", fileName: "nabh-greenvalley.pdf" },
      { title: "Fire safety certificate", fileName: "fire-greenvalley.pdf" },
    ],
  },
  {
    id: "ap5", applicantId: "h1", name: "Seva City Hospital", city: "Kolkata", role: "hospital", status: "approved",
    submittedOn: "2026-11-10", reviewedOn: "2026-11-12", adminRemarks: "",
    details: [
      { label: "Registration no", value: "HOS-WB-1104" },
      { label: "Hospital type", value: "Multi-speciality" },
      { label: "Total beds", value: "320" },
      { label: "Phone", value: "9830013002" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "reg-sevacity.pdf" },
      { title: "NABH certificate", fileName: "nabh-sevacity.pdf" },
      { title: "Fire safety certificate", fileName: "fire-sevacity.pdf" },
    ],
  },

  // blood banks and camps
  {
    id: "ap6", applicantId: "bb2", name: "Lifeline Blood Bank", city: "Kolkata", role: "bloodBank", status: "pending",
    submittedOn: "2026-11-23", reviewedOn: "", adminRemarks: "",
    details: [
      { label: "Licence no", value: "BB-LIC-7781" },
      { label: "Bank type", value: "Private" },
      { label: "Linked hospital", value: "Seva City Hospital" },
      { label: "Medical officer", value: "Dr. P. Banerjee" },
      { label: "Phone", value: "9830014001" },
    ],
    documents: [
      { title: "Licence", fileName: "licence-lifeline.pdf" },
      { title: "Registration certificate", fileName: "reg-lifeline.pdf" },
      { title: "Address proof", fileName: "address-lifeline.pdf" },
      { title: "NBTC certificate", fileName: "" },
    ],
  },
  {
    id: "ap7", applicantId: "c1", name: "Rotary Blood Camp", city: "Salt Lake", role: "camp", status: "pending",
    submittedOn: "2026-11-25", reviewedOn: "", adminRemarks: "",
    details: [
      { label: "Organiser", value: "Rotary Club Salt Lake" },
      { label: "Linked blood bank", value: "Lifeline Blood Bank" },
      { label: "Contact person", value: "Ritu Sen" },
      { label: "Phone", value: "9830014002" },
    ],
    documents: [
      { title: "Registration certificate", fileName: "reg-rotary.pdf" },
      { title: "Address proof", fileName: "address-rotary.pdf" },
    ],
  },
  {
    id: "ap8", applicantId: "c2", name: "Youth Donor Camp", city: "Howrah", role: "camp", status: "rejected",
    submittedOn: "2026-11-14", reviewedOn: "2026-11-15", adminRemarks: "No linked licensed blood bank. Add one and send again.",
    details: [
      { label: "Organiser", value: "Howrah Youth Club" },
      { label: "Phone", value: "9830014003" },
    ],
    documents: [{ title: "Registration certificate", fileName: "reg-youth.pdf" }],
  },

  // donors
  {
    id: "ap9", applicantId: "dn1", name: "Rahul Sen", city: "Kolkata", role: "donor", status: "pending",
    submittedOn: "2026-11-26", reviewedOn: "", adminRemarks: "",
    details: [
      { label: "Date of birth", value: "1994-05-12" },
      { label: "Gender", value: "Male" },
      { label: "Blood group", value: "O-" },
      { label: "Weight", value: "68 kg" },
      { label: "Last donation", value: "2026-07-02" },
      { label: "Phone", value: "9830015001" },
    ],
    documents: [
      { title: "Aadhaar (identity proof)", fileName: "aadhaar-rahul.pdf" },
      { title: "Blood group report", fileName: "bloodgroup-rahul.pdf" },
    ],
  },
  {
    id: "ap10", applicantId: "dn2", name: "Priya Das", city: "Howrah", role: "donor", status: "approved",
    submittedOn: "2026-11-20", reviewedOn: "2026-11-21", adminRemarks: "",
    details: [
      { label: "Blood group", value: "A+" },
      { label: "Weight", value: "55 kg" },
      { label: "Phone", value: "9830015002" },
    ],
    documents: [
      { title: "Aadhaar (identity proof)", fileName: "aadhaar-priya.pdf" },
      { title: "Blood group report", fileName: "bloodgroup-priya.pdf" },
    ],
  },
]
