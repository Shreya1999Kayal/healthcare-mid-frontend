import type { HospitalSupply, PartnerHospital } from "../../../type/blood/bloodBankType/BloodBankReport.type"

export interface TopHospitalsTableProps {
  supplies: HospitalSupply[]
}

export interface PartnerHospitalsListProps {
  partners: PartnerHospital[]
}