import { doctorProfile } from "./doctorDashboard.constants"
import type {
  ApplicationDocumentConfig,
  ApplicationDocuments,
  ApplicationField,
  ApplicationFormValues,
  ApplicationStatus,
  ApplicationStatusStyle,
  DoctorAccount,
} from "../../types/type/doctorType/DoctorApplication.type"

// The only sidebar section that opens before the admin approves
export const APPLICATION_SECTION = "application"

export const LOCKED_MESSAGE = "Wait for the admin to verify and approve your application. Other sections open after approval."

export const applicationStatusStyles: Record<ApplicationStatus, ApplicationStatusStyle> = {
  "not-submitted": {
    label: "Not submitted",
    className: "bg-slate-100 text-slate-600",
    description: "Fill in your details and upload your documents to send the application.",
  },
  pending: {
    label: "Under review",
    className: "bg-amber-50 text-amber-700",
    description: "The admin is checking your application. This usually takes 2 to 3 working days.",
  },
  approved: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700",
    description: "Your application is approved. All sections of the dashboard are open.",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    description: "Your application was not approved. Read the reason, fix your details and resubmit.",
  },
}

export const specialisationOptions = [
  "General Medicine", "Gynaecology", "Neurology", "Cardiology", "Paediatrics", "Orthopaedics",
  "Dermatology", "ENT", "Ophthalmology", "Psychiatry", "Oncology", "Urology",
  "Gastroenterology", "Pulmonology", "Nephrology", "Endocrinology",
]

export const qualificationOptions = ["MBBS", "MBBS, MD", "MBBS, MS", "MBBS, DNB", "MBBS, DM", "MBBS, MCh", "BDS", "MDS", "BAMS", "BHMS"]

export const medicalCouncilOptions = [
  "National Medical Commission (NMC)", "West Bengal Medical Council", "Maharashtra Medical Council",
  "Delhi Medical Council", "Karnataka Medical Council", "Tamil Nadu Medical Council", "Other state council",
]

export const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
export const genderOptions = ["Male", "Female", "Other"]
export const idProofOptions = ["Aadhaar card", "PAN card", "Passport", "Voter ID", "Driving licence"]

export const professionalFields: ApplicationField[] = [
  { name: "doctorCode", label: "Doctor ID", required: true, placeholder: "e.g. SEVA-DOC-1042" },
  { name: "registrationNo", label: "Medical registration number", required: true, placeholder: "e.g. WBMC-2016-51190" },
  { name: "medicalCouncil", label: "Medical council", required: true, options: medicalCouncilOptions },
  { name: "specialisation", label: "Specialisation", required: true, options: specialisationOptions },
  { name: "qualification", label: "Qualification", required: true, options: qualificationOptions },
  { name: "medicalCollege", label: "Medical college name", required: true, placeholder: "e.g. Calcutta Medical College" },
  { name: "passoutYear", label: "Passout year", required: true, type: "number", placeholder: "e.g. 2015" },
  { name: "experience", label: "Experience (years)", required: true, type: "number" },
  { name: "currentHospital", label: "Current hospital / clinic", placeholder: "Leave empty if none" },
]

