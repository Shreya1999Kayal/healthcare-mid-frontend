import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAppDispatch } from "./useRedux"
import { logoutUseThunk } from "../store/slice/auth.slice"

// One logout for everywhere (navbar and every dashboard sidebar)
export const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    const refreshToken = Cookie.get("refreshToken") ?? ""
    const response = await dispatch(logoutUseThunk(refreshToken))
    console.log("Logout Response - ", response)

    if (logoutUseThunk.fulfilled.match(response)) {
      toast.success(response.payload.message || "Logged out")
      navigate("/")
    } else {
      toast.error((response.payload as { message?: string })?.message ?? "Logout failed")
    }
  }

  return logout
}
