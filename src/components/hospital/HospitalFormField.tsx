import type { HospitalFormFieldProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const HospitalFormField = ({ label, required, className = "", children }: HospitalFormFieldProps) => {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      <span className="font-semibold text-hospital-navy">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}

export default HospitalFormField