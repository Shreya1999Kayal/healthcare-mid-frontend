import type { DoctorTabOption } from "../../types/type/doctorType/DoctorAppointments.type"
import type { DoctorPatient, PatientDetailTab } from "../../types/type/doctorType/DoctorPatients.type"

export const genderLabel: Record<DoctorPatient["gender"], string> = { M: "Male", F: "Female" }

export const patientDetailTabs: DoctorTabOption<PatientDetailTab>[] = [
  { id: "visits", label: "Visit history" },
  { id: "prescriptions", label: "Prescriptions" },
  { id: "documents", label: "Documents" },
]

// Placeholder data, ids match patientId in doctorAppointments
export const doctorPatients: DoctorPatient[] = [
  {
    id: "p1", name: "Rahul Sen", age: 34, gender: "M", bloodGroup: "O+", phone: "+91 98300 11223",
    visits: [
      { id: "v1", date: "19 Nov 2026", chamberId: "ch1", reason: "Fever and cough", diagnosis: "Viral fever" },
      { id: "v2", date: "12 Nov 2026", chamberId: "ch1", reason: "Seasonal flu", diagnosis: "Influenza" },
    ],
    prescriptions: [
      { id: "rx1", date: "19 Nov 2026", medicines: ["Paracetamol 650 mg", "Cetirizine 10 mg"] },
      { id: "rx2", date: "12 Nov 2026", medicines: ["Oseltamivir 75 mg"] },
    ],
    documents: [],
  },
  {
    id: "p2", name: "Ananya Mitra", age: 28, gender: "F", bloodGroup: "B+", phone: "+91 98311 44556",
    visits: [{ id: "v3", date: "19 Nov 2026", chamberId: "ch1", reason: "Skin allergy", diagnosis: "Contact dermatitis" }],
    prescriptions: [{ id: "rx3", date: "19 Nov 2026", medicines: ["Levocetirizine 5 mg", "Calamine lotion"] }],
    documents: [],
  },
  {
    id: "p3", name: "Imran Khan", age: 45, gender: "M", bloodGroup: "A+", phone: "+91 98742 77881",
    visits: [{ id: "v4", date: "05 Nov 2026", chamberId: "ch1", reason: "Chest pain", diagnosis: "Muscle strain, ECG normal" }],
    prescriptions: [{ id: "rx4", date: "05 Nov 2026", medicines: ["Diclofenac gel", "Pantoprazole 40 mg"] }],
    documents: [{ id: "d1", name: "ECG report", kind: "Report", date: "05 Nov 2026" }],
  },
  {
    id: "p4", name: "Priya Das", age: 52, gender: "F", bloodGroup: "AB+", phone: "+91 90070 22334",
    visits: [{ id: "v5", date: "29 Oct 2026", chamberId: "ch1", reason: "Blood pressure check", diagnosis: "Hypertension, stage 1" }],
    prescriptions: [{ id: "rx5", date: "29 Oct 2026", medicines: ["Amlodipine 5 mg"] }],
    documents: [{ id: "d2", name: "Lipid profile", kind: "Lab report", date: "28 Oct 2026" }],
  },
  {
    id: "p5", name: "Sourav Ghosh", age: 39, gender: "M", bloodGroup: "O-", phone: "+91 98364 55667",
    visits: [], prescriptions: [],
    documents: [{ id: "d3", name: "Liver function test", kind: "Lab report", date: "17 Nov 2026" }],
  },
  {
    id: "p6", name: "Neha Roy", age: 31, gender: "F", bloodGroup: "A-", phone: "+91 97480 66778",
    visits: [], prescriptions: [], documents: [],
  },
  {
    id: "p7", name: "Arjun Paul", age: 60, gender: "M", bloodGroup: "B+", phone: "+91 98310 88990",
    visits: [{ id: "v6", date: "08 Nov 2026", chamberId: "ch2", reason: "Diabetes review", diagnosis: "Type 2 diabetes, controlled" }],
    prescriptions: [{ id: "rx6", date: "08 Nov 2026", medicines: ["Metformin 500 mg", "Glimepiride 1 mg"] }],
    documents: [{ id: "d4", name: "HbA1c report", kind: "Lab report", date: "07 Nov 2026" }],
  },
  {
    id: "p8", name: "Meera Bose", age: 7, gender: "F", bloodGroup: "O+", phone: "+91 90510 12121",
    visits: [{ id: "v7", date: "01 Nov 2026", chamberId: "ch3", reason: "Fever", diagnosis: "Viral fever" }],
    prescriptions: [{ id: "rx7", date: "01 Nov 2026", medicines: ["Paracetamol syrup 250 mg/5 ml"] }],
    documents: [],
  },
  {
    id: "p9", name: "Rohit Das", age: 36, gender: "M", bloodGroup: "B-", phone: "+91 98300 34343",
    visits: [], prescriptions: [], documents: [],
  },
  {
    id: "p10", name: "Kabir Sinha", age: 41, gender: "M", bloodGroup: "A+", phone: "+91 97482 56565",
    visits: [], prescriptions: [],
    documents: [{ id: "d5", name: "Lumbar spine X-ray", kind: "Scan", date: "14 Nov 2026" }],
  },
  {
    id: "p11", name: "Tania Dey", age: 26, gender: "F", bloodGroup: "AB-", phone: "+91 90073 78787",
    visits: [], prescriptions: [],
    documents: [{ id: "d6", name: "Thyroid profile", kind: "Lab report", date: "16 Nov 2026" }],
  },
]