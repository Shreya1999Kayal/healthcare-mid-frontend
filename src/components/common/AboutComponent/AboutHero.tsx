import { Info } from "lucide-react"

const AboutHero = () => {
  return (
    <section className="w-full bg-linear-to-br from-white via-medical-bg to-medical-bg-soft px-6 py-14 md:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-medical-primary-dark shadow-sm">
          <Info size={16} /> About us
        </span>
        <h1 className="text-3xl font-extrabold leading-tight text-medical-navy md:text-5xl">
          Healthcare made simple and close to you
        </h1>
        <p className="mt-4 text-medical-muted">
          Seva brings doctors, hospitals, blood banks and emergency help together in one place, so care is never far
          away.
        </p>
      </div>
    </section>
  )
}

export default AboutHero