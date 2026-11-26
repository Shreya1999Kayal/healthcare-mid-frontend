import { hospitalDoctors } from "./hospitalDoctor.constants"
import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  ArrivalMode,
  EmergencyAction,
  EmergencyCase,
  EmergencyCaseFormValues,
  EmergencyCaseType,
  EmergencyFilter,
  EmergencyPriority,
  EmergencyStatus,
} from "../../types/type/hospitalType/HospitalEmergency.type"

export const priorityStyles: Record<EmergencyPriority, HospitalStatusStyle> = {
  critical: { label: "Critical", className: "bg-red-50 text-red-600" },
  serious: { label: "Serious", className: "bg-amber-50 text-amber-700" },
  stable: { label: "Stable", className: "bg-emerald-50 text-emerald-700" },
}

// Coloured left edge of the card
export const priorityBorders: Record<EmergencyPriority, string> = {
  critical: "border-l-red-500",
  serious: "border-l-amber-500",
  stable: "border-l-emerald-500",
}

// Critical first
export const priorityRank: Record<EmergencyPriority, number> = { critical: 0, serious: 1, stable: 2 }

export const caseTypeLabels: Record<EmergencyCaseType, string> = {
  accident: "Accident / injury",
  cardiac: "Heart attack / chest pain",
  stroke: "Stroke",
  burns: "Burns",
  breathing: "Breathing problem",
  other: "Other",
}

export const arrivalModeLabels: Record<ArrivalMode, string> = {
  ambulance: "Ambulance",
  "walk-in": "Walk-in",
  referral: "Referred by another hospital",
}

export const emergencyStatusStyles: Record<EmergencyStatus, HospitalStatusStyle> = {
  incoming: { label: "Incoming", className: "bg-indigo-50 text-indigo-700" },
  arrived: { label: "Arrived", className: "bg-sky-50 text-sky-700" },
  "in-treatment": { label: "In treatment", className: "bg-violet-50 text-violet-700" },
  admitted: { label: "Admitted", className: "bg-emerald-50 text-emerald-700" },
  discharged: { label: "Discharged", className: "bg-slate-100 text-slate-600" },
  transferred: { label: "Transferred", className: "bg-orange-50 text-orange-700" },
}

// Buttons shown for each status
export const emergencyActions: Record<EmergencyStatus, EmergencyAction[]> = {
  incoming: [{ label: "Mark arrived", next: "arrived" }],
  arrived: [{ label: "Start treatment", next: "in-treatment" }],
  "in-treatment": [
    { label: "Admit", next: "admitted" },
    { label: "Discharge", next: "discharged" },
    { label: "Transfer", next: "transferred" },
  ],
  admitted: [],
  discharged: [],
  transferred: [],
}

export const activeEmergencyStatuses: EmergencyStatus[] = ["incoming", "arrived", "in-treatment"]

export const emergencyFilters: { value: EmergencyFilter; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
  { value: "all", label: "All" },
]

export const emergencyGenderOptions = ["Male", "Female", "Other", "Not known"]

// Doctors who can be assigned (available ones from the Doctors section)
export const emergencyDoctorOptions = hospitalDoctors
  .filter((doctor) => doctor.availability === "available")
  .map((doctor) => doctor.name)

export const emptyEmergencyForm: EmergencyCaseFormValues = {
  patient: "", age: "", gender: "Not known", caseType: "", priority: "", complaint: "", arrivalMode: "", ambulanceNo: "",
}

// Placeholder data, replace with real data from the API later
export const hospitalEmergencyCases: EmergencyCase[] = [
  {
    id: "em1", patient: "Arjun Paul", age: 60, gender: "Male", caseType: "accident", priority: "critical",
    complaint: "Road accident, head injury, unconscious", arrivalMode: "ambulance", ambulanceNo: "WB 06 CD 5678",
    reportedAt: "10:40 pm", assignedDoctor: "", status: "incoming",
  },
  {
    id: "em2", patient: "Sumita Ghosh", age: 58, gender: "Female", caseType: "cardiac", priority: "critical",
    complaint: "Severe chest pain, sweating", arrivalMode: "walk-in", ambulanceNo: "",
    reportedAt: "10:15 pm", assignedDoctor: "Dr. Amit Roy", status: "in-treatment",
  },
  {
    id: "em3", patient: "Unknown", gender: "Male", caseType: "breathing", priority: "serious",
    complaint: "Breathing trouble, found on the street", arrivalMode: "ambulance", ambulanceNo: "WB 02 AB 1234",
    reportedAt: "9:50 pm", assignedDoctor: "", status: "arrived",
  },
  {
    id: "em4", patient: "Ritu Sharma", age: 9, gender: "Female", caseType: "burns", priority: "serious",
    complaint: "Hot water burn on the arm", arrivalMode: "walk-in", ambulanceNo: "",
    reportedAt: "9:20 pm", assignedDoctor: "Dr. Leslie Alexander", status: "in-treatment",
  },
  {
    id: "em5", patient: "Manoj Saha", age: 35, gender: "Male", caseType: "accident", priority: "stable",
    complaint: "Fell from bike, wrist pain", arrivalMode: "walk-in", ambulanceNo: "",
    reportedAt: "8:30 pm", assignedDoctor: "Dr. Rakesh Jain", status: "discharged",
  },
  {
    id: "em6", patient: "Gopal Nandi", age: 71, gender: "Male", caseType: "stroke", priority: "critical",
    complaint: "Weakness on the left side, slurred speech", arrivalMode: "referral", ambulanceNo: "",
    reportedAt: "7:45 pm", assignedDoctor: "Dr. Leslie Alexander", status: "admitted",
  },
]