import { PackageCheck, X } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { bloodComponentLabels, bloodRequestStatusStyles, urgencyStyles } from "../../constants/hospitalConstants/hospitalBlood.constants"
import { formatIsoDate } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { canCancelRequest } from "../../services/helper/hospitalHelper/hospitalBlood.helper"
import type { BloodRequestsTableProps } from "../../types/interface/hospitalInterface/HospitalBlood.interface"

const BloodRequestsTable = ({ requests, onCancelRequest, onMarkReceived }: BloodRequestsTableProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">Patient</th>
              <th className="py-2 font-medium">Blood</th>
              <th className="py-2 font-medium">Blood bank</th>
              <th className="py-2 font-medium">Needed by</th>
              <th className="py-2 font-medium">Urgency</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const urgency = urgencyStyles[request.urgency]
              const status = bloodRequestStatusStyles[request.status]

              return (
                <tr key={request.id} className="border-b border-hospital-border/60 align-top last:border-0">
                  <td className="py-3">
                    <p className="font-semibold text-hospital-navy">{request.patient}</p>
                    <p className="text-xs text-hospital-muted">Requested {formatIsoDate(request.requestedOn)}</p>
                    {request.note && <p className="mt-1 text-xs italic text-hospital-muted">"{request.note}"</p>}
                  </td>
                  <td className="py-3">
                    <p className="font-extrabold text-red-600">{request.group}</p>
                    <p className="text-xs text-hospital-muted">
                      {request.units} × {bloodComponentLabels[request.component]}
                    </p>
                  </td>
                  <td className="py-3 text-hospital-navy">{request.bloodBank}</td>
                  <td className="py-3 text-hospital-navy">{formatIsoDate(request.requiredBy)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${urgency.className}`}>{urgency.label}</span>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                  </td>
                  <td className="py-3">
                    {request.status === "dispatched" && (
                      <button
                        type="button"
                        onClick={() => onMarkReceived(request)}
                        className="flex items-center gap-1.5 rounded-md bg-hospital-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-hospital-primary-dark"
                      >
                        <PackageCheck size={14} /> Mark received
                      </button>
                    )}
                    {canCancelRequest(request.status) && (
                      <button
                        type="button"
                        onClick={() => onCancelRequest(request)}
                        className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        <X size={14} /> Cancel
                      </button>
                    )}
                    {!canCancelRequest(request.status) && request.status !== "dispatched" && (
                      <span className="text-xs text-hospital-muted">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default BloodRequestsTable