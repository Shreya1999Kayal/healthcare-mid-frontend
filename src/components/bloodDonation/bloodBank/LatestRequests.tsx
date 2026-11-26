import { Link } from "react-router-dom"
import BloodBankBadge from "./BloodBankBadge"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { urgencyStyles } from "../../../constants/blood/bloodBankConstants/bloodBankRequest.constants"
import { bloodBankPath, getHospitalName } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { unitsLabel } from "../../../services/helper/blood/bloodBankHelper/bloodBankRequest.helper"
import type { LatestRequestsProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankRequest.interface"

// Requests waiting for an answer (first 3)
const LatestRequests = ({ requests, bankId }: LatestRequestsProps) => {
  const waiting = requests.filter((request) => request.status === "requested").slice(0, 3)

  return (
    <section className={bloodBankCardClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blood-navy">New requests</h2>
        <Link to={bloodBankPath("requests", bankId)} className="text-sm font-semibold text-blood-primary-dark no-underline">
          Open requests
        </Link>
      </div>

      {waiting.length === 0 ? (
        <p className="text-sm text-blood-muted">No new requests.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {waiting.map((request) => (
            <li key={request.id} className="flex items-center justify-between gap-3 rounded-xl bg-blood-bg p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-blood-navy">{getHospitalName(request.hospitalId)}</p>
                <p className="text-xs text-blood-muted">
                  {request.group} · {unitsLabel(request.units)}
                </p>
              </div>
              <BloodBankBadge style={urgencyStyles[request.urgency]} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LatestRequests