import { hospitalDepartments } from "./hospitalDepartment.constants"
import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  DoctorAvailability,
  HospitalDoctor,
  HospitalDoctorField,
  HospitalDoctorFormValues,
} from "../../types/type/hospitalType/HospitalDoctor.type"

// Value of the filters that shows everything
export const ALL_OPTION = "all"

export const doctorAvailabilityStyles: Record<DoctorAvailability, HospitalStatusStyle> = {
  available: { label: "Available", className: "bg-emerald-50 text-emerald-700" },
  "on-leave": { label: "On leave", className: "bg-amber-50 text-amber-700" },
  "off-duty": { label: "Off duty", className: "bg-slate-100 text-slate-600" },
}

export const doctorAvailabilityOptions = Object.keys(doctorAvailabilityStyles) as DoctorAvailability[]

// Department names come from the Departments section
export const doctorDepartmentOptions = hospitalDepartments.map((department) => department.name)

export const hospitalDoctorFields: HospitalDoctorField[] = [
  { name: "name", label: "Doctor name", required: true, placeholder: "e.g. Dr. Amit Roy" },
  { name: "doctorCode", label: "Doctor ID", required: true, placeholder: "e.g. SEVA-DOC-1042" },
  { name: "department", label: "Department", required: true, options: doctorDepartmentOptions },
  { name: "speciality", label: "Speciality", required: true, placeholder: "e.g. Interventional cardiology" },
  { name: "qualification", label: "Qualification", required: true, placeholder: "e.g. MBBS, MD" },
  { name: "experience", label: "Experience (years)", required: true, type: "number" },
  { name: "fee", label: "Consultation fee (₹)", required: true, type: "number" },
  { name: "phone", label: "Phone", required: true, type: "tel", placeholder: "+91 98300 00000" },
  { name: "timings", label: "Timings", required: true, placeholder: "e.g. Mon, Wed, Fri, 10 AM to 2 PM" },
]

export const emptyHospitalDoctorForm: HospitalDoctorFormValues = {
  name: "", doctorCode: "", speciality: "", department: "", qualification: "",
  experience: "", phone: "", fee: "", timings: "", availability: "available",
}

// Placeholder data, replace with real data from the API later
export const hospitalDoctors: HospitalDoctor[] = [
  {
    id: "hd1", name: "Dr. Leslie Alexander", doctorCode: "SEVA-DOC-1001", speciality: "General Physician",
    department: "General Medicine", qualification: "MBBS, MD", experience: 12, phone: "+91 98300 55555",
    fee: 800, timings: "Mon to Sat, 9 AM to 1 PM", availability: "available",
  },
  {
    id: "hd2", name: "Dr. Amit Roy", doctorCode: "SEVA-DOC-1010", speciality: "Interventional cardiology",
    department: "Cardiology", qualification: "MBBS, MD, DM", experience: 18, phone: "+91 98310 11223",
    fee: 1500, timings: "Mon, Wed, Fri, 10 AM to 2 PM", availability: "available",
  },
  {
    id: "hd3", name: "Dr. Kavita Shah", doctorCode: "SEVA-DOC-1015", speciality: "Child specialist",
    department: "Paediatrics", qualification: "MBBS, MD", experience: 9, phone: "+91 98311 44556",
    fee: 700, timings: "Mon to Fri, 10 AM to 4 PM", availability: "on-leave",
  },
  {
    id: "hd4", name: "Dr. Rakesh Jain", doctorCode: "SEVA-DOC-1021", speciality: "Joint replacement",
    department: "Orthopaedics", qualification: "MBBS, MS", experience: 14, phone: "+91 98312 77889",
    fee: 1200, timings: "Tue, Thu, Sat, 11 AM to 3 PM", availability: "available",
  },
  {
    id: "hd5", name: "Dr. Nisha Verma", doctorCode: "SEVA-DOC-1033", speciality: "Skin and hair",
    department: "Dermatology", qualification: "MBBS, MD", experience: 6, phone: "+91 98313 99001",
    fee: 600, timings: "Sat, 10 AM to 1 PM", availability: "off-duty",
  },
  {
    id: "hd6", name: "Dr. Sourav Pal", doctorCode: "SEVA-DOC-1040", speciality: "Heart failure",
    department: "Cardiology", qualification: "MBBS, MD", experience: 7, phone: "+91 98314 22334",
    fee: 1000, timings: "Tue, Thu, 4 PM to 8 PM", availability: "available",
  },
]