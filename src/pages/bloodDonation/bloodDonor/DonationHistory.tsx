import { useState } from "react"
import { Inbox } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { DonorOutletContext } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import type { DonationRecordFilter } from "../../../types/type/blood/donorType/DonorRecord.type"
import EligibilityCard from "../../../components/bloodDonation/bloodDonor/EligibilityCard"
import { recordFilters } from "../../../constants/blood/donorConstants/donorRecord.constants"
import { filterDonationRecords, getDonorEligibility, sortRecordsNewestFirst } from "../../../services/helper/blood/donorHelper/donorRecord.helper"
import { DONOR_TODAY, donorCardClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import DonationRecordsTable from "../../../components/bloodDonation/bloodDonor/DonationRecordsTable"


const DonationHistory = () => {
  const { records } = useOutletContext<DonorOutletContext>()
  const [filter, setFilter] = useState<DonationRecordFilter>("all")

  const eligibility = getDonorEligibility(records, DONOR_TODAY)
  const shownRecords = sortRecordsNewestFirst(filterDonationRecords(records, filter))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Donation records</h1>
        <p className="text-sm text-blood-muted">Every time you gave blood, and the patient and hospital it went to.</p>
      </div>

      <EligibilityCard eligibility={eligibility} />

      <div className="flex flex-wrap gap-2">
        {recordFilters.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
              filter === option.value ? "bg-blood-primary text-white" : "border border-blood-border bg-white text-blood-navy hover:bg-blood-bg"
            }`}
          >
            {option.label} ({filterDonationRecords(records, option.value).length})
          </button>
        ))}
      </div>

      {shownRecords.length === 0 ? (
        <div className={`${donorCardClass} flex flex-col items-center py-12 text-center`}>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blood-bg-soft text-blood-primary-dark">
            <Inbox size={26} />
          </span>
          <p className="mt-4 font-semibold text-blood-navy">No records here</p>
          <p className="text-sm text-blood-muted">{records.length === 0 ? "Your first donation will show here." : "Try another tab."}</p>
        </div>
      ) : (
        <DonationRecordsTable records={shownRecords} />
      )}
    </div>
  )
}

export default DonationHistory