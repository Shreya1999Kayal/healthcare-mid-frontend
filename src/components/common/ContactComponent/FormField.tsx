import type { FormFieldProps } from "../../../types/interface/public/Contact.interface"


const FormField = ({ label, required, className = "", children }: FormFieldProps) => {
  return (
    <label className={`block text-sm font-medium text-medical-navy ${className}`}>
      {label}
      {required && <span className="text-red-500">*</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  )
}

export default FormField