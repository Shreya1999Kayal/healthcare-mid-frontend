import { Link } from "react-router-dom"
import type { RecentDonationsProps } from "../../../types/interface/blood/donorInterface/DonorRecord.interface"
import { sortRecordsNewestFirst } from "../../../services/helper/blood/donorHelper/donorRecord.helper"
import { donorCardClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { donorPath, formatDonorDate, getDonorHospital } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"


const RecentDonations = ({ records, donorId }: RecentDonationsProps) => {
  const latest = sortRecordsNewestFirst(records).slice(0, 3)

  return (
    <section className={donorCardClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blood-navy">Recent donations</h2>
        <Link to={donorPath("records", donorId)} className="text-sm font-semibold text-blood-primary-dark no-underline">
          View all
        </Link>
      </div>

      {latest.length === 0 ? (
        <p className="text-sm text-blood-muted">No donations yet. Your first donation will show here.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {latest.map((record) => (
            <li key={record.id} className="rounded-xl bg-blood-bg p-3">
              <p className="text-sm font-semibold text-blood-navy">{record.place}</p>
              <p className="text-xs text-blood-muted">
                {formatDonorDate(record.donatedOn)} ·{" "}
                {record.recipient
                  ? `Helped ${record.recipient.patient} at ${getDonorHospital(record.recipient.hospitalId)?.name ?? "a hospital"}`
                  : "Not used yet"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default RecentDonations