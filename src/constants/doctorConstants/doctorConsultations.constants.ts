import type { AppointmentStatus } from "../../types/type/doctorType/DoctorDashboard.type"
import type { ConsultationFormValues, DoctorConsultation } from "../../types/type/doctorType/DoctorConsultations.type"

export const initialConsultationForm: ConsultationFormValues = {
  symptoms: "",
  observations: "",
  notes: "",
  diagnosis: "",
  testsAdvised: "",
  followUpDate: "",
}

// Today's appointments the doctor can open, in this order (patient inside first)
export const consultableStatuses: AppointmentStatus[] = ["in-consultation", "checked-in", "confirmed"]

// Placeholder data, newest first
export const doctorConsultations: DoctorConsultation[] = [
  { id: "c1", patientId: "p1", patient: "Rahul Sen", chamberId: "ch1", date: "19 Nov 2026", symptoms: "Fever for 3 days, dry cough", observations: "Temp 101°F, throat red", notes: "Plenty of fluids, rest for 3 days", diagnosis: "Viral fever", testsAdvised: ["CBC"], followUpDate: "" },
  { id: "c2", patientId: "p2", patient: "Ananya Mitra", chamberId: "ch1", date: "19 Nov 2026", symptoms: "Itchy rash on both arms", observations: "Red patches, no blisters", notes: "Avoid new soap or detergent", diagnosis: "Contact dermatitis", testsAdvised: [], followUpDate: "2026-11-26" },
  { id: "c3", patientId: "p1", patient: "Rahul Sen", chamberId: "ch1", date: "12 Nov 2026", symptoms: "Body ache, high fever", observations: "Temp 102°F", notes: "Stay home until fever settles", diagnosis: "Influenza", testsAdvised: ["Influenza A/B test"], followUpDate: "2026-11-24" },
  { id: "c4", patientId: "p7", patient: "Arjun Paul", chamberId: "ch2", date: "08 Nov 2026", symptoms: "Tiredness, frequent urination", observations: "BP 130/84, weight 78 kg", notes: "Walk 30 minutes daily, cut sugar", diagnosis: "Type 2 diabetes, controlled", testsAdvised: ["HbA1c", "Fasting blood sugar"], followUpDate: "2026-11-22" },
  { id: "c5", patientId: "p3", patient: "Imran Khan", chamberId: "ch1", date: "05 Nov 2026", symptoms: "Left-side chest pain when lifting", observations: "ECG normal, chest wall tender", notes: "No heavy lifting for 2 weeks", diagnosis: "Muscle strain", testsAdvised: ["ECG"], followUpDate: "2026-11-19" },
  { id: "c6", patientId: "p8", patient: "Meera Bose", chamberId: "ch3", date: "01 Nov 2026", symptoms: "Fever since last night", observations: "Temp 100°F, active child", notes: "Paracetamol syrup only when needed", diagnosis: "Viral fever", testsAdvised: [], followUpDate: "2026-11-19" },
  { id: "c7", patientId: "p4", patient: "Priya Das", chamberId: "ch1", date: "29 Oct 2026", symptoms: "Morning headache", observations: "BP 148/94", notes: "Less salt, check BP at home", diagnosis: "Hypertension, stage 1", testsAdvised: ["Lipid profile", "Kidney function test"], followUpDate: "2026-11-15" },
]