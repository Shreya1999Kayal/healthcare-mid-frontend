import type { DonorFormFieldProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"

const DonorFormField = ({ label, required, className = "", children }: DonorFormFieldProps) => {
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

export default DonorFormField