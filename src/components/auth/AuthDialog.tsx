import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import ForgotPasswordForm from "./ForgotPasswordForm"
import ResetPasswordForm from "./ResetPasswordForm"
import VerifyEmailForm from "./VerifyEmailForm"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { handleAuthCloseDialog, handleAuthModeChange } from "../../store/slice/auth.slice"

const AuthDialog = () => {
  const dispatch = useAppDispatch()
  const { authDialog, authMode } = useAppSelector((state) => state.auth)

  return (
    <Dialog open={authDialog} onClose={() => dispatch(handleAuthCloseDialog())} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 800 }}>
        {authMode === "Login"
          ? "Login"
          : authMode === "ForgotPassword"
            ? "Forgot Password"
            : authMode === "ResetPassword"
              ? "Reset Password"
              : authMode === "VerifyEmail"
                ? "Verify Email"
                : "Sign Up"}
      </DialogTitle>

      <DialogContent>
        {authMode === "Login" ? (
          <LoginForm />
        ) : authMode === "ForgotPassword" ? (
          <ForgotPasswordForm />
        ) : authMode === "ResetPassword" ? (
          <ResetPasswordForm />
        ) : authMode === "VerifyEmail" ? (
          <VerifyEmailForm />
        ) : (
          <RegisterForm />
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        {authMode === "Login" ? (
          <Typography variant="body2">
            Don't have an account?
            <Button onClick={() => dispatch(handleAuthModeChange("SignUp"))}>Sign Up</Button>
          </Typography>
        ) : (
          <Typography variant="body2">
            {authMode === "SignUp" ? "Already have an account?" : "Back to"}
            <Button onClick={() => dispatch(handleAuthModeChange("Login"))}>Login</Button>
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AuthDialog
