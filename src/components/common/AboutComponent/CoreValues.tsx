import { coreValues } from "../../../constants/public/about.constants"
import SectionHeading from "./SectionHeading"

const CoreValues = () => {
  return (
    <section aria-label="What we stand for">
      <SectionHeading title="What we stand for" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coreValues.map((value) => {
          const Icon = value.icon
          return (
            <div
              key={value.title}
              className="flex h-full flex-col rounded-3xl border border-medical-border bg-white p-6 shadow-md shadow-medical-navy/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-medical-navy/25"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-medical-primary to-medical-primary-dark text-white">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-medical-navy">{value.title}</h3>
              <p className="mt-2 text-sm text-medical-muted">{value.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CoreValues