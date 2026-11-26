import { Award, BadgeCheck, GraduationCap, Pencil, Sparkles } from "lucide-react"
import DoctorAvatar from "./DoctorAvatar"
import ProfileListSection from "./ProfileListSection"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { formatFee } from "../../services/helper/public/doctor.helper"
import { getConsultationTypeLabel } from "../../services/helper/doctorHelper/doctorProfile.helper"
import type { ProfileViewProps } from "../../types/interface/doctorInterface/DoctorProfile.interface"

const ProfileView = ({ profile, onEdit }: ProfileViewProps) => {
  const facts = [
    { label: "Experience", value: `${profile.experience} years` },
    { label: "Rating", value: `${profile.rating.toFixed(1)} (${profile.reviewsCount} reviews)` },
    { label: "Registration no.", value: profile.registrationNo },
    { label: "Consultation", value: getConsultationTypeLabel(profile.consultationType) },
  ]

  // show only the fees that match the consultation type
  const fees = [
    ...(profile.consultationType !== "online" ? [{ label: "In-person visit", value: profile.inPersonFee }] : []),
    ...(profile.consultationType !== "in-person" ? [{ label: "Online consultation", value: profile.onlineFee }] : []),
  ]

  const lists = [
    { title: "Qualifications", items: profile.qualifications, icon: GraduationCap },
    { title: "Expertise", items: profile.expertise, icon: Sparkles },
    { title: "Awards", items: profile.awards, icon: Award },
    { title: "Certifications", items: profile.certifications, icon: BadgeCheck },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className={`${doctorCardClass} flex flex-col gap-5 md:flex-row md:items-center`}>
        <DoctorAvatar key={profile.image} name={profile.name} image={profile.image} className="h-24 w-24" />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-doctor-navy">{profile.name}</h2>
          <p className="text-sm font-semibold text-doctor-primary-dark">
            {profile.speciality}
            {profile.subSpeciality && ` · ${profile.subSpeciality}`}
          </p>
          <p className="mt-1 text-sm text-doctor-muted">
            {profile.email} · {profile.phone}
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex w-fit items-center gap-2 rounded-md bg-doctor-primary px-4 py-2 text-sm font-semibold text-white hover:bg-doctor-primary-dark"
        >
          <Pencil size={16} /> Edit profile
        </button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className={doctorCardClass}>
            <p className="text-xs text-doctor-muted">{fact.label}</p>
            <p className="mt-1 font-bold text-doctor-navy">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className={`${doctorCardClass} lg:col-span-2`}>
          <h2 className="mb-2 text-lg font-bold text-doctor-navy">About</h2>
          <p className="text-sm leading-relaxed text-doctor-navy">{profile.bio}</p>
          <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-doctor-muted">Languages</p>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((language) => (
              <span key={language} className="rounded-full bg-doctor-bg-soft px-3 py-1 text-xs font-semibold text-doctor-primary-dark">
                {language}
              </span>
            ))}
          </div>
        </section>

        <section className={doctorCardClass}>
          <h2 className="mb-2 text-lg font-bold text-doctor-navy">Fees</h2>
          <ul className="divide-y divide-doctor-border">
            {fees.map((fee) => (
              <li key={fee.label} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-doctor-muted">{fee.label}</span>
                <span className="font-bold text-doctor-navy">{formatFee(fee.value)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {lists.map((list) => (
          <ProfileListSection key={list.title} title={list.title} items={list.items} icon={list.icon} />
        ))}
      </div>
    </div>
  )
}

export default ProfileView