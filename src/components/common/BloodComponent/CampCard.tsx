import { Building2, Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { formatCampDate, getCampDate } from "../../../services/helper/public/blood.helper"
import type { CampCardProps } from "../../../types/interface/public/Blood.interface"

const CampCard = ({ camp, organiser, onViewDetails }: CampCardProps) => {
  const [imageFailed, setImageFailed] = useState(false)
  const date = getCampDate(camp.date)
  const showImage = Boolean(organiser?.image) && !imageFailed

  return (
    <article className="flex gap-5 rounded-2xl border border-medical-border bg-white p-5 shadow-sm shadow-medical-navy/5">
      {/* Square profile picture with the date highlighted on top */}
      <div className="relative h-24 w-24 shrink-0">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-medical-bg-soft text-2xl font-extrabold text-medical-primary-dark">
          {showImage ? (
            <img
              src={organiser?.image}
              alt={camp.organiser}
              className="h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            camp.organiser.charAt(0)
          )}
        </div>
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-baseline gap-1 rounded-full bg-linear-to-br from-red-400 to-red-600 px-3 py-1 text-white shadow-md">
          <span className="text-base font-extrabold leading-none">{date.getDate()}</span>
          <span className="text-xs font-semibold uppercase">
            {date.toLocaleDateString("en-IN", { month: "short" })}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-bold text-medical-navy">{camp.title}</h3>
        <p className="flex items-center gap-2 text-sm text-medical-muted">
          <Building2 size={15} /> {camp.organiser}
        </p>
        <p className="flex items-center gap-2 text-sm text-medical-muted">
          <Clock size={15} /> {formatCampDate(camp.date)}, {camp.time}
        </p>
        <p className="flex items-center gap-2 text-sm text-medical-muted">
          <MapPin size={15} /> {camp.venue}, {camp.city}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            {camp.note}
          </span>
          <button
            type="button"
            onClick={() => onViewDetails(camp)}
            className="cursor-pointer rounded-md border border-medical-primary bg-white px-4 py-2 text-xs font-semibold text-medical-primary-dark hover:bg-medical-bg-soft"
          >
            View details
          </button>
          {camp.status === "upcoming" && (
            <Link
              to="/signup"
              className="rounded-md bg-linear-to-br from-medical-primary to-medical-primary-dark px-4 py-2 text-xs font-semibold text-white no-underline hover:opacity-90"
            >
              Register to donate
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default CampCard