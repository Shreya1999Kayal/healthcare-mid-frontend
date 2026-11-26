import type { ResetPasswordInputType } from "../../types/interface/resetPassword.interface"

export const ResetPasswordInputData: ResetPasswordInputType[] = [
  { name: "otp", label: "Verification Code", type: "text", placeholder: "Enter 6 digit code" },
  { name: "password", label: "New Password", type: "password", placeholder: "Enter New Password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm New Password" },
]
