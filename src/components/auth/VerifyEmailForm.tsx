import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DynamicInput from "../common/DynamicInput"
import { verifyEmailSchema } from "../../services/validation/verifyEmail.validation"
import { VerifyEmailInputData } from "../../services/json/verifyEmail.input"
import { resendOtpFns } from "../../services/api/api-function/auth.function"
import { verifyEmailUseThuk } from "../../store/slice/auth.slice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import type { VerifyEmailFormValues, VerifyEmailPayload } from "../../types/interface/verifyEmail.interface"

const VerifyEmailForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isError, verifyEmail } = useAppSelector((state) => state.auth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: yupResolver(verifyEmailSchema),
  })

  const onSubmit = async (data: VerifyEmailFormValues) => {
    const payload: VerifyEmailPayload = {
      email: verifyEmail,
      otp: data.otp,
    }

    const response = await dispatch(verifyEmailUseThuk(payload))
    console.log("Response in verifyEmailForm.tsx - ", response)

    if (verifyEmailUseThuk.fulfilled.match(response)) {
      toast.success("Email is verified successfully, please Login")
      reset() // the slice switches the dialog to Login
    }
  }

  const resendOtp = async () => {
    if (!verifyEmail) {
      toast.error("Email not found, please register again")
      return
    }

    const response = await resendOtpFns(verifyEmail)
    console.log("Response in resend otp in verifyEmailForm.tsx - ", response)

    if (response.success) {
      toast.success("OTP sent again to your email")
    } else {
      toast.error(response.message)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", pt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        We have sent a 6 digit code to <b>{verifyEmail}</b>. Enter it below to verify your account.
      </Typography>

      {VerifyEmailInputData.map((input) => (
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

      {isError && (
        <Typography color="error" variant="body2">
          {isError}
        </Typography>
      )}

      <Button onClick={resendOtp} disabled={isLoading}>
        Resend OTP
      </Button>
      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Verify Email"}
      </Button>
    </Box>
  )
}

export default VerifyEmailForm
