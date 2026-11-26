export type DonorProfileDetails = {
  fullName: string
  bloodGroup: string
  dateOfBirth: string
  phone: string
  email: string
  city: string
}

export type DonorProfileFieldName = keyof DonorProfileDetails

export type DonorProfileErrors = Partial<Record<DonorProfileFieldName, string>>