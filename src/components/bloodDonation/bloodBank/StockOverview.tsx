import { Link } from "react-router-dom"
import BloodBankBadge from "./BloodBankBadge"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { stockLevelStyles } from "../../../constants/blood/bloodBankConstants/bloodBankInventory.constants"
import { bloodBankPath } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { StockOverviewProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankInventory.interface"

const StockOverview = ({ rows, bankId }: StockOverviewProps) => {
  return (
    <section className={bloodBankCardClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blood-navy">Stock overview</h2>
        <Link to={bloodBankPath("inventory", bankId)} className="text-sm font-semibold text-blood-primary-dark no-underline">
          Open inventory
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.group} className="flex flex-col items-start gap-1 rounded-xl border border-blood-border p-3">
            <span className="text-lg font-extrabold text-blood-primary-dark">{row.group}</span>
            <span className="text-sm font-semibold text-blood-navy">{row.available} available</span>
            <BloodBankBadge style={stockLevelStyles[row.level]} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default StockOverview