import type { UserRole } from "../type/auth.type"

// What is sent to the backend
export interface SignupPayload {
  role: UserRole
  name: string
  email: string
  phone: string
  city: string
  password: string
}

// What the form holds (confirm password is checked only on the frontend)
export interface SignupFormValues extends SignupPayload {
  confirmPassword: string
}

export interface SignupInputType {
  name: Exclude<keyof SignupFormValues, "role">
  label: string
  type: string
  placeholder: string
}

export interface SignupRoleOption {
  value: UserRole
  label: string
  hint: string
}
