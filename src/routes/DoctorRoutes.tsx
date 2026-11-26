import type { RouteObject } from "react-router-dom"
import DoctorLayout from "../layouts/doctorLayouts/DoctorLayout"

import { DOCTOR_BASE_PATH } from "../constants/doctorConstants/doctorDashboard.constants"
import DoctorSettings from "../pages/doctor/DoctorSettings"
import DoctorNotifications from "../pages/doctor/DoctorNotifications"
import DoctorReviews from "../pages/doctor/DoctorReviews"
import DoctorProfile from "../pages/doctor/DoctorProfile"
import DoctorScheduleSlots from "../pages/doctor/DoctorScheduleSlots"
import DoctorChambers from "../pages/doctor/DoctorChambers"
import DoctorFollowUps from "../pages/doctor/DoctorFollowUps"
import DoctorPrescriptions from "../pages/doctor/DoctorPrescriptions"
import DoctorConsultations from "../pages/doctor/DoctorConsultations"
import DoctorPatients from "../pages/doctor/DoctorPatients"
import DoctorQueue from "../pages/doctor/DoctorQueue"
import DoctorAppointments from "../pages/doctor/DoctorAppointments"
import DoctorApplication from "../pages/doctor/DoctorApplication"
import DoctorDashboard from "../pages/doctor/DoctorDashboard"


// Every section ends with the doctor id: /doctorDashboard/<section>/:id
// /doctorDashboard alone shows a list of the sample doctors (see DoctorLayout)
export const doctorRoutes: RouteObject = {
  path: DOCTOR_BASE_PATH,
  element: <DoctorLayout />,
  children: [
    { path: "dashboard/:id", element: <DoctorDashboard /> },
    { path: "application/:id", element: <DoctorApplication /> },
    { path: "appointments/:id", element: <DoctorAppointments /> },
    { path: "queue/:id", element: <DoctorQueue /> },
    { path: "patients/:id", element: <DoctorPatients /> },
    { path: "consultations/:id", element: <DoctorConsultations /> },
    { path: "prescriptions/:id", element: <DoctorPrescriptions /> },
    { path: "follow-ups/:id", element: <DoctorFollowUps /> },
    { path: "chambers/:id", element: <DoctorChambers /> },
    { path: "schedule/:id", element: <DoctorScheduleSlots /> },
    { path: "profile/:id", element: <DoctorProfile /> },
    { path: "reviews/:id", element: <DoctorReviews /> },
    { path: "notifications/:id", element: <DoctorNotifications /> },
    { path: "settings/:id", element: <DoctorSettings /> },
  ],
}