import type { HospitalProfileExtras } from "../../types/type/hospitalType/HospitalProfile.type"

// Placeholder data, replace with real data from the API later.
// Name, address, phone etc. come from the hospital's verification details.
export const hospitalProfileExtras: HospitalProfileExtras = {
  tagline: "Care that feels like home",
  website: "www.sevacity.in",
  about:
    "A multi-speciality hospital in the heart of Kolkata with round-the-clock emergency care, modern ICUs and experienced doctors across 12 departments.",
  openingHours: "OPD: Mon to Sat, 9:00 AM to 8:00 PM",
  emergency24x7: true,
  specialities: ["Cardiology", "General Medicine", "Paediatrics", "Orthopaedics", "Gynaecology"],
  facilities: ["24x7 pharmacy", "Pathology lab", "CT scan and MRI", "Blood bank", "Cafeteria", "Parking"],
  insurance: ["Ayushman Bharat", "Star Health", "HDFC ERGO", "ICICI Lombard"],
  accreditations: ["NABH accredited", "NABL accredited lab"],
  photos: [],
}