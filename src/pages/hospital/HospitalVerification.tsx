import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import VerificationForm from "../../components/hospital/VerificationForm"
import VerificationStatusBanner from "../../components/hospital/VerificationStatusBanner"
import VerificationSummary from "../../components/hospital/VerificationSummary"
import { canEditVerification } from "../../services/helper/hospitalHelper/hospitalVerification.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { VerificationDocuments, VerificationFormValues } from "../../types/type/hospitalType/HospitalVerification.type"

const HospitalVerification = () => {
  const { hospital, onSubmitVerification } = useOutletContext<HospitalOutletContext>()
  const verification = hospital.verification
  const isRejected = verification.status === "rejected"

  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  // A new hospital sees the form straight away; a rejected one opens it with "Edit and resubmit"
  const showForm = verification.status === "not-submitted" || (editing && canEditVerification(verification.status))

  const submit = (details: VerificationFormValues, documents: VerificationDocuments) => {
    onSubmitVerification(details, documents)
    setEditing(false)
    setMessage("Details sent. The admin will verify your hospital. Other sections open after approval.")
  }

  const startEditing = () => {
    setMessage("")
    setEditing(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Verification</h1>
        <p className="text-sm text-hospital-muted">Send your hospital details and documents so the admin can verify your account.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <VerificationStatusBanner verification={verification} />

      {showForm ? (
        <VerificationForm
          verification={verification}
          onSubmit={submit}
          onCancel={isRejected ? () => setEditing(false) : undefined}
        />
      ) : (
        <VerificationSummary verification={verification} onEdit={isRejected ? startEditing : undefined} />
      )}
    </div>
  )
}

export default HospitalVerification