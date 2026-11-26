import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { forceLogout } from "../helper/global.helper"
import { endpoints } from "../helper/endpoints"

const api = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL })

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },

  async (error) => {
    const originalRequest = error.config
    const status = error?.response?.status

    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
      // register / login / otp failing must NOT force logout
      const url: string = originalRequest.url ?? ""
      const isAuthRequest = url.startsWith("/auth/") && !url.startsWith(endpoints.auth.logout)
      if (isAuthRequest) {
        return Promise.reject(error)
      }

      originalRequest._retry = true
      const refreshToken = Cookies.get("refreshToken")

      // no refresh token -> clear cookies and reload (Redux starts with isAuthenticate = false)
      if (!refreshToken) {
        forceLogout()
        return Promise.reject(error)
      }

      try {
        // plain axios, so this call does not loop through this interceptor
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}${endpoints.auth.refreshToken}`, {
          refreshToken,
        })

        // token may sit on the body or inside body.data
        const body = response?.data
        const accessToken = body?.data?.accessToken ?? body?.accessToken
        const newRefreshToken = body?.data?.refreshToken ?? body?.refreshToken

        if (!accessToken) {
          forceLogout()
          return Promise.reject(error)
        }

        Cookies.set("accessToken", accessToken)
        if (newRefreshToken) Cookies.set("refreshToken", newRefreshToken)

        // retry the request that failed, with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          toast.error(refreshError.response?.data?.message ?? "Session expired, please login again")
        }
        forceLogout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
