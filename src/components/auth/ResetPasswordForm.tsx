import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DynamicInput from "../common/DynamicInput"
import { resetPasswordSchema } from "../../services/validation/resetPassword.validation"
import { ResetPasswordInputData } from "../../services/json/resetPassword.input"
import { forgotPasswordUseThuk, resetPasswordUseThuk } from "../../store/slice/auth.slice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import type { ResetPasswordPayload, ResetPasswordRequest } from "../../types/interface/resetPassword.interface"

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isError, resetEmail } = useAppSelector((state) => state.auth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordPayload) => {
    // API needs email, otp, newPassword, confirmPassword
    const payload: ResetPasswordRequest = {
      email: resetEmail,
      otp: data.otp,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    }

    const response = await dispatch(resetPasswordUseThuk(payload))
    console.log("Response in resetPasswordForm.tsx - ", response)

    if (resetPasswordUseThuk.fulfilled.match(response)) {
      toast.success("Password reset successfully, please login")
      reset() // the slice switches the dialog to Login
    }
  }

  // resend = call forgot password again with the same email
  const resendOtp = async () => {
    if (!resetEmail) {
      toast.error("Email not found, please enter your email again")
      return
    }

    const response = await dispatch(forgotPasswordUseThuk({ email: resetEmail }))
    console.log("Response in resend otp in resetPasswordForm.tsx - ", response)

    if (forgotPasswordUseThuk.fulfilled.match(response)) {
      toast.success("OTP sent again to your email")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", pt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Enter the 6 digit code sent to <b>{resetEmail}</b> and choose a new password.
      </Typography>

      {ResetPasswordInputData.map((input) => (
        <DynamicInput
          key={input.name}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          error={!!errors[input.name]}
          helperText={errors[input.name]?.message}
          register={register(input.name)}
        />
      ))}

      <Button onClick={resendOtp} disabled={isLoading}>
        Resend OTP
      </Button>

      {isError && (
        <Typography color="error" variant="body2">
          {isError}
        </Typography>
      )}

      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
      </Button>
    </Box>
  )
}

export default ResetPasswordForm
