import type { HospitalInfoItemProps } from "../../../types/interface/public/Hospital.interface"



const HospitalInfoItem = ({ icon: Icon, label, value, href }: HospitalInfoItemProps) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-medical-border bg-white p-4 shadow-sm shadow-medical-navy/5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medical-bg-soft text-medical-primary-dark">
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-medical-muted">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block break-words text-sm font-semibold text-medical-navy no-underline hover:text-medical-primary-dark"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 break-words text-sm font-semibold text-medical-navy">{value}</p>
        )}
      </div>
    </div>
  )
}

export default HospitalInfoItem