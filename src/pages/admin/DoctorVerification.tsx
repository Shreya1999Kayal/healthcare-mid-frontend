import AdminVerificationPanel from "../../components/admin/AdminVerificationPanel"

const DoctorVerification = () => (
  <AdminVerificationPanel
    title="Doctor verification"
    subtitle="Check doctor ID, certificates and Aadhaar before the doctor dashboard unlocks."
    roles={["doctor"]}
  />
)

export default DoctorVerification
