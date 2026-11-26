import { useState } from "react"
import { BedDouble, CircleCheck, GitBranch, Plus, Search } from "lucide-react"
import BranchCard from "../../components/hospital/BranchCard"
import BranchForm from "../../components/hospital/BranchForm"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { branchFilters, hospitalBranches } from "../../constants/hospitalConstants/hospitalBranch.constants"
import { filterBranches, fromBranchForm } from "../../services/helper/hospitalHelper/hospitalBranch.helper"
import type { BranchFilter, BranchFormValues, HospitalBranch } from "../../types/type/hospitalType/HospitalBranch.type"

const Branches = () => {
  // Local copy (UI only, nothing is saved)
  const [branches, setBranches] = useState<HospitalBranch[]>(hospitalBranches)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<HospitalBranch | undefined>()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<BranchFilter>("all")
  const [message, setMessage] = useState("")

  const shownBranches = filterBranches(branches, search, filter)
  const activeCount = branches.filter((branch) => branch.status === "active").length
  const totalBeds = branches.reduce((sum, branch) => sum + branch.beds, 0)

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (branch: HospitalBranch) => {
    setEditing(branch)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveBranch = (values: BranchFormValues) => {
    if (editing) {
      setBranches((prev) => prev.map((branch) => (branch.id === editing.id ? fromBranchForm(values, branch) : branch)))
      setMessage(`${values.name} updated.`)
    } else {
      setBranches((prev) => [...prev, fromBranchForm(values)])
      setMessage(`${values.name} added.`)
    }
    closeForm()
  }

  const deleteBranch = (branch: HospitalBranch) => {
    if (!window.confirm(`Delete ${branch.name}?`)) return
    setBranches((prev) => prev.filter((item) => item.id !== branch.id))
    setMessage(`${branch.name} deleted.`)
  }

  const toggleStatus = (branchId: string) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === branchId ? { ...branch, status: branch.status === "active" ? "inactive" : "active" } : branch,
      ),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Branches</h1>
          <p className="text-sm text-hospital-muted">Manage all branches of your hospital.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Add branch
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <HospitalSummaryCard label="Total branches" value={branches.length} hint="Including main branch" icon={GitBranch} />
        <HospitalSummaryCard label="Active" value={activeCount} hint="Open for patients" icon={CircleCheck} />
        <HospitalSummaryCard label="Total beds" value={totalBeds} hint="All branches" icon={BedDouble} />
      </div>

      {formOpen && <BranchForm key={editing?.id ?? "new"} branch={editing} onSave={saveBranch} onCancel={closeForm} />}

      <div className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, city or manager"
            aria-label="Search branches"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <div className="flex gap-2">
          {branchFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                filter === option.value
                  ? "bg-hospital-primary text-white"
                  : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {shownBranches.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No branches match your search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shownBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} onEdit={openEdit} onDelete={deleteBranch} onToggleStatus={toggleStatus} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Branches