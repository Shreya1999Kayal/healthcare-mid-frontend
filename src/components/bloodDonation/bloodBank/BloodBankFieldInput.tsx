import { bloodBankFieldClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import type { BloodBankFieldInputProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import BloodBankFormField from "./BloodBankFormField"

// Shows a select, textarea or input from the field config
const BloodBankFieldInput = <T extends string>({ field, value, error, onChange }: BloodBankFieldInputProps<T>) => {
  const common = { name: field.name, value, onChange, className: `${bloodBankFieldClass} w-full` }

  return (
    <BloodBankFormField label={field.label} required={field.required} className={field.fullWidth ? "md:col-span-2" : ""}>
      {field.options ? (
        <select {...common}>
          <option value="">Select</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea {...common} rows={3} placeholder={field.placeholder} />
      ) : (
        <input {...common} type={field.type ?? "text"} placeholder={field.placeholder} />
      )}
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </BloodBankFormField>
  )
}

export default BloodBankFieldInput