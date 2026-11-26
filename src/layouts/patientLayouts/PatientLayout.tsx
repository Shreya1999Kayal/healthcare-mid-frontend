import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import PatientSidebar from "./PatientSidebar"
import PatientTopbar from "./PatientTopbar"
import PatientNavItem from "../../components/patient/PatientNavItem"
import {
  patientAccounts,
  patientCardClass,
  patientNavLinks,
  patientNotifications,
} from "../../constants/patientConstants/patientDashboard.constants"
import { patientAppointments, patientBloodRequests, patientFavorites } from "../../constants/patientConstants/patientCare.constants"
import { patientPath } from "../../services/helper/patientHelper/patientDashboard.helper"
import { fromBloodRequestValues, fromBookingValues } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type {
  PatientAccount,
  PatientNotification,
  PatientProfileValues,
} from "../../types/type/patientType/PatientDashboard.type"
import type {
  PatientAppointment,
  PatientBloodRequest,
  PatientBloodRequestValues,
  PatientBookingValues,
  PatientFavorite,
} from "../../types/type/patientType/PatientCare.type"

// No admin approval for patients: every section opens right away
const PatientLayout = () => {
  const { pathname } = useLocation()
  // :id of the child route, e.g. /patientDashboard/dashboard/p1 -> "p1"
  const { id = "" } = useParams()

  // Kept here so the dashboard and every page stay in sync (UI only)
  const [profiles, setProfiles] = useState<Record<string, PatientProfileValues>>(() =>
    Object.fromEntries(patientAccounts.map((account) => [account.id, account.profile])),
  )
  const [appointments, setAppointments] = useState<PatientAppointment[]>(patientAppointments)
  const [bloodRequests, setBloodRequests] = useState<PatientBloodRequest[]>(patientBloodRequests)
  const [favorites, setFavorites] = useState<PatientFavorite[]>(patientFavorites)
  const [notifications, setNotifications] = useState<PatientNotification[]>(patientNotifications)

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  const account = patientAccounts.find((item) => item.id === id)

  // Missing or unknown id: pick one of the sample patients (until login is built)
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-patient-bg p-4">
        <div className={`${patientCardClass} w-full max-w-md`}>
          <h1 className="text-xl font-bold text-patient-navy">{id ? "Patient not found" : "Choose a patient"}</h1>
          <p className="mt-1 text-sm text-patient-muted">
            {id ? `No patient has the id "${id}". ` : ""}Open one of the sample patients.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {patientAccounts.map((item) => (
              <li key={item.id}>
                <Link
                  to={patientPath("dashboard", item.id)}
                  className="flex items-center justify-between rounded-lg border border-patient-border px-4 py-3 text-sm font-semibold text-patient-navy no-underline hover:bg-patient-bg"
                >
                  {item.profile.name} <span className="font-normal text-patient-muted">({item.id})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const patient: PatientAccount = { ...account, profile: profiles[account.id] }
  const unread = notifications.filter((notification) => notification.unread).length

  const outletContext: PatientOutletContext = {
    patient,
    appointments,
    bloodRequests,
    favorites,
    notifications,
    onSaveProfile: (profile: PatientProfileValues) => setProfiles((prev) => ({ ...prev, [account.id]: profile })),
    onBookAppointment: (values: PatientBookingValues) => setAppointments((prev) => [...prev, fromBookingValues(values)]),
    onRescheduleAppointment: (appointmentId: string, values: PatientBookingValues) =>
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointmentId
            ? { ...item, date: values.date, time: values.time, reason: values.reason.trim(), status: "pending" }
            : item,
        ),
      ),
    onCancelAppointment: (appointmentId: string) =>
      setAppointments((prev) => prev.map((item) => (item.id === appointmentId ? { ...item, status: "cancelled" } : item))),
    onRequestBlood: (values: PatientBloodRequestValues) => setBloodRequests((prev) => [fromBloodRequestValues(values), ...prev]),
    onCancelBloodRequest: (requestId: string) =>
      setBloodRequests((prev) => prev.map((item) => (item.id === requestId ? { ...item, status: "cancelled" } : item))),
    onRemoveFavorite: (favoriteId: string) => setFavorites((prev) => prev.filter((item) => item.id !== favoriteId)),
    onMarkRead: (notificationId: string) =>
      setNotifications((prev) => prev.map((item) => (item.id === notificationId ? { ...item, unread: false } : item))),
    onMarkAllRead: () => setNotifications((prev) => prev.map((item) => ({ ...item, unread: false }))),
  }

  return (
    <div className="flex min-h-screen bg-patient-bg">
      <PatientSidebar patient={patient} />

      <div className="flex min-w-0 flex-1 flex-col">
        <PatientTopbar patient={patient} unread={unread} />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-patient-primary p-2 lg:hidden">
          {patientNavLinks.map(({ label, section, icon }) => (
            <PatientNavItem key={section} label={label} icon={icon} to={patientPath(section, patient.id)} compact />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          <Outlet key={patient.id} context={outletContext} />
        </main>
      </div>
    </div>
  )
}

export default PatientLayout
