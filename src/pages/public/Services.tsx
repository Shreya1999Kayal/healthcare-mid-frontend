import EmergencySupport from "../../components/common/ServiceComponent/EmergencySupport"
import ServiceCards from "../../components/common/ServiceComponent/ServiceCards"
import ServicesCta from "../../components/common/ServiceComponent/ServicesCta"
import ServicesHero from "../../components/common/ServiceComponent/ServicesHero"
import ServicesMarquee from "../../components/common/ServiceComponent/ServicesMarquee"


const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesMarquee />
      <ServiceCards />
      <EmergencySupport />
      <ServicesCta />
    </>
  )
}

export default Services