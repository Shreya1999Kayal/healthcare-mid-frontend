import { useState } from "react"
import { Activity, Ambulance, BedDouble } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  ADMIN_ICU_CRITICAL,
  adminAmbulanceStatusStyles,
  adminAmbulances,
  adminCellClass,
  adminHospitalCapacity,
  adminRowClass,
} from "../../constants/adminConstants/adminManagement.constants"
import {
  getPercent,
  listOptions,
  matchesOption,
  matchesSearch,
  styleOptions,
} from "../../services/helper/adminHelper/adminManagement.helper"

// View only: hospitals update their own beds and ambulances
const BedAmbulanceMonitoring = () => {
  const [search, setSearch] = useState("")
  const [hospital, setHospital] = useState(ADMIN_ALL)
  const [ambulanceStatus, setAmbulanceStatus] = useState(ADMIN_ALL)

  const shownCapacity = adminHospitalCapacity.filter(
    (row) => matchesSearch(search, [row.hospital, row.city]) && matchesOption(hospital, row.hospital),
  )
  const shownAmbulances = adminAmbulances.filter(
    (item) =>
      matchesSearch(search, [item.vehicleNo, item.driver, item.hospital]) &&
      matchesOption(hospital, item.hospital) &&
      matchesOption(ambulanceStatus, item.status),
  )

  const freeGeneral = adminHospitalCapacity.reduce((total, row) => total + row.generalFree, 0)
  const freeIcu = adminHospitalCapacity.reduce((total, row) => total + row.icuFree, 0)
  const availableAmbulances = adminAmbulances.filter((item) => item.status === "available").length

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Beds and ambulances" subtitle="Free beds, ICU beds and ambulance status for each hospital." />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Free general beds" value={freeGeneral} hint="All hospitals" icon={BedDouble} />
        <AdminSummaryCard label="Free ICU beds" value={freeIcu} hint="All hospitals" icon={Activity} />
        <AdminSummaryCard label="Ambulances available" value={availableAmbulances} hint={`Out of ${adminAmbulances.length}`} icon={Ambulance} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search hospital, vehicle or driver"
        filters={[
          { label: "All hospitals", value: hospital, options: listOptions(adminHospitalCapacity.map((row) => row.hospital)), onChange: setHospital },
          { label: "All ambulance statuses", value: ambulanceStatus, options: styleOptions(adminAmbulanceStatusStyles), onChange: setAmbulanceStatus },
        ]}
      />

      <h2 className="text-lg font-bold text-admin-navy">Beds</h2>
      <AdminTable headers={["Hospital", "General beds", "ICU beds", "ICU status"]} isEmpty={shownCapacity.length === 0}>
        {shownCapacity.map((row) => {
          const icuCritical = row.icuFree <= ADMIN_ICU_CRITICAL

          return (
            <tr key={row.id} className={adminRowClass}>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">{row.hospital}</p>
                <p className="text-xs text-admin-muted">{row.city}</p>
              </td>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">
                  {row.generalFree} / {row.generalTotal} free
                </p>
                <div className="mt-1 h-2 w-32 rounded-full bg-admin-bg">
                  <div
                    className="h-2 rounded-full bg-admin-primary"
                    style={{ width: `${getPercent(row.generalFree, row.generalTotal)}%` }}
                  />
                </div>
              </td>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">
                  {row.icuFree} / {row.icuTotal} free
                </p>
                <div className="mt-1 h-2 w-32 rounded-full bg-admin-bg">
                  <div
                    className={`h-2 rounded-full ${icuCritical ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{ width: `${getPercent(row.icuFree, row.icuTotal)}%` }}
                  />
                </div>
              </td>
              <td className={adminCellClass}>
                <AdminStatusBadge
                  style={
                    icuCritical
                      ? { label: "Critical", className: "bg-red-50 text-red-600" }
                      : { label: "OK", className: "bg-emerald-50 text-emerald-700" }
                  }
                />
              </td>
            </tr>
          )
        })}
      </AdminTable>

      <h2 className="text-lg font-bold text-admin-navy">Ambulances</h2>
      <AdminTable headers={["Vehicle", "Hospital", "Driver", "Type", "Status"]} isEmpty={shownAmbulances.length === 0}>
        {shownAmbulances.map((item) => (
          <tr key={item.id} className={adminRowClass}>
            <td className={`${adminCellClass} font-semibold text-admin-navy`}>{item.vehicleNo}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{item.hospital}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{item.driver}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{item.ambulanceType}</td>
            <td className={adminCellClass}>
              <AdminStatusBadge style={adminAmbulanceStatusStyles[item.status]} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}

export default BedAmbulanceMonitoring
