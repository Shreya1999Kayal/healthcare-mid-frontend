import { FileText } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { contactFields, hospitalFields, verificationDocuments } from "../../constants/hospitalConstants/hospitalVerification.constants"
import type { VerificationSummaryProps } from "../../types/interface/hospitalInterface/HospitalVerification.interface"

const sections = [
  { title: "Hospital details", fields: hospitalFields },
  { title: "Contact and address", fields: contactFields },
]

// Read-only view of what the hospital sent
const VerificationSummary = ({ verification, onEdit }: VerificationSummaryProps) => {
  const { details, documents } = verification

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title} className={hospitalCardClass}>
          <h2 className="mb-4 text-lg font-bold text-hospital-navy">{section.title}</h2>
          <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {section.fields.map((field) => (
              <div key={field.name} className={field.fullWidth ? "sm:col-span-2 xl:col-span-3" : ""}>
                <dt className="text-xs font-medium uppercase tracking-wide text-hospital-muted">{field.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-hospital-navy">{details[field.name] || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section className={hospitalCardClass}>
        <h2 className="mb-4 text-lg font-bold text-hospital-navy">Documents</h2>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {verificationDocuments.map((config) => {
            const file = documents[config.key]

            return (
              <li key={config.key} className="flex items-center gap-3 rounded-xl bg-hospital-bg p-3">
                <FileText size={18} className="shrink-0 text-hospital-primary-dark" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-hospital-navy">{config.title}</p>
                  <p className="truncate text-xs text-hospital-muted">
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
            className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            Edit and resubmit
          </button>
        </div>
      )}
    </div>
  )
}

export default VerificationSummary