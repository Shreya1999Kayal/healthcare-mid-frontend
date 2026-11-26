import { useState } from "react"

import type { DoctorAvatarProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { getInitials } from "../../services/helper/doctorHelper/doctorDashboard.helper"

const DoctorAvatar = ({ name, image, className = "h-10 w-10" }: DoctorAvatarProps) => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-doctor-primary to-doctor-primary-dark text-sm font-bold text-white ${className}`}
    >
      {image && !imageFailed ? (
        <img src={image} alt={name} className="h-full w-full object-cover" onError={() => setImageFailed(true)} />
      ) : (
        getInitials(name)
      )}
    </span>
  )
}

export default DoctorAvatar