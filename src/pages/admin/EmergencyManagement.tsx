import { useState } from "react"
import { Activity, HeartPulse, Siren } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import { adminCardClass } from "../../constants/adminConstants/adminDashboard.constants"
import {
  ADMIN_ALL,
  adminEmergencyCases,
  adminEmergencyStatusStyles,
} from "../../constants/adminConstants/adminManagement.constants"
import { listOptions, matchesOption, matchesSearch, styleOptions } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminEmergencyStatus } from "../../types/type/adminType/AdminManagement.type"

// View only: hospitals update their own emergency cases
const EmergencyManagement = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(ADMIN_ALL)
  const [hospital, setHospital] = useState(ADMIN_ALL)

  const shownCases = adminEmergencyCases.filter(
    (item) =>
      matchesSearch(search, [item.patient, item.condition, item.hospital]) &&
      matchesOption(status, item.status) &&
      matchesOption(hospital, item.hospital),
  )

  const countStatus = (value: AdminEmergencyStatus) => adminEmergencyCases.filter((item) => item.status === value).length

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Emergency cases" subtitle="Emergency cases reported by hospitals (sample data until the API is ready)." />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Incoming" value={countStatus("incoming")} hint="On the way" icon={Siren} />
        <AdminSummaryCard label="In treatment" value={countStatus("in-treatment")} hint="Being treated" icon={Activity} />
        <AdminSummaryCard label="Stable" value={countStatus("stable")} hint="Out of danger" icon={HeartPulse} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search patient, condition or hospital"
        filters={[
          { label: "All statuses", value: status, options: styleOptions(adminEmergencyStatusStyles), onChange: setStatus },
          { label: "All hospitals", value: hospital, options: listOptions(adminEmergencyCases.map((item) => item.hospital)), onChange: setHospital },
        ]}
      />

      {shownCases.length === 0 ? (
        <p className={`${adminCardClass} text-center text-sm text-admin-muted`}>Nothing found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownCases.map((item) => (
            <article key={item.id} className={`${adminCardClass} ${item.status === "incoming" ? "ring-2 ring-red-300" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-admin-navy">
                    {item.patient} <span className="font-normal text-admin-muted">({item.age} yrs)</span>
                  </h3>
                  <p className="text-sm text-red-600">{item.condition}</p>
                </div>
                <AdminStatusBadge style={adminEmergencyStatusStyles[item.status]} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-admin-muted">Hospital</dt>
                  <dd className="font-semibold text-admin-navy">{item.hospital}</dd>
                </div>
                <div>
                  <dt className="text-xs text-admin-muted">Reported</dt>
                  <dd className="font-semibold text-admin-navy">{item.reportedAt}</dd>
                </div>
                <div>
                  <dt className="text-xs text-admin-muted">Ambulance</dt>
                  <dd className="font-semibold text-admin-navy">{item.ambulance || "Came on their own"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-admin-muted">City</dt>
                  <dd className="font-semibold text-admin-navy">{item.city}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default EmergencyManagement
