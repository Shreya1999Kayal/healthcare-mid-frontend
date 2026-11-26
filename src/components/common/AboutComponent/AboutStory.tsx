import { useState } from "react"
import { CircleCheck, HeartPulse } from "lucide-react"
import { storyPoints } from "../../../constants/public/about.constants"
import SectionHeading from "./SectionHeading"

// Put your picture at public/images/about/about-us.jpeg (keep it under about 200 KB).
// If the picture is missing, a heart icon is shown instead.
const IMAGE_SRC = "/images/about/about-us.jpeg"

const AboutStory = () => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section aria-label="Our story">
      <SectionHeading title="Our story" />

      <article className="grid overflow-hidden rounded-3xl border border-medical-border bg-white shadow-lg shadow-medical-navy/10 md:grid-cols-2">
        {/* Left: picture */}
        <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-medical-primary to-medical-navy md:aspect-auto md:min-h-80">
          {imageFailed ? (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <HeartPulse size={72} />
            </div>
          ) : (
            <img
              src={IMAGE_SRC}
              alt="The Seva care team"
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        {/* Right: text */}
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="w-fit rounded-full bg-medical-bg px-3 py-1 text-xs font-semibold text-medical-primary-dark">
            Who we are
          </span>
          <h3 className="mt-4 text-2xl font-extrabold leading-tight text-medical-navy md:text-3xl">
            Care should never depend on luck
          </h3>
          <p className="mt-3 text-medical-muted">
            Finding the right doctor, a hospital bed or blood in time should be simple. Seva brings trusted
            healthcare information together so families can act fast and choose with confidence.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {storyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium text-medical-navy">
                <CircleCheck size={20} className="mt-0.5 shrink-0 text-medical-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}

export default AboutStory