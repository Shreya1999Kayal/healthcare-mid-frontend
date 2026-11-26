import CallbackForm from "../../components/common/ContactComponent/CallbackForm"
import CompanyCard from "../../components/common/ContactComponent/CompanyCard"
import ContactTabs from "../../components/common/ContactComponent/ContactTabs"
import SectionHeading from "../../components/common/AboutComponent/SectionHeading"
import { contactTabs } from "../../constants/public/contact.constants"

const Contact = () => {
  return (
    <>
      {/* Banner */}
      <section className="bg-linear-to-br from-medical-primary to-medical-navy px-4 pb-24 pt-14 text-center text-white">
        <h1 className="text-3xl font-extrabold md:text-5xl">Contact us</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Feedback, questions or a call back, we are happy to help.
        </p>
      </section>

      <div className="bg-medical-bg pb-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4">
          {/* Overlaps the banner */}
          <div className="-mt-14">
            <CompanyCard />
          </div>

          <section aria-label="Get in touch">
            <SectionHeading title="Get in touch" />
            <ContactTabs tabs={contactTabs} />
          </section>

          <section aria-label="Request a call back">
            <SectionHeading title="Request a Call Back" />
            <CallbackForm />
          </section>
        </div>
      </div>
    </>
  )
}

export default Contact