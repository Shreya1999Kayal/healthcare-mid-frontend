import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import type { DoctorChambersProps } from "../../../types/interface/public/Doctor.interface"

const DoctorChambers = ({ chambers }: DoctorChambersProps) => {
  if (chambers.length === 0) {
    return <p className="mt-4 text-sm text-medical-muted">Visiting schedule will be added soon.</p>
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {chambers.map((chamber) => (
        <article
          key={chamber.id}
          className="rounded-2xl border border-medical-border bg-white p-4 shadow-sm shadow-medical-navy/5"
        >
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/hospitals/${chamber.hospitalId}`}
              className="font-bold text-medical-navy no-underline hover:text-medical-primary-dark"
            >
              {chamber.hospitalName}
            </Link>
            <span className="shrink-0 rounded-full bg-medical-bg-soft px-3 py-1 text-xs font-semibold text-medical-primary-dark">
              {chamber.designation}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-2 text-sm text-medical-muted">
            <MapPin size={15} /> {chamber.location}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-medical-navy">
            <CalendarDays size={15} /> {chamber.days}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-medical-navy">
            <Clock size={15} /> {chamber.time}
          </p>
        </article>
      ))}
    </div>
  )
}

export default DoctorChambers