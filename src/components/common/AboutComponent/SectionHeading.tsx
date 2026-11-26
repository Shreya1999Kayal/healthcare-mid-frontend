// Small teal bar + title, used at the top of every block on the About page
const SectionHeading = ({ title }: { title: string }) => {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-xl font-extrabold text-medical-navy md:text-2xl">
      <span className="h-6 w-1.5 rounded-full bg-linear-to-b from-medical-primary to-medical-primary-dark" />
      {title}
    </h2>
  )
}

export default SectionHeading