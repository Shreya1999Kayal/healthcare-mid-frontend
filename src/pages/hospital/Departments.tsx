import { useState } from "react"
import { CircleCheck, Layers, Plus, Search, Stethoscope } from "lucide-react"
import DepartmentCard from "../../components/hospital/DepartmentCard"
import DepartmentForm from "../../components/hospital/DepartmentForm"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { departmentFilters, hospitalDepartments } from "../../constants/hospitalConstants/hospitalDepartment.constants"
import { filterDepartments, fromDepartmentForm } from "../../services/helper/hospitalHelper/hospitalDepartment.helper"
import type { DepartmentFilter, DepartmentFormValues, HospitalDepartment } from "../../types/type/hospitalType/HospitalDepartment.type"

const Departments = () => {
  // Local copy (UI only, nothing is saved)
  const [departments, setDepartments] = useState<HospitalDepartment[]>(hospitalDepartments)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<HospitalDepartment | undefined>()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<DepartmentFilter>("all")
  const [message, setMessage] = useState("")

  const shownDepartments = filterDepartments(departments, search, filter)
  const openCount = departments.filter((department) => department.status === "open").length
  const totalDoctors = departments.reduce((sum, department) => sum + department.doctors, 0)

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (department: HospitalDepartment) => {
    setEditing(department)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveDepartment = (values: DepartmentFormValues) => {
    if (editing) {
      setDepartments((prev) => prev.map((item) => (item.id === editing.id ? fromDepartmentForm(values, item) : item)))
      setMessage(`${values.name} updated.`)
    } else {
      setDepartments((prev) => [...prev, fromDepartmentForm(values)])
      setMessage(`${values.name} added.`)
    }
    closeForm()
  }

  const deleteDepartment = (department: HospitalDepartment) => {
    if (!window.confirm(`Delete the ${department.name} department?`)) return
    setDepartments((prev) => prev.filter((item) => item.id !== department.id))
    setMessage(`${department.name} deleted.`)
  }

  const toggleStatus = (departmentId: string) => {
    setDepartments((prev) =>
      prev.map((item) => (item.id === departmentId ? { ...item, status: item.status === "open" ? "closed" : "open" } : item)),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Departments</h1>
          <p className="text-sm text-hospital-muted">Add departments and the services you offer.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Add department
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <HospitalSummaryCard label="Departments" value={departments.length} hint="In this hospital" icon={Layers} />
        <HospitalSummaryCard label="Open" value={openCount} hint="Taking patients" icon={CircleCheck} />
        <HospitalSummaryCard label="Doctors" value={totalDoctors} hint="Across all departments" icon={Stethoscope} />
      </div>

      {formOpen && (
        <DepartmentForm
          key={editing?.id ?? "new"}
          department={editing}
          departments={departments}
          onSave={saveDepartment}
          onCancel={closeForm}
        />
      )}

      <div className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search department or head doctor"
            aria-label="Search departments"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <div className="flex gap-2">
          {departmentFilters.map((option) => (
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

      {shownDepartments.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No departments match your search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shownDepartments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onEdit={openEdit}
              onDelete={deleteDepartment}
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Departments