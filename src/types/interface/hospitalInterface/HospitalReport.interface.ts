import type { LucideIcon } from "lucide-react"
import type { BreakdownItem, ReportKpi, TopDoctor, TrendPoint } from "../../type/hospitalType/HospitalReport.type"

export interface ReportKpiCardProps {
  kpi: ReportKpi
  icon: LucideIcon
}

export interface TrendChartProps {
  title: string
  points: TrendPoint[]
}

export interface BreakdownBarsProps {
  title: string
  items: BreakdownItem[]
  suffix?: string // text after the value, e.g. "%"
  max?: number // full bar width; default = biggest value
  showShare?: boolean // show "% of total" next to the value
}

export interface TopDoctorsTableProps {
  doctors: TopDoctor[]
}