import { Link, useParams } from "react-router-dom"
import { Building2, CalendarDays, Clock, IndianRupee, MapPin, Phone, Timer } from "lucide-react"
import AvailabilitySwitch from "./AvailabilitySwitch"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { formatFee } from "../../services/helper/public/doctor.helper"
import { formatTimeRange } from "../../services/helper/doctorHelper/doctorSchedule.helper"
import type { ChamberCardProps } from "../../types/interface/doctorInterface/DoctorChambers.interface"
import { doctorPath } from "../../services/helper/doctorHelper/doctorDashboard.helper"

const ChamberCard = ({ chamber, detail, hospital, schedule, counts, onToggle }: ChamberCardProps) => {
  const { id = "" } = useParams()
  const facts = [
    { icon: CalendarDays, label: "Days", value: schedule?.days.join(", ") || "Not set" },
    { icon: Clock, label: "Timing", value: schedule ? formatTimeRange(schedule.start, schedule.end) : "Not set" },
    { icon: Timer, label: "Slot length", value: schedule ? `${schedule.slotMinutes} min` : "—" },
    { icon: IndianRupee, label: "Fee", value: formatFee(detail.fee) },
  ]

  const stats = [
    { label: "Today", value: counts.today },
    { label: "Upcoming", value: counts.upcoming },
    { label: "Patients", value: chamber.patients },
  ]

  return (
    <article className={`${doctorCardClass} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-doctor-primary to-doctor-primary-dark text-white">
            <Building2 size={22} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-doctor-navy">{chamber.hospital}</h2>
            <p className="text-xs text-doctor-muted">{detail.room}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${detail.available ? "text-emerald-700" : "text-doctor-muted"}`}>
            {detail.available ? "Taking bookings" : "Paused"}
          </span>
          <AvailabilitySwitch checked={detail.available} label={`Bookings at ${chamber.hospital}`} onChange={onToggle} />
        </div>
      </div>

      {hospital && (
        <div className="flex flex-col gap-1 text-sm text-doctor-muted">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-doctor-primary-dark" /> {hospital.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-doctor-primary-dark" /> {hospital.phone}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-doctor-bg p-3">
            <p className="flex items-center gap-1 text-xs text-doctor-muted">
              <Icon size={14} /> {label}
            </p>
            <p className="text-sm font-semibold text-doctor-navy">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 divide-x divide-doctor-border rounded-xl border border-doctor-border text-center">
        {stats.map((item) => (
          <div key={item.label} className="py-2">
            <p className="text-lg font-extrabold text-doctor-navy">{item.value}</p>
            <p className="text-xs text-doctor-muted">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link
          to={`${doctorPath("schedule", id)}?chamber=${chamber.id}`}
          className="rounded-md bg-doctor-primary px-4 py-2 text-xs font-semibold text-white no-underline hover:bg-doctor-primary-dark"
        >
          Edit schedule
        </Link>
        {hospital && (
          <Link
            to={`/hospitals/${hospital.id}`}
            className="rounded-md border border-doctor-primary px-4 py-2 text-xs font-semibold text-doctor-primary-dark no-underline hover:bg-doctor-bg-soft"
          >
            Hospital page
          </Link>
        )}
      </div>
    </article>
  )
}

export default ChamberCard