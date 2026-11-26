import { useState } from "react"
import type { FormEvent } from "react"
import BloodBankFormField from "../bloodBank/BloodBankFormField"
import type { CampDonationModalProps } from "../../../types/interface/blood/campInterface/CampDonor.interface"
import { validateCampDonationDate } from "../../../services/helper/blood/campHelper/campDonor.helper"
import { bloodBankCardClass, bloodBankFieldClass, outlineButtonClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"


const CampDonationModal = ({ donor, today, onSave, onClose }: CampDonationModalProps) => {
  const [date, setDate] = useState(today)
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const problem = validateCampDonationDate(date, donor, today)
    setError(problem)
    if (problem) return
    onSave(date)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="donation-title">
      <form onSubmit={handleSubmit} className={`${bloodBankCardClass} flex w-full max-w-sm flex-col gap-4`}>
        <div>
          <h2 id="donation-title" className="text-lg font-bold text-blood-navy">
            Add donation
          </h2>
          <p className="text-sm text-blood-muted">
            {donor.name} · {donor.bloodGroup} · {donor.donations} donations so far
          </p>
        </div>

        <BloodBankFormField label="Donation date" required>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => {
              setDate(e.target.value)
              setError("")
            }}
            className={`${bloodBankFieldClass} w-full`}
          />
        </BloodBankFormField>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" className={primaryButtonClass}>
            Save donation
          </button>
          <button type="button" onClick={onClose} className={outlineButtonClass}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CampDonationModal