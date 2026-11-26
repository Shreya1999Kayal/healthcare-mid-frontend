import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { formatIsoDate } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { CampDonorTableProps } from "../../../types/interface/blood/campInterface/CampDonor.interface"

const CampDonorTable = ({ rows, onAddDonation }: CampDonorTableProps) => {
  return (
    <div className={`${bloodBankCardClass} overflow-x-auto p-0`}>
      <table className="w-full min-w-190 text-left text-sm">
        <thead className="bg-blood-bg text-xs uppercase tracking-wide text-blood-muted">
          <tr>
            <th className="px-4 py-3">Donor</th>
            <th className="px-4 py-3">Blood group</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Donations</th>
            <th className="px-4 py-3">Last donated</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blood-border">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 font-semibold text-blood-navy">{row.name}</td>
              <td className="px-4 py-3 font-bold text-blood-primary-dark">{row.bloodGroup}</td>
              <td className="px-4 py-3 text-blood-navy">{row.city}</td>
              <td className="px-4 py-3 text-blood-navy">{row.donations}</td>
              <td className="px-4 py-3 text-blood-navy">{row.lastDonated ? formatIsoDate(row.lastDonated) : "First-time donor"}</td>
              <td className="px-4 py-3">
                {row.eligible ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Eligible</span>
                ) : (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    From {row.nextEligibleOn ? formatIsoDate(row.nextEligibleOn) : "—"}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onAddDonation(row)}
                  disabled={!row.eligible}
                  title={row.eligible ? "Add a donation" : "Not eligible yet (90-day rule)"}
                  className="rounded-md bg-blood-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blood-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add donation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CampDonorTable