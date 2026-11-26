import type {
  DepartmentFilter,
  DepartmentFormErrors,
  DepartmentFormValues,
  HospitalDepartment,
} from "../../../types/type/hospitalType/HospitalDepartment.type"

// One item per line -> array
const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

// currentId = department being edited (so it doesn't count as a duplicate of itself)
export const validateDepartment = (
  form: DepartmentFormValues,
  departments: HospitalDepartment[],
  currentId?: string,
): DepartmentFormErrors => {
  const errors: DepartmentFormErrors = {}

  if (!form.name) errors.name = "Pick a department"
  else if (departments.some((item) => item.name === form.name && item.id !== currentId)) {
    errors.name = `${form.name} is already added`
  }

  if (!form.head.trim()) errors.head = "Head doctor is required"
  if (!form.doctors || Number(form.doctors) < 1) errors.doctors = "Add at least 1 doctor"
  if (!form.floor.trim()) errors.floor = "Floor is required"
  if (!form.opdTimings.trim()) errors.opdTimings = "OPD timings are required"
  if (form.phone && !/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number"

  return errors
}

export const toDepartmentForm = (department: HospitalDepartment): DepartmentFormValues => ({
  name: department.name,
  head: department.head,
  doctors: String(department.doctors),
  floor: department.floor,
  phone: department.phone,
  opdTimings: department.opdTimings,
  services: department.services.join("\n"),
})

// current = department being edited; empty when adding a new one
export const fromDepartmentForm = (form: DepartmentFormValues, current?: HospitalDepartment): HospitalDepartment => ({
  id: current?.id ?? `dep${Date.now()}`,
  status: current?.status ?? "open",
  name: form.name,
  head: form.head.trim(),
  doctors: Number(form.doctors),
  floor: form.floor.trim(),
  phone: form.phone.trim(),
  opdTimings: form.opdTimings.trim(),
  services: splitLines(form.services),
})

// Status tab + search box (department or head doctor)
export const filterDepartments = (departments: HospitalDepartment[], search: string, filter: DepartmentFilter) => {
  const text = search.trim().toLowerCase()

  return departments.filter((department) => {
    const matchesFilter = filter === "all" || department.status === filter
    const matchesSearch =
      !text || department.name.toLowerCase().includes(text) || department.head.toLowerCase().includes(text)

    return matchesFilter && matchesSearch
  })
}