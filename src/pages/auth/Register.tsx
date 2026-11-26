import RegisterForm from "../../components/auth/RegisterForm"

const Register = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-medical-bg px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-medical-border bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-extrabold text-medical-navy">Create your Seva account</h1>
        <p className="mb-6 mt-1 text-sm text-medical-muted">Choose your role and fill in the basic details.</p>
        <RegisterForm />
      </div>
    </section>
  )
}

export default Register
