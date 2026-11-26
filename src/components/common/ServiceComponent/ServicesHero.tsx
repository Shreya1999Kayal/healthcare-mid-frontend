import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { stats } from "../../../constants/public/services.constants"
import { hoverGradient, primaryGradient } from "../../../constants/public/ui.constants"

const ServicesHero = () => {
  return (
    <section className="w-full bg-linear-to-br from-white via-medical-bg to-medical-bg-soft px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-full border border-medical-border bg-white px-4 py-1 text-sm font-semibold text-medical-primary-dark"
        >
          Our Services
        </motion.span>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1.15 }}
          >
            Quality healthcare services, close to home
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2, mx: "auto", maxWidth: 560 }}>
            Doctors, hospitals, blood banks and emergency help together in one place, so care is
            never far away.
          </Typography>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            component={Link}
            to="/doctors"
            variant="contained"
            size="large"
            disableElevation
            sx={{
              borderRadius: 999,
              px: 4,
              background: primaryGradient,
              "&:hover": { background: hoverGradient },
            }}
          >
            Find a doctor
          </Button>
          <Button
            component={Link}
            to="/blood"
            variant="outlined"
            size="large"
            sx={{ borderRadius: 999, px: 4 }}
          >
            Find blood
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid w-full grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-medical-border bg-white px-2 py-5 shadow-sm"
            >
              <p className="text-2xl font-extrabold text-medical-navy md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-medical-muted md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesHero