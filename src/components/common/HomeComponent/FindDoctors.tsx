import { Button, Typography } from "@mui/material"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import DoctorCard from "./DoctorCard"
import { doctorsList, HOME_DOCTORS_COUNT } from "../../../constants/public/doctors.constants"
import { hoverGradient, primaryGradient } from "../../../constants/public/ui.constants"


const FindDoctors = () => {

  const featuredDoctors = doctorsList.slice(0, HOME_DOCTORS_COUNT)

  return (
    <section className="w-full bg-medical-bg px-6 py-16 md:px-16">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.2 }}
        >
          Meet Our Specialists
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 2 }}>
          Meet our verified specialists and book an appointment with the doctor you trust.
        </Typography>
      </div>

      {/* Doctor cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* See more */}
      <div className="mt-10 flex justify-center">
        <Button
          component={Link}
          to="/doctors"
          variant="contained"
          size="large"
          disableElevation
          endIcon={<ArrowRight size={18} />}
          sx={{
            borderRadius: 999,
            px: 4,
            background: primaryGradient,
            "&:hover": { background: hoverGradient },
          }}
        >
          See more
        </Button>
      </div>
    </section>
  )
}

export default FindDoctors