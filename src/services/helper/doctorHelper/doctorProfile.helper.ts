import { splitList } from "./doctorConsultations.helper"
import { consultationTypeOptions } from "../../../constants/doctorConstants/doctorProfile.constants"
import type { ConsultationType, DoctorProfileDetails, ProfileFormValues } from "../../../types/type/doctorType/DoctorProfile.type"

// One item per line -> array
export const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

export const getConsultationTypeLabel = (type: ConsultationType) =>
  consultationTypeOptions.find((option) => option.value === type)?.label ?? type

export const toProfileForm = (profile: DoctorProfileDetails): ProfileFormValues => ({
  name: profile.name,
  speciality: profile.speciality,
  subSpeciality: profile.subSpeciality,
  experience: String(profile.experience),
  registrationNo: profile.registrationNo,
  email: profile.email,
  phone: profile.phone,
  languages: profile.languages.join(", "),
  bio: profile.bio,
  inPersonFee: String(profile.inPersonFee),
  onlineFee: String(profile.onlineFee),
  consultationType: profile.consultationType,
  qualifications: profile.qualifications.join("\n"),
  expertise: profile.expertise.join("\n"),
  awards: profile.awards.join("\n"),
  certifications: profile.certifications.join("\n"),
})

export const fromProfileForm = (form: ProfileFormValues, current: DoctorProfileDetails): DoctorProfileDetails => ({
  ...current,
  name: form.name.trim(),
  speciality: form.speciality.trim(),
  subSpeciality: form.subSpeciality.trim(),
  experience: Number(form.experience) || 0,
  registrationNo: form.registrationNo.trim(),
  email: form.email.trim(),
  phone: form.phone.trim(),
  languages: splitList(form.languages),
  bio: form.bio.trim(),
  inPersonFee: Number(form.inPersonFee) || 0,
  onlineFee: Number(form.onlineFee) || 0,
  consultationType: form.consultationType,
  qualifications: splitLines(form.qualifications),
  expertise: splitLines(form.expertise),
  awards: splitLines(form.awards),
  certifications: splitLines(form.certifications),
})