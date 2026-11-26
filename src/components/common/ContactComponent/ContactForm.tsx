import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { contactHospitals, initialContactForm } from "../../../constants/public/contact.constants"
import { fieldClass } from "../../../constants/public/ui.constants"
import type { ContactFormValues } from "../../../types/type/public/Contact.type"
import FormField from "./FormField"
import FormSelect from "./FormSelect"
import type { ContactFormProps } from "../../../types/interface/public/Contact.interface"

const ContactForm = ({ config }: ContactFormProps) => {
  const [form, setForm] = useState<ContactFormValues>(initialContactForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: no backend yet, so we just show a thank-you message
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialContactForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-5">
      {submitted && (
        <p className="rounded-md bg-medical-bg-soft px-4 py-3 text-sm font-semibold text-medical-primary-dark">
          Thank you! We have received your {config.id === "feedback" ? "feedback" : "query"}.
        </p>
      )}

      <FormField label={config.typeLabel} required>
        <FormSelect
          name="type"
          value={form.type}
          placeholder={config.typePlaceholder}
          options={config.typeOptions}
          onChange={handleChange}
          required
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="First Name" required>
          <input name="firstName" value={form.firstName} onChange={handleChange} required className={fieldClass} />
        </FormField>
        <FormField label="Last Name" required>
          <input name="lastName" value={form.lastName} onChange={handleChange} required className={fieldClass} />
        </FormField>
      </div>

      <div className="grid gap-5 md:grid-cols-[7rem_1fr_1fr]">
        <FormField label="Country Code">
          <input value="+91" readOnly className={fieldClass} />
        </FormField>
        <FormField label="Mobile Number" required>
          <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} required className={fieldClass} />
        </FormField>
        <FormField label="Email" required>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className={fieldClass} />
        </FormField>
      </div>

      <FormField label="Hospitals" required>
        <FormSelect
          name="hospital"
          value={form.hospital}
          placeholder="Select Hospital"
          options={contactHospitals}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label={config.messageLabel}>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} className={fieldClass} />
      </FormField>

      <button
        type="submit"
        className="w-fit rounded-md bg-linear-to-br from-medical-primary to-medical-primary-dark px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Submit
      </button>
    </form>
  )
}

export default ContactForm