import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import ApplicationForm from "../../components/doctor/ApplicationForm"
import ApplicationStatusBanner from "../../components/doctor/ApplicationStatusBanner"
import ApplicationSummary from "../../components/doctor/ApplicationSummary"
import { canEditApplication } from "../../services/helper/doctorHelper/doctorApplication.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { ApplicationDocuments, ApplicationFormValues } from "../../types/type/doctorType/DoctorApplication.type"

const DoctorApplication = () => {
  const { doctor, onSubmitApplication } = useOutletContext<DoctorOutletContext>()
  const application = doctor.application
  const isRejected = application.status === "rejected"

  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState("")

  // A new doctor sees the form straight away; a rejected doctor opens it with "Edit and resubmit"
  const showForm = application.status === "not-submitted" || (editing && canEditApplication(application.status))

  const submit = (details: ApplicationFormValues, documents: ApplicationDocuments) => {
    onSubmitApplication(details, documents)
    setEditing(false)
    setMessage("Application sent. The admin will verify your details. Other sections open after approval.")
  }

  const startEditing = () => {
    setMessage("")
    setEditing(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Application</h1>
        <p className="text-sm text-doctor-muted">Send your details and documents so the admin can verify your account.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <ApplicationStatusBanner application={application} />

      {showForm ? (
        <ApplicationForm
          application={application}
          onSubmit={submit}
          onCancel={isRejected ? () => setEditing(false) : undefined}
        />
      ) : (
        <ApplicationSummary application={application} onEdit={isRejected ? startEditing : undefined} />
      )}
    </div>
  )
}

export default DoctorApplication