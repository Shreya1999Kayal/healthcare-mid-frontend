import { useState } from "react"
import { Download, Printer } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import BreakdownBars from "../../components/hospital/BreakdownBars"
import ReportKpiCard from "../../components/hospital/ReportKpiCard"
import TopDoctorsTable from "../../components/hospital/TopDoctorsTable"
import TrendChart from "../../components/hospital/TrendChart"
import { hospitalReports, kpiIcons, reportPeriods } from "../../constants/hospitalConstants/hospitalReport.constants"
import { buildReportCsv, downloadCsv } from "../../services/helper/hospitalHelper/hospitalReport.helper"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { ReportPeriod } from "../../types/type/hospitalType/HospitalReport.type"

const ReportsAnalytics = () => {
  const { hospital } = useOutletContext<HospitalOutletContext>()
  const [period, setPeriod] = useState<ReportPeriod>("week")

  const report = hospitalReports[period]
  const periodLabel = reportPeriods.find((option) => option.value === period)?.label ?? ""

  const downloadReport = () => {
    const csv = buildReportCsv(report, periodLabel, hospital.name)
    downloadCsv(`${hospital.name} - ${periodLabel}.csv`, csv)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Reports and analytics</h1>
          <p className="text-sm text-hospital-muted">Patients, beds, appointments and revenue at a glance.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadReport}
            className="flex items-center gap-2 rounded-md bg-hospital-primary px-4 py-2 text-sm font-semibold text-white hover:bg-hospital-primary-dark"
          >
            <Download size={16} /> Download CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-md border border-hospital-primary bg-white px-4 py-2 text-sm font-semibold text-hospital-primary-dark hover:bg-hospital-bg-soft"
          >
            <Printer size={16} /> Print
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {reportPeriods.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setPeriod(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              period === option.value
                ? "bg-hospital-primary text-white"
                : "border border-hospital-border bg-white text-hospital-navy hover:bg-hospital-bg"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Only this part is printed (see .print-area in index.css) */}
      <div className="print-area flex flex-col gap-6">
        <p className="text-sm font-semibold text-hospital-muted">
          {hospital.name} · {periodLabel} · compared with the period before
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {report.kpis.map((kpi) => (
            <ReportKpiCard key={kpi.key} kpi={kpi} icon={kpiIcons[kpi.key]} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <TrendChart title="Appointments and admissions" points={report.trend} />
          </div>
          <BreakdownBars title="Appointment outcomes" items={report.appointmentOutcomes} showShare />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BreakdownBars title="Patients by department" items={report.departments} showShare />
          <BreakdownBars title="Bed occupancy by type" items={report.bedOccupancy} suffix="%" max={100} />
        </div>

        <TopDoctorsTable doctors={report.topDoctors} />
      </div>
    </div>
  )
}

export default ReportsAnalytics