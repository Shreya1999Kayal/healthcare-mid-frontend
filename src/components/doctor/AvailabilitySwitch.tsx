import type { AvailabilitySwitchProps } from "../../types/interface/doctorInterface/DoctorChambers.interface"

const AvailabilitySwitch = ({ checked, label, onChange }: AvailabilitySwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-doctor-primary" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}

export default AvailabilitySwitch