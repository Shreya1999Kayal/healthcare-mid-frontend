import { useState } from "react"
import { AlertTriangle, CalendarDays, Droplets } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import { adminCardClass } from "../../constants/adminConstants/adminDashboard.constants"
import {
  ADMIN_ALL,
  ADMIN_LOW_STOCK_UNITS,
  adminBloodBankTabs,
  adminBloodBanks,
  adminBloodGroups,
  adminCampStatusStyles,
  adminCamps,
  adminCellClass,
  adminDangerButtonClass,
  adminProviderStatusStyles,
  adminRowClass,
  adminSuccessButtonClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import {
  getLowStockGroups,
  getTotalUnits,
  matchesOption,
  matchesSearch,
  styleOptions,
} from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminBloodBank, AdminBloodBankTab, AdminProviderStatus } from "../../types/type/adminType/AdminManagement.type"

const BloodBankManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [banks, setBanks] = useState<AdminBloodBank[]>(adminBloodBanks)
  const [tab, setTab] = useState<AdminBloodBankTab>("banks")
  const [search, setSearch] = useState("")
  const [campStatus, setCampStatus] = useState(ADMIN_ALL)
  const [message, setMessage] = useState("")

  // Only active banks raise low-stock alerts
  const lowStockBanks = banks.filter((bank) => bank.status === "active" && getLowStockGroups(bank.stock).length > 0)
  const shownBanks = banks.filter((bank) => matchesSearch(search, [bank.name, bank.city, bank.id]))
  const shownCamps = adminCamps.filter(
    (camp) => matchesSearch(search, [camp.title, camp.organiser, camp.city]) && matchesOption(campStatus, camp.status),
  )
  const upcomingCamps = adminCamps.filter((camp) => camp.status === "upcoming").length

  const toggleSuspend = (bank: AdminBloodBank) => {
    const next: AdminProviderStatus = bank.status === "active" ? "suspended" : "active"
    if (next === "suspended" && !window.confirm(`Suspend ${bank.name}? It will stop receiving requests.`)) return

    setBanks((prev) => prev.map((item) => (item.id === bank.id ? { ...item, status: next } : item)))
    setMessage(`${bank.name} is now ${adminProviderStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Blood bank management" subtitle="Blood stock of every bank and the donation camps." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Blood banks" value={banks.length} hint="All statuses" icon={Droplets} />
        <AdminSummaryCard label="Low stock" value={lowStockBanks.length} hint={`Banks below ${ADMIN_LOW_STOCK_UNITS} units`} icon={AlertTriangle} />
        <AdminSummaryCard label="Upcoming camps" value={upcomingCamps} hint="Not held yet" icon={CalendarDays} />
      </div>

      {lowStockBanks.length > 0 && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-red-700">
            <AlertTriangle size={16} /> Low stock alerts
          </h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-red-700">
            {lowStockBanks.map((bank) => (
              <li key={bank.id}>
                <span className="font-semibold">{bank.name}:</span> {getLowStockGroups(bank.stock).join(", ")}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {adminBloodBankTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === option.value
                ? "bg-admin-primary text-white"
                : "border border-admin-border bg-white text-admin-navy hover:bg-admin-bg"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder={tab === "banks" ? "Search bank, city or ID" : "Search camp, organiser or city"}
        filters={
          tab === "camps"
            ? [{ label: "All statuses", value: campStatus, options: styleOptions(adminCampStatusStyles), onChange: setCampStatus }]
            : []
        }
      />

      {tab === "banks" &&
        (shownBanks.length === 0 ? (
          <p className={`${adminCardClass} text-center text-sm text-admin-muted`}>Nothing found.</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {shownBanks.map((bank) => {
              const lowGroups = getLowStockGroups(bank.stock)

              return (
                <article key={bank.id} className={adminCardClass}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-admin-navy">{bank.name}</h3>
                      <p className="text-xs text-admin-muted">
                        {bank.city} · Linked to {bank.linkedHospital}
                      </p>
                    </div>
                    <AdminStatusBadge style={adminProviderStatusStyles[bank.status]} />
                  </div>

                  <p className="mt-3 text-sm text-admin-muted">
                    Total stock: <span className="font-bold text-admin-navy">{getTotalUnits(bank.stock)} units</span>
                  </p>

                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {adminBloodGroups.map((group) => (
                      <div
                        key={group}
                        className={`rounded-lg px-2 py-2 text-center ${
                          lowGroups.includes(group) ? "bg-red-50 text-red-700" : "bg-admin-bg text-admin-navy"
                        }`}
                      >
                        <p className="text-xs font-semibold">{group}</p>
                        <p className="text-lg font-extrabold">{bank.stock[group]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleSuspend(bank)}
                      className={bank.status === "active" ? adminDangerButtonClass : adminSuccessButtonClass}
                    >
                      {bank.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ))}

      {tab === "camps" && (
        <AdminTable
          headers={["Camp", "Organiser", "Blood bank", "Date", "Registered", "Collected", "Status"]}
          isEmpty={shownCamps.length === 0}
        >
          {shownCamps.map((camp) => (
            <tr key={camp.id} className={adminRowClass}>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">{camp.title}</p>
                <p className="text-xs text-admin-muted">{camp.city}</p>
              </td>
              <td className={`${adminCellClass} text-admin-navy`}>{camp.organiser}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{camp.bloodBank}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{formatAdminDate(camp.date)}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{camp.registered}</td>
              <td className={`${adminCellClass} text-admin-navy`}>
                {camp.status === "completed" ? `${camp.collected} units` : "—"}
              </td>
              <td className={adminCellClass}>
                <AdminStatusBadge style={adminCampStatusStyles[camp.status]} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}

export default BloodBankManagement
