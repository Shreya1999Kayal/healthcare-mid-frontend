import { Navigate, type RouteObject } from "react-router-dom"
import AdminLayout from "../layouts/adminLayouts/AdminLayout"
import { ADMIN_BASE_PATH } from "../constants/adminConstants/adminDashboard.constants"
import DoctorVerification from "../pages/admin/DoctorVerification"
import HospitalVerification from "../pages/admin/HospitalVerification"
import BloodBankVerification from "../pages/admin/BloodBankVerification"
import DonorVerification from "../pages/admin/DonorVerification"
import UserManagement from "../pages/admin/UserManagement"
import DoctorManagement from "../pages/admin/DoctorManagement"
import HospitalManagement from "../pages/admin/HospitalManagement"
import BloodBankManagement from "../pages/admin/BloodBankManagement"
import DonorManagement from "../pages/admin/DonorManagement"
import AppointmentManagement from "../pages/admin/AppointmentManagement"
import BloodRequestManagement from "../pages/admin/BloodRequestManagement"
import EmergencyManagement from "../pages/admin/EmergencyManagement"
import BedAmbulanceMonitoring from "../pages/admin/BedAmbulanceMonitoring"
import FeedbackReviewManagement from "../pages/admin/FeedbackReviewManagement"

// Only one admin, so no :id: /adminDashboard/<section>
// /adminDashboard opens Doctor verification until AdminDashboard is built
export const adminRoutes: RouteObject = {
  path: ADMIN_BASE_PATH,
  element: <AdminLayout />,
  children: [
    { index: true, element: <Navigate to="doctorVerification" replace /> },
    { path: "doctorVerification", element: <DoctorVerification /> },
    { path: "hospitalVerification", element: <HospitalVerification /> },
    { path: "bloodBankVerification", element: <BloodBankVerification /> },
    { path: "donorVerification", element: <DonorVerification /> },
    { path: "users", element: <UserManagement /> },
    { path: "doctors", element: <DoctorManagement /> },
    { path: "hospitals", element: <HospitalManagement /> },
    { path: "bloodBanks", element: <BloodBankManagement /> },
    { path: "donors", element: <DonorManagement /> },
    { path: "appointments", element: <AppointmentManagement /> },
    { path: "bloodRequests", element: <BloodRequestManagement /> },
    { path: "emergency", element: <EmergencyManagement /> },
    { path: "bedsAmbulances", element: <BedAmbulanceMonitoring /> },
    { path: "feedback", element: <FeedbackReviewManagement /> },
  ],
}
