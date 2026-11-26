import type { AuthMode, UserRole } from "../type/auth.type"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthState {
  authDialog: boolean
  authMode: AuthMode
  isLoading: boolean
  isError: string | null
  verifyEmail: string | undefined // email entered in register, reused in verify email
  resetEmail: string | undefined // email entered in forgot password, reused in reset password
  isAuthenticate: boolean
  role: UserRole | null
  user: AuthUser | null
  loginAttempts: number
  loginLockUntil: number | null // time (ms) until login is blocked
}

// Shape every auth API returns
export interface ApiResponse {
  success: boolean
  message: string
  data?: unknown
  statusCode?: number
}

// Login returns the tokens and the user (they may also sit inside data)
export interface LoginResponse extends ApiResponse {
  accessToken?: string
  refreshToken?: string
  user?: AuthUser
}
