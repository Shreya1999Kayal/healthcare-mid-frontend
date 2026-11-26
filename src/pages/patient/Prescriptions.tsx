import { useState } from "react"
import { Pill } from "lucide-react"
import PatientPrescriptionModal from "../../components/patient/PatientPrescriptionModal"
import { patientCardClass, patientPrimaryButtonClass } from "../../constants/patientConstants/patientDashboard.constants"
import { patientPrescriptions } from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate } from "../../services/helper/patientHelper/patientDashboard.helper"

// Read only: written by doctors after a visit
const Prescriptions = () => {
  const [openId, setOpenId] = useState("")

  const shownPrescriptions = [...patientPrescriptions].sort((a, b) => b.date.localeCompare(a.date))
  const openPrescription = patientPrescriptions.find((prescription) => prescription.id === openId)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Prescriptions</h1>
        <p className="text-sm text-patient-muted">Prescriptions from your doctors. Open one to print it.</p>
      </div>

      {shownPrescriptions.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>No prescriptions yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownPrescriptions.map((prescription) => (
            <article key={prescription.id} className={`${patientCardClass} flex flex-col gap-3`}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-patient-bg-soft text-patient-primary-dark">
                  <Pill size={20} />
                </span>
                <div>
                  <p className="font-bold text-patient-navy">{prescription.doctor}</p>
                  <p className="text-sm text-patient-muted">
                    {prescription.speciality} · {formatPatientDate(prescription.date)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-patient-navy">
                <span className="font-semibold">Diagnosis:</span> {prescription.diagnosis}
              </p>
              <p className="text-sm text-patient-muted">{prescription.medicines.length} medicines</p>
              <button type="button" onClick={() => setOpenId(prescription.id)} className={`${patientPrimaryButtonClass} self-start`}>
                View and print
              </button>
            </article>
          ))}
        </div>
      )}

      {openPrescription && <PatientPrescriptionModal prescription={openPrescription} onClose={() => setOpenId("")} />}
    </div>
  )
}

export default Prescriptions
