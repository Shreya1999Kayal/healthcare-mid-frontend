import { Activity, BedDouble, CalendarCheck, IndianRupee, Siren, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { BreakdownItem, HospitalReport, KpiKey, ReportPeriod } from "../../types/type/hospitalType/HospitalReport.type"

export const reportPeriods: { value: ReportPeriod; label: string }[] = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "Last 6 months" },
]

export const kpiIcons: Record<KpiKey, LucideIcon> = {
  patients: Users,
  appointments: CalendarCheck,
  admissions: BedDouble,
  emergency: Siren,
  occupancy: Activity,
  revenue: IndianRupee,
}

const outcomeColors = {
  completed: "bg-emerald-500",
  rescheduled: "bg-sky-500",
  cancelled: "bg-red-500",
  noShow: "bg-slate-400",
}

const outcomes = (completed: number, rescheduled: number, cancelled: number, noShow: number): BreakdownItem[] => [
  { label: "Completed", value: completed, colorClass: outcomeColors.completed },
  { label: "Rescheduled", value: rescheduled, colorClass: outcomeColors.rescheduled },
  { label: "Cancelled", value: cancelled, colorClass: outcomeColors.cancelled },
  { label: "No-show", value: noShow, colorClass: outcomeColors.noShow },
]

// Placeholder numbers, replace with real data from the API later
export const hospitalReports: Record<ReportPeriod, HospitalReport> = {
  week: {
    kpis: [
      { key: "patients", label: "Patients seen", value: 1240, previous: 1180, format: "number" },
      { key: "appointments", label: "Appointments", value: 486, previous: 452, format: "number" },
      { key: "admissions", label: "Admissions", value: 92, previous: 98, format: "number" },
      { key: "emergency", label: "Emergency cases", value: 64, previous: 58, format: "number" },
      { key: "occupancy", label: "Bed occupancy", value: 78, previous: 74, format: "percent" },
      { key: "revenue", label: "Revenue", value: 4850000, previous: 4520000, format: "currency" },
    ],
    trend: [
      { label: "Mon", appointments: 82, admissions: 15 },
      { label: "Tue", appointments: 76, admissions: 12 },
      { label: "Wed", appointments: 70, admissions: 14 },
      { label: "Thu", appointments: 88, admissions: 18 },
      { label: "Fri", appointments: 74, admissions: 13 },
      { label: "Sat", appointments: 64, admissions: 11 },
      { label: "Sun", appointments: 32, admissions: 9 },
    ],
    departments: [
      { label: "General Medicine", value: 420 },
      { label: "Cardiology", value: 260 },
      { label: "Paediatrics", value: 210 },
      { label: "Orthopaedics", value: 160 },
      { label: "Gynaecology", value: 120 },
      { label: "Dermatology", value: 70 },
    ],
    appointmentOutcomes: outcomes(392, 38, 41, 15),
    bedOccupancy: [
      { label: "General ward", value: 72 },
      { label: "Semi-private", value: 70 },
      { label: "Private room", value: 70 },
      { label: "ICU", value: 95 },
      { label: "NICU", value: 60 },
      { label: "Emergency", value: 60 },
    ],
    topDoctors: [
      { name: "Dr. Leslie Alexander", department: "General Medicine", patients: 148, rating: 4.8 },
      { name: "Dr. Amit Roy", department: "Cardiology", patients: 112, rating: 4.9 },
      { name: "Dr. Kavita Shah", department: "Paediatrics", patients: 96, rating: 4.7 },
      { name: "Dr. Rakesh Jain", department: "Orthopaedics", patients: 74, rating: 4.6 },
      { name: "Dr. Sourav Pal", department: "Cardiology", patients: 61, rating: 4.5 },
    ],
  },
  month: {
    kpis: [
      { key: "patients", label: "Patients seen", value: 5320, previous: 4980, format: "number" },
      { key: "appointments", label: "Appointments", value: 2045, previous: 1930, format: "number" },
      { key: "admissions", label: "Admissions", value: 410, previous: 385, format: "number" },
      { key: "emergency", label: "Emergency cases", value: 268, previous: 290, format: "number" },
      { key: "occupancy", label: "Bed occupancy", value: 76, previous: 72, format: "percent" },
      { key: "revenue", label: "Revenue", value: 20500000, previous: 19100000, format: "currency" },
    ],
    trend: [
      { label: "Week 1", appointments: 480, admissions: 98 },
      { label: "Week 2", appointments: 525, admissions: 104 },
      { label: "Week 3", appointments: 554, admissions: 116 },
      { label: "Week 4", appointments: 486, admissions: 92 },
    ],
    departments: [
      { label: "General Medicine", value: 1810 },
      { label: "Cardiology", value: 1120 },
      { label: "Paediatrics", value: 905 },
      { label: "Orthopaedics", value: 690 },
      { label: "Gynaecology", value: 505 },
      { label: "Dermatology", value: 290 },
    ],
    appointmentOutcomes: outcomes(1650, 160, 170, 65),
    bedOccupancy: [
      { label: "General ward", value: 70 },
      { label: "Semi-private", value: 68 },
      { label: "Private room", value: 66 },
      { label: "ICU", value: 92 },
      { label: "NICU", value: 64 },
      { label: "Emergency", value: 58 },
    ],
    topDoctors: [
      { name: "Dr. Leslie Alexander", department: "General Medicine", patients: 612, rating: 4.8 },
      { name: "Dr. Amit Roy", department: "Cardiology", patients: 478, rating: 4.9 },
      { name: "Dr. Kavita Shah", department: "Paediatrics", patients: 402, rating: 4.7 },
      { name: "Dr. Rakesh Jain", department: "Orthopaedics", patients: 315, rating: 4.6 },
      { name: "Dr. Nisha Verma", department: "Dermatology", patients: 240, rating: 4.4 },
    ],
  },
  year: {
    kpis: [
      { key: "patients", label: "Patients seen", value: 30450, previous: 28800, format: "number" },
      { key: "appointments", label: "Appointments", value: 11820, previous: 11050, format: "number" },
      { key: "admissions", label: "Admissions", value: 2380, previous: 2290, format: "number" },
      { key: "emergency", label: "Emergency cases", value: 1610, previous: 1555, format: "number" },
      { key: "occupancy", label: "Bed occupancy", value: 74, previous: 71, format: "percent" },
      { key: "revenue", label: "Revenue", value: 118000000, previous: 109500000, format: "currency" },
    ],
    trend: [
      { label: "Jun", appointments: 1820, admissions: 372 },
      { label: "Jul", appointments: 1905, admissions: 390 },
      { label: "Aug", appointments: 2010, admissions: 405 },
      { label: "Sep", appointments: 1960, admissions: 398 },
      { label: "Oct", appointments: 2080, admissions: 405 },
      { label: "Nov", appointments: 2045, admissions: 410 },
    ],
    departments: [
      { label: "General Medicine", value: 10380 },
      { label: "Cardiology", value: 6450 },
      { label: "Paediatrics", value: 5210 },
      { label: "Orthopaedics", value: 3960 },
      { label: "Gynaecology", value: 2840 },
      { label: "Dermatology", value: 1610 },
    ],
    appointmentOutcomes: outcomes(9580, 910, 960, 370),
    bedOccupancy: [
      { label: "General ward", value: 69 },
      { label: "Semi-private", value: 66 },
      { label: "Private room", value: 64 },
      { label: "ICU", value: 90 },
      { label: "NICU", value: 62 },
      { label: "Emergency", value: 57 },
    ],
    topDoctors: [
      { name: "Dr. Leslie Alexander", department: "General Medicine", patients: 3560, rating: 4.8 },
      { name: "Dr. Amit Roy", department: "Cardiology", patients: 2790, rating: 4.9 },
      { name: "Dr. Kavita Shah", department: "Paediatrics", patients: 2310, rating: 4.7 },
      { name: "Dr. Rakesh Jain", department: "Orthopaedics", patients: 1880, rating: 4.6 },
      { name: "Dr. Sourav Pal", department: "Cardiology", patients: 1420, rating: 4.5 },
    ],
  },
}