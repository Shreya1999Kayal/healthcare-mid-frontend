import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import type { BloodBankOutletContext } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"
import type { BloodBankNotificationPreferences } from "../../../types/type/blood/bloodBankType/BloodBankSettings.type"
import { initialBloodBankPreferences } from "../../../constants/blood/bloodBankConstants/bloodBankSettings.constants"
import BloodBankSettingsSection from "../../../components/bloodDonation/bloodBank/BloodBankSettingsSection"
import BloodBankPasswordForm from "../../../components/bloodDonation/bloodBank/BloodBankPasswordForm"
import BloodBankNotificationPreferencesForm from "../../../components/bloodDonation/bloodBank/BloodBankNotificationPreferencesForm"
import LowStockLimitForm from "../../../components/bloodDonation/bloodBank/LowStockLimitForm"

const BloodSettings = () => {
  const { bank, lowStockLimit, onChangeLowStockLimit } = useOutletContext<BloodBankOutletContext>()

  // Local copy (UI only, nothing is saved)
  const [preferences, setPreferences] = useState<BloodBankNotificationPreferences>(initialBloodBankPreferences)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-blood-navy md:text-3xl">Settings</h1>
        <p className="text-sm text-blood-muted">Account, alerts and stock limit for {bank.name}.</p>
      </div>

      <BloodBankSettingsSection title="Change password" description="Use a strong password you don't use anywhere else.">
        <BloodBankPasswordForm />
      </BloodBankSettingsSection>

      <BloodBankSettingsSection title="Notifications" description="Pick which alerts you get.">
        <BloodBankNotificationPreferencesForm preferences={preferences} onSave={setPreferences} />
      </BloodBankSettingsSection>

      {/* Saved in BloodBankLayout, so Inventory and Dashboard use the new limit straight away */}
      <BloodBankSettingsSection title="Low-stock limit" description="A blood group shows 'Low stock' at or below this many available units.">
        <LowStockLimitForm limit={lowStockLimit} onSave={onChangeLowStockLimit} />
      </BloodBankSettingsSection>
    </div>
  )
}

export default BloodSettings