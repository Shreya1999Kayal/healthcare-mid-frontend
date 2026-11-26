import type { RouteObject } from "react-router-dom"
import PatientLayout from "../layouts/patientLayouts/PatientLayout"
import { PATIENT_BASE_PATH } from "../constants/patientConstants/patientDashboard.constants"
import PatientDashboard from "../pages/patient/PatientDashboard"
import PatientProfile from "../pages/patient/PatientProfile"
import Appointments from "../pages/patient/Appointments"
import MedicalRecords from "../pages/patient/MedicalRecords"
import Prescriptions from "../pages/patient/Prescriptions"
import BloodRequests from "../pages/patient/BloodRequests"
import Favorites from "../pages/patient/Favorites"
import FeedbackReviews from "../pages/patient/FeedbackReviews"
import Notifications from "../pages/patient/Notifications"
import Settings from "../pages/patient/Settings"

// Every section ends with the patient id: /patientDashboard/<section>/:id
// /patientDashboard alone shows a list of the sample patients (see PatientLayout)
export const patientRoutes: RouteObject = {
  path: PATIENT_BASE_PATH,
  element: <PatientLayout />,
  children: [
    { path: "dashboard/:id", element: <PatientDashboard /> },
    { path: "profile/:id", element: <PatientProfile /> },
    { path: "appointments/:id", element: <Appointments /> },
    { path: "records/:id", element: <MedicalRecords /> },
    { path: "prescriptions/:id", element: <Prescriptions /> },
    { path: "bloodRequests/:id", element: <BloodRequests /> },
    { path: "favorites/:id", element: <Favorites /> },
    { path: "reviews/:id", element: <FeedbackReviews /> },
    { path: "notifications/:id", element: <Notifications /> },
    { path: "settings/:id", element: <Settings /> },
  ],
}
