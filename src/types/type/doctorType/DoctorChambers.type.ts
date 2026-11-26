// Doctor-side settings for one chamber; address and phone come from hospitalsList
export type DoctorChamberDetail = {
  chamberId: string // matches an id in doctorChambers
  hospitalId: string // matches an id in hospitalsList (public data)
  room: string
  fee: number
  available: boolean // taking new bookings
}

export type ChamberCounts = {
  today: number
  upcoming: number
}