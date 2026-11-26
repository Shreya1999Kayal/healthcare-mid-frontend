import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { WeeklyChartProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"


const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const max = Math.max(...data.map((point) => point.appointments), 1)

  return (
    <section className={doctorCardClass}>
      <h2 className="mb-4 text-lg font-bold text-doctor-navy">Appointments this week</h2>
      <div className="flex h-44 gap-3">
        {data.map((point) => (
          <div key={point.day} className="flex h-full flex-1 flex-col">
            <div className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-linear-to-t from-doctor-primary-dark to-doctor-primary"
                style={{ height: `${(point.appointments / max) * 100}%` }}
                title={`${point.appointments} appointments`}
              />
            </div>
            <p className="mt-2 text-center text-xs font-semibold text-doctor-navy">{point.appointments}</p>
            <p className="text-center text-xs text-doctor-muted">{point.day}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeeklyChart