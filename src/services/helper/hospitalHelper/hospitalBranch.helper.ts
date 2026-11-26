import type { BranchFilter, BranchFormErrors, BranchFormValues, HospitalBranch } from "../../../types/type/hospitalType/HospitalBranch.type"

export const validateBranch = (form: BranchFormValues): BranchFormErrors => {
  const errors: BranchFormErrors = {}

  if (!form.name.trim()) errors.name = "Branch name is required"
  if (!form.manager.trim()) errors.manager = "Manager name is required"
  if (!form.city.trim()) errors.city = "City is required"
  if (!form.address.trim()) errors.address = "Address is required"
  if (!/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit pincode"
  if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number"
  if (!form.beds || Number(form.beds) <= 0) errors.beds = "Total beds must be more than 0"

  return errors
}

export const toBranchForm = (branch: HospitalBranch): BranchFormValues => ({
  name: branch.name,
  city: branch.city,
  address: branch.address,
  pincode: branch.pincode,
  phone: branch.phone,
  manager: branch.manager,
  beds: String(branch.beds),
  emergency24x7: branch.emergency24x7,
})

// current = branch being edited; empty when adding a new one
export const fromBranchForm = (form: BranchFormValues, current?: HospitalBranch): HospitalBranch => ({
  id: current?.id ?? `br${Date.now()}`,
  isMain: current?.isMain ?? false,
  status: current?.status ?? "active",
  name: form.name.trim(),
  city: form.city.trim(),
  address: form.address.trim(),
  pincode: form.pincode.trim(),
  phone: form.phone.trim(),
  manager: form.manager.trim(),
  beds: Number(form.beds),
  emergency24x7: form.emergency24x7,
})

// Status tab + search box (name, city or manager)
export const filterBranches = (branches: HospitalBranch[], search: string, filter: BranchFilter) => {
  const text = search.trim().toLowerCase()

  return branches.filter((branch) => {
    const matchesFilter = filter === "all" || branch.status === filter
    const matchesSearch =
      !text ||
      branch.name.toLowerCase().includes(text) ||
      branch.city.toLowerCase().includes(text) ||
      branch.manager.toLowerCase().includes(text)

    return matchesFilter && matchesSearch
  })
}