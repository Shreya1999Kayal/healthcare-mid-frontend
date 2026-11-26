import { useState } from "react"
import { useOutletContext, useSearchParams } from "react-router-dom"
import LeaveManager from "../../components/doctor/LeaveManager"
import SlotPreview from "../../components/doctor/SlotPreview"
import SpecialScheduleManager from "../../components/doctor/SpecialScheduleManager"
import WeeklyScheduleForm from "../../components/doctor/WeeklyScheduleForm"
import { ALL_CHAMBERS, doctorAppointments, doctorChambers, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorLeaves, doctorSchedules, specialSchedules } from "../../constants/doctorConstants/doctorSchedule.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { ChamberSchedule, DoctorLeave, LeaveFormValues, SpecialFormValues, SpecialSchedule } from "../../types/type/doctorType/DoctorSchedule.type"

const DoctorScheduleSlots = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()
  // ?chamber=ch2 picks the chamber when the topbar shows "All chambers" (used by "Edit schedule")
  const [searchParams, setSearchParams] = useSearchParams()
  const chamberParam = searchParams.get("chamber")
  const pickedChamber = doctorChambers.some((chamber) => chamber.id === chamberParam) ? chamberParam! : doctorChambers[0].id
  const activeChamberId = chamberId === ALL_CHAMBERS ? pickedChamber : chamberId

  // Local copies (UI only, nothing is saved)
  const [schedules, setSchedules] = useState<ChamberSchedule[]>(doctorSchedules)
  const [leaves, setLeaves] = useState<DoctorLeave[]>(doctorLeaves)
  const [specials, setSpecials] = useState<SpecialSchedule[]>(specialSchedules)
  const [message, setMessage] = useState("")

  const schedule = schedules.find((item) => item.chamberId === activeChamberId)
  const chamberName = getChamberName(doctorChambers, activeChamberId)
  const chamberLeaves = leaves.filter((leave) => leave.chamberId === ALL_CHAMBERS || leave.chamberId === activeChamberId)
  const chamberSpecials = specials.filter((special) => special.chamberId === activeChamberId)

  const saveSchedule = (updated: ChamberSchedule) => {
    setSchedules((prev) => prev.map((item) => (item.chamberId === updated.chamberId ? updated : item)))
    setMessage(`Weekly schedule saved for ${chamberName}.`)
  }

  const addLeave = (leave: LeaveFormValues) => setLeaves((prev) => [...prev, { ...leave, id: `l-${Date.now()}` }])
  const removeLeave = (id: string) => setLeaves((prev) => prev.filter((leave) => leave.id !== id))

  const addSpecial = (special: SpecialFormValues) =>
    setSpecials((prev) => [...prev, { ...special, id: `s-${Date.now()}`, chamberId: activeChamberId }])
  const removeSpecial = (id: string) => setSpecials((prev) => prev.filter((special) => special.id !== id))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Schedule and slots</h1>
          <p className="text-sm text-doctor-muted">{chamberName}</p>
        </div>

        {chamberId === ALL_CHAMBERS && (
          <select
            value={activeChamberId}
            onChange={(e) => {
              setMessage("")
              setSearchParams({ chamber: e.target.value }, { replace: true })
            }}
            aria-label="Choose chamber to edit"
            className={doctorFieldClass}
          >
            {doctorChambers.map((chamber) => (
              <option key={chamber.id} value={chamber.id}>
                {chamber.hospital}
              </option>
            ))}
          </select>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {schedule && (
        <div className="grid gap-6 xl:grid-cols-2">
          {/* key resets the form when another chamber is picked */}
          <WeeklyScheduleForm key={activeChamberId} schedule={schedule} onSave={saveSchedule} />
          <SlotPreview schedule={schedule} leaves={leaves} specials={specials} appointments={doctorAppointments} />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <LeaveManager
          key={`leave-${activeChamberId}`}
          leaves={chamberLeaves}
          chambers={doctorChambers}
          defaultChamberId={activeChamberId}
          onAdd={addLeave}
          onRemove={removeLeave}
        />
        <SpecialScheduleManager
          key={`special-${activeChamberId}`}
          specials={chamberSpecials}
          onAdd={addSpecial}
          onRemove={removeSpecial}
        />
      </div>
    </div>
  )
}

export default DoctorScheduleSlots