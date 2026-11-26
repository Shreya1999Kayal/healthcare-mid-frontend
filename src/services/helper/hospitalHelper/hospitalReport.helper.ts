import type { HospitalReport, KpiChange, KpiFormat } from "../../../types/type/hospitalType/HospitalReport.type"

// 4850000 -> "₹48,50,000", 78 -> "78%", 1240 -> "1,240"
export const formatKpiValue = (value: number, format: KpiFormat) => {
  if (format === "currency") return `₹${value.toLocaleString("en-IN")}`
  if (format === "percent") return `${value}%`
  return value.toLocaleString("en-IN")
}

// Change from the previous period, e.g. 1240 vs 1180 -> { percent: 5, up: true }
export const getChange = (value: number, previous: number): KpiChange => {
  if (previous === 0) return { percent: 0, up: true }
  const percent = Math.round(((value - previous) / previous) * 100)
  return { percent: Math.abs(percent), up: percent >= 0 }
}

// Share of the total, e.g. 420 of 1240 -> 34
export const getShare = (value: number, total: number) => (total === 0 ? 0 : Math.round((value / total) * 100))

// Puts every cell in quotes so commas inside text don't break the file
const toCsvRow = (cells: (string | number)[]) => cells.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")

export const buildReportCsv = (report: HospitalReport, periodLabel: string, hospitalName: string) => {
  const rows: (string | number)[][] = [
    [`${hospitalName} report`, periodLabel],
    [],
    ["Metric", "This period", "Previous period", "Change %"],
    ...report.kpis.map((kpi) => {
      const change = getChange(kpi.value, kpi.previous)
      return [kpi.label, kpi.value, kpi.previous, `${change.up ? "" : "-"}${change.percent}`]
    }),
    [],
    ["Trend", "Appointments", "Admissions"],
    ...report.trend.map((point) => [point.label, point.appointments, point.admissions]),
    [],
    ["Department", "Patients"],
    ...report.departments.map((item) => [item.label, item.value]),
    [],
    ["Appointment outcome", "Count"],
    ...report.appointmentOutcomes.map((item) => [item.label, item.value]),
    [],
    ["Bed type", "Occupancy %"],
    ...report.bedOccupancy.map((item) => [item.label, item.value]),
    [],
    ["Doctor", "Department", "Patients", "Rating"],
    ...report.topDoctors.map((doctor) => [doctor.name, doctor.department, doctor.patients, doctor.rating]),
  ]

  return rows.map(toCsvRow).join("\n")
}

// Saves the text as a .csv file in the browser
export const downloadCsv = (fileName: string, csv: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}