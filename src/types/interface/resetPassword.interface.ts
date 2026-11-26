// what the user types
export interface ResetPasswordPayload {
  otp: string
  password: string
  confirmPassword: string
}

// what we send to the API (email comes from resetEmail)
export interface ResetPasswordRequest {
  email: string | undefined
  otp: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordInputType {
  name: keyof ResetPasswordPayload
  label: string
  type: string
  placeholder: string
}
