import type { RouteObject } from "react-router-dom"
import BloodBankLayout from "../layouts/bloodDonationLayouts/bloodBankLayouts/BloodBankLayout"
import { BLOOD_BANK_BASE_PATH } from "../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import BloodBankDashboard from "../pages/bloodDonation/bloodBank/BloodBankDashboard"
import BloodBankVerification from "../pages/bloodDonation/bloodBank/BloodBankVerification"
import BloodBankProfile from "../pages/bloodDonation/bloodBank/BloodBankProfile"
import BloodInventory from "../pages/bloodDonation/bloodBank/BloodInventory"
import BloodRequests from "../pages/bloodDonation/bloodBank/BloodRequests"
import BloodReviews from "../pages/bloodDonation/bloodBank/BloodReviews"
import BloodReports from "../pages/bloodDonation/bloodBank/BloodReports"
import BloodNotifications from "../pages/bloodDonation/bloodBank/BloodNotifications"
import BloodSettings from "../pages/bloodDonation/bloodBank/BloodSettings"
import CampDonationCamps from "../pages/bloodDonation/bloodCamp/CampDonationCamps"
import CampDonors from "../pages/bloodDonation/bloodCamp/CampDonors"


// Every section ends with the blood bank id: /bloodDonationDashboard/<section>/:id
// /bloodDonationDashboard alone shows a list of the sample blood banks (see BloodBankLayout)
export const bloodRoutes: RouteObject = {
  path: BLOOD_BANK_BASE_PATH,
  element: <BloodBankLayout />,
  children: [
    { path: "dashboard/:id", element: <BloodBankDashboard /> },
    { path: "verification/:id", element: <BloodBankVerification /> },
    { path: "profile/:id", element: <BloodBankProfile /> },
    { path: "inventory/:id", element: <BloodInventory /> },
    { path: "requests/:id", element: <BloodRequests /> },
    { path: "camps/:id", element: <CampDonationCamps /> },
    { path: "donors/:id", element: <CampDonors /> },
    { path: "reviews/:id", element: <BloodReviews /> },
    { path: "reports/:id", element: <BloodReports /> },
    { path: "notifications/:id", element: <BloodNotifications /> },
    { path: "settings/:id", element: <BloodSettings /> },
    
  ],

}