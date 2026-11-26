import { Building2, Mail, MapPin, PhoneCall } from "lucide-react"
import type { ReactNode } from "react"
import { companyDetails } from "../../../constants/public/contact.constants"

const IconCircle = ({ children }: { children: ReactNode }) => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-medical-border bg-white text-medical-navy shadow-sm">
    {children}
  </span>
)

const CompanyCard = () => {
  return (
    <section
      aria-label="Company details"
      className="overflow-hidden rounded-2xl border border-medical-border bg-white shadow-md shadow-medical-navy/10"
    >
      {/* Name row */}
      <div className="flex items-center gap-5 border-b border-medical-border p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-medical-border bg-medical-bg-soft text-xl font-extrabold text-medical-primary-dark">
          S
        </span>
        <h2 className="text-xl font-bold text-medical-primary-dark">{companyDetails.name}</h2>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6 p-6 text-sm text-medical-navy">
        <div className="flex items-center gap-4">
          <IconCircle>
            <MapPin size={18} />
          </IconCircle>
          <p>{companyDetails.address}</p>
        </div>

        <div className="flex items-center gap-4">
          <IconCircle>
            <PhoneCall size={18} />
          </IconCircle>
          <p>{companyDetails.appointmentPhone}</p>
        </div>

        <div className="flex items-center gap-4">
          <IconCircle>
            <Building2 size={18} />
          </IconCircle>
          <p>{companyDetails.corporatePhones}</p>
        </div>

        <div className="flex items-start gap-4">
          <IconCircle>
            <Mail size={18} />
          </IconCircle>
          <div className="grid flex-1 gap-5 md:grid-cols-3">
            {companyDetails.emails.map((item) => (
              <div key={item.email}>
                <p>{item.label}</p>
                <a
                  href={`mailto:${item.email}`}
                  className="text-medical-primary-dark no-underline hover:underline"
                >
                  {item.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyCard