import type { BloodBankFormFieldProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"


const BloodBankFormField = ({ label, required, className = "", children }: BloodBankFormFieldProps) => {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      <span className="font-semibold text-blood-navy">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}

export default BloodBankFormField