import { donorCardClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { placeTypeLabels } from "../../../constants/blood/donorConstants/donorRecord.constants"
import { formatDonorDate, getDonorHospital } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import type { DonationRecordsTableProps } from "../../../types/interface/blood/donorInterface/DonorRecord.interface"


const DonationRecordsTable = ({ records }: DonationRecordsTableProps) => {
  return (
    <div className={`${donorCardClass} overflow-x-auto p-0`}>
      <table className="w-full min-w-190 text-left text-sm">
        <thead className="bg-blood-bg text-xs uppercase tracking-wide text-blood-muted">
          <tr>
            <th className="px-4 py-3">Donated on</th>
            <th className="px-4 py-3">Where</th>
            <th className="px-4 py-3">Units</th>
            <th className="px-4 py-3">Received by</th>
            <th className="px-4 py-3">Hospital</th>
            <th className="px-4 py-3">Used on</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blood-border">
          {records.map((record) => {
            const hospital = record.recipient ? getDonorHospital(record.recipient.hospitalId) : undefined

            return (
              <tr key={record.id} className="align-top">
                <td className="px-4 py-3 font-semibold text-blood-navy">{formatDonorDate(record.donatedOn)}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-blood-navy">{record.place}</p>
                  <p className="text-xs text-blood-muted">{placeTypeLabels[record.placeType]}</p>
                </td>
                <td className="px-4 py-3 text-blood-navy">{record.units}</td>
                {record.recipient ? (
                  <>
                    <td className="px-4 py-3 font-semibold text-blood-navy">{record.recipient.patient}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-blood-navy">{hospital?.name ?? "Unknown hospital"}</p>
                      <p className="text-xs text-blood-muted">{hospital?.location}</p>
                    </td>
                    <td className="px-4 py-3 text-blood-navy">{formatDonorDate(record.recipient.usedOn)}</td>
                  </>
                ) : (
                  <td colSpan={3} className="px-4 py-3">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">Not used yet · still in the blood bank</span>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DonationRecordsTable