import { useMemo, useState } from "react"
import { bankViews } from "../../../constants/public/bloods.constants"
import { getBloodBanks } from "../../../services/helper/public/blood.helper"
import type { BankView } from "../../../types/type/public/Blood.type"
import BloodBankCard from "./BloodBankCard"
import SwitchTabs from "./SwitchTabs"

const BloodBanksSection = () => {
  const [view, setView] = useState<BankView>("hospital")
  const banks = useMemo(() => getBloodBanks(view), [view])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SwitchTabs options={bankViews} value={view} onChange={setView} />
        <p className="mt-3 text-sm text-medical-muted">
          {view === "hospital"
            ? "Blood banks inside Seva hospitals. Hospitals without a blood bank are not listed."
            : "Independent blood banks run by other organisations."}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => (
          <BloodBankCard key={bank.id} bank={bank} />
        ))}
      </div>
    </div>
  )
}

export default BloodBanksSection