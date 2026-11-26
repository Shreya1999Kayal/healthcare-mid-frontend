import { useState } from "react"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { ArrowRight, Building2 } from "lucide-react"
import { Link } from "react-router-dom"

import { getDoctorChambers, getInitials } from "../../../services/helper/public/doctor.helper"
import { hoverGradient, primaryGradient } from "../../../constants/public/ui.constants"
import type { DoctorListCardProps } from "../../../types/interface/public/Doctor.interface"


// Same details as the Home page card (photo, name, speciality),
// plus a "View more" button that opens the full details page.
const DoctorListCard = ({ doctor }: DoctorListCardProps) => {
  const [imageFailed, setImageFailed] = useState(false)


  // Main hospital first, then "+2 more" when the doctor sits in other hospitals too
  const chambers = getDoctorChambers(doctor.id)
  const placeLabel =
    chambers.length === 0
      ? doctor.hospital
      : chambers.length === 1
        ? chambers[0].hospitalName
        : `${chambers[0].hospitalName} +${chambers.length - 1} more`

  return (
    <Card
      sx={{
        borderRadius: 2, // theme radius is 12, so 2 = 24px (same as rounded-3xl)
        border: "1px solid #CDECEF",
        boxShadow: "0 4px 6px -1px rgba(48,52,95,0.10)",
        p: 1.5,
        textAlign: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -6px rgba(48,52,95,0.25)",
        },
      }}
    >
      {/* Photo */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-linear-to-b from-medical-bg-soft to-medical-primary">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-medical-primary to-medical-navy text-5xl font-bold text-white">
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

      {/* Name + speciality */}
      <CardContent sx={{ px: 1, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, color: "secondary.main" }}>{doctor.name}</Typography>
        <span className="mt-2 inline-block rounded-full bg-medical-bg px-3 py-1 text-xs font-semibold text-medical-primary-dark">
          {doctor.speciality}
        </span>
        <p className="mt-3 flex items-center justify-center gap-1 text-xs text-medical-muted">
          <Building2 size={14} /> {placeLabel}
        </p>
      </CardContent>

      {/* View more */}
      <CardActions sx={{ px: 1, pt: 0, pb: 1 }}>
        <Button
          component={Link}
          to={`/doctors/${doctor.id}`}
          variant="contained"
          size="small"
          fullWidth
          disableElevation
          endIcon={<ArrowRight size={16} />}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            background: primaryGradient,
            "&:hover": { background: hoverGradient },
          }}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  )
}

export default DoctorListCard