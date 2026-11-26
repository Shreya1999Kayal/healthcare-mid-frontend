export type ReportPeriod = "week" | "month" | "year"

export type KpiFormat = "number" | "percent" | "currency"

export type KpiKey = "patients" | "appointments" | "admissions" | "emergency" | "occupancy" | "revenue"

export type ReportKpi = {
  key: KpiKey
  label: string
  value: number
  previous: number // same number for the period before
  format: KpiFormat
}

export type TrendPoint = {
  label: string // "Mon", "Week 1", "Jun" ...
  appointments: number
  admissions: number
}

export type BreakdownItem = {
  label: string
  value: number
  colorClass?: string // bar colour, e.g. "bg-emerald-500"
}

export type TopDoctor = {
  name: string
  department: string
  patients: number
  rating: number
}

export type HospitalReport = {
  kpis: ReportKpi[]
  trend: TrendPoint[]
  departments: BreakdownItem[]
  appointmentOutcomes: BreakdownItem[]
  bedOccupancy: BreakdownItem[] // value is % full
  topDoctors: TopDoctor[]
}

export type KpiChange = {
  percent: number // always positive
  up: boolean
}