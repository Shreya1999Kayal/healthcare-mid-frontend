import AdminVerificationPanel from "../../components/admin/AdminVerificationPanel"

const HospitalVerification = () => (
  <AdminVerificationPanel
    title="Hospital verification"
    subtitle="Check registration, NABH and fire safety certificates."
    roles={["hospital"]}
  />
)

export default HospitalVerification
