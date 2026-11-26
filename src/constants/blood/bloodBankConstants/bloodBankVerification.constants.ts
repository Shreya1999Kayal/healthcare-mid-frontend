import { hospitalsList } from "../../public/hospital.constants"
import type {
  BloodBankAccount,
  BloodBankDocumentConfig,
  BloodBankDocuments,
  BloodBankField,
  BloodBankFieldName,
  BloodBankVerificationValues,
  VerificationStatus,
  VerificationStatusStyle,
} from "../../../types/type/blood/bloodBankType/BloodBankVerification.type"

// The only sidebar section that opens before the admin approves
export const VERIFICATION_SECTION = "verification"

export const BLOOD_BANK_LOCKED_MESSAGE =
  "Wait for the admin to verify and approve your blood bank. Other sections open after approval."

export const verificationStatusStyles: Record<VerificationStatus, VerificationStatusStyle> = {
  "not-submitted": {
    label: "Not submitted",
    className: "bg-slate-100 text-slate-600",
    description: "Fill in the blood bank details and upload the documents to send for verification.",
  },
  pending: {
    label: "Under review",
    className: "bg-amber-50 text-amber-700",
    description: "The admin is checking your blood bank details. This usually takes 2 to 3 working days.",
  },
  approved: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700",
    description: "Your blood bank is verified. All sections of the dashboard are open.",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    description: "Your verification was not approved. Read the reason, fix the details and resubmit.",
  },
}

export const HOSPITAL_BANK_TYPE = "Hospital blood bank"
export const bankTypeOptions = [HOSPITAL_BANK_TYPE, "Independent organisation"]

// Names come from hospitalsList, so they always match the Hospitals page
export const linkedHospitalOptions = hospitalsList.map((hospital) => hospital.name)

export const bankFields: BloodBankField<BloodBankFieldName>[] = [
  { name: "bankName", label: "Blood bank name", required: true, placeholder: "e.g. Red Drop Blood Bank" },
  { name: "licenceNo", label: "Blood bank licence number", required: true, placeholder: "e.g. WB-BB-2014-0021" },
  { name: "bankType", label: "Blood bank type", required: true, options: bankTypeOptions },
  { name: "linkedHospital", label: "Linked hospital (hospital blood bank only)", options: linkedHospitalOptions },
  { name: "establishedYear", label: "Established year", required: true, type: "number", placeholder: "e.g. 2012" },
  { name: "medicalOfficer", label: "Medical officer in charge", required: true, placeholder: "Dr. full name" },
  { name: "officerRegNo", label: "Medical officer registration no.", required: true, placeholder: "e.g. WBMC 45821" },
]

