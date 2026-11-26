import { bankTypeOptions, linkedHospitalOptions } from "./bloodBankVerification.constants"
import type { BloodBankField } from "../../../types/type/blood/bloodBankType/BloodBankVerification.type"
import type { BloodBankProfileFieldName } from "../../../types/type/blood/bloodBankType/BloodBankProfile.type"

export const bloodBankProfileFields: BloodBankField<BloodBankProfileFieldName>[] = [
  { name: "bankName", label: "Blood bank name", required: true },
  { name: "bankType", label: "Blood bank type", required: true, options: bankTypeOptions },
  { name: "linkedHospital", label: "Linked hospital", options: linkedHospitalOptions },
  { name: "phone", label: "Phone", required: true, type: "tel" },
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "timings", label: "Timings", required: true, placeholder: "e.g. Open 24 hours" },
  { name: "city", label: "City", required: true },
  { name: "address", label: "Full address", required: true, type: "textarea", fullWidth: true },
  { name: "about", label: "About", type: "textarea", fullWidth: true, placeholder: "A short line patients will see" },
]