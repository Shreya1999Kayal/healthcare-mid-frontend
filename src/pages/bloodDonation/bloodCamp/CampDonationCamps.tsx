import { useState } from "react"
import { Plus } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import { getCampOrganiser } from "../../../services/helper/public/blood.helper"
import { campEvents, campViewOptions } from "../../../constants/blood/campConstants/campEvent.constants"
import type { CampEvent, CampEventFormValues } from "../../../types/type/blood/campType/CampEvent.type"
import { BLOOD_BANK_TODAY, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { buildCampEvent, filterCampEvents, getCampView } from "../../../services/helper/blood/campHelper/campEvent.helper"
import type { CampView } from "../../../types/type/public/Blood.type"
import CampOrganiserInfo from "../../../components/bloodDonation/bloodCamp/CampOrganiserInfo"
import BloodBankFilterTabs from "../../../components/bloodDonation/bloodBank/BloodBankFilterTabs"
import BloodBankEmptyState from "../../../components/bloodDonation/bloodBank/BloodBankEmptyState"
import CampEventCard from "../../../components/bloodDonation/bloodCamp/CampEventCard"
import CampEventForm from "../../../components/bloodDonation/bloodCamp/CampEventForm"


const CampDonationCamps = () => {
  const { bank } = useOutletContext<BloodBankOutletContext>()
  const organiserId = bank.organiserId ?? ""
  const organiser = getCampOrganiser(organiserId)

  // Local copy (UI only, nothing is saved)
  const [camps, setCamps] = useState<CampEvent[]>(() => campEvents[organiserId] ?? [])
  const [view, setView] = useState<CampView>("upcoming")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<CampEvent | null>(null)
  const [message, setMessage] = useState("")

  const shownCamps = filterCampEvents(camps, view, BLOOD_BANK_TODAY)
  const tabs = campViewOptions.map((option) => ({ ...option, count: filterCampEvents(camps, option.value, BLOOD_BANK_TODAY).length }))

  const openNew = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (camp: CampEvent) => {
    setEditing(camp)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const saveCamp = (values: CampEventFormValues) => {
    const saved = editing
      ? buildCampEvent(values, editing.id, editing.registrations)
      : buildCampEvent(values, `ce${Date.now()}`, 0)

    setCamps((prev) => (editing ? prev.map((camp) => (camp.id === editing.id ? saved : camp)) : [saved, ...prev]))
    setMessage(editing ? "Camp updated." : "Camp created.")
    setView(getCampView(saved, BLOOD_BANK_TODAY)) // show the tab the camp is in
    closeForm()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Donation camps</h1>
          <p className="text-sm text-blood-muted">Plan new camps and record how many units each camp collected.</p>
        </div>
        <button type="button" onClick={openNew} className={`${primaryButtonClass} flex items-center gap-2`}>
          <Plus size={16} /> New camp
        </button>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {organiser && <CampOrganiserInfo organiser={organiser} />}

      <BloodBankFilterTabs options={tabs} value={view} onChange={setView} />

      {shownCamps.length === 0 ? (
        <BloodBankEmptyState
          title={view === "upcoming" ? "No upcoming camps" : "No past camps"}
          message={view === "upcoming" ? "Create a camp to get started." : "Camps show here after they are held."}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownCamps.map((camp) => (
            <CampEventCard key={camp.id} camp={camp} today={BLOOD_BANK_TODAY} onEdit={openEdit} />
          ))}
        </div>
      )}

      {formOpen && <CampEventForm camp={editing} today={BLOOD_BANK_TODAY} onSave={saveCamp} onClose={closeForm} />}
    </div>
  )
}

export default CampDonationCamps