import { DOCTOR_BASE_PATH } from "../../constants/doctorConstants/doctorDashboard.constants"
import { HOSPITAL_BASE_PATH } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { BLOOD_BANK_BASE_PATH } from "../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { DONOR_BASE_PATH } from "../../constants/blood/donorConstants/donorDashboard.constants"
import { PATIENT_BASE_PATH } from "../../constants/patientConstants/patientDashboard.constants"
import type { UserRole } from "../../types/type/auth.type"

// Where each role lands after login
const dashboardBasePaths: Record<UserRole, string> = {
  patient: PATIENT_BASE_PATH,
  doctor: DOCTOR_BASE_PATH,
  hospital: HOSPITAL_BASE_PATH,
  bloodBank: BLOOD_BANK_BASE_PATH,
  camp: BLOOD_BANK_BASE_PATH, // camp organisers use the blood donation dashboard
  donor: DONOR_BASE_PATH,
}

// ("doctor", "d1") -> "/doctorDashboard/dashboard/d1"
export const getDashboardPath = (role: UserRole, userId: string) => `${dashboardBasePaths[role]}/dashboard/${userId}`

// keep the lock after page refresh
export const saveLoginLock = (attempts: number, lockUntil: number | null) => {
  localStorage.setItem("loginAttempts", String(attempts))
  if (lockUntil) localStorage.setItem("loginLockUntil", String(lockUntil))
}

export const clearLoginLock = () => {
  localStorage.removeItem("loginAttempts")
  localStorage.removeItem("loginLockUntil")
}
