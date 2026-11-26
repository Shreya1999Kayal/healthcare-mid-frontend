import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { contactHospitals, initialCallbackForm } from "../../../constants/public/contact.constants"
import { fieldClass } from "../../../constants/public/ui.constants"
import type { CallbackFormValues } from "../../../types/type/public/Contact.type"
import FormField from "./FormField"
import FormSelect from "./FormSelect"

const CallbackForm = () => {
  const [form, setForm] = useState<CallbackFormValues>(initialCallbackForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialCallbackForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm shadow-medical-navy/5 md:p-8"
    >
      {submitted && (
        <p className="rounded-md bg-medical-bg-soft px-4 py-3 text-sm font-semibold text-medical-primary-dark">
          Thank you! Our team will call you back soon.
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="First Name" required>
          <input name="firstName" value={form.firstName} onChange={handleChange} required className={fieldClass} />
        </FormField>
        <FormField label="Last Name" required>
          <input name="lastName" value={form.lastName} onChange={handleChange} required className={fieldClass} />
        </FormField>
      </div>

      <FormField label="Mobile Number" required>
        <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} required className={fieldClass} />
      </FormField>

      <FormField label="Email" required>
        <input name="email" type="email" value={form.email} onChange={handleChange} required className={fieldClass} />
      </FormField>

      <FormField label="Hospital Name" required>
        <FormSelect
          name="hospital"
          value={form.hospital}
          placeholder="-Select Hospital-"
          options={contactHospitals}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="Comments">
        <textarea name="comments" value={form.comments} onChange={handleChange} rows={4} className={fieldClass} />
      </FormField>

      <button
        type="submit"
        className="w-full rounded-md bg-linear-to-br from-medical-primary to-medical-primary-dark px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Request a Call Back
      </button>
    </form>
  )
}

export default CallbackForm
