import type { DonationRecord, DonorEligibility } from "../../../type/blood/donorType/DonorRecord.type"


export interface EligibilityCardProps {
  eligibility: DonorEligibility
}

export interface DonationRecordsTableProps {
  records: DonationRecord[]
}

export interface RecentDonationsProps {
  records: DonationRecord[]
  donorId: string
}