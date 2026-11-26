import type { BloodGroup } from "../../public/Blood.type"

// requested = sent by the hospital, not accepted yet
export type BloodBankRequestStatus = "requested" | "accepted" | "rejected" | "delivered"

export type BloodBankRequestFilter = BloodBankRequestStatus | "all"

export type RequestUrgency = "normal" | "urgent" | "emergency"

export type BloodBankRequest = {
  id: string
  hospitalId: string // id from hospitalsList
  patient: string
  group: BloodGroup
  units: number
  urgency: RequestUrgency
  requiredBy: string // yyyy-mm-dd
  requestedOn: string // yyyy-mm-dd
  note: string
  status: BloodBankRequestStatus
  rejectReason: string // filled when rejected
}