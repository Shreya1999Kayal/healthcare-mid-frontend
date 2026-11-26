import type { DocumentGroup, DocumentStatus, DoctorVerificationState, VerificationStatus, VerificationStatusStyle } from "../../types/type/doctorType/DoctorVerification.type"
import type { StatusStyle } from "../../types/type/doctorType/DoctorDashboard.type"

export const verificationStatusStyles: Record<VerificationStatus, VerificationStatusStyle> = {
  pending: { label: "Pending review", className: "bg-amber-50 text-amber-700", description: "Your documents are with the Seva team. This usually takes 2 to 3 working days." },
  verified: { label: "Verified", className: "bg-sky-50 text-sky-700", description: "Your documents are checked. Final approval of your account is next." },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700", description: "Your profile is live and patients can book you." },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600", description: "Some documents need to be fixed. Read the remarks, upload again and resubmit." },
  suspended: { label: "Suspended", className: "bg-slate-100 text-slate-600", description: "Your account is on hold. Contact Seva support to know more." },
}

export const documentStatusStyles: Record<DocumentStatus, StatusStyle> = {
  missing: { label: "Not uploaded", className: "bg-slate-100 text-slate-600" },
  pending: { label: "Waiting for review", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
}

export const documentGroups: { id: DocumentGroup; title: string; description: string }[] = [
  { id: "professional", title: "Professional documents", description: "Licence and degrees that prove you can practise." },
  { id: "identity", title: "Identity document", description: "Used only to confirm who you are." },
]

// Placeholder data: one document was rejected, so the remarks box shows
export const doctorVerification: DoctorVerificationState = {
  status: "rejected",
  submittedOn: "10 Nov 2026",
  reviewedOn: "14 Nov 2026",
  adminRemarks: "Your MD degree certificate is blurry and the university seal can't be read. Please upload a clear scan of the full certificate.",
  documents: [
    { id: "doc1", group: "professional", title: "Medical registration certificate", hint: "State or national medical council (WBMC, NMC)", required: true, fileName: "wbmc-registration.pdf", uploadedOn: "10 Nov 2026", status: "approved" },
    { id: "doc2", group: "professional", title: "MBBS degree certificate", hint: "Final degree from your university", required: true, fileName: "mbbs-degree.pdf", uploadedOn: "10 Nov 2026", status: "approved" },
    { id: "doc3", group: "professional", title: "MD degree certificate", hint: "Post-graduate degree", required: true, fileName: "md-degree.jpg", uploadedOn: "10 Nov 2026", status: "rejected", remark: "Image is blurry, seal not readable" },
    { id: "doc4", group: "identity", title: "Government photo ID", hint: "Aadhaar, PAN, passport or voter ID", required: true, fileName: "aadhaar.pdf", uploadedOn: "10 Nov 2026", status: "approved" },
    { id: "doc5", group: "identity", title: "Recent photograph", hint: "Passport size, plain background (optional)", required: false, fileName: "", uploadedOn: "", status: "missing" },
  ],
}