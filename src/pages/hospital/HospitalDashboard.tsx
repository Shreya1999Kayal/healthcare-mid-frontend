import { Activity, Ambulance, BedDouble, CalendarCheck } from "lucide-react"
import { Link, useOutletContext } from "react-router-dom"
import AmbulanceStatusList from "../../components/hospital/AmbulanceStatusList"
import BedAvailability from "../../components/hospital/BedAvailability"
import HospitalRecentNotifications from "../../components/hospital/HospitalRecentNotifications"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import TodayHospitalAppointments from "../../components/hospital/TodayHospitalAppointments"
import { hospitalAmbulances, hospitalBeds, hospitalTodayAppointments } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const quickLinks = [
  { label: "Update beds", section: "beds" },
  { label: "Ambulances", section: "ambulances" },
  { label: "Appointments", section: "appointments" },
]

const HospitalDashboard = () => {
  const { hospital, notifications } = useOutletContext<HospitalOutletContext>()

  const totalBeds = hospitalBeds.reduce((sum, bed) => sum + bed.total, 0)
  const freeBeds = hospitalBeds.reduce((sum, bed) => sum + (bed.total - bed.occupied), 0)
  const icu = hospitalBeds.find((bed) => bed.type === "ICU")
  const freeIcu = icu ? icu.total - icu.occupied : 0
  const freeAmbulances = hospitalAmbulances.filter((ambulance) => ambulance.status === "available").length
  const activeAppointments = hospitalTodayAppointments.filter((appointment) => appointment.status !== "cancelled").length

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
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Welcome, {hospital.name}</h1>
          <p className="text-sm text-hospital-muted">{todayLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.section}
              to={hospitalPath(link.section, hospital.id)}
              className="rounded-md border border-hospital-primary bg-white px-4 py-2 text-xs font-semibold text-hospital-primary-dark no-underline hover:bg-hospital-bg-soft"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Beds available" value={`${freeBeds}/${totalBeds}`} hint="All wards" icon={BedDouble} />
        <HospitalSummaryCard label="ICU beds free" value={freeIcu} hint={`Out of ${icu?.total ?? 0}`} icon={Activity} />
        <HospitalSummaryCard label="Today's appointments" value={activeAppointments} hint="Not counting cancelled" icon={CalendarCheck} />
        <HospitalSummaryCard
          label="Ambulances free"
          value={`${freeAmbulances}/${hospitalAmbulances.length}`}
          hint="Ready to go"
          icon={Ambulance}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TodayHospitalAppointments appointments={hospitalTodayAppointments} />
        </div>
        <BedAvailability beds={hospitalBeds} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AmbulanceStatusList ambulances={hospitalAmbulances} />
        <HospitalRecentNotifications notifications={notifications.slice(0, 4)} hospitalId={hospital.id} />
      </div>
    </div>
  )
}

export default HospitalDashboard