import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  DepartmentField,
  DepartmentFilter,
  DepartmentFormValues,
  DepartmentStatus,
  HospitalDepartment,
} from "../../types/type/hospitalType/HospitalDepartment.type"

export const departmentStatusStyles: Record<DepartmentStatus, HospitalStatusStyle> = {
  open: { label: "Open", className: "bg-emerald-50 text-emerald-700" },
  closed: { label: "Closed", className: "bg-slate-100 text-slate-600" },
}

export const departmentFilters: { value: DepartmentFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
]

export const departmentNameOptions = [
  "Cardiology", "General Medicine", "Paediatrics", "Orthopaedics", "Gynaecology", "Neurology",
  "Dermatology", "ENT", "Ophthalmology", "Psychiatry", "Oncology", "Urology",
  "Gastroenterology", "Pulmonology", "Nephrology", "Radiology", "Emergency medicine",
]

export const departmentFields: DepartmentField[] = [
  { name: "name", label: "Department", required: true, options: departmentNameOptions },
  { name: "head", label: "Head doctor", required: true, placeholder: "e.g. Dr. Amit Roy" },
  { name: "doctors", label: "Number of doctors", required: true, type: "number" },
  { name: "floor", label: "Floor / block", required: true, placeholder: "e.g. 2nd floor, Block A" },
  { name: "opdTimings", label: "OPD timings", required: true, placeholder: "e.g. Mon to Sat, 9 AM to 5 PM" },
  { name: "phone", label: "Department phone", type: "tel", placeholder: "Leave empty to use the main number" },
  { name: "services", label: "Services (one per line)", type: "textarea", fullWidth: true },
]

export const emptyDepartmentForm: DepartmentFormValues = {
  name: "", head: "", doctors: "", floor: "", phone: "", opdTimings: "", services: "",
}

// Placeholder data, replace with real data from the API later
export const hospitalDepartments: HospitalDepartment[] = [
  {
    id: "dep1", name: "Cardiology", head: "Dr. Amit Roy", doctors: 6, floor: "3rd floor, Block A",
    phone: "+91 33 4000 1301", opdTimings: "Mon to Sat, 9 AM to 5 PM",
    services: ["ECG", "Echocardiography", "Angiography", "Cardiac ICU"], status: "open",
  },
  {
    id: "dep2", name: "General Medicine", head: "Dr. Leslie Alexander", doctors: 8, floor: "Ground floor",
    phone: "+91 33 4000 1101", opdTimings: "Mon to Sat, 9 AM to 8 PM",
    services: ["Fever clinic", "Diabetes care", "Health check-ups"], status: "open",
  },
  {
    id: "dep3", name: "Paediatrics", head: "Dr. Kavita Shah", doctors: 4, floor: "1st floor, Block B",
    phone: "", opdTimings: "Mon to Fri, 10 AM to 4 PM",
    services: ["Vaccination", "Newborn care", "NICU"], status: "open",
  },
  {
    id: "dep4", name: "Orthopaedics", head: "Dr. Rakesh Jain", doctors: 3, floor: "2nd floor, Block A",
    phone: "+91 33 4000 1201", opdTimings: "Tue, Thu, Sat, 11 AM to 3 PM",
    services: ["Fracture care", "Joint replacement", "Physiotherapy"], status: "open",
  },
  {
    id: "dep5", name: "Dermatology", head: "Dr. Nisha Verma", doctors: 1, floor: "1st floor, Block A",
    phone: "", opdTimings: "Sat, 10 AM to 1 PM",
    services: ["Skin allergy", "Acne treatment"], status: "closed",
  },
]