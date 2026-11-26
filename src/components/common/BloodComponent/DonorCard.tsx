import { Link } from "react-router-dom"
import { formatCampDate } from "../../../services/helper/public/blood.helper"
import type { DonorCardProps } from "../../../types/interface/public/Donor.interface"


const DonorCard = ({ donor }: DonorCardProps) => {
  return (
    <article className="flex flex-col rounded-2xl border border-medical-border bg-white p-5 shadow-sm shadow-medical-navy/5">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-red-400 to-red-600 text-lg font-extrabold text-white">
          {donor.bloodGroup}
        </span>
        <div>
          <h3 className="text-lg font-bold text-medical-navy">{donor.name}</h3>
          <p className="text-sm text-medical-muted">{donor.city}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-medical-muted">
        {donor.lastDonated ? `Last donated: ${formatCampDate(donor.lastDonated)}` : "First-time donor"}
        {donor.donations > 0 && ` · ${donor.donations} donations`}
      </p>

      <span className="mt-3 w-fit rounded-full bg-medical-bg-soft px-3 py-1 text-xs font-semibold text-medical-primary-dark">
        Eligible to donate
      </span>

      {/* No phone or email shown, so donor details stay private */}
      <Link
        to="/login"
        className="mt-5 block rounded-md bg-medical-bg-soft px-4 py-3 text-center text-sm font-semibold text-medical-navy no-underline transition-colors hover:bg-medical-border"
      >
        Login to contact
      </Link>
    </article>
  )
}

export default DonorCard