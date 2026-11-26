import type { UserRole } from "../../types/type/auth.type"
import type { SignupInputType, SignupRoleOption } from "../../types/interface/signup.interface"

export const SignupRoleOptions: SignupRoleOption[] = [
  { value: "patient", label: "Patient", hint: "Book doctors, request blood. No approval needed." },
  { value: "doctor", label: "Doctor", hint: "Needs admin approval after verification." },
  { value: "hospital", label: "Hospital", hint: "Needs admin approval after verification." },
  { value: "bloodBank", label: "Blood bank", hint: "Needs admin approval after verification." },
  { value: "camp", label: "Camp organiser", hint: "Needs admin approval after verification." },
  { value: "donor", label: "Donor", hint: "Needs admin approval after verification." },
]

// Name field label changes with the role
export const SignupNameLabels: Record<UserRole, string> = {
  patient: "Full Name",
  doctor: "Full Name",
  donor: "Full Name",
  hospital: "Hospital Name",
  bloodBank: "Blood Bank Name",
  camp: "Organiser / Club Name",
}

export const SignupInputData: SignupInputType[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Enter Your Name" },
  { name: "email", label: "Email address", type: "text", placeholder: "Enter Your Email" },
  { name: "phone", label: "Phone", type: "text", placeholder: "Enter 10 digit Phone Number" },
  { name: "city", label: "City", type: "text", placeholder: "Enter Your City" },
  { name: "password", label: "Password", type: "password", placeholder: "Enter Password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Enter Password Again" },
]
