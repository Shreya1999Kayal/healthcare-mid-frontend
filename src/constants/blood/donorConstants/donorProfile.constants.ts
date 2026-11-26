import type { DonorProfileFieldName } from "../../../types/type/blood/donorType/DonorProfile.type"
import type { DonorField } from "../../../types/type/blood/donorType/DonorVerification.type"
import { bloodGroups } from "../../public/bloods.constants"


export const donorProfileFields: DonorField<DonorProfileFieldName>[] = [
  { name: "fullName", label: "Full name", required: true },
  { name: "bloodGroup", label: "Blood group", required: true, options: bloodGroups },
  { name: "dateOfBirth", label: "Date of birth", required: true, type: "date" },
  { name: "phone", label: "Phone", required: true, type: "tel" },
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "city", label: "City / area", required: true },
]