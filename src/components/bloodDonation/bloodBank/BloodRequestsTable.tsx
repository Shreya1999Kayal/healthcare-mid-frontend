import BloodBankBadge from "./BloodBankBadge"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { requestStatusStyles, urgencyStyles } from "../../../constants/blood/bloodBankConstants/bloodBankRequest.constants"
import { formatIsoDate, getHospitalName } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { canAcceptRequest, getAvailableUnits, unitsLabel } from "../../../services/helper/blood/bloodBankHelper/bloodBankRequest.helper"
import type { BloodRequestsTableProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankRequest.interface"
import type { BloodBankRequest } from "../../../types/type/blood/bloodBankType/BloodBankRequest.type"

const smallButton = "rounded-md px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"

const BloodRequestsTable = ({ requests, rows, onAccept, onReject, onDeliver }: BloodRequestsTableProps) => {
  const renderAction = (request: BloodBankRequest) => {
    if (request.status === "requested") {
      const enough = canAcceptRequest(request, rows)

      return (
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onAccept(request)}
              disabled={!enough}
              className={`${smallButton} bg-blood-primary text-white hover:bg-blood-primary-dark`}
            >
              Accept
            </button>
            <button type="button" onClick={() => onReject(request)} className={`${smallButton} border border-red-300 text-red-600 hover:bg-red-50`}>
              Reject
            </button>
          </div>
          {!enough && <p className="text-xs text-red-600">Only {getAvailableUnits(rows, request.group)} available</p>}
        </div>
      )
    }

    if (request.status === "accepted") {
      return (
        <button type="button" onClick={() => onDeliver(request)} className={`${smallButton} bg-emerald-600 text-white hover:bg-emerald-700`}>
          Mark delivered
        </button>
      )
    }

    if (request.status === "rejected") {
      return <p className="max-w-56 text-right text-xs text-red-600">Reason: {request.rejectReason}</p>
    }

    return <span className="text-xs text-blood-muted">Done</span>
  }

  return (
    <div className={`${bloodBankCardClass} overflow-x-auto p-0`}>
      <table className="w-full min-w-190 text-left text-sm">
        <thead className="bg-blood-bg text-xs uppercase tracking-wide text-blood-muted">
          <tr>
            <th className="px-4 py-3">Hospital and patient</th>
            <th className="px-4 py-3">Blood</th>
            <th className="px-4 py-3">Urgency</th>
            <th className="px-4 py-3">Required by</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blood-border">
          {requests.map((request) => (
            <tr key={request.id} className="align-top">
              <td className="px-4 py-3">
                <p className="font-semibold text-blood-navy">{getHospitalName(request.hospitalId)}</p>
                <p className="text-xs text-blood-muted">Patient: {request.patient}</p>
                {request.note && <p className="text-xs text-blood-muted">Note: {request.note}</p>}
              </td>
              <td className="px-4 py-3">
                <span className="font-bold text-blood-primary-dark">{request.group}</span>
                <span className="text-blood-muted"> · {unitsLabel(request.units)}</span>
              </td>
              <td className="px-4 py-3">
                <BloodBankBadge style={urgencyStyles[request.urgency]} />
              </td>
              <td className="px-4 py-3 text-blood-navy">{formatIsoDate(request.requiredBy)}</td>
              <td className="px-4 py-3">
                <BloodBankBadge style={requestStatusStyles[request.status]} />
              </td>
              <td className="px-4 py-3 text-right">{renderAction(request)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BloodRequestsTable