import type { ChangeEvent } from "react"
import { Trash2 } from "lucide-react"
import DoctorFormField from "./DoctorFormField"
import { doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { medicineFrequencies } from "../../constants/doctorConstants/doctorPrescriptions.constants"
import type { MedicineRowProps } from "../../types/interface/doctorInterface/DoctorPrescriptions.interface"
import type { MedicineField } from "../../types/type/doctorType/DoctorPrescriptions.type"

const inputClass = `${doctorFieldClass} w-full`

const MedicineRow = ({ medicine, index, canRemove, onChange, onRemove }: MedicineRowProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(medicine.id, e.target.name as MedicineField, e.target.value)
  }

  return (
    <div className="grid gap-3 rounded-xl border border-doctor-border p-3 md:grid-cols-[1.6fr_1fr_1.3fr_1fr_1.4fr_auto] md:items-end">
      <DoctorFormField label={`Medicine ${index + 1}`} required>
        <input name="name" value={medicine.name} onChange={handleChange} required placeholder="e.g. Paracetamol 650 mg" className={inputClass} />
      </DoctorFormField>
      <DoctorFormField label="Dosage" required>
        <input name="dosage" value={medicine.dosage} onChange={handleChange} required placeholder="1 tablet" className={inputClass} />
      </DoctorFormField>
      <DoctorFormField label="Frequency">
        <select name="frequency" value={medicine.frequency} onChange={handleChange} className={inputClass}>
          {medicineFrequencies.map((frequency) => (
            <option key={frequency} value={frequency}>
              {frequency}
            </option>
          ))}
        </select>
      </DoctorFormField>
      <DoctorFormField label="Duration" required>
        <input name="duration" value={medicine.duration} onChange={handleChange} required placeholder="5 days" className={inputClass} />
      </DoctorFormField>
      <DoctorFormField label="Instructions">
        <input name="instructions" value={medicine.instructions} onChange={handleChange} placeholder="After food" className={inputClass} />
      </DoctorFormField>
      <button
        type="button"
        onClick={() => onRemove(medicine.id)}
        disabled={!canRemove}
        aria-label={`Remove medicine ${index + 1}`}
        className="flex h-10 items-center justify-center rounded-md border border-red-200 px-3 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default MedicineRow