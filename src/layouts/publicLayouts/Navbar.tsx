import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { HeartPulse } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { useLogout } from "../../hooks/useLogout"
import { handleAuthModeChange, handleAuthOpenDialog } from "../../store/slice/auth.slice"
import { getDashboardPath } from "../../services/helper/auth.helper"
import type { AuthMode } from "../../types/type/auth.type"
import { motion } from "framer-motion"
import { hoverGradient, primaryGradient } from "../../constants/public/ui.constants"



const navLinks = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Hospitals", to: "/hospitals" },
  { label: "Doctors", to: "/doctors" },
  { label: "Blood", to: "/blood" },
  { label: "Contact us", to: "/contact" },
]



const Navbar = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = useLogout()
  const { isAuthenticate, user } = useAppSelector((state) => state.auth)

  // Login / Sign up open the auth dialog
  const openAuth = (mode: AuthMode) => {
    dispatch(handleAuthModeChange(mode))
    dispatch(handleAuthOpenDialog())
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #FFFFFF 0%, #EAFBFC 50%, #D9F6F8 100%)",
        borderBottom: "1px solid #CDECEF",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2, px: { xs: 2, md: 6 } }}>
        {/* Left: logo */}
        <Box
          component={NavLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
        >
          <HeartPulse size={28} color="#16C7D9" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: hoverGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Seva
          </Typography>
        </Box>

        {/* Middle: page links (hidden on small screens) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
          {navLinks.map((link) => {
            const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to)

            return (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                end={link.to === "/"}
                color="secondary"
                sx={{
                  position: "relative",
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 2,
                  color: isActive ? "#FFFFFF" : undefined,
                  transition: "color 0.2s ease",
                  "&:hover": { background: isActive ? "transparent" : "#D9F6F8" },
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: primaryGradient,
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
              </Button>
            )
          })}
        </Box>

        {/* Right: Login / Sign up, or Dashboard / Logout when logged in */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isAuthenticate && user ? (
            <>
              <Typography sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600, color: "#30345F" }}>
                Hi, {user.name}
              </Typography>
              <Button
                onClick={() => navigate(getDashboardPath(user.role, user.id))}
                variant="contained"
                size="small"
                disableElevation
                sx={{ borderRadius: 999, px: 2.5, background: primaryGradient, "&:hover": { background: hoverGradient } }}
              >
                Dashboard
              </Button>
              <Button onClick={logout} variant="outlined" size="small" sx={{ borderRadius: 999, px: 2.5 }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => openAuth("Login")}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  "&:hover": { background: primaryGradient, color: "#FFFFFF", borderColor: "transparent" },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => openAuth("SignUp")}
                variant="contained"
                size="small"
                disableElevation
                sx={{ borderRadius: 999, px: 2.5, background: primaryGradient, "&:hover": { background: hoverGradient } }}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar