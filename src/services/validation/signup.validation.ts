import * as yup from "yup"
import type { UserRole } from "../../types/type/auth.type"

const signupRoles: UserRole[] = ["patient", "doctor", "hospital", "bloodBank", "camp", "donor"]

export const signupSchema = yup.object({
  role: yup.mixed<UserRole>().oneOf(signupRoles, "Choose a role").required("Choose a role"),
  name: yup.string().trim().required("Name is required"),
  email: yup.string().email("Invalid Email Format!!").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone is required"),
  city: yup.string().trim().required("City is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
})
