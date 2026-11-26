import { MapPin, Pencil } from "lucide-react"
import type { CampEventCardProps } from "../../../types/interface/blood/campInterface/CampEvent.interface"
import { getCampView } from "../../../services/helper/blood/campHelper/campEvent.helper"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { formatIsoDate } from "../../../services/helper/doctorHelper/doctorDashboard.helper"


const CampEventCard = ({ camp, today, onEdit }: CampEventCardProps) => {
  const isUpcoming = getCampView(camp, today) === "upcoming"

  return (
    <article className={`${bloodBankCardClass} flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-blood-navy">{camp.title}</h3>
          <p className="text-xs text-blood-muted">
            {formatIsoDate(camp.date)} · {camp.time}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isUpcoming ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {isUpcoming ? "Upcoming" : "Held"}
        </span>
      </div>

      <p className="flex items-center gap-2 text-sm text-blood-navy">
        <MapPin size={16} className="shrink-0 text-blood-primary" />
        {camp.venue}, {camp.city}
      </p>
      {camp.note && <p className="text-sm text-blood-muted">{camp.note}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blood-bg p-3">
          <p className="text-lg font-extrabold text-blood-navy">{camp.registrations}</p>
          <p className="text-xs text-blood-muted">Donors registered</p>
        </div>
        <div className="rounded-xl bg-blood-bg p-3">
          <p className="text-lg font-extrabold text-blood-navy">{camp.unitsCollected ?? "—"}</p>
          <p className="text-xs text-blood-muted">Units collected</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEdit(camp)}
        className="flex w-fit items-center gap-2 rounded-md border border-blood-primary px-3 py-1.5 text-xs font-semibold text-blood-primary-dark hover:bg-blood-bg-soft"
      >
        <Pencil size={14} /> {isUpcoming ? "Edit camp" : "Edit or add units"}
      </button>
    </article>
  )
}

export default CampEventCard