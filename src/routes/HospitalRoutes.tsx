import type { RouteObject } from "react-router-dom"
import HospitalLayout from "../layouts/hospitalLayouts/HospitalLayout"
import HospitalDashboard from "../pages/hospital/HospitalDashboard"
import HospitalVerification from "../pages/hospital/HospitalVerification"
import HospitalProfile from "../pages/hospital/HospitalProfile"
import { HOSPITAL_BASE_PATH } from "../constants/hospitalConstants/hospitalDashboard.constants"

import Branches from "../pages/hospital/Branches"
import Departments from "../pages/hospital/Departments"
import DoctorsSection from "../pages/hospital/DoctorsSection"
import BedsICU from "../pages/hospital/BedsICU"
import Ambulances from "../pages/hospital/Ambulances"
import Appointments from "../pages/hospital/Appointments"
import BloodManagement from "../pages/hospital/BloodManagement"
import EmergencyManagement from "../pages/hospital/EmergencyManagement"
import StaffPermissions from "../pages/hospital/StaffPermissions"
import ReportsAnalytics from "../pages/hospital/ReportsAnalytics"
import HospitalNotifications from "../pages/hospital/HospitalNotifications"
import Settings from "../pages/hospital/Settings"
import HospitalReviews from "../pages/hospital/HospitalReviews"

// Every section ends with the hospital id: /hospitalDashboard/<section>/:id
// /hospitalDashboard alone shows a list of the sample hospitals (see HospitalLayout)
export const hospitalRoutes: RouteObject = {
    path: HOSPITAL_BASE_PATH,
    element: <HospitalLayout />,
    children: [
        { path: "dashboard/:id", element: <HospitalDashboard /> },
        { path: "verification/:id", element: <HospitalVerification /> },
        { path: "profile/:id", element: <HospitalProfile /> },
        { path: "branches/:id", element: <Branches /> },
        { path: "departments/:id", element: <Departments /> },
        { path: "doctors/:id", element: <DoctorsSection /> },
        { path: "beds/:id", element: <BedsICU /> },
        { path: "ambulances/:id", element: <Ambulances /> },
        { path: "appointments/:id", element: <Appointments /> },
        { path: "blood/:id", element: <BloodManagement /> },
        { path: "emergency/:id", element: <EmergencyManagement /> },
        { path: "staff/:id", element: <StaffPermissions /> },
        { path: "reports/:id", element: <ReportsAnalytics /> },
        { path: "reviews/:id", element: <HospitalReviews /> },
        { path: "notifications/:id", element: <HospitalNotifications /> },
        { path: "settings/:id", element: <Settings /> },
    ],
}