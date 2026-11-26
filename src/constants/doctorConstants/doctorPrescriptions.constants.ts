import type { DoctorPrescription, MedicineFrequency, PrescriptionFormValues } from "../../types/type/doctorType/DoctorPrescriptions.type"

export const medicineFrequencies: MedicineFrequency[] = [
  "Once a day",
  "Twice a day",
  "Three times a day",
  "Four times a day",
  "When needed",
]

export const initialPrescriptionForm: PrescriptionFormValues = {
  patientId: "",
  chamberId: "",
  diagnosis: "",
  advice: "",
}

// Placeholder data, newest first
export const doctorPrescriptions: DoctorPrescription[] = [
  {
    id: "rx1", patientId: "p1", patient: "Rahul Sen", age: 34, gender: "M", chamberId: "ch1", date: "19 Nov 2026", diagnosis: "Viral fever",
    medicines: [
      { id: "m1", name: "Paracetamol 650 mg", dosage: "1 tablet", frequency: "Three times a day", duration: "3 days", instructions: "After food" },
      { id: "m2", name: "Cetirizine 10 mg", dosage: "1 tablet", frequency: "Once a day", duration: "5 days", instructions: "At bedtime" },
    ],
    advice: "Drink plenty of fluids and take rest.",
  },
  {
    id: "rx3", patientId: "p2", patient: "Ananya Mitra", age: 28, gender: "F", chamberId: "ch1", date: "19 Nov 2026", diagnosis: "Contact dermatitis",
    medicines: [
      { id: "m3", name: "Levocetirizine 5 mg", dosage: "1 tablet", frequency: "Once a day", duration: "7 days", instructions: "At bedtime" },
      { id: "m4", name: "Calamine lotion", dosage: "Thin layer", frequency: "Twice a day", duration: "7 days", instructions: "On the rash" },
    ],
    advice: "Avoid new soaps and detergents.",
  },
  {
    id: "rx2", patientId: "p1", patient: "Rahul Sen", age: 34, gender: "M", chamberId: "ch1", date: "12 Nov 2026", diagnosis: "Influenza",
    medicines: [
      { id: "m5", name: "Oseltamivir 75 mg", dosage: "1 capsule", frequency: "Twice a day", duration: "5 days", instructions: "After food" },
    ],
    advice: "Stay home until the fever settles.",
  },
  {
    id: "rx6", patientId: "p7", patient: "Arjun Paul", age: 60, gender: "M", chamberId: "ch2", date: "08 Nov 2026", diagnosis: "Type 2 diabetes",
    medicines: [
      { id: "m6", name: "Metformin 500 mg", dosage: "1 tablet", frequency: "Twice a day", duration: "30 days", instructions: "After food" },
      { id: "m7", name: "Glimepiride 1 mg", dosage: "1 tablet", frequency: "Once a day", duration: "30 days", instructions: "Before breakfast" },
    ],
    advice: "Walk 30 minutes daily and cut down on sugar.",
  },
  {
    id: "rx4", patientId: "p3", patient: "Imran Khan", age: 45, gender: "M", chamberId: "ch1", date: "05 Nov 2026", diagnosis: "Muscle strain",
    medicines: [
      { id: "m8", name: "Diclofenac gel", dosage: "Thin layer", frequency: "Three times a day", duration: "7 days", instructions: "On the painful area" },
      { id: "m9", name: "Pantoprazole 40 mg", dosage: "1 tablet", frequency: "Once a day", duration: "7 days", instructions: "Before breakfast" },
    ],
    advice: "Avoid heavy lifting for 2 weeks.",
  },
]