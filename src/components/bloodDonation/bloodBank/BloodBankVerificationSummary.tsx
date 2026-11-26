import { FileText } from "lucide-react"
import { bloodBankCardClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bankContactFields, bankFields, bloodBankDocuments } from "../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"
import type { BloodBankVerificationSummaryProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankVerification.interface"

const sections = [
  { title: "Blood bank details", fields: bankFields },
  { title: "Contact and address", fields: bankContactFields },
]

// Read-only view of what the blood bank sent
const BloodBankVerificationSummary = ({ verification, onEdit }: BloodBankVerificationSummaryProps) => {
  const { details, documents } = verification

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title} className={bloodBankCardClass}>
          <h2 className="mb-4 text-lg font-bold text-blood-navy">{section.title}</h2>
          <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {section.fields.map((field) => (
              <div key={field.name} className={field.fullWidth ? "sm:col-span-2 xl:col-span-3" : ""}>
                <dt className="text-xs font-medium uppercase tracking-wide text-blood-muted">{field.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-blood-navy">{details[field.name] || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section className={bloodBankCardClass}>
        <h2 className="mb-4 text-lg font-bold text-blood-navy">Documents</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {bloodBankDocuments.map((config) => {
            const file = documents[config.key]

            return (
              <li key={config.key} className="flex items-center gap-3 rounded-xl bg-blood-bg p-3">
                <FileText size={18} className="shrink-0 text-blood-primary-dark" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-blood-navy">{config.title}</p>
                  <p className="truncate text-xs text-blood-muted">
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
          <button type="button" onClick={onEdit} className={primaryButtonClass}>
            Edit and resubmit
          </button>
        </div>
      )}
    </div>
  )
}

export default BloodBankVerificationSummary