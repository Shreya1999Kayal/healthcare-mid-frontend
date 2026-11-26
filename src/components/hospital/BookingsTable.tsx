import { hospitalAppointmentStatusStyles, hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { bookedViaLabels } from "../../constants/hospitalConstants/hospitalAppointment.constants"
import { formatIsoDate } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { formatTime, getBookingActions } from "../../services/helper/hospitalHelper/hospitalAppointment.helper"
import type { BookingsTableProps } from "../../types/interface/hospitalInterface/HospitalAppointment.interface"

const BookingsTable = ({ bookings, onStatusChange }: BookingsTableProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-230 text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">Date and time</th>
              <th className="py-2 font-medium">Patient</th>
              <th className="py-2 font-medium">Doctor</th>
              <th className="py-2 font-medium">Reason</th>
              <th className="py-2 font-medium">Booked via</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const style = hospitalAppointmentStatusStyles[booking.status]
              const actions = getBookingActions(booking)

              return (
                <tr key={booking.id} className="border-b border-hospital-border/60 align-top last:border-0">
                  <td className="py-3">
                    <p className="font-semibold text-hospital-navy">{formatTime(booking.time)}</p>
                    <p className="text-xs text-hospital-muted">{formatIsoDate(booking.date)}</p>
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-hospital-navy">{booking.patient}</p>
                    <p className="text-xs text-hospital-muted">
                      {booking.age} yrs · {booking.gender} · {booking.phone}
                    </p>
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-hospital-navy">{booking.doctor}</p>
                    <p className="text-xs text-hospital-muted">{booking.department}</p>
                  </td>
                  <td className="py-3 text-hospital-navy">{booking.reason}</td>
                  <td className="py-3 text-xs text-hospital-muted">{bookedViaLabels[booking.bookedVia]}</td>
                  <td className="py-3">
                    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
                  </td>
                  <td className="py-3">
                    {actions.length === 0 ? (
                      <span className="text-xs text-hospital-muted">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => onStatusChange(booking.id, action.next)}
                            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                              action.next === "cancelled"
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : "bg-hospital-primary text-white hover:bg-hospital-primary-dark"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default BookingsTable