import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import type { PatientsByChamberProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"


const PatientsByChamber = ({ chambers }: PatientsByChamberProps) => {
  const max = Math.max(...chambers.map((chamber) => chamber.patients), 1)

  return (
    <section className={doctorCardClass}>
      <h2 className="mb-4 text-lg font-bold text-doctor-navy">Patients by chamber</h2>
      <ul className="flex flex-col gap-4">
        {chambers.map((chamber) => (
          <li key={chamber.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-semibold text-doctor-navy">{chamber.hospital}</span>
              <span className="text-doctor-muted">{chamber.patients}</span>
            </div>
            <div className="h-2 rounded-full bg-doctor-bg-soft">
              <div
                className="h-2 rounded-full bg-linear-to-r from-doctor-primary to-doctor-primary-dark"
                style={{ width: `${(chamber.patients / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PatientsByChamber