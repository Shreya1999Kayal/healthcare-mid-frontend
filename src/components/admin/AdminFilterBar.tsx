import { Search } from "lucide-react"
import { adminCardClass, adminFieldClass } from "../../constants/adminConstants/adminDashboard.constants"
import { ADMIN_ALL } from "../../constants/adminConstants/adminManagement.constants"
import type { AdminFilterBarProps } from "../../types/interface/adminInterface/AdminManagement.interface"

// Search box + selects; the first option of each select is "All ..."
const AdminFilterBar = ({ search, onSearch, placeholder, filters }: AdminFilterBarProps) => {
  return (
    <div className={`${adminCardClass} flex flex-wrap items-center gap-3`}>
      <div className="relative w-full sm:w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className={`${adminFieldClass} w-full pl-9`}
        />
      </div>

      {filters.map((filter) => (
        <select
          key={filter.label}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          aria-label={filter.label}
          className={adminFieldClass}
        >
          <option value={ADMIN_ALL}>{filter.label}</option>
          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  )
}

export default AdminFilterBar
