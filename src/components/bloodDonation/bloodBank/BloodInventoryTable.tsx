import { useState } from "react"
import BloodBankBadge from "./BloodBankBadge"
import { bloodBankCardClass, bloodBankFieldClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { stockLevelStyles } from "../../../constants/blood/bloodBankConstants/bloodBankInventory.constants"
import { validateStockUnits } from "../../../services/helper/blood/bloodBankHelper/bloodBankInventory.helper"
import type { BloodInventoryTableProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankInventory.interface"
import type { BloodGroup } from "../../../types/type/public/Blood.type"
import type { InventoryRow } from "../../../types/type/blood/bloodBankType/BloodBankInventory.type"

const BloodInventoryTable = ({ rows, onUpdateStock }: BloodInventoryTableProps) => {
  // Only one group is edited at a time
  const [editingGroup, setEditingGroup] = useState<BloodGroup | null>(null)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const startEdit = (row: InventoryRow) => {
    setEditingGroup(row.group)
    setValue(String(row.total))
    setError("")
  }

  const cancelEdit = () => {
    setEditingGroup(null)
    setError("")
  }

  const saveEdit = (row: InventoryRow) => {
    const problem = validateStockUnits(value, row.reserved)
    setError(problem)
    if (problem) return
    onUpdateStock(row.group, Number(value))
    setEditingGroup(null)
  }

  return (
    <div className={`${bloodBankCardClass} overflow-x-auto p-0`}>
      <table className="w-full min-w-160 text-left text-sm">
        <thead className="bg-blood-bg text-xs uppercase tracking-wide text-blood-muted">
          <tr>
            <th className="px-4 py-3">Blood group</th>
            <th className="px-4 py-3">Total units</th>
            <th className="px-4 py-3">Reserved</th>
            <th className="px-4 py-3">Available</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blood-border">
          {rows.map((row) => {
            const isEditing = editingGroup === row.group

            return (
              <tr key={row.group}>
                <td className="px-4 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blood-bg-soft font-bold text-blood-primary-dark">
                    {row.group}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        min={row.reserved}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        aria-label={`Total units of ${row.group}`}
                        className={`${bloodBankFieldClass} w-24`}
                      />
                      {error && <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>}
                    </div>
                  ) : (
                    <span className="font-semibold text-blood-navy">{row.total}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-blood-muted">{row.reserved}</td>
                <td className="px-4 py-3 text-base font-bold text-blood-navy">{row.available}</td>
                <td className="px-4 py-3">
                  <BloodBankBadge style={stockLevelStyles[row.level]} />
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => saveEdit(row)}
                        className="rounded-md bg-blood-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blood-primary-dark"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="rounded-md border border-blood-border px-3 py-1.5 text-xs font-semibold text-blood-navy hover:bg-blood-bg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      disabled={editingGroup !== null}
                      className="rounded-md border border-blood-primary px-3 py-1.5 text-xs font-semibold text-blood-primary-dark hover:bg-blood-bg-soft disabled:opacity-40"
                    >
                      Edit units
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BloodInventoryTable