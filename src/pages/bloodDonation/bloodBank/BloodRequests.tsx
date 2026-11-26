import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import { requestFilters } from "../../../constants/blood/bloodBankConstants/bloodBankRequest.constants"
import { getHospitalName } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { buildInventoryRows } from "../../../services/helper/blood/bloodBankHelper/bloodBankInventory.helper"
import {
  countBloodBankRequests,
  filterBloodBankRequests,
  unitsLabel,
} from "../../../services/helper/blood/bloodBankHelper/bloodBankRequest.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodBankRequest, BloodBankRequestFilter } from "../../../types/type/blood/bloodBankType/BloodBankRequest.type"
import BloodBankFilterTabs from "../../../components/bloodDonation/bloodBank/BloodBankFilterTabs"
import BloodBankEmptyState from "../../../components/bloodDonation/bloodBank/BloodBankEmptyState"

import RejectRequestModal from "../../../components/bloodDonation/bloodBank/RejectRequestModal"
import BloodRequestsTable from "../../../components/bloodDonation/bloodBank/BloodRequestsTable"

const BloodRequests = () => {
  const { stock, requests, lowStockLimit, onAcceptRequest, onRejectRequest, onDeliverRequest } =
    useOutletContext<BloodBankOutletContext>()

  const [filter, setFilter] = useState<BloodBankRequestFilter>("requested")
  const [rejecting, setRejecting] = useState<BloodBankRequest | null>(null)
  const [message, setMessage] = useState("")

  const rows = buildInventoryRows(stock, requests, lowStockLimit)
  const shownRequests = filterBloodBankRequests(requests, filter)
  const tabs = requestFilters.map((option) => ({ ...option, count: countBloodBankRequests(requests, option.value) }))

  const accept = (request: BloodBankRequest) => {
    onAcceptRequest(request.id)
    setMessage(`Accepted. ${unitsLabel(request.units)} of ${request.group} reserved for ${getHospitalName(request.hospitalId)}.`)
  }

  const deliver = (request: BloodBankRequest) => {
    onDeliverRequest(request.id)
    setMessage(`Marked as delivered. ${unitsLabel(request.units)} of ${request.group} removed from the inventory.`)
  }

  const confirmReject = (reason: string) => {
    if (!rejecting) return
    onRejectRequest(rejecting.id, reason)
    setMessage("Request rejected. The hospital can see your reason.")
    setRejecting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Blood requests</h1>
        <p className="text-sm text-blood-muted">Requests sent by hospitals. Accepting reserves the units until you mark them delivered.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <BloodBankFilterTabs options={tabs} value={filter} onChange={setFilter} />

      {shownRequests.length === 0 ? (
        <BloodBankEmptyState title="No requests here" message="Try another tab." />
      ) : (
        <BloodRequestsTable requests={shownRequests} rows={rows} onAccept={accept} onReject={setRejecting} onDeliver={deliver} />
      )}

      {rejecting && <RejectRequestModal request={rejecting} onConfirm={confirmReject} onClose={() => setRejecting(null)} />}
    </div>
  )
}

export default BloodRequests