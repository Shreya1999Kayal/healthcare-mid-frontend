import { campEventFields } from "../../../../constants/blood/campConstants/campEvent.constants"
import type { CampEvent, CampEventFormErrors, CampEventFormValues } from "../../../../types/type/blood/campType/CampEvent.type"
import type { CampView } from "../../../../types/type/public/Blood.type"


// yyyy-mm-dd strings compare correctly as text
export const getCampView = (camp: CampEvent, today: string): CampView => (camp.date >= today ? "upcoming" : "existing")

// Upcoming: soonest first; existing: latest first
export const filterCampEvents = (camps: CampEvent[], view: CampView, today: string) =>
  camps
    .filter((camp) => getCampView(camp, today) === view)
    .sort((a, b) => (view === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)))

export const campToFormValues = (camp: CampEvent): CampEventFormValues => ({
  title: camp.title,
  date: camp.date,
  time: camp.time,
  venue: camp.venue,
  city: camp.city,
  note: camp.note,
  unitsCollected: camp.unitsCollected === null ? "" : String(camp.unitsCollected),
})

export const buildCampEvent = (values: CampEventFormValues, id: string, registrations: number): CampEvent => ({
  id,
  title: values.title.trim(),
  date: values.date,
  time: values.time.trim(),
  venue: values.venue.trim(),
  city: values.city.trim(),
  note: values.note.trim(),
  registrations,
  unitsCollected: values.unitsCollected === "" ? null : Number(values.unitsCollected),
})

export const validateCampEvent = (form: CampEventFormValues, today: string): CampEventFormErrors => {
  const errors: CampEventFormErrors = {}

  for (const field of campEventFields) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  if (form.unitsCollected) {
    if (!/^\d+$/.test(form.unitsCollected)) errors.unitsCollected = "Enter a whole number"
    else if (form.date >= today) errors.unitsCollected = "You can add units after the camp is held"
  }

  return errors
}