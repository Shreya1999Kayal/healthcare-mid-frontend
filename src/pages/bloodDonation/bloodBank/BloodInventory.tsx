import { Droplets, Lock, PackageCheck } from "lucide-react"
import { useOutletContext } from "react-router-dom"

import { buildInventoryRows, getInventoryTotals } from "../../../services/helper/blood/bloodBankHelper/bloodBankInventory.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import BloodBankSummaryCard from "../../../components/bloodDonation/bloodBank/BloodBankSummaryCard"
import BloodInventoryTable from "../../../components/bloodDonation/bloodBank/BloodInventoryTable"

const BloodInventory = () => {
  const { stock, requests, lowStockLimit, onUpdateStock } = useOutletContext<BloodBankOutletContext>()

  const rows = buildInventoryRows(stock, requests, lowStockLimit)
  const totals = getInventoryTotals(rows)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Blood inventory</h1>
        <p className="text-sm text-blood-muted">
          Units per blood group. Accepted requests that are not delivered yet are reserved and not counted as available.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BloodBankSummaryCard label="Total units" value={totals.total} hint="In the bank" icon={Droplets} />
        <BloodBankSummaryCard label="Reserved" value={totals.reserved} hint="Accepted, not delivered" icon={Lock} />
        <BloodBankSummaryCard label="Available" value={totals.available} hint="Total minus reserved" icon={PackageCheck} />
      </div>

      <p className="text-sm text-blood-muted">
        Low stock = {lowStockLimit} or fewer available units. You can change this in Settings.
      </p>

      <BloodInventoryTable rows={rows} onUpdateStock={onUpdateStock} />
    </div>
  )
}

export default BloodInventory