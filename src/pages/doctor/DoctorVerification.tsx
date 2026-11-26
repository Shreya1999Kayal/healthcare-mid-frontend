import { useState } from "react"
import DocumentUploadCard from "../../components/doctor/DocumentUploadCard"
import VerificationStatusCard from "../../components/doctor/VerificationStatusCard"
import { DOCTOR_TODAY } from "../../constants/doctorConstants/doctorDashboard.constants"
import { documentGroups, doctorVerification } from "../../constants/doctorConstants/doctorVerification.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getBlockingDocuments, isUploadLocked } from "../../services/helper/doctorHelper/doctorVerification.helper"
import type { DoctorVerificationState, VerificationDocument } from "../../types/type/doctorType/DoctorVerification.type"

const DoctorVerification = () => {
  // Local copy (UI only, nothing is uploaded)
  const [verification, setVerification] = useState<DoctorVerificationState>(doctorVerification)
  const [message, setMessage] = useState("")

  const blocking = getBlockingDocuments(verification.documents)
  const locked = isUploadLocked(verification.status)

  const uploadDocument = (documentId: string, file: File) => {
    setMessage("")
    setVerification((prev) => ({
      ...prev,
      documents: prev.documents.map(
        (document): VerificationDocument =>
          document.id === documentId
            ? { ...document, fileName: file.name, uploadedOn: formatIsoDate(DOCTOR_TODAY), status: "pending", remark: undefined }
            : document,
      ),
    }))
  }

  const submitForReview = () => {
    setVerification((prev) => ({ ...prev, status: "pending", submittedOn: formatIsoDate(DOCTOR_TODAY), reviewedOn: "" }))
    setMessage("Sent for review. We'll notify you when the Seva team has checked your documents.")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Verification</h1>
        <p className="text-sm text-doctor-muted">Patients can only book doctors whose documents are approved.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <VerificationStatusCard verification={verification} blockingCount={blocking.length} onSubmit={submitForReview} />

      {documentGroups.map((group) => (
        <section key={group.id} className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-doctor-navy">{group.title}</h2>
            <p className="text-sm text-doctor-muted">{group.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {verification.documents
              .filter((document) => document.group === group.id)
              .map((document) => (
                <DocumentUploadCard key={document.id} document={document} disabled={locked} onUpload={uploadDocument} />
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default DoctorVerification