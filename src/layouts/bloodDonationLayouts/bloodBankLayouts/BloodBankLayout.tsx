import { useEffect, useState } from "react"
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router-dom"

import BloodBankSidebar from "./BloodBankSidebar"
import BloodBankTopbar from "./BloodBankTopbar"


import {
  BLOOD_BANK_TODAY,
  bloodBankCardClass,
  bloodBankNotifications,
  roleLabels,
} from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bloodBankAccounts, verificationStatusStyles } from "../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"
import { DEFAULT_LOW_STOCK_LIMIT, bloodBankStock } from "../../../constants/blood/bloodBankConstants/bloodBankInventory.constants"
import { bloodBankRequests } from "../../../constants/blood/bloodBankConstants/bloodBankRequest.constants"
import {
  bloodBankPath,
  formatIsoDate,
  getBloodBankSection,
  getNavLinksForRole,
  isSectionForRole,
} from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { isBloodBankSectionLocked } from "../../../services/helper/blood/bloodBankHelper/bloodBankVerification.helper"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodGroup, BloodStock } from "../../../types/type/public/Blood.type"
import type { BloodBankNotification } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"
import type { BloodBankRequest } from "../../../types/type/blood/bloodBankType/BloodBankRequest.type"
import type {
  BloodBankAccount,
  BloodBankDocuments,
  BloodBankVerification,
  BloodBankVerificationValues,
} from "../../../types/type/blood/bloodBankType/BloodBankVerification.type"
import BloodBankNavItem from "../../../components/bloodDonation/bloodBank/BloodBankNavItem"
import BloodBankLockedSection from "../../../components/bloodDonation/bloodBank/BloodBankLockedSection"

const BloodBankLayout = () => {
  const { pathname } = useLocation()
  // :id of the child route, e.g. /bloodDonationDashboard/dashboard/bb1 -> "bb1"
  const { id = "" } = useParams()

  // Verification of every sample blood bank, kept here so the sidebar unlocks right after a submit (UI only)
  const [verifications, setVerifications] = useState<Record<string, BloodBankVerification>>(() =>
    Object.fromEntries(bloodBankAccounts.map((account) => [account.id, account.verification])),
  )

  // Kept here so the bell, dashboard, inventory and requests stay in sync (UI only, shared by the sample banks)
  const [notifications, setNotifications] = useState<BloodBankNotification[]>(bloodBankNotifications)
  const [stock, setStock] = useState<BloodStock>(bloodBankStock)
  const [requests, setRequests] = useState<BloodBankRequest[]>(bloodBankRequests)
  const [lowStockLimit, setLowStockLimit] = useState(DEFAULT_LOW_STOCK_LIMIT)

  const unread = notifications.filter((notification) => notification.unread).length

  const markRead = (notificationId: string) =>
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, unread: false } : notification)),
    )

  const markAllRead = () => setNotifications((prev) => prev.map((notification) => ({ ...notification, unread: false })))

  const updateRequest = (requestId: string, changes: Partial<BloodBankRequest>) =>
    setRequests((prev) => prev.map((request) => (request.id === requestId ? { ...request, ...changes } : request)))

  // Accepted units become "reserved" (see buildInventoryRows), so available goes down straight away
  const acceptRequest = (requestId: string) => updateRequest(requestId, { status: "accepted" })

  const rejectRequest = (requestId: string, reason: string) => updateRequest(requestId, { status: "rejected", rejectReason: reason })

  // Delivered units leave the bank, so they are taken off the total
  const deliverRequest = (requestId: string) => {
    const request = requests.find((item) => item.id === requestId)
    if (!request) return
    setStock((prev) => ({ ...prev, [request.group]: Math.max(prev[request.group] - request.units, 0) }))
    updateRequest(requestId, { status: "delivered" })
  }

  const updateStock = (group: BloodGroup, units: number) => setStock((prev) => ({ ...prev, [group]: units }))

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  const account = bloodBankAccounts.find((item) => item.id === id)

  // Missing or unknown id: pick one of the sample blood banks (until login is built)
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blood-bg p-4">
        <div className={`${bloodBankCardClass} w-full max-w-md`}>
          <h1 className="text-xl font-bold text-blood-navy">{id ? "Blood bank not found" : "Choose a blood bank"}</h1>
          <p className="mt-1 text-sm text-blood-muted">
            {id ? `No blood bank has the id "${id}". ` : ""}Open one of the sample blood banks.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {bloodBankAccounts.map((item) => {
              const style = verificationStatusStyles[verifications[item.id].status]

              return (
                <li key={item.id}>
                  <Link
                    to={bloodBankPath("dashboard", item.id)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-blood-border px-4 py-3 text-sm font-semibold text-blood-navy no-underline hover:bg-blood-bg"
                  >
                    <span>
                      {item.name}{" "}
                      <span className="font-normal text-blood-muted">
                        ({item.id}, {roleLabels[item.role]})
                      </span>
                    </span>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  const bank: BloodBankAccount = { ...account, verification: verifications[account.id] }
  const status = bank.verification.status
  const section = getBloodBankSection(pathname)

  // Sidebar shows only this role's links (like the admin-only Category link)
  const navLinks = getNavLinksForRole(bank.role)

  const submitVerification = (details: BloodBankVerificationValues, documents: BloodBankDocuments) => {
    const sent: BloodBankVerification = {
      ...verifications[account.id],
      status: "pending",
      submittedOn: formatIsoDate(BLOOD_BANK_TODAY),
      reviewedOn: "",
      adminRemarks: "",
      details,
      documents,
    }
    setVerifications((prev) => ({ ...prev, [account.id]: sent }))
  }

  const outletContext: BloodBankOutletContext = {
    bank,
    notifications,
    stock,
    requests,
    lowStockLimit,
    onMarkRead: markRead,
    onMarkAllRead: markAllRead,
    onSubmitVerification: submitVerification,
    onUpdateStock: updateStock,
    onAcceptRequest: acceptRequest,
    onRejectRequest: rejectRequest,
    onDeliverRequest: deliverRequest,
    onChangeLowStockLimit: setLowStockLimit,
  }

  // A camp-only URL typed by a blood bank goes back to the dashboard (like AdminProtect)
  if (!isSectionForRole(section, bank.role)) {
    return <Navigate to={bloodBankPath("dashboard", bank.id)} replace />
  }

  return (
    <div className="flex min-h-screen bg-blood-bg">
      <BloodBankSidebar bank={bank} navLinks={navLinks} />

      <div className="flex min-w-0 flex-1 flex-col">
        <BloodBankTopbar bank={bank} unread={unread} />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-blood-primary p-2 lg:hidden">
          {navLinks.map(({ label, section: linkSection, icon }) => (
            <BloodBankNavItem
              key={linkSection}
              label={label}
              icon={icon}
              to={bloodBankPath(linkSection, bank.id)}
              locked={isBloodBankSectionLocked(linkSection, status)}
              compact
            />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          {/* Before approval only Verification opens; a locked URL typed by hand shows the locked message */}
          {isBloodBankSectionLocked(section, status) ? (
            <BloodBankLockedSection bankId={bank.id} status={status} />
          ) : (
            <Outlet key={bank.id} context={outletContext} />
          )}
        </main>
      </div>
    </div>
  )
}

export default BloodBankLayout