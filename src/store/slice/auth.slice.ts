import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import {
  forgotPasswordFns,
  loginFns,
  logoutFns,
  registerFns,
  resetPasswordFns,
  verifyEmailFns,
} from "../../services/api/api-function/auth.function"
import type { AuthState, LoginResponse } from "../../types/interface/auth.interface"
import type { SignupPayload } from "../../types/interface/signup.interface"
import type { LoginPayload } from "../../types/interface/login.interface"
import type { ForgotPasswordPayload } from "../../types/interface/forgotPassword.interface"
import type { ResetPasswordRequest } from "../../types/interface/resetPassword.interface"
import type { VerifyEmailPayload } from "../../types/interface/verifyEmail.interface"
import type { AuthMode, UserRole } from "../../types/type/auth.type"
import type { RootState } from "../../types/type/redux.type"
import { MAX_LOGIN_ATTEMPTS, LOGIN_LOCK_TIME } from "../../constants/authConstants/auth.constants"
import { clearLoginLock, saveLoginLock } from "../../services/helper/auth.helper"

const refreshToken = Cookie.get("refreshToken")
const role = Cookie.get("role")
const user = Cookie.get("user")

const initialState: AuthState = {
  authDialog: false,
  authMode: "Login",
  isLoading: false,
  isError: null,
  verifyEmail: undefined,
  resetEmail: undefined, // email entered in forgot password, reused in reset password
  isAuthenticate: !!refreshToken,
  role: (role as UserRole) ?? null,
  user: user ? JSON.parse(user) : null,
  loginAttempts: Number(localStorage.getItem("loginAttempts")) || 0,
  loginLockUntil: Number(localStorage.getItem("loginLockUntil")) || null,
}

export const registerUseThunk = createAsyncThunk(
  "auth/register",
  async (payload: SignupPayload, { rejectWithValue }) => {
    // not using try catch here, errors are already handled in auth.function.ts
    const response = await registerFns(payload)
    console.log("Response in registerThunk in auth slice - ", response)

    if (response.success) {
      return response
    } else {
      return rejectWithValue(response)
    }
  },
)

export const loginUseThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { state: RootState; rejectValue: { message: string; locked?: boolean } }
>("auth/login", async (payload, { getState, rejectWithValue }) => {
  // blocked? don't call the API
  const { loginLockUntil } = getState().auth
  if (loginLockUntil && loginLockUntil > Date.now()) {
    const minutes = Math.ceil((loginLockUntil - Date.now()) / 60000)
    return rejectWithValue({ message: `Too many failed attempts. Try again in ${minutes} minute(s)`, locked: true })
  }

  const response = await loginFns(payload)
  console.log("Response in loginThunk in auth slice - ", response)

  if (response.success) {
    return response
  } else {
    return rejectWithValue(response)
  }
})

export const logoutUseThunk = createAsyncThunk(
  "auth/logout",
  async (payload: string, { rejectWithValue }) => {
    const response = await logoutFns(payload)
    console.log("Response in logoutThunk in auth slice - ", response)

    if (response.success) {
      return response
    } else {
      return rejectWithValue(response)
    }
  },
)

export const forgotPasswordUseThuk = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: ForgotPasswordPayload, { rejectWithValue }) => {
    const response = await forgotPasswordFns(payload)
    console.log("Response in forgotPasswordUseThunk in auth slice - ", response)

    if (response.success) {
      return response
    } else {
      return rejectWithValue(response)
    }
  },
)

export const resetPasswordUseThuk = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ResetPasswordRequest, { rejectWithValue }) => {
    if (!payload.email) {
      return rejectWithValue({ message: "Email not found, please enter your email again" })
    }
    const response = await resetPasswordFns(payload)
    console.log("Response in resetPasswordUseThunk in auth slice - ", response)

    if (response.success) {
      return response
    } else {
      return rejectWithValue(response)
    }
  },
)

export const verifyEmailUseThuk = createAsyncThunk(
  "auth/verifyEmail",
  async (payload: VerifyEmailPayload, { rejectWithValue }) => {
    if (!payload.email) {
      return rejectWithValue({ message: "Email not found, please register again" })
    }
    const response = await verifyEmailFns(payload)
    console.log("Response in verifyEmailUseThunk in auth slice - ", response)

    if (response.success) {
      return response
    } else {
      return rejectWithValue(response)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleAuthOpenDialog: (state) => {
      state.authDialog = true
    },
    handleAuthCloseDialog: (state) => {
      state.authDialog = false
      state.isError = null
    },
    handleAuthModeChange: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload
      state.isError = null // old error should not show on the next form
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUseThunk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(registerUseThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = null
        state.verifyEmail = action.meta.arg.email // email the user typed in the form
        state.authMode = "VerifyEmail"
      })
      .addCase(registerUseThunk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = (action.payload as { message?: string })?.message ?? null
      })

      // verify email
      .addCase(verifyEmailUseThuk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(verifyEmailUseThuk.fulfilled, (state) => {
        state.isLoading = false
        state.isError = null
        state.verifyEmail = undefined
        state.authMode = "Login"
      })
      .addCase(verifyEmailUseThuk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = (action.payload as { message?: string })?.message ?? null
      })

      // login
      .addCase(loginUseThunk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(loginUseThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = null
        state.authMode = "Login"
        state.authDialog = false
        state.isAuthenticate = true
        state.user = action.payload?.user ?? null
        state.role = action.payload?.user?.role ?? null
        state.loginAttempts = 0
        state.loginLockUntil = null
        clearLoginLock()
      })
      .addCase(loginUseThunk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.payload?.message ?? null
        if (action.payload?.locked) return // still locked, don't count again

        // old lock is over, start counting again
        if (state.loginLockUntil && state.loginLockUntil <= Date.now()) {
          state.loginAttempts = 0
          state.loginLockUntil = null
        }

        state.loginAttempts += 1
        if (state.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
          state.loginLockUntil = Date.now() + LOGIN_LOCK_TIME
          state.isError = "Too many failed attempts. Try again in 5 minutes"
        }
        saveLoginLock(state.loginAttempts, state.loginLockUntil)
      })

      // forgot password
      .addCase(forgotPasswordUseThuk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(forgotPasswordUseThuk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = null
        state.resetEmail = action.meta.arg.email // save email for the reset password form
        state.authMode = "ResetPassword"
      })
      .addCase(forgotPasswordUseThuk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = (action.payload as { message?: string })?.message ?? null
      })

      // reset password
      .addCase(resetPasswordUseThuk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(resetPasswordUseThuk.fulfilled, (state) => {
        state.isLoading = false
        state.isError = null
        state.resetEmail = undefined
        state.authMode = "Login"
      })
      .addCase(resetPasswordUseThuk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = (action.payload as { message?: string })?.message ?? null
      })

      // logout (user stays logged in if the server call fails)
      .addCase(logoutUseThunk.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(logoutUseThunk.fulfilled, (state) => {
        state.isLoading = false
        state.isError = null
        state.authDialog = false
        state.isAuthenticate = false
        state.user = null
        state.role = null
      })
      .addCase(logoutUseThunk.rejected, (state, action) => {
        state.isLoading = false
        state.isError = (action.payload as { message?: string })?.message ?? null
      })
  },
})

export const { handleAuthOpenDialog, handleAuthCloseDialog, handleAuthModeChange } = authSlice.actions

export default authSlice.reducer
