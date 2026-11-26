import { CalendarCheck, Star, Users, UserRoundCheck } from "lucide-react"
import { Link, useOutletContext } from "react-router-dom"
import NextAppointment from "../../components/doctor/NextAppointment"
import PatientsByChamber from "../../components/doctor/PatientsByChamber"
import RecentNotifications from "../../components/doctor/RecentNotifications"
import SummaryCard from "../../components/doctor/SummaryCard"
import TodayAppointments from "../../components/doctor/TodayAppointments"
import WeeklyChart from "../../components/doctor/WeeklyChart"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { ALL_CHAMBERS, doctorAppointments, doctorChambers, weeklyAppointments } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPath, filterByChamber } from "../../services/helper/doctorHelper/doctorDashboard.helper"


const quickLinks = [
  { label: "Open queue", section: "queue" },
  { label: "Write prescription", section: "prescriptions" },
  { label: "Edit schedule", section: "schedule" },
]

const DoctorDashboard = () => {
  const { doctor, chamberId, notifications } = useOutletContext<DoctorOutletContext>()

  const appointments = filterByChamber(doctorAppointments, chamberId)
  const selectedChambers =
    chamberId === ALL_CHAMBERS ? doctorChambers : doctorChambers.filter((chamber) => chamber.id === chamberId)

  const todayAppointments = appointments.filter((appointment) => appointment.day === "today")
  const waiting = todayAppointments.filter((appointment) => appointment.status === "checked-in").length
  const nextAppointment = todayAppointments.find(
    (appointment) => appointment.status === "checked-in" || appointment.status === "confirmed",
  )
  const totalPatients = selectedChambers.reduce((sum, chamber) => sum + chamber.patients, 0)

  const todayLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Welcome back, {doctor.name}</h1>
          <p className="text-sm text-doctor-muted">{todayLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.section}
              to={doctorPath(link.section, doctor.id)}
              className="rounded-md border border-doctor-primary bg-white px-4 py-2 text-xs font-semibold text-doctor-primary-dark no-underline hover:bg-doctor-bg-soft"
            >
              {link.label}
            </Link>
          ))}

        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Today's appointments" value={todayAppointments.length} hint="Booked for today" icon={CalendarCheck} />
        <SummaryCard label="Patients waiting" value={waiting} hint="Checked in, not seen yet" icon={UserRoundCheck} />
        <SummaryCard label="Total patients" value={totalPatients} hint="Seen so far" icon={Users} />
        <SummaryCard
          label="Rating"
          value={doctor.rating.toFixed(1)}
          hint={`${doctor.reviewsCount} reviews`}
          icon={Star}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TodayAppointments appointments={todayAppointments} chambers={doctorChambers} />
        </div>
        <NextAppointment appointment={nextAppointment} chambers={doctorChambers} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <PatientsByChamber chambers={doctorChambers} />
        <WeeklyChart data={weeklyAppointments} />
        <RecentNotifications notifications={notifications.slice(0, 4)} />
      </div>
    </div>
  )
}

export default DoctorDashboard