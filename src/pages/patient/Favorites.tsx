import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { Phone } from "lucide-react"
import {
  patientCardClass,
  patientDangerButtonClass,
  patientOutlineButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { PATIENT_ALL, patientFavoriteTypeLabels } from "../../constants/patientConstants/patientCare.constants"
import { patientPath } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientFavorite } from "../../types/type/patientType/PatientCare.type"

const Favorites = () => {
  const { patient, favorites, onRemoveFavorite } = useOutletContext<PatientOutletContext>()
  const [favoriteType, setFavoriteType] = useState(PATIENT_ALL)

  const shownFavorites = favorites.filter((item) => favoriteType === PATIENT_ALL || item.favoriteType === favoriteType)
  const tabs = [{ value: PATIENT_ALL, label: "All" }, ...Object.entries(patientFavoriteTypeLabels).map(([value, label]) => ({ value, label }))]

  // Main button of each card
  const getAction = (item: PatientFavorite) => {
    if (item.favoriteType === "doctor") return { label: "Book", to: patientPath("appointments", patient.id) }
    if (item.favoriteType === "hospital") return { label: "View hospital", to: `/hospitals/${item.itemId}` }
    return { label: "Request blood", to: patientPath("bloodRequests", patient.id) }
  }

  const remove = (item: PatientFavorite) => {
    if (!window.confirm(`Remove ${item.name} from saved?`)) return
    onRemoveFavorite(item.id)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Saved</h1>
        <p className="text-sm text-patient-muted">Doctors, hospitals and blood banks you saved from the website.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFavoriteType(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              favoriteType === option.value
                ? "bg-patient-primary text-white"
                : "border border-patient-border bg-white text-patient-navy hover:bg-patient-bg"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {shownFavorites.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>
          Nothing saved here. Use the heart button on the website to save.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownFavorites.map((item) => {
            const action = getAction(item)

            return (
              <article key={item.id} className={`${patientCardClass} flex flex-col gap-3`}>
                <div>
                  <p className="font-bold text-patient-navy">{item.name}</p>
                  <p className="text-sm text-patient-muted">{item.detail}</p>
                </div>
                {/* Logged in, so the contact is shown */}
                <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-sm font-semibold text-patient-primary-dark">
                  <Phone size={16} /> {item.phone}
                </a>
                <div className="flex flex-wrap gap-2">
                  <Link to={action.to} className={patientOutlineButtonClass}>
                    {action.label}
                  </Link>
                  <button type="button" onClick={() => remove(item)} className={patientDangerButtonClass}>
                    Remove
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Favorites
