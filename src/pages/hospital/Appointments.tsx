import { useState } from "react"
import { CalendarCheck, CircleCheck, Clock, Plus, Search, UserRoundCheck } from "lucide-react"
import BookingForm from "../../components/hospital/BookingForm"
import BookingsTable from "../../components/hospital/BookingsTable"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import {
  hospitalAppointmentStatusStyles,
  hospitalCardClass,
  hospitalFieldClass,
} from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { appointmentDayTabs, appointmentStatusOptions, hospitalBookings } from "../../constants/hospitalConstants/hospitalAppointment.constants"
import { ALL_OPTION, doctorDepartmentOptions } from "../../constants/hospitalConstants/hospitalDoctor.constants"
import {
  filterBookings,
  fromBookingForm,
  getBookingDay,
  sortBookings,
} from "../../services/helper/hospitalHelper/hospitalAppointment.helper"
import type { HospitalAppointmentStatus } from "../../types/type/hospitalType/HospitalDashboard.type"
import type { AppointmentDayTab, BookingFormValues, HospitalBooking } from "../../types/type/hospitalType/HospitalAppointment.type"

const Appointments = () => {
  // Local copy (UI only, nothing is saved)
  const [bookings, setBookings] = useState<HospitalBooking[]>(hospitalBookings)
  const [formOpen, setFormOpen] = useState(false)
  const [tab, setTab] = useState<AppointmentDayTab>("today")
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState(ALL_OPTION)
  const [status, setStatus] = useState(ALL_OPTION)
  const [message, setMessage] = useState("")

  // Past tab shows the latest first
  const sorted = sortBookings(filterBookings(bookings, tab, search, department, status))
  const shownBookings = tab === "past" ? sorted.reverse() : sorted

  const todayBookings = bookings.filter((booking) => getBookingDay(booking.date) === "today")
  const countToday = (value: HospitalAppointmentStatus) => todayBookings.filter((booking) => booking.status === value).length
  const pendingCount = bookings.filter((booking) => booking.status === "pending" && getBookingDay(booking.date) !== "past").length
  const countInTab = (value: AppointmentDayTab) => bookings.filter((booking) => getBookingDay(booking.date) === value).length

  const saveBooking = (values: BookingFormValues) => {
    const booking = fromBookingForm(values)
    setBookings((prev) => [...prev, booking])
    setFormOpen(false)
    setTab(getBookingDay(booking.date)) // jump to the tab of the new booking
    setMessage(`Appointment booked for ${booking.patient} with ${booking.doctor}.`)
  }

  const changeStatus = (bookingId: string, next: HospitalAppointmentStatus) => {
    const booking = bookings.find((item) => item.id === bookingId)
    if (!booking) return
    if (next === "cancelled" && !window.confirm(`Cancel the appointment of ${booking.patient}?`)) return

    setBookings((prev) => prev.map((item) => (item.id === bookingId ? { ...item, status: next } : item)))
    setMessage(`${booking.patient}: ${hospitalAppointmentStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Appointments</h1>
          <p className="text-sm text-hospital-muted">Patient bookings for all doctors.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true)
              setMessage("")
            }}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Plus size={16} /> Book walk-in
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Today's appointments" value={todayBookings.length} hint="All statuses" icon={CalendarCheck} />
        <HospitalSummaryCard label="Waiting for approval" value={pendingCount} hint="Pending requests" icon={Clock} />
        <HospitalSummaryCard label="Checked in" value={countToday("checked-in")} hint="Waiting to be seen" icon={UserRoundCheck} />
        <HospitalSummaryCard label="Completed today" value={countToday("completed")} hint="Visits done" icon={CircleCheck} />
      </div>

      {formOpen && <BookingForm bookings={bookings} onSave={saveBooking} onCancel={() => setFormOpen(false)} />}

      <div className="flex flex-wrap gap-2">
        {appointmentDayTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === option.value
                ? "bg-hospital-primary text-white"
                : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
            }`}
          >
            {option.label} ({countInTab(option.value)})
          </button>
        ))}
      </div>

      <div className={`${hospitalCardClass} flex flex-wrap items-center gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name or phone"
            aria-label="Search appointments"
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
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={hospitalFieldClass}>
          <option value={ALL_OPTION}>All statuses</option>
          {appointmentStatusOptions.map((option) => (
            <option key={option} value={option}>
              {hospitalAppointmentStatusStyles[option].label}
            </option>
          ))}
        </select>
      </div>

      {shownBookings.length === 0 ? (
        <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No appointments here.</p>
      ) : (
        <BookingsTable bookings={shownBookings} onStatusChange={changeStatus} />
      )}
    </div>
  )
}

export default Appointments