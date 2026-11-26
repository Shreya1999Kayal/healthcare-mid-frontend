import { useMemo, useState } from "react"
import { ALL_GROUPS, bloodGroups } from "../../../constants/public/bloods.constants"
import { donorsList } from "../../../constants/public/donors.constants"
import { isEligibleDonor } from "../../../services/helper/public/blood.helper"
import type { BloodGroup } from "../../../types/type/public/Blood.type"
import DonorCard from "./DonorCard"

const DonorsSection = () => {
  const [group, setGroup] = useState<BloodGroup | typeof ALL_GROUPS>(ALL_GROUPS)

  // Only eligible donors are shown
  const donors = useMemo(
    () =>
      donorsList.filter(
        (donor) => isEligibleDonor(donor) && (group === ALL_GROUPS || donor.bloodGroup === group),
      ),
    [group],
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap gap-2">
          {[ALL_GROUPS, ...bloodGroups].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGroup(item as BloodGroup | typeof ALL_GROUPS)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                item === group
                  ? "border-medical-primary bg-medical-bg-soft text-medical-primary-dark"
                  : "border-medical-border bg-white text-medical-navy hover:bg-medical-bg-soft/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-medical-muted">
          Showing {donors.length} eligible donors. Donors who gave blood in the last 90 days are not listed.
        </p>
      </div>

      {donors.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-medical-muted">
          No eligible donors found for this blood group right now.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DonorsSection