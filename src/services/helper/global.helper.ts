import Cookies from "js-cookie"

// Clears the login cookies and sends the user to the home page (login opens in a dialog)
export const forceLogout = () => {
  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
  Cookies.remove("role")
  Cookies.remove("user")
  window.location.href = "/"
}
