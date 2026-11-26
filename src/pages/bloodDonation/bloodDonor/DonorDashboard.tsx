import { CalendarDays, Droplet, HeartHandshake, Users } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { DonorOutletContext } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { DONOR_TODAY } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { countPatientsHelped, getDonorEligibility } from "../../../services/helper/blood/donorHelper/donorRecord.helper"
import DonorSummaryCard from "../../../components/bloodDonation/bloodDonor/DonorSummaryCard"
import EligibilityCard from "../../../components/bloodDonation/bloodDonor/EligibilityCard"
import { formatDonorDate } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import RecentDonations from "../../../components/bloodDonation/bloodDonor/RecentDonations"


const DonorDashboard = () => {
  const { donor, records } = useOutletContext<DonorOutletContext>()
  const eligibility = getDonorEligibility(records, DONOR_TODAY)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Welcome, {donor.name}</h1>
        <p className="text-sm text-blood-muted">Thank you for giving blood. Here is what your donations did.</p>
      </div>

      <EligibilityCard eligibility={eligibility} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DonorSummaryCard label="Blood group" value={donor.bloodGroup} hint="From your verification" icon={Droplet} />
        <DonorSummaryCard label="Donations" value={records.length} hint="Times you gave blood" icon={HeartHandshake} />
        <DonorSummaryCard label="Patients helped" value={countPatientsHelped(records)} hint="Received your blood" icon={Users} />
        <DonorSummaryCard
          label="Last donated"
          value={eligibility.lastDonated ? formatDonorDate(eligibility.lastDonated) : "—"}
          hint={eligibility.eligible ? "Eligible now" : "Not eligible yet"}
          icon={CalendarDays}
        />
      </div>

      <RecentDonations records={records} donorId={donor.id} />
    </div>
  )
}

export default DonorDashboard