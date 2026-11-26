export type BloodBankProfileDetails = {
  bankName: string
  bankType: string
  linkedHospital: string
  phone: string
  email: string
  timings: string
  city: string
  address: string
  about: string
}

export type BloodBankProfileFieldName = keyof BloodBankProfileDetails

export type BloodBankProfileErrors = Partial<Record<BloodBankProfileFieldName, string>>