import { useState } from "react"
import { useOutletContext, useSearchParams } from "react-router-dom"
import ConsultationForm from "../../components/doctor/ConsultationForm"
import ConsultationPatientList from "../../components/doctor/ConsultationPatientList"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import PastConsultations from "../../components/doctor/PastConsultations"
import PatientSummary from "../../components/doctor/PatientSummary"
import { doctorAppointments, doctorChambers } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorConsultations } from "../../constants/doctorConstants/doctorConsultations.constants"
import { doctorPatients } from "../../constants/doctorConstants/doctorPatients.constants"
import { filterByChamber, formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getConsultableAppointments, getPatientConsultations, splitList } from "../../services/helper/doctorHelper/doctorConsultations.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { DoctorAppointment } from "../../types/type/doctorType/DoctorDashboard.type"
import type { ConsultationFormValues, DoctorConsultation } from "../../types/type/doctorType/DoctorConsultations.type"

const DoctorConsultations = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()
  // ?appointment=a3 opens that patient (used by "Start consultation" on the dashboard)
  const [searchParams, setSearchParams] = useSearchParams()

  // Local copies (UI only, nothing is saved)
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(doctorAppointments)
  const [consultations, setConsultations] = useState<DoctorConsultation[]>(doctorConsultations)
  const [message, setMessage] = useState("")

  const todayPatients = getConsultableAppointments(appointments, chamberId)
  const selected = todayPatients.find((appointment) => appointment.id === searchParams.get("appointment")) ?? todayPatients[0]
  const patient = doctorPatients.find((item) => item.id === selected?.patientId)

  const selectAppointment = (appointmentId: string) => {
    setMessage("")
    setSearchParams({ appointment: appointmentId }, { replace: true })
  }

  const completeConsultation = (values: ConsultationFormValues) => {
    if (!selected) return

    const record: DoctorConsultation = {
      id: `c-${Date.now()}`,
      patientId: selected.patientId,
      patient: selected.patient,
      chamberId: selected.chamberId,
      date: selected.date,
      symptoms: values.symptoms,
      observations: values.observations,
      notes: values.notes,
      diagnosis: values.diagnosis,
      testsAdvised: splitList(values.testsAdvised),
      followUpDate: values.followUpDate,
    }

    setConsultations((prev) => [record, ...prev])
    setAppointments((prev) =>
      prev.map((appointment): DoctorAppointment =>
        appointment.id === selected.id ? { ...appointment, status: "completed" } : appointment,
      ),
    )
    setMessage(
      `Consultation for ${selected.patient} completed${
        values.followUpDate ? `, follow-up on ${formatIsoDate(values.followUpDate)}` : ""
      }.`,
    )
    setSearchParams({}, { replace: true }) // moves on to the next patient
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Consultations</h1>
        <p className="text-sm text-doctor-muted">Pick a patient, write your notes, then complete the visit.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <ConsultationPatientList
          appointments={todayPatients}
          chambers={doctorChambers}
          selectedId={selected?.id}
          onSelect={selectAppointment}
        />

        <div className="flex flex-col gap-6 xl:col-span-2">
          {selected && patient ? (
            <>
              <PatientSummary
                patient={patient}
                appointment={selected}
                chambers={doctorChambers}
                consultations={getPatientConsultations(consultations, patient.id)}
              />
              {/* key resets the form when another patient is picked */}
              <ConsultationForm key={selected.id} patientId={patient.id} onComplete={completeConsultation} />
            </>
          ) : (
            <DoctorEmptyState title="No consultation open" message="All of today's patients are done for this chamber." />
          )}
        </div>
      </div>

      <PastConsultations consultations={filterByChamber(consultations, chamberId)} chambers={doctorChambers} />
    </div>
  )
}

export default DoctorConsultations