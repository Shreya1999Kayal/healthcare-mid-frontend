import { Building2, CalendarDays, Droplets, Star, X } from "lucide-react"
import { useEffect, useState } from "react"
import { formatCampDate, getAverageRating } from "../../../services/helper/public/blood.helper"
import type { CampDetailsModalProps } from "../../../types/interface/public/Blood.interface"

const CampDetailsModal = ({ camp, organiser, onClose }: CampDetailsModalProps) => {
  const [imageFailed, setImageFailed] = useState(false)
  const rating = getAverageRating(organiser.reviews.map((review) => review.rating))

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const stats = [
    { label: "Blood received", value: `${organiser.totalKg} kg` },
    { label: "Hospitals helped", value: String(organiser.donatedTo.length) },
    { label: "Camps listed", value: String(organiser.pastEvents.length) },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-medical-navy/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${organiser.name} details`}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-medical-bg-soft text-2xl font-extrabold text-medical-primary-dark">
              {!imageFailed ? (
                <img
                  src={organiser.image}
                  alt={organiser.name}
                  className="h-full w-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                organiser.name.charAt(0)
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-medical-navy">{organiser.name}</h3>
              <p className="text-sm text-medical-muted">Organising camps since {organiser.since}</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-medical-navy">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                {rating.toFixed(1)}
                <span className="font-normal text-medical-muted">({organiser.reviews.length} reviews)</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-full border border-medical-border bg-white p-2 text-medical-muted hover:bg-medical-bg-soft"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-4 text-sm text-medical-muted">{organiser.about}</p>
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
          This camp: {camp.title}, {formatCampDate(camp.date)}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-medical-bg-soft p-3 text-center">
              <p className="text-xl font-extrabold text-medical-navy">{stat.value}</p>
              <p className="text-xs text-medical-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <h4 className="mt-6 mb-2 text-base font-bold text-medical-navy">Blood donated to hospitals</h4>
        <ul className="flex flex-wrap gap-2">
          {organiser.donatedTo.map((hospital) => (
            <li
              key={hospital}
              className="flex items-center gap-1 rounded-full border border-medical-border px-3 py-1 text-xs text-medical-navy"
            >
              <Building2 size={13} /> {hospital}
            </li>
          ))}
        </ul>

        <h4 className="mt-6 mb-2 text-base font-bold text-medical-navy">Previous events</h4>
        <ul className="flex flex-col gap-2">
          {organiser.pastEvents.map((event) => (
            <li
              key={event.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-medical-border px-4 py-2 text-sm"
            >
              <span className="font-semibold text-medical-navy">{event.title}</span>
              <span className="flex items-center gap-4 text-medical-muted">
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} /> {formatCampDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Droplets size={14} /> {event.units} units
                </span>
              </span>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 mb-2 text-base font-bold text-medical-navy">Reviews</h4>
        <ul className="flex flex-col gap-3">
          {organiser.reviews.map((review) => (
            <li key={review.id} className="rounded-xl border border-medical-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-medical-navy">{review.name}</p>
                <p className="flex items-center gap-1 text-xs font-semibold text-medical-navy">
                  <Star size={13} className="fill-amber-400 text-amber-400" /> {review.rating}
                </p>
              </div>
              <p className="mt-1 text-sm text-medical-muted">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CampDetailsModal