export const personalFields: ApplicationField[] = [
  { name: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 98300 00000" },
  { name: "gender", label: "Gender", required: true, options: genderOptions },
  { name: "dateOfBirth", label: "Date of birth", required: true, type: "date" },
  { name: "bloodGroup", label: "Blood group", required: true, options: bloodGroupOptions },
  { name: "idProofType", label: "Identity proof type", required: true, options: idProofOptions },
  { name: "address", label: "Address", required: true, type: "textarea", fullWidth: true },
]

export const applicationDocuments: ApplicationDocumentConfig[] = [
  { key: "registrationCertificate", title: "Doctor certificate", hint: "Medical registration certificate from NMC or your state council", required: true },
  { key: "identityProof", title: "Identity proof", hint: "Aadhaar card or the ID type you picked above", required: true },
  { key: "experienceCertificate", title: "Experience certificate", hint: "Letter from your last hospital, if any", required: false },
]

export const emptyApplicationForm: ApplicationFormValues = {
  doctorCode: "", registrationNo: "", medicalCouncil: "", specialisation: "", qualification: "",
  medicalCollege: "", passoutYear: "", experience: "", currentHospital: "", phone: "",
  gender: "", dateOfBirth: "", bloodGroup: "", idProofType: "", address: "",
}

export const emptyApplicationDocuments: ApplicationDocuments = {
  registrationCertificate: { fileName: "", uploadedOn: "" },
  identityProof: { fileName: "", uploadedOn: "" },
  experienceCertificate: { fileName: "", uploadedOn: "" },
}

// Placeholder doctors (replace with the logged-in doctor from the API later)
export const doctorAccounts: DoctorAccount[] = [
  {
    ...doctorProfile,
    id: "d1",
    application: {
      status: "approved",
      submittedOn: "02 Nov 2026",
      reviewedOn: "05 Nov 2026",
      adminRemarks: "",
      details: {
        doctorCode: "SEVA-DOC-1001", registrationNo: "WBMC-2012-48217", medicalCouncil: "West Bengal Medical Council",
        specialisation: "General Medicine", qualification: "MBBS, MD", medicalCollege: "Calcutta Medical College",
        passoutYear: "2010", experience: "12", currentHospital: "Seva City Hospital", phone: "+91 98300 55555",
        gender: "Female", dateOfBirth: "1986-04-12", bloodGroup: "B+", idProofType: "Aadhaar card",
        address: "12 Park Street, Kolkata 700016",
      },
      documents: {
        registrationCertificate: { fileName: "wbmc-registration.pdf", uploadedOn: "02 Nov 2026" },
        identityProof: { fileName: "aadhaar.pdf", uploadedOn: "02 Nov 2026" },
        experienceCertificate: { fileName: "experience-letter.pdf", uploadedOn: "02 Nov 2026" },
      },
    },
  },
  {
    id: "d2",
    name: "Dr. Ritwik Banerjee",
    speciality: "Neurology",
    image: "",
    registrationNo: "WBMC-2016-51190",
    rating: 0,
    reviewsCount: 0,
    application: {
      status: "pending",
      submittedOn: "17 Nov 2026",
      reviewedOn: "",
      adminRemarks: "",
      details: {
        doctorCode: "SEVA-DOC-1002", registrationNo: "WBMC-2016-51190", medicalCouncil: "West Bengal Medical Council",
        specialisation: "Neurology", qualification: "MBBS, DM", medicalCollege: "IPGMER Kolkata",
        passoutYear: "2014", experience: "8", currentHospital: "Green Cross Medical Centre", phone: "+91 98311 22334",
        gender: "Male", dateOfBirth: "1989-09-03", bloodGroup: "O+", idProofType: "Aadhaar card",
        address: "45 Salt Lake Sector V, Kolkata 700091",
      },
      documents: {
        registrationCertificate: { fileName: "registration.pdf", uploadedOn: "17 Nov 2026" },
        identityProof: { fileName: "aadhaar-ritwik.pdf", uploadedOn: "17 Nov 2026" },
        experienceCertificate: { fileName: "", uploadedOn: "" },
      },
    },
  },
  {
    id: "d3",
    name: "Dr. Sneha Kapoor",
    speciality: "Gynaecology",
    image: "",
    registrationNo: "DMC-2015-30871",
    rating: 0,
    reviewsCount: 0,
    application: {
      status: "rejected",
      submittedOn: "10 Nov 2026",
      reviewedOn: "14 Nov 2026",
      adminRemarks: "Your identity proof is blurry and the Aadhaar number can't be read. Please upload a clear scan of the front and back.",
      details: {
        doctorCode: "SEVA-DOC-1003", registrationNo: "DMC-2015-30871", medicalCouncil: "Delhi Medical Council",
        specialisation: "Gynaecology", qualification: "MBBS, MS", medicalCollege: "Maulana Azad Medical College",
        passoutYear: "2013", experience: "9", currentHospital: "", phone: "+91 98100 77889",
        gender: "Female", dateOfBirth: "1988-01-21", bloodGroup: "A+", idProofType: "Aadhaar card",
        address: "8 Lake Town, Kolkata 700089",
      },
      documents: {
        registrationCertificate: { fileName: "dmc-registration.pdf", uploadedOn: "10 Nov 2026" },
        identityProof: { fileName: "aadhaar-photo.jpg", uploadedOn: "10 Nov 2026" },
        experienceCertificate: { fileName: "", uploadedOn: "" },
      },
    },
  },
  {
    id: "d4",
    name: "Dr. Arnab Mukherjee",
    speciality: "New doctor",
    image: "",
    registrationNo: "",
    rating: 0,
    reviewsCount: 0,
    application: {
      status: "not-submitted",
      submittedOn: "",
      reviewedOn: "",
      adminRemarks: "",
      details: emptyApplicationForm,
      documents: emptyApplicationDocuments,
    },
  },
]