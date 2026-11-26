// Roles a user can pick while registering (admin is created by the backend only)
export type UserRole = "patient" | "doctor" | "hospital" | "bloodBank" | "camp" | "donor"

// Which form the auth dialog shows
export type AuthMode = "Login" | "SignUp" | "VerifyEmail" | "ForgotPassword" | "ResetPassword"
