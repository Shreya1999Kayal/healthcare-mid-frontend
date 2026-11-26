import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { ProfileListSectionProps } from "../../types/interface/doctorInterface/DoctorProfile.interface"

const ProfileListSection = ({ title, items, icon: Icon }: ProfileListSectionProps) => {
  return (
    <section className={doctorCardClass}>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-doctor-navy">
        <Icon size={18} className="text-doctor-primary-dark" /> {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-doctor-muted">Nothing added yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-doctor-navy">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-doctor-primary" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProfileListSection