import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import DoctorSidebar from "./DoctorSidebar"
import DoctorTopbar from "./DoctorTopbar"
import DoctorNavItem from "../../components/doctor/DoctorNavItem"
import LockedSection from "../../components/doctor/LockedSection"
import { ALL_CHAMBERS, DOCTOR_TODAY, doctorCardClass, doctorChambers, doctorNavLinks, doctorNotifications } from "../../constants/doctorConstants/doctorDashboard.constants"
import { applicationStatusStyles, doctorAccounts } from "../../constants/doctorConstants/doctorApplication.constants"
import { doctorPath, formatIsoDate, getDoctorSection } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { isSectionLocked } from "../../services/helper/doctorHelper/doctorApplication.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { DoctorNotification } from "../../types/type/doctorType/DoctorDashboard.type"
import type { ApplicationDocuments, ApplicationFormValues, DoctorAccount, DoctorApplication } from "../../types/type/doctorType/DoctorApplication.type"

const DoctorLayout = () => {
  const { pathname } = useLocation()
  // :id of the child route, e.g. /doctorDashboard/dashboard/d1 -> "d1"
  const { id = "" } = useParams()
  const [chamberId, setChamberId] = useState(ALL_CHAMBERS)

  // Applications of every sample doctor, kept here so the sidebar locks / unlocks right after a submit (UI only)
  const [applications, setApplications] = useState<Record<string, DoctorApplication>>(() =>
    Object.fromEntries(doctorAccounts.map((account) => [account.id, account.application])),
  )

  // Kept here so the bell count, the dashboard and the Notifications page stay in sync (UI only)
  const [notifications, setNotifications] = useState<DoctorNotification[]>(doctorNotifications)
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

  const account = doctorAccounts.find((item) => item.id === id)

  // Missing or unknown id: pick one of the sample doctors (until login is built)
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-doctor-bg p-4">
        <div className={`${doctorCardClass} w-full max-w-md`}>
          <h1 className="text-xl font-bold text-doctor-navy">{id ? "Doctor not found" : "Choose a doctor"}</h1>
          <p className="mt-1 text-sm text-doctor-muted">
            {id ? `No doctor has the id "${id}". ` : ""}Open one of the sample doctors.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {doctorAccounts.map((item) => {
              const style = applicationStatusStyles[applications[item.id].status]

              return (
                <li key={item.id}>
                  <Link
                    to={doctorPath("dashboard", item.id)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-doctor-border px-4 py-3 text-sm font-semibold text-doctor-navy no-underline hover:bg-doctor-bg"
                  >
                    <span>
                      {item.name} <span className="font-normal text-doctor-muted">({item.id})</span>
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  const doctor: DoctorAccount = { ...account, application: applications[account.id] }
  const status = doctor.application.status

  const submitApplication = (details: ApplicationFormValues, documents: ApplicationDocuments) => {
    const sent: DoctorApplication = {
      ...applications[account.id],
      status: "pending",
      submittedOn: formatIsoDate(DOCTOR_TODAY),
      reviewedOn: "",
      adminRemarks: "",
      details,
      documents,
    }
    setApplications((prev) => ({ ...prev, [account.id]: sent }))
  }

  const outletContext: DoctorOutletContext = {
    doctor,
    chamberId,
    notifications,
    onMarkRead: markRead,
    onMarkAllRead: markAllRead,
    onSubmitApplication: submitApplication,
  }

  return (
    <div className="flex min-h-screen bg-doctor-bg">
      <DoctorSidebar doctor={doctor} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DoctorTopbar
          doctor={doctor}
          chambers={doctorChambers}
          chamberId={chamberId}
          unread={unread}
          onChamberChange={setChamberId}
        />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-doctor-navy p-2 lg:hidden">
          {doctorNavLinks.map(({ label, section, icon }) => (
            <DoctorNavItem
              key={section}
              label={label}
              icon={icon}
              to={doctorPath(section, doctor.id)}
              locked={isSectionLocked(section, status)}
              compact
            />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          {/* Before approval only Application opens; a locked URL typed by hand shows the locked message */}
          {isSectionLocked(getDoctorSection(pathname), status) ? (
            <LockedSection doctorId={doctor.id} status={status} />
          ) : (
            <Outlet key={doctor.id} context={outletContext} />
          )}
        </main>
      </div>
    </div>
  )
}

export default DoctorLayout