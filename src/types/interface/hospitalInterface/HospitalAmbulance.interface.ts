import type { AmbulanceFormValues, AmbulanceTrip, AmbulanceVehicle } from "../../type/hospitalType/HospitalAmbulance.type"

export interface AmbulanceCardProps {
  ambulance: AmbulanceVehicle
  onDispatch: (ambulanceId: string, trip: AmbulanceTrip) => void
  onCompleteTrip: (ambulanceId: string) => void
  onToggleMaintenance: (ambulanceId: string) => void
  onEdit: (ambulance: AmbulanceVehicle) => void
  onDelete: (ambulance: AmbulanceVehicle) => void
}

export interface AmbulanceFormProps {
  ambulance?: AmbulanceVehicle // empty when adding a new ambulance
  ambulances: AmbulanceVehicle[] // used to stop duplicate vehicle numbers
  onSave: (values: AmbulanceFormValues) => void
  onCancel: () => void
}