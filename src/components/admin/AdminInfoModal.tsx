import { X } from "lucide-react"
import type { AdminInfoModalProps } from "../../types/interface/adminInterface/AdminManagement.interface"

// Read-only profile popup (doctor, hospital ...)
const AdminInfoModal = ({ title, subtitle, details, onClose }: AdminInfoModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-admin-navy">{title}</h2>
            <p className="text-sm text-admin-muted">{subtitle}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-admin-muted hover:bg-admin-bg">
            <X size={20} />
          </button>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-lg bg-admin-bg px-3 py-2">
              <dt className="text-xs text-admin-muted">{detail.label}</dt>
              <dd className="text-sm font-semibold text-admin-navy">{detail.value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default AdminInfoModal
