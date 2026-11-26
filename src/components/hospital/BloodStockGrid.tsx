import { Droplet, Minus, Plus } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { stockLevelStyles } from "../../constants/hospitalConstants/hospitalBlood.constants"
import { getStockLevel } from "../../services/helper/hospitalHelper/hospitalBlood.helper"
import type { BloodStockGridProps } from "../../types/interface/hospitalInterface/HospitalBlood.interface"

const levelTextColors = {
  ok: "text-emerald-700",
  low: "text-amber-700",
  out: "text-red-600",
}

const BloodStockGrid = ({ stock, onChangeUnits }: BloodStockGridProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-hospital-navy">Blood stock in the hospital</h2>
        <p className="text-sm text-hospital-muted">Units stored in your own blood storage unit.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stock.map((item) => {
          const level = getStockLevel(item.units)
          const style = stockLevelStyles[level]

          return (
            <div key={item.group} className={`flex flex-col items-center gap-2 rounded-xl border p-4 ${style.className}`}>
              <div className="flex items-center gap-1.5">
                <Droplet size={18} className="fill-red-500 text-red-500" />
                <span className="text-xl font-extrabold text-hospital-navy">{item.group}</span>
              </div>
              <p className="text-2xl font-extrabold text-hospital-navy">
                {item.units}
                <span className="text-xs font-semibold text-hospital-muted"> units</span>
              </p>
              <p className={`text-xs font-semibold ${levelTextColors[level]}`}>{style.label}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChangeUnits(item.group, -1)}
                  disabled={item.units === 0}
                  aria-label={`Use 1 unit of ${item.group}`}
                  className="rounded-md border border-hospital-border bg-white p-1.5 text-hospital-navy hover:bg-hospital-bg disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeUnits(item.group, 1)}
                  aria-label={`Add 1 unit of ${item.group}`}
                  className="rounded-md bg-hospital-primary p-1.5 text-white hover:bg-hospital-primary-dark"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BloodStockGrid