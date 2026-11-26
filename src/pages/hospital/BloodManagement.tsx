import { useState } from "react"
import { CircleAlert, Droplet, Search, Send, Siren, TriangleAlert } from "lucide-react"
import BloodRequestForm from "../../components/hospital/BloodRequestForm"
import BloodRequestsTable from "../../components/hospital/BloodRequestsTable"
import BloodStockGrid from "../../components/hospital/BloodStockGrid"
import HospitalSummaryCard from "../../components/hospital/HospitalSummaryCard"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  bloodGroups,
  bloodRequestFilters,
  hospitalBloodRequests,
  hospitalBloodStock,
} from "../../constants/hospitalConstants/hospitalBlood.constants"
import {
  filterBloodRequests,
  fromBloodRequestForm,
  getStockLevel,
  isActiveRequest,
} from "../../services/helper/hospitalHelper/hospitalBlood.helper"
import type {
  BloodGroup,
  BloodRequestFilter,
  BloodRequestFormValues,
  BloodStockItem,
  HospitalBloodRequest,
} from "../../types/type/hospitalType/HospitalBlood.type"

const BloodManagement = () => {
  // Local copies (UI only, nothing is saved)
  const [stock, setStock] = useState<BloodStockItem[]>(hospitalBloodStock)
  const [requests, setRequests] = useState<HospitalBloodRequest[]>(hospitalBloodRequests)
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState<BloodRequestFilter>("active")
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState("all")
  const [message, setMessage] = useState("")

  const shownRequests = filterBloodRequests(requests, filter, search, group)

  const totalUnits = stock.reduce((sum, item) => sum + item.units, 0)
  const lowGroups = stock.filter((item) => getStockLevel(item.units) === "low").map((item) => item.group)
  const outGroups = stock.filter((item) => getStockLevel(item.units) === "out").map((item) => item.group)
  const activeRequests = requests.filter((request) => isActiveRequest(request.status))
  const emergencyCount = activeRequests.filter((request) => request.urgency === "emergency").length

  // +1 add, -1 use (never below 0)
  const changeUnits = (bloodGroup: BloodGroup, change: number) => {
    setStock((prev) =>
      prev.map((item) => (item.group === bloodGroup ? { ...item, units: Math.max(0, item.units + change) } : item)),
    )
  }

  const saveRequest = (values: BloodRequestFormValues) => {
    const request = fromBloodRequestForm(values)
    setRequests((prev) => [request, ...prev])
    setFormOpen(false)
    setFilter("active")
    setMessage(`Request for ${request.units} unit(s) of ${request.group} sent to ${request.bloodBank}.`)
  }

  const cancelRequest = (request: HospitalBloodRequest) => {
    if (!window.confirm(`Cancel the ${request.group} request for ${request.patient}?`)) return
    setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, status: "cancelled" } : item)))
    setMessage(`Request for ${request.patient} cancelled.`)
  }

  // Blood arrived: close the request and add the units to the stock
  const markReceived = (request: HospitalBloodRequest) => {
    setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, status: "delivered" } : item)))
    changeUnits(request.group, request.units)
    setMessage(`${request.units} unit(s) of ${request.group} received and added to stock.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Blood management</h1>
          <p className="text-sm text-hospital-muted">Blood stock and requests to blood banks.</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true)
              setMessage("")
            }}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Send size={16} /> Request blood
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HospitalSummaryCard label="Units in stock" value={totalUnits} hint="All blood groups" icon={Droplet} />
        <HospitalSummaryCard
          label="Low or out"
          value={lowGroups.length + outGroups.length}
          hint="Blood groups to refill"
          icon={TriangleAlert}
        />
        <HospitalSummaryCard label="Active requests" value={activeRequests.length} hint="Waiting for blood" icon={Send} />
        <HospitalSummaryCard label="Emergency requests" value={emergencyCount} hint="Still active" icon={Siren} />
      </div>

      {(outGroups.length > 0 || lowGroups.length > 0) && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-amber-700" />
          <div className="text-sm text-amber-800">
            {outGroups.length > 0 && (
              <p>
                <span className="font-bold">Out of stock:</span> {outGroups.join(", ")}
              </p>
            )}
            {lowGroups.length > 0 && (
              <p>
                <span className="font-bold">Low stock:</span> {lowGroups.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      <BloodStockGrid stock={stock} onChangeUnits={changeUnits} />

      {formOpen && <BloodRequestForm onSave={saveRequest} onCancel={() => setFormOpen(false)} />}

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-hospital-navy">Requests to blood banks</h2>

        <div className={`${hospitalCardClass} flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hospital-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient or blood bank"
                aria-label="Search blood requests"
                className={`${hospitalFieldClass} w-full pl-9`}
              />
            </div>
            <select value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Filter by blood group" className={hospitalFieldClass}>
              <option value="all">All groups</option>
              {bloodGroups.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            {bloodRequestFilters.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                  filter === option.value
                    ? "bg-hospital-primary text-white"
                    : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {shownRequests.length === 0 ? (
          <p className={`${hospitalCardClass} text-center text-sm text-hospital-muted`}>No requests here.</p>
        ) : (
          <BloodRequestsTable requests={shownRequests} onCancelRequest={cancelRequest} onMarkReceived={markReceived} />
        )}
      </div>
    </div>
  )
}

export default BloodManagement