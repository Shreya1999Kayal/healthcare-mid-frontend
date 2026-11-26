import { hospitalProfileExtras } from "../../../constants/hospitalConstants/hospitalProfile.constants"
import type { HospitalProfileDetails, HospitalProfileFormValues } from "../../../types/type/hospitalType/HospitalProfile.type"
import type { HospitalAccount } from "../../../types/type/hospitalType/HospitalVerification.type"

// One item per line -> array
export const splitLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

// Verification details + extra profile details
export const buildHospitalProfile = (hospital: HospitalAccount): HospitalProfileDetails => {
  const details = hospital.verification.details

  return {
    ...hospitalProfileExtras,
    name: details.hospitalName,
    hospitalType: details.hospitalType,
    ownership: details.ownership,
    establishedYear: Number(details.establishedYear) || 0,
    totalBeds: Number(details.totalBeds) || 0,
    registrationNo: details.registrationNo,
    email: details.email,
    phone: details.phone,
    emergencyPhone: details.emergencyPhone,
    address: details.address,
    city: details.city,
    pincode: details.pincode,
  }
}

export const toHospitalProfileForm = (profile: HospitalProfileDetails): HospitalProfileFormValues => ({
  tagline: profile.tagline,
  hospitalType: profile.hospitalType,
  ownership: profile.ownership,
  establishedYear: String(profile.establishedYear),
  totalBeds: String(profile.totalBeds),
  email: profile.email,
  phone: profile.phone,
  emergencyPhone: profile.emergencyPhone,
  website: profile.website,
  address: profile.address,
  city: profile.city,
  pincode: profile.pincode,
  about: profile.about,
  openingHours: profile.openingHours,
  specialities: profile.specialities.join("\n"),
  facilities: profile.facilities.join("\n"),
  insurance: profile.insurance.join("\n"),
  accreditations: profile.accreditations.join("\n"),
})

export const fromHospitalProfileForm = (form: HospitalProfileFormValues, current: HospitalProfileDetails): HospitalProfileDetails => ({
  ...current,
  tagline: form.tagline.trim(),
  hospitalType: form.hospitalType,
  ownership: form.ownership,
  establishedYear: Number(form.establishedYear) || 0,
  totalBeds: Number(form.totalBeds) || 0,
  email: form.email.trim(),
  phone: form.phone.trim(),
  emergencyPhone: form.emergencyPhone.trim(),
  website: form.website.trim(),
  address: form.address.trim(),
  city: form.city.trim(),
  pincode: form.pincode.trim(),
  about: form.about.trim(),
  openingHours: form.openingHours.trim(),
  specialities: splitLines(form.specialities),
  facilities: splitLines(form.facilities),
  insurance: splitLines(form.insurance),
  accreditations: splitLines(form.accreditations),
})