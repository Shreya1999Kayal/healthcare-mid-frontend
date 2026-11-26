import {
  Ambulance,
  BedDouble,
  Building2,
  CalendarHeart,
  Droplets,
  HandHeart,
  Stethoscope,
  Tent,
} from "lucide-react"
import type { IService, IStat } from "../../types/interface/public/Service.interface"


export const services: IService[] = [
  {
    title: "Find doctors",
    description: "Search verified doctors by speciality and book an appointment online.",
    to: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Hospitals",
    description: "Compare hospitals, departments, beds and facilities near you.",
    to: "/hospitals",
    icon: Building2,
  },
  {
    title: "Blood banks",
    description: "Check live blood availability and place a blood request.",
    to: "/blood",
    icon: Droplets,
  },
  {
    title: "Blood donors",
    description: "Find registered donors by blood group or become a donor yourself.",
    to: "/blood?tab=donors",
    icon: HandHeart,
  },
  {
    title: "Blood camps",
    description: "Discover upcoming donation camps and register to take part.",
    to: "/blood?tab=camps",
    icon: Tent,
  },
  {
    title: "Appointments",
    description: "Manage bookings, prescriptions and medical records in one place.",
    to: "/login",
    icon: CalendarHeart,
  },
]

export const marqueeItems = [
  "Doctors",
  "Hospitals",
  "Blood banks",
  "Blood donors",
  "Blood camps",
  "Ambulance",
  "ICU beds",
  "Appointments",
]

// placeholder numbers, replace with real ones later
export const stats: IStat[] = [
  { value: "500+", label: "Verified doctors" },
  { value: "120+", label: "Partner hospitals" },
  { value: "50+", label: "Blood banks" },
]

export const emergencyItems: IService[] = [
  {
    title: "Ambulance help",
    description: "Find the nearest available ambulance from hospitals around you.",
    to: "/hospitals?search=Emergency",
    icon: Ambulance,
  },
  {
    title: "ICU and oxygen beds",
    description: "See bed availability before you travel, so no time is lost.",
    to: "/hospitals",
    icon: BedDouble,
  },
]