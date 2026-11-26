import type { EmergencyCase, EmergencyCaseFormValues, EmergencyStatus } from "../../type/hospitalType/HospitalEmergency.type"

export interface EmergencyCaseCardProps {
  emergencyCase: EmergencyCase
  onStatusChange: (caseId: string, status: EmergencyStatus) => void
  onAssignDoctor: (caseId: string, doctor: string) => void
}

export interface EmergencyCaseFormProps {
  onSave: (values: EmergencyCaseFormValues) => void
  onCancel: () => void
}