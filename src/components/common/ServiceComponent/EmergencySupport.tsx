import { Typography } from "@mui/material"
import { CircleCheck, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { emergencyItems } from "../../../constants/public/services.constants"

const points = [
  "Urgent blood requests reach nearby donors and blood banks",
  "Ambulance, ICU and oxygen bed information in one place",
  "Verified hospitals and doctors you can trust",
]

const EmergencySupport = () => {
  return (
    <section className="w-full bg-linear-to-b from-white to-medical-bg px-6 py-16 md:px-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Left: text */}
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-medical-primary-dark shadow-sm">
            <ShieldCheck size={16} /> Emergency support
          </span>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.2 }}>
            Help when every minute counts
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2, mb: 4, maxWidth: 460 }}>
            In an emergency you should not have to search. Seva puts urgent help one click away.
          </Typography>

          <ul className="flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CircleCheck size={22} className="mt-0.5 shrink-0 text-medical-primary" />
                <Typography sx={{ color: "secondary.main", fontWeight: 500, fontSize: "0.95rem" }}>
                  {point}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: stacked cards */}
        <div className="flex flex-col gap-5">
          {emergencyItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                to={item.to}
                className="flex items-center gap-5 rounded-3xl border border-medical-border bg-white p-6 no-underline shadow-lg shadow-medical-navy/10 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-medical-primary to-medical-primary-dark text-white">
                  <Icon size={30} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-medical-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-medical-muted">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EmergencySupport