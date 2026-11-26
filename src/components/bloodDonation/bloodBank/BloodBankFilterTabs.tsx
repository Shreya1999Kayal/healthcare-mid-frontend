import type { BloodBankFilterTabsProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"


const BloodBankFilterTabs = <T extends string>({ options, value, onChange }: BloodBankFilterTabsProps<T>) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
            value === option.value
              ? "bg-blood-primary text-white"
              : "border border-blood-border bg-white text-blood-navy hover:bg-blood-bg"
          }`}
        >
          {option.label}
          {option.count !== undefined && ` (${option.count})`}
        </button>
      ))}
    </div>
  )
}

export default BloodBankFilterTabs