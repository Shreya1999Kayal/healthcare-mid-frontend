import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import { canEditBloodBankVerification } from "../../../services/helper/blood/bloodBankHelper/bloodBankVerification.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodBankDocuments, BloodBankVerificationValues } from "../../../types/type/blood/bloodBankType/BloodBankVerification.type"
import BloodBankStatusBanner from "../../../components/bloodDonation/bloodBank/BloodBankStatusBanner"
import BloodBankVerificationForm from "../../../components/bloodDonation/bloodBank/BloodBankVerificationForm"
import BloodBankVerificationSummary from "../../../components/bloodDonation/bloodBank/BloodBankVerificationSummary"

const BloodBankVerification = () => {
  const { bank, onSubmitVerification } = useOutletContext<BloodBankOutletContext>()
  const verification = bank.verification
  const isRejected = verification.status === "rejected"

  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  // A new blood bank sees the form straight away; a rejected one opens it with "Edit and resubmit"
  const showForm = verification.status === "not-submitted" || (editing && canEditBloodBankVerification(verification.status))

  const submit = (details: BloodBankVerificationValues, documents: BloodBankDocuments) => {
    onSubmitVerification(details, documents)
    setEditing(false)
    setMessage("Details sent. The admin will verify your blood bank. Other sections open after approval.")
  }

  const startEditing = () => {
    setMessage("")
    setEditing(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Verification</h1>
        <p className="text-sm text-blood-muted">Send your blood bank details and documents so the admin can verify your account.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <BloodBankStatusBanner verification={verification} />

      {showForm ? (
        <BloodBankVerificationForm verification={verification} onSubmit={submit} onCancel={isRejected ? () => setEditing(false) : undefined} />
      ) : (
        <BloodBankVerificationSummary verification={verification} onEdit={isRejected ? startEditing : undefined} />
      )}
    </div>
  )
}

export default BloodBankVerification