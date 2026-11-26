// hospitalId must match an id in hospitalsList
export type HospitalSupply = {
  hospitalId: string
  requests: number
  units: number
}

export type PartnerHospital = {
  hospitalId: string
  since: number // year the partnership started
}