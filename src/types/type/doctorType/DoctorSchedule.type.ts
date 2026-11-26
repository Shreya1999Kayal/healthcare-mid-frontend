export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"

// Times are "HH:mm" (24 hours), dates are "yyyy-mm-dd"
export type ChamberSchedule = {
  chamberId: string
  days: WeekDay[]
  start: string
  end: string
  slotMinutes: number
}

export type DoctorLeave = {
  id: string
  chamberId: string // "all" = every chamber
  from: string
  to: string
  reason: string
}

export type LeaveFormValues = Omit<DoctorLeave, "id">

// One-day change of hours at one chamber
export type SpecialSchedule = {
  id: string
  chamberId: string
  date: string
  start: string
  end: string
  note: string
}

export type SpecialFormValues = Omit<SpecialSchedule, "id" | "chamberId">

export type PreviewSlot = {
  time: string // "9:30 AM"
  booked: boolean
}

export type SlotPreviewResult = {
  status: "open" | "leave" | "closed"
  label: string
  hours: string // "9:00 AM - 1:00 PM", empty when not open
  slots: PreviewSlot[]
}