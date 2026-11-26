import * as yup from "yup"

export const resetPasswordSchema = yup.object({
  otp: yup.string().matches(/^[0-9]{6}$/, "Code must be 6 digits").required("Verification code is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})
