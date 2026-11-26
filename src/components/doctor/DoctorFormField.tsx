import type { DoctorFormFieldProps } from "../../types/interface/doctorInterface/DoctorAppointments.interface"

const DoctorFormField = ({ label, required, className = "", children }: DoctorFormFieldProps) => {
  return (
    <label className={`block text-sm font-medium text-doctor-navy ${className}`}>
      {label}
      {required && <span className="text-red-500">*</span>}
      <span className="mt-1.5 block">{children}</span>
    </label>
  )
}

export default DoctorFormField