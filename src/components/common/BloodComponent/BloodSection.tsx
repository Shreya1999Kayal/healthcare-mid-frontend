
import type { BloodSectionProps } from "../../../types/interface/public/Blood.interface"
import SectionHeading from "../AboutComponent/SectionHeading"

const BloodSection = ({ id, title, text, children }: BloodSectionProps) => {
  return (
    // id lets the Home cards (/blood?tab=donors) scroll to this section
    <section id={id} aria-label={title} className="scroll-mt-24">
      <SectionHeading title={title} />
      <p className="mb-6 max-w-3xl text-medical-muted">{text}</p>
      {children}
    </section>
  )
}

export default BloodSection