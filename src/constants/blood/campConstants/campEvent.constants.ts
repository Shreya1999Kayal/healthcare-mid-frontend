import type { BloodBankField } from "../../../types/type/blood/bloodBankType/BloodBankVerification.type";
import type { CampEvent, CampEventFieldName, CampEventFormValues } from "../../../types/type/blood/campType/CampEvent.type";
import type { CampView } from "../../../types/type/public/Blood.type";


export const campViewOptions: { value: CampView; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "existing", label: "Existing" },
]

export const campEventFields: BloodBankField<CampEventFieldName>[] = [
  { name: "title", label: "Camp title", required: true, placeholder: "e.g. Winter Blood Donation Camp", fullWidth: true },
  { name: "date", label: "Date", required: true, type: "date" },
  { name: "time", label: "Time", required: true, placeholder: "e.g. 9:00 AM - 3:00 PM" },
  { name: "venue", label: "Venue", required: true },
  { name: "city", label: "City", required: true },
  { name: "unitsCollected", label: "Units collected (after the camp)", type: "number" },
  { name: "note", label: "Note for donors", type: "textarea", fullWidth: true, placeholder: "e.g. Walk-ins welcome" },
]

export const emptyCampEventForm: CampEventFormValues = {
  title: "", date: "", time: "", venue: "", city: "", note: "", unitsCollected: "",
}

// Placeholder camps per organiser id (from campOrganisers). Replace with the API later.
export const campEvents: Record<string, CampEvent[]> = {
  o4: [
    {
      id: "ce1", title: "Winter Para Camp", date: "2026-12-13", time: "10:00 AM - 4:00 PM",
      venue: "Salt Lake Community Hall", city: "Kolkata", note: "Walk-ins welcome", registrations: 38, unitsCollected: null,
    },
    {
      id: "ce2", title: "New Year Club Drive", date: "2027-01-03", time: "9:00 AM - 2:00 PM",
      venue: "Bidhannagar Club Ground", city: "Kolkata", note: "Register to get a time slot", registrations: 12, unitsCollected: null,
    },
    {
      id: "ce3", title: "Community Puja Camp", date: "2026-10-12", time: "10:00 AM - 5:00 PM",
      venue: "Salt Lake Community Hall", city: "Kolkata", note: "Thank you to every donor", registrations: 140, unitsCollected: 112,
    },
    {
      id: "ce4", title: "Spring Festival Camp", date: "2026-03-22", time: "10:00 AM - 3:00 PM",
      venue: "Bidhannagar Club Ground", city: "Kolkata", note: "", registrations: 70, unitsCollected: 52,
    },
  ],
}