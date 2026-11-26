import { donorCardClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import type { DonorSummaryCardProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"


const DonorSummaryCard = ({ label, value, hint, icon: Icon }: DonorSummaryCardProps) => {
  return (
    <article className={`${donorCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-blood-primary from-47% to-blood-accent text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-blood-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-blood-navy">{label}</p>
        <p className="text-xs text-blood-muted">{hint}</p>
      </div>
    </article>
  )
}

export default DonorSummaryCard