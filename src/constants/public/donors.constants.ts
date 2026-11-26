import type { Donor } from "../../types/type/public/Donor.type"

// Placeholder data. Donors who gave blood in the last 90 days are in the list on purpose,
// the page hides them because they are not eligible yet.
export const donorsList: Donor[] = [
  { id: "d1", name: "Rahul S.", bloodGroup: "O+", city: "Salt Lake", lastDonated: "2026-03-10", donations: 8 },
  { id: "d2", name: "Ananya M.", bloodGroup: "A+", city: "Park Street", lastDonated: "2026-05-22", donations: 4 },
  { id: "d3", name: "Imran K.", bloodGroup: "B+", city: "Howrah", lastDonated: null, donations: 0 },
  { id: "d4", name: "Priya D.", bloodGroup: "O-", city: "Dum Dum", lastDonated: "2026-02-01", donations: 11 },
  { id: "d5", name: "Sourav G.", bloodGroup: "AB+", city: "Rajarhat", lastDonated: "2026-06-30", donations: 3 },
  { id: "d6", name: "Neha R.", bloodGroup: "A-", city: "Salt Lake", lastDonated: "2026-04-18", donations: 5 },
  { id: "d7", name: "Arjun P.", bloodGroup: "B-", city: "Behala", lastDonated: "2026-01-12", donations: 9 },
  { id: "d8", name: "Meera T.", bloodGroup: "O+", city: "Park Circus", lastDonated: "2026-10-05", donations: 6 },
  { id: "d9", name: "Kabir A.", bloodGroup: "A+", city: "Howrah", lastDonated: "2026-09-20", donations: 2 },
  { id: "d10", name: "Debjani C.", bloodGroup: "AB-", city: "Dum Dum", lastDonated: "2026-07-08", donations: 7 },
]