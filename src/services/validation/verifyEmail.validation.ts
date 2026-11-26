import * as yup from "yup"

export const verifyEmailSchema = yup.object({
  otp: yup.string().matches(/^[0-9]{6}$/, "Code must be 6 digits").required("Verification code is required"),
})
