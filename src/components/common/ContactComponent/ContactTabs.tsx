import { useState } from "react"
import type { ContactTabId } from "../../../types/type/public/Contact.type"
import ContactForm from "./ContactForm"
import type { ContactTabsProps } from "../../../types/interface/public/Contact.interface"

const ContactTabs = ({ tabs }: ContactTabsProps) => {
  const [activeId, setActiveId] = useState<ContactTabId>(tabs[0].id)
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  return (
    <div>
      {/* Tab buttons */}
      <div role="tablist" className="flex w-fit overflow-hidden rounded-md border border-medical-border bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            onClick={() => setActiveId(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              tab.id === activeId
                ? "bg-medical-bg-soft text-medical-primary-dark"
                : "text-medical-navy hover:bg-medical-bg-soft/50"
            }`}
          >
            {tab.tabLabel}
          </button>
        ))}
      </div>

      {/* key resets the form when the tab changes */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm shadow-medical-navy/5 md:p-8">
        <ContactForm key={active.id} config={active} />
      </div>
    </div>
  )
}

export default ContactTabs