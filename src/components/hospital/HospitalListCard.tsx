import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { HospitalListCardProps } from "../../types/interface/hospitalInterface/HospitalProfile.interface"

const HospitalListCard = ({ title, items, icon: Icon }: HospitalListCardProps) => {
  return (
    <section className={hospitalCardClass}>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-hospital-navy">
        <Icon size={18} className="text-hospital-primary-dark" /> {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-hospital-muted">Nothing added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full bg-hospital-bg-soft px-3 py-1 text-xs font-semibold text-hospital-primary-dark">
              {item}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}

export default HospitalListCard