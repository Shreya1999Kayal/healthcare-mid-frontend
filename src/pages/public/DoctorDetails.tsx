import { useState } from "react"
import { Button, Typography } from "@mui/material"
import { ArrowLeft, Briefcase, Building2, CalendarCheck, Clock, Languages, MapPin, Star, UserRound } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { doctorsList } from "../../constants/public/doctors.constants"
import type { Doctor } from "../../types/type/public/Doctor.type"
import { formatFee, getDoctorChambers, getInitials } from "../../services/helper/public/doctor.helper"
import { hoverGradient, primaryGradient } from "../../constants/public/ui.constants"
import DoctorChambers from "../../components/common/userDoctor/DoctorChambers"



const DoctorPhoto = ({ doctor }: { doctor: Doctor }) => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-linear-to-b from-medical-bg-soft to-medical-primary">
      {imageFailed ? (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-medical-primary to-medical-navy text-7xl font-bold text-white">
          {getInitials(doctor.name)}
        </div>
      ) : (
        <img
          src={doctor.image}
          alt={doctor.name}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  )
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-medical-border bg-white p-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-medical-bg text-medical-primary-dark">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-xs font-semibold text-medical-muted">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-medical-navy">{value}</p>
    </div>
  </div>
)

const DoctorDetails = () => {
  const { id } = useParams()
  const doctor = doctorsList.find((d) => d.id === id)

  // Wrong or old link, e.g. /doctors/999
  if (!doctor) {
    return (
      <section className="flex w-full flex-col items-center bg-medical-bg px-6 py-24 text-center md:px-16">
        <UserRound size={56} className="text-medical-primary" />
        <Typography variant="h3" sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, mt: 2 }}>
          Doctor not found
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1, mb: 4 }}>
          This profile does not exist or may have been removed.
        </Typography>
        <Button
          component={Link}
          to="/doctors"
          variant="contained"
          disableElevation
          sx={{ borderRadius: 999, px: 4, textTransform: "none", fontWeight: 600, background: primaryGradient, "&:hover": { background: hoverGradient } }}
        >
          Back to all doctors
        </Button>
      </section>
    )
  }

  return (
    <section className="w-full bg-linear-to-b from-white to-medical-bg px-6 py-10 md:px-16 md:py-14">
      <Link
        to="/doctors"
        className="inline-flex items-center gap-2 text-sm font-semibold text-medical-primary-dark transition-colors hover:text-medical-navy"
      >
        <ArrowLeft size={16} />
        Back to all doctors
      </Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[340px_1fr]">
        {/* Left: photo, name, speciality, rating */}
        <div className="rounded-3xl border border-medical-border bg-white p-4 text-center shadow-md shadow-medical-navy/10">
          <DoctorPhoto key={doctor.id} doctor={doctor} />
          <Typography sx={{ fontWeight: 700, color: "secondary.main", fontSize: "1.3rem", mt: 3 }}>
            {doctor.name}
          </Typography>
          <span className="mt-2 inline-block rounded-full bg-medical-bg px-3 py-1 text-xs font-semibold text-medical-primary-dark">
            {doctor.speciality}
          </span>
          <div className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-medical-navy">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            {doctor.rating.toFixed(1)} rating
          </div>
        </div>

        {/* Right: details */}
        <div>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.2 }}>
            About {doctor.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2, maxWidth: 640 }}>{doctor.about}</Typography>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoItem icon={<Briefcase size={20} />} label="Experience" value={`${doctor.experience} years`} />
            <InfoItem icon={<CalendarCheck size={20} />} label="Consultation fee" value={formatFee(doctor.fee)} />
            <InfoItem icon={<Building2 size={20} />} label="Hospital" value={doctor.hospital} />
            <InfoItem icon={<MapPin size={20} />} label="Location" value={doctor.location} />
            <InfoItem icon={<UserRound size={20} />} label="Qualifications" value={doctor.qualifications} />
            <InfoItem icon={<Languages size={20} />} label="Languages" value={doctor.languages.join(", ")} />
            <InfoItem icon={<Clock size={20} />} label="Availability" value={doctor.availability} />
          </div>

          {/* Every hospital where this doctor sits, with days and time */}
          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-medical-navy">Chambers and visiting days</h2>
            <DoctorChambers chambers={getDoctorChambers(doctor.id)} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              disableElevation
              sx={{ borderRadius: 999, px: 4, textTransform: "none", fontWeight: 600, background: primaryGradient, "&:hover": { background: hoverGradient } }}
            >
              Book appointment
            </Button>
            <Button
              component={Link}
              to="/doctors"
              variant="outlined"
              size="large"
              sx={{ borderRadius: 999, px: 4, textTransform: "none", fontWeight: 600 }}
            >
              See other doctors
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorDetails