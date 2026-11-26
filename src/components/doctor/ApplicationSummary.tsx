import { FileText } from "lucide-react"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { applicationDocuments, personalFields, professionalFields } from "../../constants/doctorConstants/doctorApplication.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { ApplicationSummaryProps } from "../../types/interface/doctorInterface/DoctorApplication.interface"

const sections = [
  { title: "Professional details", fields: professionalFields },
  { title: "Personal details", fields: personalFields },
]

// Read-only view of what the doctor sent
const ApplicationSummary = ({ application, onEdit }: ApplicationSummaryProps) => {
  const { details, documents } = application

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title} className={doctorCardClass}>
          <h2 className="mb-4 text-lg font-bold text-doctor-navy">{section.title}</h2>
          <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {section.fields.map((field) => {
              const value = details[field.name]

              return (
                <div key={field.name} className={field.fullWidth ? "sm:col-span-2 xl:col-span-3" : ""}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-doctor-muted">{field.label}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-doctor-navy">
                    {value ? (field.type === "date" ? formatIsoDate(value) : value) : "—"}
                  </dd>
                </div>
              )
            })}
          </dl>
        </section>
      ))}

      <section className={doctorCardClass}>
        <h2 className="mb-4 text-lg font-bold text-doctor-navy">Documents</h2>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {applicationDocuments.map((config) => {
            const file = documents[config.key]

            return (
              <li key={config.key} className="flex items-center gap-3 rounded-xl bg-doctor-bg p-3">
                <FileText size={18} className="shrink-0 text-doctor-primary-dark" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-doctor-navy">{config.title}</p>
                  <p className="truncate text-xs text-doctor-muted">
                    {file.fileName ? `${file.fileName} · ${file.uploadedOn}` : "Not uploaded"}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {onEdit && (
        <div>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark"
          >
            Edit and resubmit
          </button>
        </div>
      )}
    </div>
  )
}

export default ApplicationSummary