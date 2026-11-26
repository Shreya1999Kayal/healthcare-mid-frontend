import { useState } from "react"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Hospital as HospitalIcon, MapPin, Star } from "lucide-react"
import { Link } from "react-router-dom"
import type { HospitalListCardProps } from "../../../types/interface/public/Hospital.interface"
import { hoverGradient, primaryGradient } from "../../../constants/public/ui.constants"




// Same details as the Home page card (name, category, rating, photo, location, short bio),
// with a "View more" button that opens the full details page.
const HospitalListCard = ({ hospital }: HospitalListCardProps) => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2, // theme radius is 12, so 2 = 24px (same as rounded-3xl)
        border: "1px solid #CDECEF",
        boxShadow: "0 4px 6px -1px rgba(48,52,95,0.10)",
        p: 1.5,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -6px rgba(48,52,95,0.25)",
        },
      }}
    >
      {/* Name, category and rating */}
      <div className="flex items-start justify-between gap-3 px-1 pt-1">
        <div className="min-w-0">
          <Typography sx={{ fontWeight: 700, color: "secondary.main" }} noWrap>
            {hospital.name}
          </Typography>
          <span className="text-xs font-medium text-medical-muted">{hospital.category}</span>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-medical-bg px-2.5 py-1 text-xs font-semibold text-medical-navy">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {hospital.rating.toFixed(1)}
        </span>
      </div>

      {/* Photo */}
      <div className="mt-3 aspect-4/3 w-full overflow-hidden rounded-2xl bg-linear-to-b from-medical-bg-soft to-medical-primary">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-medical-primary to-medical-navy text-white">
            <HospitalIcon size={56} />
          </div>
        ) : (
          <img
            src={hospital.image}
            alt={hospital.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Location + short bio */}
      <CardContent sx={{ flex: 1, px: 1, pb: 0 }}>
        <span className="flex items-center gap-1 text-xs font-semibold text-medical-primary-dark">
          <MapPin size={14} />
          {hospital.location}
        </span>
        <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mt: 1 }} className="line-clamp-3">
          {hospital.bio}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ gap: 1.5, px: 1, pt: 2, pb: 1, "& > :not(style) ~ :not(style)": { ml: 0 } }}>
        <Button
          component={Link}
          to={`/hospitals/${hospital.id}`}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            borderColor: "#16C7D9",
            color: "#08AFC3",
            "&:hover": { borderColor: "#08AFC3", bgcolor: "#EAFBFC" },
          }}
        >
          View more
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="small"
          fullWidth
          disableElevation
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            background: primaryGradient,
            "&:hover": { background: hoverGradient },
          }}
        >
          Book appointment
        </Button>
      </CardActions>
    </Card>
  )
}

export default HospitalListCard