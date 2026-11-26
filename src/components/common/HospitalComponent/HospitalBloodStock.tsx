import { Clock, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { bloodGroups, LOW_STOCK_UNITS } from "../../../constants/public/bloods.constants"
import type { HospitalBloodStockProps } from "../../../types/interface/public/Hospital.interface"

const HospitalBloodStock = ({ bank }: HospitalBloodStockProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {bloodGroups.map((group) => {
          const units = bank.stock[group]
          const outOfStock = units === 0
          const lowStock = !outOfStock && units < LOW_STOCK_UNITS

          return (
            <article
              key={group}
              className={`rounded-2xl border border-medical-border bg-white p-4 text-center shadow-sm shadow-medical-navy/5 ${
                outOfStock ? "opacity-60" : ""
              }`}
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-red-400 to-red-600 text-base font-extrabold text-white">
                {group}
              </span>
              <p className="mt-3 text-3xl font-extrabold text-medical-navy">{units}</p>
              <p className="text-xs text-medical-muted">units available</p>
              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  outOfStock
                    ? "bg-red-50 text-red-600"
                    : lowStock
                      ? "bg-amber-50 text-amber-700"
                      : "bg-medical-bg-soft text-medical-primary-dark"
                }`}
              >
                {outOfStock ? "Out of stock" : lowStock ? "Low stock" : "Available"}
              </span>
            </article>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-medical-muted">
        <p className="flex items-center gap-2">
          <Clock size={15} /> Blood bank timings: {bank.timings}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={15} />
          <a
            href={`tel:${bank.phone.replace(/\s/g, "")}`}
            className="text-medical-primary-dark no-underline hover:underline"
          >
            {bank.phone}
          </a>
        </p>
        <Link to="/blood?tab=blood-banks" className="font-semibold text-medical-primary-dark no-underline hover:underline">
          See all blood banks
        </Link>
      </div>
    </div>
  )
}

export default HospitalBloodStock