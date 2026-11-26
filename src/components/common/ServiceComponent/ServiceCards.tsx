import { useState } from "react"
import { Typography } from "@mui/material"
import { HeartPulse } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { services } from "../../../constants/public/services.constants"
import type { IService } from "../../../types/interface/public/Service.interface"


const IMAGE_SRC = "/images/services/services-center.jpeg"

const leftServices = services.slice(0, 3)
const rightServices = services.slice(3, 6)

interface IServiceItemProps {
  service: IService
  align: "left" | "right"
  index: number
}

const ServiceItem = ({ service, align, index }: IServiceItemProps) => {
  const Icon = service.icon
  const fromLeft = align === "left"

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={service.to}
        className={`group flex items-center gap-4 rounded-3xl border border-medical-border bg-white p-5 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-linear-to-br hover:from-medical-primary hover:to-medical-primary-dark hover:shadow-xl hover:shadow-medical-primary/25 ${
          fromLeft ? "lg:flex-row-reverse lg:text-right" : ""
        }`}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-medical-bg text-medical-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
          <Icon size={28} />
        </span>
        <div>
          <h3 className="text-base font-bold text-medical-navy transition-colors group-hover:text-white">
            {service.title}
          </h3>
          <p className="mt-1 text-sm text-medical-muted transition-colors group-hover:text-white/90">
            {service.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

const ServiceCards = () => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className="w-full px-6 py-16 md:px-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Your wellness, our priority
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 2, mx: "auto", maxWidth: 520 }}>
          Everything you need to get care faster and with confidence.
        </Typography>
      </div>

      {/* Left cards | centre picture | right cards */}
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_380px_1fr]">
        {/* Picture: first on mobile, middle on desktop */}
        <div className="relative order-first flex justify-center lg:order-0 lg:col-start-2 lg:row-start-1">
          {/* soft background circle behind the picture */}
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-full bg-linear-to-b from-medical-bg-soft to-medical-bg" />

          {imageFailed ? (
            <div className="relative flex h-96 w-full max-w-xs items-center justify-center rounded-[3rem] border border-medical-border bg-white text-medical-primary">
              <HeartPulse size={96} />
            </div>
          ) : (
            <img
              src={IMAGE_SRC}
              alt="Seva healthcare team"
              onError={() => setImageFailed(true)}
              className="relative h-auto w-full max-w-xs rounded-[3rem] object-cover shadow-xl shadow-medical-navy/15"
            />
          )}
        </div>

        {/* Left services */}
        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          {leftServices.map((service, index) => (
            <ServiceItem key={service.title} service={service} align="left" index={index} />
          ))}
        </div>

        {/* Right services */}
        <div className="flex flex-col gap-6 lg:col-start-3 lg:row-start-1">
          {rightServices.map((service, index) => (
            <ServiceItem key={service.title} service={service} align="right" index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards