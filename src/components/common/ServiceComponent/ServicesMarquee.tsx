import { motion } from "framer-motion"
import { HeartPulse } from "lucide-react"
import { marqueeItems } from "../../../constants/public/services.constants"

const ServicesMarquee = () => {
  // list is repeated twice so the loop has no gap
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <section className="w-full overflow-hidden bg-medical-navy py-4">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap text-white"
          >
            <HeartPulse size={18} className="text-medical-primary" />
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  )
}

export default ServicesMarquee

