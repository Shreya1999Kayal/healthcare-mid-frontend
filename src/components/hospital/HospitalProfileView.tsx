import { Award, Clock, Globe, Hospital, Mail, MapPin, Pencil, Phone, ShieldCheck, Siren, Sparkles, Stethoscope } from "lucide-react"
import HospitalListCard from "./HospitalListCard"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import type { HospitalProfileViewProps } from "../../types/interface/hospitalInterface/HospitalProfile.interface"

const HospitalProfileView = ({ profile, onEdit }: HospitalProfileViewProps) => {
  const facts = [
    { label: "Established", value: profile.establishedYear || "—" },
    { label: "Total beds", value: profile.totalBeds },
    { label: "Emergency", value: profile.emergency24x7 ? "Open 24x7" : "Not 24x7" },
    { label: "Registration no.", value: profile.registrationNo },
  ]

  const contacts = [
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: Siren, label: "Emergency", value: profile.emergencyPhone },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Globe, label: "Website", value: profile.website },
    { icon: Clock, label: "Timings", value: profile.openingHours },
    { icon: MapPin, label: "Address", value: `${profile.address}, ${profile.city} ${profile.pincode}` },
  ]

  const lists = [
    { title: "Specialities", items: profile.specialities, icon: Stethoscope },
    { title: "Facilities", items: profile.facilities, icon: Sparkles },
    { title: "Insurance accepted", items: profile.insurance, icon: ShieldCheck },
    { title: "Accreditations", items: profile.accreditations, icon: Award },
  ]

  const cover = profile.photos[0]

  return (
    <div className="flex flex-col gap-6">
      <section className={`${hospitalCardClass} overflow-hidden p-0`}>
        {cover ? (
          <img src={cover} alt={profile.name} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 items-center justify-center bg-linear-to-r from-hospital-primary to-hospital-primary-dark">
            <Hospital size={56} className="text-white/80" />
          </div>
        )}

        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-hospital-navy">{profile.name}</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Verified</span>
            </div>
            {profile.tagline && <p className="text-sm italic text-hospital-muted">{profile.tagline}</p>}
            <p className="mt-1 text-sm font-semibold text-hospital-primary-dark">
              {profile.hospitalType} · {profile.ownership}
            </p>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="flex w-fit items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Pencil size={16} /> Edit profile
          </button>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className={hospitalCardClass}>
            <p className="text-xs text-hospital-muted">{fact.label}</p>
            <p className="mt-1 font-bold text-hospital-navy">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className={`${hospitalCardClass} lg:col-span-2`}>
          <h2 className="mb-2 text-lg font-bold text-hospital-navy">About</h2>
          <p className="text-sm leading-relaxed text-hospital-navy">{profile.about || "No description yet."}</p>
        </section>

        <section className={hospitalCardClass}>
          <h2 className="mb-3 text-lg font-bold text-hospital-navy">Contact</h2>
          <ul className="flex flex-col gap-3">
            {contacts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3 text-sm">
                <Icon size={16} className="mt-0.5 shrink-0 text-hospital-primary-dark" />
                <div className="min-w-0">
                  <p className="text-xs text-hospital-muted">{label}</p>
                  <p className="wrap-break-word font-semibold text-hospital-navy">{value || "—"}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {lists.map((list) => (
          <HospitalListCard key={list.title} title={list.title} items={list.items} icon={list.icon} />
        ))}
      </div>

      {profile.photos.length > 0 && (
        <section className={hospitalCardClass}>
          <h2 className="mb-3 text-lg font-bold text-hospital-navy">Photos</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {profile.photos.map((photo) => (
              <img key={photo} src={photo} alt="Hospital" className="h-32 w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default HospitalProfileView