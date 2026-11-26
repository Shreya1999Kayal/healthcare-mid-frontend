// sent to the API (email comes from verifyEmail)
export interface VerifyEmailPayload {
  email: string | undefined
  otp: string
}

// what the user types
export interface VerifyEmailFormValues {
  otp: string
}

export interface VerifyEmailInputType {
  name: keyof VerifyEmailFormValues
  label: string
  type: string
  placeholder: string
}
