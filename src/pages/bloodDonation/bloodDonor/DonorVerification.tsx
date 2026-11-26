import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import type { DonorOutletContext } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { canEditDonorVerification } from "../../../services/helper/blood/donorHelper/donorVerification.helper"
import type { DonorDocuments, DonorVerificationValues } from "../../../types/type/blood/donorType/DonorVerification.type"
import DonorStatusBanner from "../../../components/bloodDonation/bloodDonor/DonorStatusBanner"
import DonorVerificationForm from "../../../components/bloodDonation/bloodDonor/DonorVerificationForm"
import DonorVerificationSummary from "../../../components/bloodDonation/bloodDonor/DonorVerificationSummary"

const DonorVerification = () => {
  const { donor, onSubmitVerification } = useOutletContext<DonorOutletContext>()
  const verification = donor.verification
  const isRejected = verification.status === "rejected"

  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  // A new donor sees the form straight away; a rejected one opens it with "Edit and resubmit"
  const showForm = verification.status === "not-submitted" || (editing && canEditDonorVerification(verification.status))

  const submit = (details: DonorVerificationValues, documents: DonorDocuments) => {
    onSubmitVerification(details, documents)
    setEditing(false)
    setMessage("Details sent. The admin will verify your account. Other sections open after approval.")
  }

  const startEditing = () => {
    setMessage("")
    setEditing(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Verification</h1>
        <p className="text-sm text-blood-muted">Send your details and documents so the admin can verify you as a donor.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <DonorStatusBanner verification={verification} />

      {showForm ? (
        <DonorVerificationForm verification={verification} onSubmit={submit} onCancel={isRejected ? () => setEditing(false) : undefined} />
      ) : (
        <DonorVerificationSummary verification={verification} onEdit={isRejected ? startEditing : undefined} />
      )}
    </div>
  )
}

export default DonorVerification