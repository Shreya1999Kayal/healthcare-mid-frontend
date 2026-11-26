import { Handshake } from "lucide-react"
import { bloodBankCardClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { getHospital } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { PartnerHospitalsListProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankReport.interface"

const PartnerHospitalsList = ({ partners }: PartnerHospitalsListProps) => {
  return (
    <section className={bloodBankCardClass}>
      <h2 className="mb-4 text-lg font-bold text-blood-navy">Partner hospitals</h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {partners.map((partner) => {
          const hospital = getHospital(partner.hospitalId)

          return (
            <li key={partner.hospitalId} className="flex items-center gap-3 rounded-xl bg-blood-bg p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blood-primary-dark">
                <Handshake size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-blood-navy">{hospital?.name ?? "Unknown hospital"}</p>
                <p className="text-xs text-blood-muted">
                  {hospital?.location} · Partner since {partner.since}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PartnerHospitalsList