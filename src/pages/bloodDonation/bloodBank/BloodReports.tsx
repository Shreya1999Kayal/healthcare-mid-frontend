import { ClipboardCheck, Droplets, Hospital } from "lucide-react"
import BloodBankSummaryCard from "../../../components/bloodDonation/bloodBank/BloodBankSummaryCard"
import TopHospitalsTable from "../../../components/bloodDonation/bloodBank/TopHospitalsTable"
import PartnerHospitalsList from "../../../components/bloodDonation/bloodBank/PartnerHospitalsList"
import { partnerHospitals, topHospitalSupply } from "../../../constants/blood/bloodBankConstants/bloodBankReport.constants"


const BloodReports = () => {
  const totalUnits = topHospitalSupply.reduce((sum, supply) => sum + supply.units, 0)
  const totalRequests = topHospitalSupply.reduce((sum, supply) => sum + supply.requests, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Reports</h1>
        <p className="text-sm text-blood-muted">Which hospitals you supply blood to most.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BloodBankSummaryCard label="Units supplied" value={totalUnits} hint="To top hospitals" icon={Droplets} />
        <BloodBankSummaryCard label="Requests served" value={totalRequests} hint="Delivered" icon={ClipboardCheck} />
        <BloodBankSummaryCard label="Partner hospitals" value={partnerHospitals.length} hint="Regular partners" icon={Hospital} />
      </div>

      <TopHospitalsTable supplies={topHospitalSupply} />
      <PartnerHospitalsList partners={partnerHospitals} />
    </div>
  )
}

export default BloodReports