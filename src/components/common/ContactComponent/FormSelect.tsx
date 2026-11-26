import { ChevronDown } from "lucide-react"
import { fieldClass } from "../../../constants/public/ui.constants"
import type { FormSelectProps } from "../../../types/interface/public/Contact.interface"

const FormSelect = ({ name, value, placeholder, options, required, onChange }: FormSelectProps) => {
  return (
    <span className="relative block">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${fieldClass} appearance-none pr-10 ${value ? "" : "text-medical-muted"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-medical-navy"
      />
    </span>
  )
}

export default FormSelect