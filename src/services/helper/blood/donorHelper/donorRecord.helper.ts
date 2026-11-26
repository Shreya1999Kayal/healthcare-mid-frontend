import { DONATION_GAP_DAYS } from "../../../../constants/blood/donorConstants/donorRecord.constants"
import type { DonationRecord, DonationRecordFilter, DonorEligibility } from "../../../../types/type/blood/donorType/DonorRecord.type"


const DAY_IN_MS = 86_400_000

// "2026-11-24" -> local Date (adding the time avoids a one-day shift by time zone)
const toDate = (iso: string) => new Date(`${iso}T00:00:00`)

// Date -> "2026-11-24"
const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

export const sortRecordsNewestFirst = (records: DonationRecord[]) =>
  [...records].sort((a, b) => b.donatedOn.localeCompare(a.donatedOn))

export const getLastDonated = (records: DonationRecord[]) => sortRecordsNewestFirst(records)[0]?.donatedOn ?? null

// Eligible again 90 days after the last donation; a first-time donor is eligible now
export const getDonorEligibility = (records: DonationRecord[], todayIso: string): DonorEligibility => {
  const lastDonated = getLastDonated(records)
  if (!lastDonated) return { lastDonated: null, eligible: true, nextEligibleOn: null, daysLeft: 0 }

  const next = toDate(lastDonated)
  next.setDate(next.getDate() + DONATION_GAP_DAYS)
  const daysLeft = Math.max(Math.ceil((next.getTime() - toDate(todayIso).getTime()) / DAY_IN_MS), 0)

  return { lastDonated, eligible: daysLeft === 0, nextEligibleOn: toIso(next), daysLeft }
}

export const countPatientsHelped = (records: DonationRecord[]) => records.filter((record) => record.recipient).length

export const filterDonationRecords = (records: DonationRecord[], filter: DonationRecordFilter) => {
  if (filter === "received") return records.filter((record) => record.recipient)
  if (filter === "waiting") return records.filter((record) => !record.recipient)
  return records
}