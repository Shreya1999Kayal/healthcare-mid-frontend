import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import BloodBanksSection from "../../components/common/BloodComponent/BloodBanksSection"
import BloodSection from "../../components/common/BloodComponent/BloodSection"
import CampsSection from "../../components/common/BloodComponent/CampsSection"
import DonorsSection from "../../components/common/BloodComponent/DonorsSection"

const BloodSearch = () => {
  // /blood?tab=donors (from the Home cards) scrolls to the section with that id
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab")
useEffect(() => {
  if (!tab) return
  const timer = setTimeout(() => {
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" })
  }, 300)
  return () => clearTimeout(timer)
}, [tab])

  return (
    <>
      {/* Banner */}
      <section className="bg-linear-to-br from-medical-primary to-medical-navy px-4 py-14 text-center text-white">
        <h1 className="text-3xl font-extrabold md:text-5xl">Blood camps, donors and blood banks</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Find a blood bank, an eligible donor or a camp near you.
        </p>
      </section>

      <div className="bg-medical-bg pb-16 pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4">
          <BloodSection
            id="blood-banks"
            title="Our Blood Banks"
            text="Find blood when every minute counts. Some blood banks are inside Seva hospitals and others are run by independent organisations. Check which blood groups are available before you travel."
          >
            <BloodBanksSection />
          </BloodSection>

          <BloodSection
            id="donors"
            title="Our Donors"
            text="Our donors are everyday people who give blood to help someone they have never met. Only donors who are eligible to donate today are listed, and their contact details stay private."
          >
            <DonorsSection />
          </BloodSection>

          <BloodSection
            id="camps"
            title="Our Camps"
            text="Blood camps bring donation to your neighbourhood. See the camps coming up and the ones we have already held, then register to donate."
          >
            <CampsSection />
          </BloodSection>
        </div>
      </div>
    </>
  )
}

export default BloodSearch