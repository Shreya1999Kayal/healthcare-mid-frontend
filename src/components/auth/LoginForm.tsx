import { useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DynamicInput from "../common/DynamicInput"
import { loginSchema } from "../../services/validation/login.validation"
import { LoginInputData } from "../../services/json/login.input"
import { getDashboardPath } from "../../services/helper/auth.helper"
import { handleAuthModeChange, loginUseThunk } from "../../store/slice/auth.slice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import type { LoginPayload } from "../../types/interface/login.interface"
import { MAX_LOGIN_ATTEMPTS } from "../../constants/authConstants/auth.constants"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, isError, loginAttempts, loginLockUntil } = useAppSelector((state) => state.auth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginPayload) => {
    const response = await dispatch(loginUseThunk(data))
    console.log("Response in loginform.tsx - ", response)

    if (loginUseThunk.fulfilled.match(response)) {
      const user = response.payload.user
      toast.success(response.payload.message || "Logged in successfully")
      reset() // the slice closes the dialog
      // each role goes to its own dashboard
      navigate(user ? getDashboardPath(user.role, user.id) : "/")
    } else {
      toast.error(response.payload?.message ?? "Login failed")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", pt: 1 }}>
      {LoginInputData.map((input) => (
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

      <Typography
        onClick={() => dispatch(handleAuthModeChange("ForgotPassword"))}
        sx={{ color: "primary.main", cursor: "pointer", alignSelf: "flex-end", fontSize: 14 }}
      >
        Forgot password?
      </Typography>

      {loginAttempts > 0 && !loginLockUntil && (
        <Typography variant="body2" color="warning.main">
          {MAX_LOGIN_ATTEMPTS - loginAttempts} attempt(s) left
        </Typography>
      )}

      {isError && (
        <Typography color="error" variant="body2">
          {isError}
        </Typography>
      )}

      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  )
}

export default LoginForm
