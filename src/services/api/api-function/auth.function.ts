import axios from "axios"
import Cookie from "js-cookie"
import api from "../api"
import { endpoints } from "../../helper/endpoints"
import type { ApiResponse, LoginResponse } from "../../../types/interface/auth.interface"
import type { SignupPayload } from "../../../types/interface/signup.interface"
import type { LoginPayload } from "../../../types/interface/login.interface"
import type { VerifyEmailPayload } from "../../../types/interface/verifyEmail.interface"
import type { ForgotPasswordPayload } from "../../../types/interface/forgotPassword.interface"
import type { ResetPasswordRequest } from "../../../types/interface/resetPassword.interface"

const getErrorResponse = (error: unknown): ApiResponse => {
  if (axios.isAxiosError(error) && error.response?.data) {
    return { ...error.response.data, statusCode: error.response.status }
  }
  return { success: false, message: "Something went wrong, please check your connection and try again." }
}

export const registerFns = async (data: SignupPayload): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.register}`, data)
    return response.data
  } catch (error) {
    console.log("Error in registerFns - ", error)
    return getErrorResponse(error)
  }
}

export const verifyEmailFns = async (data: VerifyEmailPayload): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.verifyEmail}`, data)
    return response.data
  } catch (error) {
    console.log("Error in verifyEmailFns - ", error)
    return getErrorResponse(error)
  }
}

export const resendOtpFns = async (data: string | undefined): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.resendOtp}`, { email: data })
    return response.data
  } catch (error) {
    console.log("Error in resendOtpFns - ", error)
    return getErrorResponse(error)
  }
}

export const loginFns = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.login}`, data)
    const body = response?.data

    if (body?.success) {
      // tokens / user may sit directly on the body or inside body.data depending on the backend
      const result = body?.data ?? body
      const accessToken = result?.accessToken ?? body?.accessToken
      const refreshToken = result?.refreshToken ?? body?.refreshToken
      const user = result?.user ?? body?.user

      if (accessToken) Cookie.set("accessToken", accessToken)
      if (refreshToken) Cookie.set("refreshToken", refreshToken)
      if (user?.role) Cookie.set("role", user.role)
      if (user) Cookie.set("user", JSON.stringify(user)) // cookie can only hold a string

      return { ...body, accessToken, refreshToken, user }
    }
    return body
  } catch (error) {
    console.log("Error in loginFns - ", error)
    return getErrorResponse(error)
  }
}

export const forgotPasswordFns = async (data: ForgotPasswordPayload): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.forgotPassword}`, data)
    return response.data
  } catch (error) {
    console.log("Error in forgotPasswordFns - ", error)
    return getErrorResponse(error)
  }
}

export const resetPasswordFns = async (data: ResetPasswordRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.resetPassword}`, data)
    return response.data
  } catch (error) {
    console.log("Error in resetPasswordFns - ", error)
    return getErrorResponse(error)
  }
}

export const logoutFns = async (payload: string): Promise<ApiResponse> => {
  try {
    const response = await api.post(`${endpoints.auth.logout}`, { refreshToken: payload })
    // only log out on this device when the server agrees
    if (response.data?.success) {
      Cookie.remove("accessToken")
      Cookie.remove("refreshToken")
      Cookie.remove("role")
      Cookie.remove("user")
    }
    return response.data
  } catch (error) {
    console.log("Error in logoutFns - ", error)
    return getErrorResponse(error)
  }
}
