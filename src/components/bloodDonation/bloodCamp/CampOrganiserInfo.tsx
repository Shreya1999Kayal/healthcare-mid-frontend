import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { formatIsoDate } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { CampOrganiserInfoProps } from "../../../types/interface/blood/campInterface/CampEvent.interface"

// About the organiser (same data as the camp details on the public Blood page)
const CampOrganiserInfo = ({ organiser }: CampOrganiserInfoProps) => {
  return (
    <section className={`${bloodBankCardClass} grid gap-6 lg:grid-cols-[1fr_20rem]`}>
      <div>
        <h2 className="text-lg font-bold text-blood-navy">{organiser.name}</h2>
        <p className="text-sm text-blood-muted">Organising camps since {organiser.since}</p>
        <p className="mt-3 text-sm text-blood-navy">{organiser.about}</p>

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-blood-muted">Blood donated to</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {organiser.donatedTo.map((name) => (
            <span key={name} className="rounded-full bg-blood-bg-soft px-3 py-1 text-xs font-semibold text-blood-primary-dark">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-blood-muted">Past events</p>
        <ul className="mt-2 flex flex-col gap-2">
          {organiser.pastEvents.map((event) => (
            <li key={event.id} className="rounded-xl bg-blood-bg p-3">
              <p className="text-sm font-semibold text-blood-navy">{event.title}</p>
              <p className="text-xs text-blood-muted">
                {formatIsoDate(event.date)} · {event.units} units
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CampOrganiserInfo