import { useState } from "react"
import { CalendarOff, Layers, Plus, Search, Stethoscope, UserRoundCheck } from "lucide-react"
import HospitalDoctorForm from "../../components/hospital/HospitalDoctorForm"
import HospitalDoctorsTable from "../../components/hospital/HospitalDoctorsTable"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  ALL_OPTION,
  doctorAvailabilityOptions,
  doctorAvailabilityStyles,
  doctorDepartmentOptions,
  hospitalDoctors,
} from "../../constants/hospitalConstants/hospitalDoctor.constants"
import { filterHospitalDoctors, fromHospitalDoctorForm } from "../../services/helper/hospitalHelper/hospitalDoctor.helper"
import type { DoctorAvailability, HospitalDoctor, HospitalDoctorFormValues } from "../../types/type/hospitalType/HospitalDoctor.type"

const DoctorsSection = () => {
  // Local copy (UI only, nothing is saved)
  const [doctors, setDoctors] = useState<HospitalDoctor[]>(hospitalDoctors)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<HospitalDoctor | undefined>()
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState(ALL_OPTION)
  const [availability, setAvailability] = useState(ALL_OPTION)
  const [message, setMessage] = useState("")

  const shownDoctors = filterHospitalDoctors(doctors, search, department, availability)
  const availableCount = doctors.filter((doctor) => doctor.availability === "available").length
  const onLeaveCount = doctors.filter((doctor) => doctor.availability === "on-leave").length
  const departmentCount = new Set(doctors.map((doctor) => doctor.department)).size

  const openAdd = () => {
    setEditing(undefined)
    setFormOpen(true)
    setMessage("")
  }

  const openEdit = (doctor: HospitalDoctor) => {
    setEditing(doctor)
    setFormOpen(true)
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const saveDoctor = (values: HospitalDoctorFormValues) => {
    if (editing) {
      setDoctors((prev) => prev.map((item) => (item.id === editing.id ? fromHospitalDoctorForm(values, item) : item)))
      setMessage(`${values.name} updated.`)
    } else {
      setDoctors((prev) => [...prev, fromHospitalDoctorForm(values)])
      setMessage(`${values.name} added.`)
    }
    closeForm()
  }

  const removeDoctor = (doctor: HospitalDoctor) => {
    if (!window.confirm(`Remove ${doctor.name} from this hospital?`)) return
    setDoctors((prev) => prev.filter((item) => item.id !== doctor.id))
    setMessage(`${doctor.name} removed.`)
  }

  const changeAvailability = (doctorId: string, value: DoctorAvailability) => {
    setDoctors((prev) => prev.map((item) => (item.id === doctorId ? { ...item, availability: value } : item)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Doctors</h1>
          <p className="text-sm text-hospital-muted">Doctors linked to your hospital and their departments.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Add doctor
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Total doctors" value={doctors.length} hint="Linked to this hospital" icon={Stethoscope} />
        <HospitalSummaryCard label="Available" value={availableCount} hint="Seeing patients" icon={UserRoundCheck} />
        <HospitalSummaryCard label="On leave" value={onLeaveCount} hint="Not available now" icon={CalendarOff} />
        <HospitalSummaryCard label="Departments" value={departmentCount} hint="With at least 1 doctor" icon={Layers} />
      </div>

      {formOpen && (
        <HospitalDoctorForm key={editing?.id ?? "new"} doctor={editing} doctors={doctors} onSave={saveDoctor} onCancel={closeForm} />
      )}

      <div className={`${hospitalCardClass} flex flex-wrap items-center gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or doctor ID"
            aria-label="Search doctors"
            className={`${hospitalFieldClass} w-full pl-9`}
          />
        </div>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department" className={hospitalFieldClass}>
          <option value={ALL_OPTION}>All departments</option>
          {doctorDepartmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)} aria-label="Filter by availability" className={hospitalFieldClass}>
          <option value={ALL_OPTION}>All availability</option>
          {doctorAvailabilityOptions.map((option) => (
            <option key={option} value={option}>
              {doctorAvailabilityStyles[option].label}
            </option>
          ))}
        </select>
      </div>

      {shownDoctors.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No doctors match your search.</p>
      ) : (
        <HospitalDoctorsTable doctors={shownDoctors} onEdit={openEdit} onRemove={removeDoctor} onAvailabilityChange={changeAvailability} />
      )}
    </div>
  )
}

export default DoctorsSection