import { createBrowserRouter } from "react-router-dom";
import PublicWrapper from "../layouts/publicLayouts/publicWrapper";
import NotFound from "../pages/public/NotFound";
import Home from "../pages/public/Home";
import DoctorSearch from "../pages/public/DoctorSearch";
import DoctorDetails from "../pages/public/DoctorDetails";
import HospitalSearch from "../pages/public/HospitalSearch";
import HospitalDetails from "../pages/public/HospitalDetails";
import BloodSearch from "../pages/public/BloodSearch";
import Services from "../pages/public/Services";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import { doctorRoutes } from "./DoctorRoutes";
import { hospitalRoutes } from "./HospitalRoutes";
import { bloodRoutes } from "./BloodRoutes";
import { donorRoutes } from "./DonorRoutes";
import { adminRoutes } from "./AdminRoutes";
import { patientRoutes } from "./PatientRoutes";






const Routes = createBrowserRouter([
  {
    element: <PublicWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/doctors", element: <DoctorSearch /> },
      { path: "/doctors/:id", element: <DoctorDetails /> },
      { path: "/hospitals", element: <HospitalSearch /> },
      { path: "/hospitals/:id", element: <HospitalDetails /> },
      { path: "/blood", element: <BloodSearch /> },
       { path: "/about", element: <About /> }, 
       { path: "/contact", element: <Contact /> },
       
    
      
    ],
  },
  doctorRoutes,
  hospitalRoutes,
  bloodRoutes,
  donorRoutes,
  adminRoutes,
  patientRoutes,
  { path: "*", element: <NotFound /> },
 
])

export default Routes

