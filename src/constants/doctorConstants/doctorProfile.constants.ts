import { doctorProfile } from "./doctorDashboard.constants"
import type { ConsultationType, DoctorProfileDetails } from "../../types/type/doctorType/DoctorProfile.type"

export const consultationTypeOptions: { value: ConsultationType; label: string }[] = [
  { value: "in-person", label: "In-person only" },
  { value: "online", label: "Online only" },
  { value: "both", label: "Online and in-person" },
]

// Placeholder data, starts from the same doctorProfile used by the sidebar and topbar
export const doctorProfileDetails: DoctorProfileDetails = {
  ...doctorProfile,
  subSpeciality: "Diabetes and lifestyle care",
  experience: 12,
  languages: ["English", "Bengali", "Hindi"],
  bio: "General physician with 12 years of practice across Kolkata. Treats fever, infections, diabetes and blood pressure, and gives clear advice patients can follow at home.",
  inPersonFee: 800,
  onlineFee: 500,
  email: "leslie.alexander@seva.health",
  phone: "+91 98300 55555",
  qualifications: ["MBBS, Calcutta Medical College (2010)", "MD, General Medicine, IPGMER Kolkata (2014)"],
  expertise: ["Fever and infections", "Diabetes care", "High blood pressure", "Preventive health check-ups"],
  awards: ["Best Young Physician, West Bengal Medical Council (2019)"],
  certifications: ["Certificate in Diabetes Management (2017)", "Basic Life Support (BLS), renewed 2025"],
  consultationType: "both",
}