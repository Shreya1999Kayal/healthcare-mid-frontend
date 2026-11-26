import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { getHospital } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { TopHospitalsTableProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankReport.interface"

const TopHospitalsTable = ({ supplies }: TopHospitalsTableProps) => {
  const sorted = [...supplies].sort((a, b) => b.units - a.units)
  const maxUnits = sorted[0]?.units ?? 1

  return (
    <section className={`${bloodBankCardClass} overflow-x-auto`}>
      <h2 className="mb-4 text-lg font-bold text-blood-navy">Top receiving hospitals</h2>
      <table className="w-full min-w-140 text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-blood-muted">
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Hospital</th>
            <th className="py-2">Requests</th>
            <th className="py-2">Units supplied</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blood-border">
          {sorted.map((supply, index) => {
            const hospital = getHospital(supply.hospitalId)

            return (
              <tr key={supply.hospitalId}>
                <td className="py-3 font-bold text-blood-primary-dark">{index + 1}</td>
                <td className="py-3">
                  <p className="font-semibold text-blood-navy">{hospital?.name ?? "Unknown hospital"}</p>
                  <p className="text-xs text-blood-muted">{hospital?.location}</p>
                </td>
                <td className="py-3 text-blood-navy">{supply.requests}</td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-32 overflow-hidden rounded-full bg-blood-bg-soft">
                      <span className="block h-full rounded-full bg-blood-primary" style={{ width: `${(supply.units / maxUnits) * 100}%` }} />
                    </span>
                    <span className="font-semibold text-blood-navy">{supply.units}</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default TopHospitalsTable