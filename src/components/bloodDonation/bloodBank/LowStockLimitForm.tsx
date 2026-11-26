import { useState } from "react"
import type { FormEvent } from "react"
import BloodBankFormField from "./BloodBankFormField"
import { bloodBankFieldClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { validateLowStockLimit } from "../../../services/helper/blood/bloodBankHelper/bloodBankSettings.helper"
import type { LowStockLimitFormProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankSettings.interface"

const LowStockLimitForm = ({ limit, onSave }: LowStockLimitFormProps) => {
  const [value, setValue] = useState(String(limit))
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const problem = validateLowStockLimit(value)
    setError(problem)
    if (problem) return
    onSave(Number(value))
    setSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xs flex-col gap-3">
      <BloodBankFormField label="Show 'Low stock' at or below (units)" required>
        <input
          type="number"
          min={1}
          max={50}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setSaved(false)
          }}
          className={`${bloodBankFieldClass} w-full`}
        />
      </BloodBankFormField>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {saved && <p className="text-sm font-semibold text-emerald-700">Low-stock limit saved.</p>}
      <button type="submit" className={`${primaryButtonClass} w-fit`}>
        Save limit
      </button>
    </form>
  )
}

export default LowStockLimitForm