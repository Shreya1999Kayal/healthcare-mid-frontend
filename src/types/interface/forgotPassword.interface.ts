export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordInputType {
  name: keyof ForgotPasswordPayload
  label: string
  type: string
  placeholder: string
}
