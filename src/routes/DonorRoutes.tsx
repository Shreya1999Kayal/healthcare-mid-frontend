import type { RouteObject } from "react-router-dom"
import DonorLayout from "../layouts/bloodDonationLayouts/bloodDonorLayouts/DonorLayout"
import DonorDashboard from "../pages/bloodDonation/bloodDonor/DonorDashboard"
import DonorVerification from "../pages/bloodDonation/bloodDonor/DonorVerification"
import DonorProfile from "../pages/bloodDonation/bloodDonor/DonorProfile"
import DonationHistory from "../pages/bloodDonation/bloodDonor/DonationHistory"
import { DONOR_BASE_PATH } from "../constants/blood/donorConstants/donorDashboard.constants"

// Every section ends with the donor id: /donorDashboard/<section>/:id
// /donorDashboard alone shows a list of the sample donors (see DonorLayout)
export const donorRoutes: RouteObject = {
  path: DONOR_BASE_PATH,
  element: <DonorLayout />,
  children: [
    { path: "dashboard/:id", element: <DonorDashboard /> },
    { path: "verification/:id", element: <DonorVerification /> },
    { path: "profile/:id", element: <DonorProfile /> },
    { path: "records/:id", element: <DonationHistory /> },
  ],
}