import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DynamicInput from "../common/DynamicInput"
import { forgotPasswordSchema } from "../../services/validation/forgotPassword.validation"
import { ForgotPasswordInputData } from "../../services/json/forgotPassword.input"
import { forgotPasswordUseThuk } from "../../store/slice/auth.slice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import type { ForgotPasswordPayload } from "../../types/interface/forgotPassword.interface"

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isError } = useAppSelector((state) => state.auth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordPayload) => {
    const response = await dispatch(forgotPasswordUseThuk(data))
    console.log("Response in forgot password form - ", response)

    if (forgotPasswordUseThuk.fulfilled.match(response)) {
      toast.success("OTP sent to your email")
      reset() // the slice switches the dialog to ResetPassword
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", pt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Enter your registered email. We'll send you a code to reset your password.
      </Typography>

      {ForgotPasswordInputData.map((input) => (
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

      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Send Code"}
      </Button>
    </Box>
  )
}

export default ForgotPasswordForm
