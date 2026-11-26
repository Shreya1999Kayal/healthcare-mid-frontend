import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type { BranchField, BranchFilter, BranchFormValues, BranchStatus, HospitalBranch } from "../../types/type/hospitalType/HospitalBranch.type"

export const branchStatusStyles: Record<BranchStatus, HospitalStatusStyle> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700" },
  inactive: { label: "Inactive", className: "bg-slate-100 text-slate-600" },
}

export const branchFilters: { value: BranchFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

export const branchFields: BranchField[] = [
  { name: "name", label: "Branch name", placeholder: "e.g. Seva City Hospital, Salt Lake" },
  { name: "manager", label: "Branch manager", placeholder: "Full name" },
  { name: "city", label: "City" },
  { name: "pincode", label: "Pincode", placeholder: "700091" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 33 4000 0000" },
  { name: "beds", label: "Total beds", type: "number" },
  { name: "address", label: "Address", fullWidth: true },
]

export const emptyBranchForm: BranchFormValues = {
  name: "", city: "", address: "", pincode: "", phone: "", manager: "", beds: "", emergency24x7: false,
}

// Placeholder data, replace with real data from the API later
export const hospitalBranches: HospitalBranch[] = [
  {
    id: "br1", name: "Seva City Hospital, Park Street", city: "Kolkata", address: "22 Park Street", pincode: "700016",
    phone: "+91 33 4000 1234", manager: "Anirban Ghosh", beds: 185, emergency24x7: true, isMain: true, status: "active",
  },
  {
    id: "br2", name: "Seva City Hospital, Salt Lake", city: "Kolkata", address: "Sector V, Salt Lake", pincode: "700091",
    phone: "+91 33 4000 5678", manager: "Riya Chatterjee", beds: 80, emergency24x7: true, isMain: false, status: "active",
  },
  {
    id: "br3", name: "Seva Clinic, Howrah", city: "Howrah", address: "12 GT Road, Howrah", pincode: "711101",
    phone: "+91 33 4000 9012", manager: "Sanjay Kumar", beds: 25, emergency24x7: false, isMain: false, status: "inactive",
  },
]