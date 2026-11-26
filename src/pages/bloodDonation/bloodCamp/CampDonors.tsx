import { useState } from "react"
import { Search } from "lucide-react"
import type { Donor } from "../../../types/type/public/Donor.type"
import { ALL_GROUPS, bloodGroups} from "../../../constants/public/bloods.constants"
import { donorsList } from "../../../constants/public/donors.constants"
import type { CampDonorFilter, CampDonorRow } from "../../../types/type/blood/campType/CampDonor.type"
import { buildCampDonorRows, filterCampDonors, searchCampDonors } from "../../../services/helper/blood/campHelper/campDonor.helper"
import { campDonorFilters } from "../../../constants/blood/campConstants/campDonor.constants"
import { BLOOD_BANK_TODAY, bloodBankFieldClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import BloodBankFilterTabs from "../../../components/bloodDonation/bloodBank/BloodBankFilterTabs"
import BloodBankEmptyState from "../../../components/bloodDonation/bloodBank/BloodBankEmptyState"
import CampDonorTable from "../../../components/bloodDonation/bloodCamp/CampDonorTable"
import CampDonationModal from "../../../components/bloodDonation/bloodCamp/CampDonationModal"


const CampDonors = () => {
  // Starts from the public donorsList (UI only, nothing is saved)
  const [donors, setDonors] = useState<Donor[]>(donorsList)
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState<string>(ALL_GROUPS)
  const [filter, setFilter] = useState<CampDonorFilter>("all")
  const [adding, setAdding] = useState<CampDonorRow | null>(null)
  const [message, setMessage] = useState("")

  const rows = buildCampDonorRows(donors, BLOOD_BANK_TODAY)
  const searched = searchCampDonors(rows, search, group)
  const shownRows = filterCampDonors(searched, filter)
  const tabs = campDonorFilters.map((option) => ({ ...option, count: filterCampDonors(searched, option.value).length }))

  // A new donation updates the last donated date and the count, so eligibility changes straight away
  const saveDonation = (date: string) => {
    if (!adding) return
    setDonors((prev) => prev.map((donor) => (donor.id === adding.id ? { ...donor, lastDonated: date, donations: donor.donations + 1 } : donor)))
    setMessage(`Donation added for ${adding.name}.`)
    setAdding(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Donors</h1>
        <p className="text-sm text-blood-muted">Donors can give blood again 90 days after their last donation.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blood-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or city"
            aria-label="Search donors"
            className={`${bloodBankFieldClass} w-full pl-9`}
          />
        </label>
        <select value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Blood group" className={bloodBankFieldClass}>
          <option value={ALL_GROUPS}>All blood groups</option>
          {bloodGroups.map((bloodGroup) => (
            <option key={bloodGroup} value={bloodGroup}>
              {bloodGroup}
            </option>
          ))}
        </select>
      </div>

      <BloodBankFilterTabs options={tabs} value={filter} onChange={setFilter} />

      {shownRows.length === 0 ? (
        <BloodBankEmptyState title="No donors found" message="Try another name, city or blood group." />
      ) : (
        <CampDonorTable rows={shownRows} onAddDonation={setAdding} />
      )}

      {adding && <CampDonationModal donor={adding} today={BLOOD_BANK_TODAY} onSave={saveDonation} onClose={() => setAdding(null)} />}
    </div>
  )
}

export default CampDonors