export const bankContactFields: BloodBankField<BloodBankFieldName>[] = [
  { name: "email", label: "Email", required: true, type: "email", placeholder: "info@bloodbank.in" },
  { name: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 33 4000 0000" },
  { name: "city", label: "City", required: true },
  { name: "pincode", label: "Pincode", required: true, placeholder: "700016" },
  { name: "address", label: "Full address", required: true, type: "textarea", fullWidth: true },
]

export const bloodBankDocuments: BloodBankDocumentConfig[] = [
  { key: "licence", title: "Blood bank licence", hint: "Licence from the State Drugs Control authority", required: true },
  { key: "registrationCertificate", title: "Registration certificate", hint: "Registration of the hospital or organisation", required: true },
  { key: "addressProof", title: "Address proof", hint: "Electricity bill or rent agreement of the blood bank", required: true },
  { key: "nbtcCertificate", title: "NBTC / SBTC certificate", hint: "Accreditation certificate, if you have one", required: false },
]

export const emptyBloodBankVerification: BloodBankVerificationValues = {
  bankName: "", licenceNo: "", bankType: "", linkedHospital: "", establishedYear: "", medicalOfficer: "",
  officerRegNo: "", email: "", phone: "", city: "", pincode: "", address: "",
}

export const emptyBloodBankDocuments: BloodBankDocuments = {
  licence: { fileName: "", uploadedOn: "" },
  registrationCertificate: { fileName: "", uploadedOn: "" },
  addressProof: { fileName: "", uploadedOn: "" },
  nbtcCertificate: { fileName: "", uploadedOn: "" },
}

// Placeholder blood banks (replace with the logged-in blood bank from the API later)
export const bloodBankAccounts: BloodBankAccount[] = [
  {
    id: "bb1",
    name: "Seva City Hospital Blood Bank",
    city: "Kolkata",
    role: "bloodBank",
    verification: {
      status: "approved",
      submittedOn: "02 Nov 2026",
      reviewedOn: "05 Nov 2026",
      adminRemarks: "",
      details: {
        bankName: "Seva City Hospital Blood Bank", licenceNo: "WB-BB-2014-0021", bankType: HOSPITAL_BANK_TYPE,
        linkedHospital: "Seva City Hospital", establishedYear: "2014", medicalOfficer: "Dr. Ritwik Sen",
        officerRegNo: "WBMC 45821", email: "bloodbank@sevacity.in", phone: "+91 33 0000 0101",
        city: "Kolkata", pincode: "700091", address: "Salt Lake, Kolkata",
      },
      documents: {
        licence: { fileName: "licence.pdf", uploadedOn: "02 Nov 2026" },
        registrationCertificate: { fileName: "registration.pdf", uploadedOn: "02 Nov 2026" },
        addressProof: { fileName: "address-proof.pdf", uploadedOn: "02 Nov 2026" },
        nbtcCertificate: { fileName: "nbtc.pdf", uploadedOn: "02 Nov 2026" },
      },
    },
  },
  {
    id: "bb2",
    name: "Red Drop Blood Bank",
    city: "Kolkata",
    role: "bloodBank",
    verification: {
      status: "pending",
      submittedOn: "20 Nov 2026",
      reviewedOn: "",
      adminRemarks: "",
      details: {
        bankName: "Red Drop Blood Bank", licenceNo: "WB-BB-2017-0102", bankType: "Independent organisation",
        linkedHospital: "", establishedYear: "2017", medicalOfficer: "Dr. Nandini Basu",
        officerRegNo: "WBMC 51230", email: "info@reddrop.in", phone: "+91 33 0000 0201",
        city: "Kolkata", pincode: "700017", address: "12 Park Circus Road, Kolkata 700017",
      },
      documents: {
        licence: { fileName: "rd-licence.pdf", uploadedOn: "20 Nov 2026" },
        registrationCertificate: { fileName: "rd-registration.pdf", uploadedOn: "20 Nov 2026" },
        addressProof: { fileName: "rd-address.pdf", uploadedOn: "20 Nov 2026" },
        nbtcCertificate: { fileName: "", uploadedOn: "" },
      },
    },
  },
  {
    id: "bb3",
    name: "Lifespring Voluntary Blood Bank",
    city: "Howrah",
    role: "bloodBank",
    verification: {
      status: "rejected",
      submittedOn: "10 Nov 2026",
      reviewedOn: "14 Nov 2026",
      adminRemarks: "The licence you uploaded has expired. Upload the renewed blood bank licence and resubmit.",
      details: {
        bankName: "Lifespring Voluntary Blood Bank", licenceNo: "WB-BB-2012-0077", bankType: "Independent organisation",
        linkedHospital: "", establishedYear: "2012", medicalOfficer: "Dr. Arup Mitra",
        officerRegNo: "WBMC 38811", email: "care@lifespring.in", phone: "+91 33 0000 0202",
        city: "Howrah", pincode: "711101", address: "45 GT Road, Howrah 711101",
      },
      documents: {
        licence: { fileName: "licence-2024.pdf", uploadedOn: "10 Nov 2026" },
        registrationCertificate: { fileName: "ls-registration.pdf", uploadedOn: "10 Nov 2026" },
        addressProof: { fileName: "ls-address.pdf", uploadedOn: "10 Nov 2026" },
        nbtcCertificate: { fileName: "", uploadedOn: "" },
      },
    },
  },
  {
    id: "bb4",
    name: "Mercy Blood Centre",
    city: "Kolkata",
    role: "bloodBank",
    verification: {
      status: "not-submitted",
      submittedOn: "",
      reviewedOn: "",
      adminRemarks: "",
      details: emptyBloodBankVerification,
      documents: emptyBloodBankDocuments,
    },
  },
  {
    id: "bc1",
    name: "Seva with Local Clubs Forum",
    city: "Kolkata",
    role: "bloodCamp",
    organiserId: "o4", // matches campOrganisers
    verification: {
      status: "approved",
      submittedOn: "01 Oct 2026",
      reviewedOn: "03 Oct 2026",
      adminRemarks: "",
      details: {
        bankName: "Seva with Local Clubs Forum", licenceNo: "WB-CAMP-2017-0045", bankType: "Independent organisation",
        linkedHospital: "", establishedYear: "2017", medicalOfficer: "Dr. Sudipta Ghosh", officerRegNo: "WBMC 47712",
        email: "camps@localclubs.in", phone: "+91 33 0000 0301", city: "Kolkata", pincode: "700064",
        address: "Salt Lake Community Hall, Kolkata",
      },
      documents: {
        licence: { fileName: "camp-licence.pdf", uploadedOn: "01 Oct 2026" },
        registrationCertificate: { fileName: "society-registration.pdf", uploadedOn: "01 Oct 2026" },
        addressProof: { fileName: "address-proof.pdf", uploadedOn: "01 Oct 2026" },
        nbtcCertificate: { fileName: "", uploadedOn: "" },
      },
    },
  },
]