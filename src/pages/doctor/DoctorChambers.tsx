import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Building2, CalendarCheck, CircleCheck } from "lucide-react"
import ChamberCard from "../../components/doctor/ChamberCard"
import SummaryCard from "../../components/doctor/SummaryCard"
import { doctorAppointments, doctorChambers } from "../../constants/doctorConstants/doctorDashboard.constants"
import { chamberDetails } from "../../constants/doctorConstants/doctorChambers.constants"
import { doctorSchedules } from "../../constants/doctorConstants/doctorSchedule.constants"
import { getSelectedChambers } from "../../services/helper/doctorHelper/doctorQueue.helper"
import { getChamberCounts, getHospital } from "../../services/helper/doctorHelper/doctorChambers.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { DoctorChamberDetail } from "../../types/type/doctorType/DoctorChambers.type"

const DoctorChambers = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()

  // Local copy so the switch works (UI only, nothing is saved)
  const [details, setDetails] = useState<DoctorChamberDetail[]>(chamberDetails)

  const chambers = getSelectedChambers(doctorChambers, chamberId)
  const openCount = details.filter((detail) => detail.available).length
  const todayCount = chambers.reduce((sum, chamber) => sum + getChamberCounts(chamber.id, doctorAppointments).today, 0)

  const toggleAvailability = (id: string) =>
    setDetails((prev) => prev.map((detail) => (detail.chamberId === id ? { ...detail, available: !detail.available } : detail)))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Chambers</h1>
        <p className="text-sm text-doctor-muted">Hospitals and clinics where you see patients.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Chambers" value={doctorChambers.length} hint="Places you practise" icon={Building2} />
        <SummaryCard label="Taking bookings" value={openCount} hint="Open for new patients" icon={CircleCheck} />
        <SummaryCard label="Appointments today" value={todayCount} hint="In the chosen chamber" icon={CalendarCheck} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {chambers.map((chamber) => {
          const detail = details.find((item) => item.chamberId === chamber.id)
          if (!detail) return null

          return (
            <ChamberCard
              key={chamber.id}
              chamber={chamber}
              detail={detail}
              hospital={getHospital(detail.hospitalId)}
              schedule={doctorSchedules.find((schedule) => schedule.chamberId === chamber.id)}
              counts={getChamberCounts(chamber.id, doctorAppointments)}
              onToggle={() => toggleAvailability(chamber.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DoctorChambers