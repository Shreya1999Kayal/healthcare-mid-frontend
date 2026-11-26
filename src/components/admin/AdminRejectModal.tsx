import { useState } from "react"
import { X } from "lucide-react"
import { adminFieldClass } from "../../constants/adminConstants/adminDashboard.constants"
import { validateRejectReason } from "../../services/helper/adminHelper/adminVerification.helper"
import type { AdminRejectModalProps } from "../../types/interface/adminInterface/AdminManagement.interface"

// Popup asking for the reason before rejecting
const AdminRejectModal = ({ title, onReject, onClose }: AdminRejectModalProps) => {
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const submit = () => {
    const message = validateRejectReason(reason)
    if (message) {
      setError(message)
      return
    }
    onReject(reason.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-admin-navy">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-admin-muted hover:bg-admin-bg">
            <X size={20} />
          </button>
        </div>

        <label htmlFor="reject-reason" className="mt-4 block text-sm font-semibold text-admin-navy">
          Reason <span className="text-red-600">*</span>
        </label>
        <textarea
          id="reject-reason"
          rows={3}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
            setError("")
          }}
          placeholder="Example: Abusive language."
          className={`${adminFieldClass} mt-1 w-full`}
        />
        {error && <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>}

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-admin-border px-4 py-2 text-sm font-semibold text-admin-navy hover:bg-admin-bg"
          >
            Cancel
          </button>
          <button type="button" onClick={submit} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminRejectModal
