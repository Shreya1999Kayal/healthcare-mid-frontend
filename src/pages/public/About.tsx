import AboutHero from "../../components/common/AboutComponent/AboutHero"
import AboutStory from "../../components/common/AboutComponent/AboutStory"
import AboutStats from "../../components/common/AboutComponent/AboutStats"
import CoreValues from "../../components/common/AboutComponent/CoreValues"
import Testimonials from "../../components/common/AboutComponent/Testimonials"
import ServicesCta from "../../components/common/ServiceComponent/ServicesCta"

const About = () => {
  return (
    <>
      <AboutHero />

      <section className="w-full bg-medical-bg px-6 py-12 md:px-16">
        <div className="flex flex-col gap-14">
          <AboutStory />
          <AboutStats />
          <CoreValues />
          <Testimonials />
        </div>
      </section>

      <ServicesCta />
    </>
  )
}

export default About