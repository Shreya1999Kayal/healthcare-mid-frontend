import DonorAvatar from "../../../components/bloodDonation/bloodDonor/DonorAvatar"
import type { DonorTopbarProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"


const DonorTopbar = ({ donor }: DonorTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-blood-border bg-white px-4 py-3 md:px-8">
      <div>
        <p className="text-sm font-bold text-blood-navy">Donor dashboard</p>
        <p className="text-xs text-blood-muted">{donor.city}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-blood-bg-soft px-3 py-1 text-sm font-bold text-blood-primary-dark">{donor.bloodGroup}</span>
        <DonorAvatar name={donor.name} />
        <p className="hidden text-sm font-semibold text-blood-navy sm:block">{donor.name}</p>
      </div>
    </header>
  )
}

export default DonorTopbar