import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CalendarCheck, CalendarDays, CircleAlert } from "lucide-react"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import DoctorTabs from "../../components/doctor/DoctorTabs"
import FollowUpCard from "../../components/doctor/FollowUpCard"
import SummaryCard from "../../components/doctor/SummaryCard"
import { doctorChambers } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorFollowUps, followUpTabs } from "../../constants/doctorConstants/doctorFollowUps.constants"
import { filterByChamber, getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { matchesFollowUpFilter, sortByDueDate } from "../../services/helper/doctorHelper/doctorFollowUps.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { DoctorFollowUp, FollowUpFilter } from "../../types/type/doctorType/DoctorFollowUps.type"

const DoctorFollowUps = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()

  // Local copy so the buttons update the cards (UI only, nothing is saved)
  const [followUps, setFollowUps] = useState<DoctorFollowUp[]>(doctorFollowUps)
  const [filter, setFilter] = useState<FollowUpFilter>("today")

  const chamberFollowUps = filterByChamber(followUps, chamberId)
  const visibleFollowUps = sortByDueDate(chamberFollowUps.filter((followUp) => matchesFollowUpFilter(followUp, filter)))
  const countOf = (id: FollowUpFilter) => chamberFollowUps.filter((followUp) => matchesFollowUpFilter(followUp, id)).length
  const tabs = followUpTabs.map((tab) => ({ ...tab, count: countOf(tab.id) }))

  const updateFollowUp = (id: string, changes: Partial<DoctorFollowUp>) =>
    setFollowUps((prev) => prev.map((followUp) => (followUp.id === id ? { ...followUp, ...changes } : followUp)))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Follow-ups</h1>
        <p className="text-sm text-doctor-muted">Patients you asked to come back.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Due today" value={countOf("today")} hint="Should visit today" icon={CalendarCheck} />
        <SummaryCard label="This week" value={countOf("week")} hint="Next 7 days" icon={CalendarDays} />
        <SummaryCard label="Overdue" value={countOf("overdue")} hint="Missed the date" icon={CircleAlert} />
      </div>

      <DoctorTabs options={tabs} value={filter} onChange={setFilter} />

      {visibleFollowUps.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleFollowUps.map((followUp) => (
            <FollowUpCard
              key={followUp.id}
              followUp={followUp}
              chamberName={getChamberName(doctorChambers, followUp.chamberId)}
              onRemind={(id) => updateFollowUp(id, { status: "reminded" })}
              onReschedule={(id, dueDate) => updateFollowUp(id, { dueDate, status: "due" })}
              onDone={(id) => updateFollowUp(id, { status: "done" })}
            />
          ))}
        </div>
      ) : (
        <DoctorEmptyState title="Nothing here" message="No follow-ups in this list for the chosen chamber." />
      )}
    </div>
  )
}

export default DoctorFollowUps