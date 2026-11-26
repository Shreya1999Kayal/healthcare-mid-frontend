import { Clock, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import type { BloodBankCardProps } from "../../../types/interface/public/Blood.interface"


const BloodBankCard = ({ bank }: BloodBankCardProps) => {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-medical-border bg-white p-5 shadow-sm shadow-medical-navy/5">
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          bank.hospitalId ? "bg-medical-bg-soft text-medical-primary-dark" : "bg-red-50 text-red-600"
        }`}
      >
        {bank.hospitalId ? "Seva hospital" : "Independent organisation"}
      </span>

      <h3 className="text-lg font-bold text-medical-navy">{bank.name}</h3>

      <p className="flex items-start gap-2 text-sm text-medical-muted">
        <MapPin size={15} className="mt-0.5 shrink-0" /> {bank.address}
      </p>
      <p className="flex items-center gap-2 text-sm text-medical-muted">
        <Clock size={15} /> {bank.timings}
      </p>
      <p className="flex items-center gap-2 text-sm text-medical-muted">
        <Phone size={15} />
        <a href={`tel:${bank.phone.replace(/\s/g, "")}`} className="text-medical-primary-dark no-underline hover:underline">
          {bank.phone}
        </a>
      </p>

      <div>
        <p className="text-xs font-semibold text-medical-muted">Available blood groups</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {bank.availableGroups.map((group) => (
            <span key={group} className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
              {group}
            </span>
          ))}
        </div>
      </div>

      {bank.hospitalId && (
        <Link
          to={`/hospitals/${bank.hospitalId}`}
          className="mt-auto block rounded-md bg-medical-bg-soft px-4 py-3 text-center text-sm font-semibold text-medical-navy no-underline transition-colors hover:bg-medical-border"
        >
          View hospital
        </Link>
      )}
    </article>
  )
}

export default BloodBankCard