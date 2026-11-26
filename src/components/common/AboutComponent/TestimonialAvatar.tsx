import { useState } from "react"
import { getInitials } from "../../../services/helper/public/doctor.helper"

const TestimonialAvatar = ({ name, image }: { name: string; image?: string }) => {
  const [imageFailed, setImageFailed] = useState(false)

  if (!image || imageFailed) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-medical-primary to-medical-navy text-sm font-bold text-white">
        {getInitials(name)}
      </span>
    )
  }

  return (
    <img
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setImageFailed(true)}
      className="h-10 w-10 shrink-0 rounded-full object-cover"
    />
  )
}

export default TestimonialAvatar