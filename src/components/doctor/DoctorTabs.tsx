import type { DoctorTabsProps } from "../../types/interface/doctorInterface/DoctorAppointments.interface"

const DoctorTabs = <T extends string>({ options, value, onChange }: DoctorTabsProps<T>) => {
  return (
    <div role="tablist" className="flex w-fit max-w-full overflow-x-auto rounded-lg border border-doctor-border bg-white p-1">
      {options.map((option) => {
        const active = option.id === value

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              active ? "bg-doctor-primary text-white" : "text-doctor-navy hover:bg-doctor-bg"
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={`rounded-full px-2 text-xs font-semibold ${
                  active ? "bg-white/20 text-white" : "bg-doctor-bg-soft text-doctor-primary-dark"
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default DoctorTabs