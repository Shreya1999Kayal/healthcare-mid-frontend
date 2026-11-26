import { AlertTriangle, ClipboardList, Droplets, PackageCheck } from "lucide-react"
import { useOutletContext } from "react-router-dom"

import { buildInventoryRows, getInventoryTotals } from "../../../services/helper/blood/bloodBankHelper/bloodBankInventory.helper"
import { countBloodBankRequests } from "../../../services/helper/blood/bloodBankHelper/bloodBankRequest.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import BloodBankSummaryCard from "../../../components/bloodDonation/bloodBank/BloodBankSummaryCard"
import StockOverview from "../../../components/bloodDonation/bloodBank/StockOverview"
import LatestRequests from "../../../components/bloodDonation/bloodBank/LatestRequests"
import BloodBankRecentNotifications from "../../../components/bloodDonation/bloodBank/BloodBankRecentNotifications"

const BloodBankDashboard = () => {
  const { bank, stock, requests, lowStockLimit, notifications } = useOutletContext<BloodBankOutletContext>()

  const rows = buildInventoryRows(stock, requests, lowStockLimit)
  const totals = getInventoryTotals(rows)
  const lowGroups = rows.filter((row) => row.level !== "ok").length
  const newRequests = countBloodBankRequests(requests, "requested")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Welcome, {bank.name}</h1>
        <p className="text-sm text-blood-muted">Your blood stock and requests at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BloodBankSummaryCard label="Total units" value={totals.total} hint="In the bank" icon={Droplets} />
        <BloodBankSummaryCard label="Available units" value={totals.available} hint={`${totals.reserved} reserved`} icon={PackageCheck} />
        <BloodBankSummaryCard label="Low or out of stock" value={lowGroups} hint="Blood groups" icon={AlertTriangle} />
        <BloodBankSummaryCard label="New requests" value={newRequests} hint="Waiting for you" icon={ClipboardList} />
      </div>

      <StockOverview rows={rows} bankId={bank.id} />

      <div className="grid gap-6 lg:grid-cols-2">
        <LatestRequests requests={requests} bankId={bank.id} />
        <BloodBankRecentNotifications notifications={notifications} bankId={bank.id} />
      </div>
    </div>
  )
}

export default BloodBankDashboard