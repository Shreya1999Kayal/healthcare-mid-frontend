import AdminVerificationPanel from "../../components/admin/AdminVerificationPanel"

// Blood banks and camp organisers together; use the role filter to see one
const BloodBankVerification = () => (
  <AdminVerificationPanel
    title="Blood bank and camp verification"
    subtitle="Check licences and registration of blood banks and camp organisers."
    roles={["bloodBank", "camp"]}
  />
)

export default BloodBankVerification
