import AdminVerificationPanel from "../../components/admin/AdminVerificationPanel"

const DonorVerification = () => (
  <AdminVerificationPanel
    title="Donor verification"
    subtitle="Check donor ID proof and blood group report."
    roles={["donor"]}
  />
)

export default DonorVerification
