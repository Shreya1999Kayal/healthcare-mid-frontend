import { Ambulance, Clock, Stethoscope, UserRound } from "lucide-react"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  arrivalModeLabels,
  caseTypeLabels,
  emergencyDoctorOptions,
  emergencyStatusStyles,
  priorityBorders,
  priorityStyles,
} from "../../constants/hospitalConstants/hospitalEmergency.constants"
import { getEmergencyActions, isActiveEmergency } from "../../services/helper/hospitalHelper/hospitalEmergency.helper"
import type { EmergencyCaseCardProps } from "../../types/interface/hospitalInterface/HospitalEmergency.interface"

const EmergencyCaseCard = ({ emergencyCase, onStatusChange, onAssignDoctor }: EmergencyCaseCardProps) => {
  const priority = priorityStyles[emergencyCase.priority]
  const status = emergencyStatusStyles[emergencyCase.status]
  const actions = getEmergencyActions(emergencyCase.status)
  const isActive = isActiveEmergency(emergencyCase.status)

  const patientLine = [emergencyCase.patient, emergencyCase.age !== undefined ? `${emergencyCase.age} yrs` : "", emergencyCase.gender]
    .filter(Boolean)
    .join(" · ")

  return (
    <article className={`${hospitalCardClass} flex flex-col gap-4 border-l-4 ${priorityBorders[emergencyCase.priority]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-hospital-navy">{caseTypeLabels[emergencyCase.caseType]}</h3>
          <p className="text-sm text-hospital-navy">{emergencyCase.complaint}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priority.className}`}>{priority.label}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-hospital-navy">
        <li className="flex items-center gap-2">
          <UserRound size={16} className="shrink-0 text-hospital-primary-dark" /> {patientLine}
        </li>
        <li className="flex items-center gap-2">
          <Ambulance size={16} className="shrink-0 text-hospital-primary-dark" />
          {arrivalModeLabels[emergencyCase.arrivalMode]}
          {emergencyCase.ambulanceNo && ` (${emergencyCase.ambulanceNo})`}
        </li>
        <li className="flex items-center gap-2">
          <Clock size={16} className="shrink-0 text-hospital-primary-dark" /> Reported at {emergencyCase.reportedAt}
        </li>
        {!isActive && (
          <li className="flex items-center gap-2">
            <Stethoscope size={16} className="shrink-0 text-hospital-primary-dark" /> {emergencyCase.assignedDoctor || "No doctor assigned"}
          </li>
        )}
      </ul>

      {/* Doctor can be changed only while the case is active */}
      {isActive && (
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-hospital-navy">Assigned doctor</span>
          <select
            value={emergencyCase.assignedDoctor}
            onChange={(e) => onAssignDoctor(emergencyCase.id, e.target.value)}
            className={`${hospitalFieldClass} w-full`}
          >
            <option value="">Not assigned</option>
            {emergencyDoctorOptions.map((doctor) => (
              <option key={doctor} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </label>
      )}

      {actions.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 border-t border-hospital-border pt-4">
          {actions.map((action) => {
            // Treatment starts only after a doctor is assigned
            const needsDoctor = action.next === "in-treatment" && !emergencyCase.assignedDoctor

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onStatusChange(emergencyCase.id, action.next)}
                disabled={needsDoctor}
                title={needsDoctor ? "Assign a doctor first" : undefined}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                  action.next === "transferred"
                    ? "border border-hospital-border text-hospital-navy hover:bg-hospital-bg"
                    : "bg-hospital-primary text-white hover:bg-hospital-primary-dark"
                }`}
              >
                {action.label}
              </button>
            )
          })}
        </div>
      )}
    </article>
  )
}

export default EmergencyCaseCard