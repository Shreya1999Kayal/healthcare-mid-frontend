import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Plus, X } from "lucide-react"
import DoctorFormField from "./DoctorFormField"
import MedicineRow from "./MedicineRow"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { initialPrescriptionForm } from "../../constants/doctorConstants/doctorPrescriptions.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { createEmptyMedicine, getDefaultChamber } from "../../services/helper/doctorHelper/doctorPrescriptions.helper"
import type { MedicineRowProps, PrescriptionFormProps } from "../../types/interface/doctorInterface/DoctorPrescriptions.interface"
import type { PrescriptionFormValues, PrescriptionMedicine } from "../../types/type/doctorType/DoctorPrescriptions.type"

const inputClass = `${doctorFieldClass} w-full`

const PrescriptionForm = ({ patients, chambers, appointments, initialPatientId, onSave, onCancel }: PrescriptionFormProps) => {
  const [form, setForm] = useState<PrescriptionFormValues>({
    ...initialPrescriptionForm,
    patientId: initialPatientId,
    chamberId: getDefaultChamber(initialPatientId, appointments),
  })
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>(() => [createEmptyMedicine()])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // picking a patient also picks their chamber
      ...(name === "patientId" ? { chamberId: getDefaultChamber(value, appointments) } : {}),
    }))
  }

  const changeMedicine: MedicineRowProps["onChange"] = (medicineId, field, value) =>
    setMedicines((prev) =>
      prev.map((medicine): PrescriptionMedicine => (medicine.id === medicineId ? { ...medicine, [field]: value } : medicine)),
    )

  const addMedicine = () => setMedicines((prev) => [...prev, createEmptyMedicine()])
  const removeMedicine = (medicineId: string) => setMedicines((prev) => prev.filter((medicine) => medicine.id !== medicineId))

  // UI only: the page adds it to the list
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const patient = patients.find((item) => item.id === form.patientId)
    if (!patient) return

    onSave({
      id: `rx-${Date.now()}`,
      patientId: patient.id,
      patient: patient.name,
      age: patient.age,
      gender: patient.gender,
      chamberId: form.chamberId,
      date: formatIsoDate(DOCTOR_TODAY),
      diagnosis: form.diagnosis,
      medicines,
      advice: form.advice,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={`${doctorCardClass} flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-doctor-navy">New prescription</h2>
        <button type="button" onClick={onCancel} aria-label="Close form" className="rounded-full p-1 text-doctor-muted hover:bg-doctor-bg">
          <X size={20} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DoctorFormField label="Patient" required>
          <select name="patientId" value={form.patientId} onChange={handleChange} required className={inputClass}>
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </DoctorFormField>
        <DoctorFormField label="Chamber" required>
          <select name="chamberId" value={form.chamberId} onChange={handleChange} required className={inputClass}>
            <option value="">Select chamber</option>
            {chambers.map((chamber) => (
              <option key={chamber.id} value={chamber.id}>
                {chamber.hospital}
              </option>
            ))}
          </select>
        </DoctorFormField>
        <DoctorFormField label="Diagnosis" required>
          <input name="diagnosis" value={form.diagnosis} onChange={handleChange} required className={inputClass} />
        </DoctorFormField>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-doctor-navy">Medicines</p>
        {medicines.map((medicine, index) => (
          <MedicineRow
            key={medicine.id}
            medicine={medicine}
            index={index}
            canRemove={medicines.length > 1}
            onChange={changeMedicine}
            onRemove={removeMedicine}
          />
        ))}
        <button
          type="button"
          onClick={addMedicine}
          className="flex w-fit items-center gap-2 rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft"
        >
          <Plus size={16} /> Add medicine
        </button>
      </div>

      <DoctorFormField label="General advice">
        <textarea name="advice" value={form.advice} onChange={handleChange} rows={3} placeholder="Diet, rest, when to come back" className={inputClass} />
      </DoctorFormField>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          Save prescription
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-doctor-border px-5 py-2.5 text-sm font-semibold text-doctor-navy hover:bg-doctor-bg">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PrescriptionForm