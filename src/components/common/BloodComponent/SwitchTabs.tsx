import type { SwitchTabsProps } from "../../../types/interface/public/Blood.interface"

const SwitchTabs = <T extends string>({ options, value, onChange }: SwitchTabsProps<T>) => {
  return (
    <div
      role="tablist"
      className="flex w-fit max-w-full overflow-x-auto rounded-md border border-medical-border bg-white"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="tab"
          aria-selected={option.id === value}
          onClick={() => onChange(option.id)}
          className={`whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors ${
            option.id === value
              ? "bg-medical-bg-soft text-medical-primary-dark"
              : "text-medical-navy hover:bg-medical-bg-soft/50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SwitchTabs