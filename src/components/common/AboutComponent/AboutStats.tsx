import { aboutStats } from "../../../constants/public/about.constants"
import SectionHeading from "./SectionHeading"

const AboutStats = () => {
  return (
    <section aria-label="Seva in numbers">
      <SectionHeading title="Seva in numbers" />

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {aboutStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-medical-border bg-white p-6 text-center shadow-md shadow-medical-navy/10"
          >
            <p className="bg-linear-to-r from-medical-primary to-medical-primary-dark bg-clip-text text-4xl font-extrabold text-transparent">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-medical-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutStats
