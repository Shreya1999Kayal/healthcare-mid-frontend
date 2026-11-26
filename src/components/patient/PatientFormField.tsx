import type { PatientFormFieldProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

// Label + input + error message
const PatientFormField = ({ label, required = false, error = "", className = "", children }: PatientFormFieldProps) => {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      <span className="font-semibold text-patient-navy">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  )
}

export default PatientFormField
