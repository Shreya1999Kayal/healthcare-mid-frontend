import { useState } from "react"
import type { FormEvent } from "react"
import BloodBankFormField from "./BloodBankFormField"
import {
  bloodBankCardClass,
  bloodBankFieldClass,
  outlineButtonClass,
  primaryButtonClass,
} from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { getHospitalName } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { unitsLabel } from "../../../services/helper/blood/bloodBankHelper/bloodBankRequest.helper"
import type { RejectRequestModalProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankRequest.interface"

const RejectRequestModal = ({ request, onConfirm, onClose }: RejectRequestModalProps) => {
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!reason.trim()) {
      setError("Write a reason so the hospital knows why")
      return
    }
    onConfirm(reason.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="reject-title">
      <form onSubmit={handleSubmit} className={`${bloodBankCardClass} flex w-full max-w-md flex-col gap-4`}>
        <div>
          <h2 id="reject-title" className="text-lg font-bold text-blood-navy">
            Reject request
          </h2>
          <p className="text-sm text-blood-muted">
            {unitsLabel(request.units)} of {request.group} for {request.patient}, {getHospitalName(request.hospitalId)}
          </p>
        </div>

        <BloodBankFormField label="Reason" required>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
              setError("")
            }}
            rows={3}
            placeholder="e.g. Not enough O- units right now"
            className={`${bloodBankFieldClass} w-full`}
          />
          {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
        </BloodBankFormField>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className={primaryButtonClass}>
            Reject request
          </button>
          <button type="button" onClick={onClose} className={outlineButtonClass}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default RejectRequestModal