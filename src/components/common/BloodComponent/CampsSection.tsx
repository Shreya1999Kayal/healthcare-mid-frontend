import { useMemo, useState } from "react"
import { campViews, bloodCamps } from "../../../constants/public/bloods.constants"
import { getCampOrganiser } from "../../../services/helper/public/blood.helper"
import type { BloodCamp, CampView } from "../../../types/type/public/Blood.type"
import CampCard from "./CampCard"
import CampDetailsModal from "./CampDetailsModal"
import SwitchTabs from "./SwitchTabs"

const CampsSection = () => {
  const [view, setView] = useState<CampView>("upcoming")
  const [selectedCamp, setSelectedCamp] = useState<BloodCamp | null>(null)

  // Upcoming: nearest date first. Existing: latest camp first.
  const camps = useMemo(() => {
    const list = bloodCamps.filter((camp) => camp.status === view)
    return list.sort((a, b) => (view === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)))
  }, [view])

  const selectedOrganiser = selectedCamp ? getCampOrganiser(selectedCamp.organiserId) : undefined

  return (
    <div className="flex flex-col gap-6">
      <SwitchTabs options={campViews} value={view} onChange={setView} />

      <div className="grid gap-5 md:grid-cols-2">
        {camps.map((camp) => (
          <CampCard
            key={camp.id}
            camp={camp}
            organiser={getCampOrganiser(camp.organiserId)}
            onViewDetails={setSelectedCamp}
          />
        ))}
      </div>

      {selectedCamp && selectedOrganiser && (
        <CampDetailsModal camp={selectedCamp} organiser={selectedOrganiser} onClose={() => setSelectedCamp(null)} />
      )}
    </div>
  )
}

export default CampsSection