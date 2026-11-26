import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const ServicesCta = () => {
  return (
    <section className="w-full px-6 py-16 md:px-16">
      <div className="rounded-3xl bg-linear-to-br from-medical-navy to-[#1E2148] px-6 py-14 text-center">
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, color: "#FFFFFF" }}
        >
          Ready to take care of your health?
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.75)", mt: 2, mb: 4 }}>
          Create your free account and book your first appointment today.
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          size="large"
          disableElevation
          sx={{
            borderRadius: 999,
            px: 5,
            background: "linear-gradient(135deg, #16C7D9 0%, #08AFC3 100%)",
            "&:hover": { background: "linear-gradient(135deg, #08AFC3 0%, #FFFFFF 220%)" },
          }}
        >
          Get started
        </Button>
      </div>
    </section>
  )
}

export default ServicesCta