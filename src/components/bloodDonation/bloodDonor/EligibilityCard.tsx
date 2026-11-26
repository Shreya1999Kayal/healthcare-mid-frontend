import { Clock, HeartHandshake } from "lucide-react"
import { Link } from "react-router-dom"
import type { EligibilityCardProps } from "../../../types/interface/blood/donorInterface/DonorRecord.interface"
import { donorCardClass, donorPrimaryButtonClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { formatDonorDate } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import { DONATION_GAP_DAYS } from "../../../constants/blood/donorConstants/donorRecord.constants"


const EligibilityCard = ({ eligibility }: EligibilityCardProps) => {
  const { eligible, lastDonated, nextEligibleOn, daysLeft } = eligibility

  return (
    <section className={`${donorCardClass} flex flex-wrap items-center gap-4 ${eligible ? "border-emerald-200" : "border-amber-200"}`}>
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          eligible ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}
      >
        {eligible ? <HeartHandshake size={24} /> : <Clock size={24} />}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold text-blood-navy">
          {eligible ? "You can donate blood now" : `You can donate again on ${formatDonorDate(nextEligibleOn ?? "")}`}
        </p>
        <p className="text-sm text-blood-muted">
          {lastDonated ? `Last donated on ${formatDonorDate(lastDonated)}. ` : "You have not donated yet. "}
          A donor can give blood again {DONATION_GAP_DAYS} days after the last donation.
        </p>
      </div>

      {eligible ? (
        <Link to="/blood?tab=camps" className={`${donorPrimaryButtonClass} no-underline`}>
          Find a camp
        </Link>
      ) : (
        <span className="rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">{daysLeft} days left</span>
      )}
    </section>
  )
}

export default EligibilityCard