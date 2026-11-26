import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import HospitalSidebar from "./HospitalSidebar"
import HospitalTopbar from "./HospitalTopbar"
import HospitalNavItem from "../../components/hospital/HospitalNavItem"
import HospitalLockedSection from "../../components/hospital/HospitalLockedSection"
import { HOSPITAL_TODAY, hospitalCardClass, hospitalNavLinks, hospitalNotifications } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalAccounts, verificationStatusStyles } from "../../constants/hospitalConstants/hospitalVerification.constants"
import { formatIsoDate, getHospitalSection, hospitalPath } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { isHospitalSectionLocked } from "../../services/helper/hospitalHelper/hospitalVerification.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { HospitalNotification } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  HospitalAccount,
  HospitalVerification,
  VerificationDocuments,
  VerificationFormValues,
} from "../../types/type/hospitalType/HospitalVerification.type"

const HospitalLayout = () => {
  const { pathname } = useLocation()
  // :id of the child route, e.g. /hospitalDashboard/dashboard/h1 -> "h1"
  const { id = "" } = useParams()

  // Verification of every sample hospital, kept here so the sidebar unlocks / locks right after a submit (UI only)
  const [verifications, setVerifications] = useState<Record<string, HospitalVerification>>(() =>
    Object.fromEntries(hospitalAccounts.map((account) => [account.id, account.verification])),
  )

  // Kept here so the bell count, the dashboard and the Notifications page stay in sync (UI only)
  const [notifications, setNotifications] = useState<HospitalNotification[]>(hospitalNotifications)
  const unread = notifications.filter((notification) => notification.unread).length

  const markRead = (notificationId: string) =>
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, unread: false } : notification)),
    )

  const markAllRead = () => setNotifications((prev) => prev.map((notification) => ({ ...notification, unread: false })))

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  const account = hospitalAccounts.find((item) => item.id === id)

  // Missing or unknown id: pick one of the sample hospitals (until login is built)
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hospital-bg p-4">
        <div className={`${hospitalCardClass} w-full max-w-md`}>
          <h1 className="text-xl font-bold text-hospital-navy">{id ? "Hospital not found" : "Choose a hospital"}</h1>
          <p className="mt-1 text-sm text-hospital-muted">
            {id ? `No hospital has the id "${id}". ` : ""}Open one of the sample hospitals.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {hospitalAccounts.map((item) => {
              const style = verificationStatusStyles[verifications[item.id].status]

              return (
                <li key={item.id}>
                  <Link
                    to={hospitalPath("dashboard", item.id)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-hospital-border px-4 py-3 text-sm font-semibold text-hospital-navy no-underline hover:bg-hospital-bg"
                  >
                    <span>
                      {item.name} <span className="font-normal text-hospital-muted">({item.id})</span>
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

  const hospital: HospitalAccount = { ...account, verification: verifications[account.id] }
  const status = hospital.verification.status

  const submitVerification = (details: VerificationFormValues, documents: VerificationDocuments) => {
    const sent: HospitalVerification = {
      ...verifications[account.id],
      status: "pending",
      submittedOn: formatIsoDate(HOSPITAL_TODAY),
      reviewedOn: "",
      adminRemarks: "",
      details,
      documents,
    }
    setVerifications((prev) => ({ ...prev, [account.id]: sent }))
  }

  const outletContext: HospitalOutletContext = {
    hospital,
    notifications,
    onMarkRead: markRead,
    onMarkAllRead: markAllRead,
    onSubmitVerification: submitVerification,
  }

  return (
    <div className="flex min-h-screen bg-hospital-bg">
      <HospitalSidebar hospital={hospital} />

      <div className="flex min-w-0 flex-1 flex-col">
        <HospitalTopbar hospital={hospital} unread={unread} />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-hospital-primary p-2 lg:hidden">
          {hospitalNavLinks.map(({ label, section, icon }) => (
            <HospitalNavItem
              key={section}
              label={label}
              icon={icon}
              to={hospitalPath(section, hospital.id)}
              locked={isHospitalSectionLocked(section, status)}
              compact
            />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          {/* Before approval only Verification opens; a locked URL typed by hand shows the locked message */}
          {isHospitalSectionLocked(getHospitalSection(pathname), status) ? (
            <HospitalLockedSection hospitalId={hospital.id} status={status} />
          ) : (
            <Outlet key={hospital.id} context={outletContext} />
          )}
        </main>
      </div>
    </div>
  )
}

export default HospitalLayout