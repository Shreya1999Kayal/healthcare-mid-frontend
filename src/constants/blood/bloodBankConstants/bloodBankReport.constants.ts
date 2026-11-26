import type { HospitalSupply, PartnerHospital } from "../../../types/type/blood/bloodBankType/BloodBankReport.type"

// Placeholder data. hospitalId must match an id in hospitalsList.
export const topHospitalSupply: HospitalSupply[] = [
  { hospitalId: "1", requests: 24, units: 86 },
  { hospitalId: "2", requests: 19, units: 64 },
  { hospitalId: "5", requests: 12, units: 41 },
  { hospitalId: "6", requests: 9, units: 28 },
]

export const partnerHospitals: PartnerHospital[] = [
  { hospitalId: "3", since: 2021 },
  { hospitalId: "4", since: 2023 },
]