import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Clock, Hourglass, Stethoscope, UserRoundCheck } from "lucide-react"
import QueueBoard from "../../components/doctor/QueueBoard"
import SummaryCard from "../../components/doctor/SummaryCard"
import { doctorAppointments, doctorChambers } from "../../constants/doctorConstants/doctorDashboard.constants"
import { AVG_CONSULT_MINUTES } from "../../constants/doctorConstants/doctorQueue.constants"
import { filterByChamber } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { buildQueue, callNext, checkInPatient, getSelectedChambers, isInLine, markDone, skipPatient } from "../../services/helper/doctorHelper/doctorQueue.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { QueueItem } from "../../types/type/doctorType/DoctorQueue.type"

const DoctorQueue = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()

  // Built once from today's appointments, then changed by the buttons (UI only)
  const [queue, setQueue] = useState<QueueItem[]>(() => buildQueue(doctorAppointments))

  const chambers = getSelectedChambers(doctorChambers, chamberId)
  const visibleQueue = filterByChamber(queue, chamberId)
  const waiting = visibleQueue.filter(isInLine).length
  const inside = visibleQueue.filter((item) => item.status === "in-consultation").length
  const done = visibleQueue.filter((item) => item.status === "done").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Today's queue</h1>
        <p className="text-sm text-doctor-muted">Tokens follow booking order in each chamber.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Waiting" value={waiting} hint="Checked in or on the way" icon={Hourglass} />
        <SummaryCard label="In consultation" value={inside} hint="With you now" icon={Stethoscope} />
        <SummaryCard label="Done" value={done} hint="Seen today" icon={UserRoundCheck} />
        <SummaryCard label="Average time" value={`${AVG_CONSULT_MINUTES} min`} hint="Per patient" icon={Clock} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {chambers.map((chamber) => (
          <QueueBoard
            key={chamber.id}
            chamberName={chamber.hospital}
            items={queue.filter((item) => item.chamberId === chamber.id)}
            onCallNext={() => setQueue((prev) => callNext(prev, chamber.id))}
            onSkip={(id) => setQueue((prev) => skipPatient(prev, id))}
            onMarkDone={(id) => setQueue((prev) => markDone(prev, id))}
            onCheckIn={(id) => setQueue((prev) => checkInPatient(prev, id))}
          />
        ))}
      </div>
    </div>
  )
}

export default DoctorQueue