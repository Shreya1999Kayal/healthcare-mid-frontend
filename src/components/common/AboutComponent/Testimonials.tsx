import { Quote } from "lucide-react"
import { testimonials } from "../../../constants/public/about.constants"

import SectionHeading from "./SectionHeading"
import TestimonialAvatar from "./TestimonialAvatar"

const Testimonials = () => {
  return (
    <section aria-label="What people say about Seva">
      <SectionHeading title="What people say about Seva" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="flex h-full flex-col rounded-3xl border border-medical-border bg-white p-6 shadow-md shadow-medical-navy/10"
          >
            <Quote size={28} className="text-medical-primary" />
            <blockquote className="mt-3 flex-1 text-sm text-medical-navy">{item.quote}</blockquote>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-medical-border pt-4">
             <TestimonialAvatar name={item.name} image={item.image} />
              <span>
                <span className="block text-sm font-bold text-medical-navy">{item.name}</span>
                <span className="block text-xs text-medical-muted">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Testimonials