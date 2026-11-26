import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DynamicInput from "../common/DynamicInput"
import { signupSchema } from "../../services/validation/signup.validation"
import { SignupInputData, SignupNameLabels, SignupRoleOptions } from "../../services/json/signup.input"
import { registerUseThunk } from "../../store/slice/auth.slice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import type { SignupFormValues, SignupPayload } from "../../types/interface/signup.interface"

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isError } = useAppSelector((state) => state.auth)

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { role: "patient" },
  })

  const selectedRole = watch("role")
  const selectedOption = SignupRoleOptions.find((option) => option.value === selectedRole)

  const onSubmit = async (data: SignupFormValues) => {
    // confirmPassword stays on the frontend
    const payload: SignupPayload = {
      role: data.role,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      password: data.password,
    }

    const response = await dispatch(registerUseThunk(payload))
    console.log("Response in registerform.tsx - ", response)

    if (registerUseThunk.fulfilled.match(response)) {
      toast.success("OTP sent to your email")
      reset() // the slice switches the dialog to VerifyEmail
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", pt: 1 }}>
      {/* Role picker */}
      <div>
        <Typography variant="body2" fontWeight={600} mb={1}>
          I am registering as
        </Typography>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SignupRoleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("role", option.value, { shouldValidate: true })}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                selectedRole === option.value
                  ? "border-medical-primary bg-medical-primary text-white"
                  : "border-medical-border bg-white text-medical-navy hover:bg-medical-bg"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selectedOption && <p className="mt-2 text-xs text-medical-muted">{selectedOption.hint}</p>}
        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
      </div>

      {SignupInputData.map((input) => (
        <DynamicInput
          key={input.name}
          label={input.name === "name" ? SignupNameLabels[selectedRole] : input.label}
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
        {isLoading ? <CircularProgress size={24} /> : "Create Account"}
      </Button>
    </Box>
  )
}

export default RegisterForm
