import type { AdminMessageProps } from "../../types/interface/adminInterface/AdminManagement.interface"

// Green line after an action; shows nothing when empty
const AdminMessage = ({ message }: AdminMessageProps) => {
  if (!message) return null

  return (
    <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
      {message}
    </p>
  )
}

export default AdminMessage
