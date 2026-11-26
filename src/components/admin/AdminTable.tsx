import { adminCardClass } from "../../constants/adminConstants/adminDashboard.constants"
import type { AdminTableProps } from "../../types/interface/adminInterface/AdminManagement.interface"

// Card with a table; shows "Nothing found." when there are no rows
const AdminTable = ({ headers, isEmpty, children }: AdminTableProps) => {
  if (isEmpty) {
    return <p className={`${adminCardClass} text-center text-sm text-admin-muted`}>Nothing found.</p>
  }

  return (
    <section className={adminCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left text-sm">
          <thead>
            <tr className="border-b border-admin-border text-xs uppercase tracking-wide text-admin-muted">
              {headers.map((header) => (
                <th key={header} className="py-2 pr-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminTable
