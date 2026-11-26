import type { AdminStatusStyle } from "../../types/type/adminType/AdminDashboard.type"
import type {
  AdminAmbulance,
  AdminAmbulanceStatus,
  AdminAppointment,
  AdminAppointmentStatus,
  AdminBloodBank,
  AdminBloodBankTab,
  AdminBloodGroup,
  AdminBloodRequest,
  AdminBloodRequestStatus,
  AdminCamp,
  AdminCampStatus,
  AdminDoctor,
  AdminDonor,
  AdminEmergencyCase,
  AdminEmergencyStatus,
  AdminFeedback,
  AdminFeedbackStatus,
  AdminFilterOption,
  AdminHospital,
  AdminHospitalCapacity,
  AdminProviderStatus,
  AdminReviewTarget,
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
} from "../../types/type/adminType/AdminManagement.type"

// Value of the "All ..." option in every select
export const ADMIN_ALL = "all"

// System values (will move to Settings later)
export const ADMIN_DONATION_GAP_DAYS = 90
export const ADMIN_LOW_STOCK_UNITS = 5 // below this = low stock
export const ADMIN_ICU_CRITICAL = 2 // ICU free beds at or below this = critical

// Table rows and small buttons on management pages
export const adminRowClass = "border-b border-admin-border/60 align-top last:border-0"
export const adminCellClass = "py-3 pr-3"
export const adminViewButtonClass =
  "rounded-md bg-admin-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-admin-primary-dark"
export const adminOutlineButtonClass =
  "rounded-md border border-admin-border px-3 py-1.5 text-xs font-semibold text-admin-navy hover:bg-admin-bg"
export const adminDangerButtonClass =
  "rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
export const adminSuccessButtonClass =
  "rounded-md border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"

export const adminBloodGroups: AdminBloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export const adminBloodBankTabs: { value: AdminBloodBankTab; label: string }[] = [
  { value: "banks", label: "Blood banks" },
  { value: "camps", label: "Camps" },
]

export const adminUserRoleLabels: Record<AdminUserRole, string> = {
  patient: "Patient",
  doctor: "Doctor",
  hospital: "Hospital",
  bloodBank: "Blood bank",
  camp: "Camp organiser",
  donor: "Donor",
}

export const adminReviewTargetLabels: Record<AdminReviewTarget, string> = {
  doctor: "Doctor",
  hospital: "Hospital",
  bloodBank: "Blood bank",
  camp: "Camp",
}

export const adminUserStatusStyles: Record<AdminUserStatus, AdminStatusStyle> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700" },
  blocked: { label: "Blocked", className: "bg-red-50 text-red-600" },
}

export const adminProviderStatusStyles: Record<AdminProviderStatus, AdminStatusStyle> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700" },
  suspended: { label: "Suspended", className: "bg-slate-100 text-slate-600" },
}

export const adminCampStatusStyles: Record<AdminCampStatus, AdminStatusStyle> = {
  upcoming: { label: "Upcoming", className: "bg-sky-50 text-sky-700" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600" },
}

export const adminAppointmentStatusStyles: Record<AdminAppointmentStatus, AdminStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", className: "bg-admin-bg-soft text-admin-primary-dark" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600" },
}

export const adminBloodRequestStatusStyles: Record<AdminBloodRequestStatus, AdminStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accepted", className: "bg-sky-50 text-sky-700" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
}

export const adminEmergencyStatusStyles: Record<AdminEmergencyStatus, AdminStatusStyle> = {
  incoming: { label: "Incoming", className: "bg-red-50 text-red-600" },
  "in-treatment": { label: "In treatment", className: "bg-amber-50 text-amber-700" },
  stable: { label: "Stable", className: "bg-emerald-50 text-emerald-700" },
  closed: { label: "Closed", className: "bg-slate-100 text-slate-600" },
}

export const adminAmbulanceStatusStyles: Record<AdminAmbulanceStatus, AdminStatusStyle> = {
  available: { label: "Available", className: "bg-emerald-50 text-emerald-700" },
  "on-duty": { label: "On duty", className: "bg-amber-50 text-amber-700" },
  maintenance: { label: "Maintenance", className: "bg-slate-100 text-slate-600" },
}

export const adminFeedbackStatusStyles: Record<AdminFeedbackStatus, AdminStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Published", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
}

export const adminFeedbackTabs: { value: AdminFeedbackStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Published" },
  { value: "rejected", label: "Rejected" },
]

export const adminEligibilityOptions: AdminFilterOption[] = [
  { value: "eligible", label: "Eligible now" },
  { value: "waiting", label: "Waiting (90-day gap)" },
]

export const adminRequestTypeOptions: AdminFilterOption[] = [
  { value: "emergency", label: "Emergency only" },
  { value: "normal", label: "Normal only" },
]

// ---------- Placeholder data (today = ADMIN_TODAY = 2026-11-26), replace with the API later ----------

export const adminUsers: AdminUser[] = [
  { id: "p1", name: "Ananya Mitra", email: "ananya@mail.com", phone: "9830016001", role: "patient", city: "Kolkata", joinedOn: "2026-09-12", status: "active" },
  { id: "p2", name: "Kabir Sinha", email: "kabir@mail.com", phone: "9830016002", role: "patient", city: "Howrah", joinedOn: "2026-10-03", status: "blocked" },
  { id: "d2", name: "Dr. Amit Roy", email: "amit.roy@mail.com", phone: "9830012002", role: "doctor", city: "Howrah", joinedOn: "2026-11-18", status: "active" },
  { id: "d4", name: "Dr. Rakesh Jain", email: "rakesh.jain@mail.com", phone: "9830012004", role: "doctor", city: "Kolkata", joinedOn: "2026-08-21", status: "active" },
  { id: "h1", name: "Seva City Hospital", email: "contact@sevacity.in", phone: "9830013002", role: "hospital", city: "Kolkata", joinedOn: "2026-11-10", status: "active" },
  { id: "bb1", name: "City Blood Bank", email: "citybb@mail.com", phone: "9830014004", role: "bloodBank", city: "Kolkata", joinedOn: "2026-07-15", status: "active" },
  { id: "c1", name: "Rotary Blood Camp", email: "rotary@mail.com", phone: "9830014002", role: "camp", city: "Salt Lake", joinedOn: "2026-11-25", status: "active" },
  { id: "dn2", name: "Priya Das", email: "priya@mail.com", phone: "9830015002", role: "donor", city: "Howrah", joinedOn: "2026-11-20", status: "active" },
]

export const adminDoctors: AdminDoctor[] = [
  { id: "d2", name: "Dr. Amit Roy", specialisation: "Cardiology", qualification: "MBBS, DM", hospital: "Seva City Hospital", city: "Howrah", phone: "9830012002", experience: 15, appointments: 342, rating: 4.6, reviews: 128, approvedOn: "2026-11-19", status: "active" },
  { id: "d4", name: "Dr. Rakesh Jain", specialisation: "Orthopaedics", qualification: "MBBS, MS", hospital: "Seva City Hospital", city: "Kolkata", phone: "9830012004", experience: 11, appointments: 210, rating: 4.3, reviews: 76, approvedOn: "2026-08-22", status: "active" },
  { id: "d5", name: "Dr. Nisha Verma", specialisation: "Dermatology", qualification: "MBBS, MD", hospital: "Riverside Hospital", city: "Kolkata", phone: "9830012005", experience: 8, appointments: 158, rating: 4.8, reviews: 94, approvedOn: "2026-09-02", status: "active" },
  { id: "d6", name: "Dr. Sourav Pal", specialisation: "Cardiology", qualification: "MBBS, MD", hospital: "Sunrise Clinic", city: "Durgapur", phone: "9830012006", experience: 6, appointments: 64, rating: 3.2, reviews: 21, approvedOn: "2026-10-14", status: "suspended" },
]

export const adminHospitals: AdminHospital[] = [
  { id: "h1", name: "Seva City Hospital", city: "Kolkata", phone: "9830013002", hospitalType: "Multi-speciality", branches: ["Salt Lake", "Howrah"], departments: ["General Medicine", "Cardiology", "Orthopaedics", "Paediatrics"], doctors: 24, totalBeds: 320, approvedOn: "2026-11-12", status: "active" },
  { id: "h3", name: "Riverside Hospital", city: "Kolkata", phone: "9830013003", hospitalType: "General", branches: ["New Town"], departments: ["General Medicine", "Dermatology"], doctors: 12, totalBeds: 140, approvedOn: "2026-09-01", status: "active" },
  { id: "h4", name: "Sunrise Clinic", city: "Durgapur", phone: "9830013004", hospitalType: "Clinic", branches: [], departments: ["Cardiology"], doctors: 4, totalBeds: 30, approvedOn: "2026-10-10", status: "suspended" },
]

export const adminBloodBanks: AdminBloodBank[] = [
  { id: "bb1", name: "City Blood Bank", city: "Kolkata", phone: "9830014004", linkedHospital: "Seva City Hospital", status: "active", stock: { "A+": 22, "A-": 3, "B+": 30, "B-": 4, "AB+": 9, "AB-": 1, "O+": 35, "O-": 2 } },
  { id: "bb3", name: "Red Drop Blood Bank", city: "Howrah", phone: "9830014005", linkedHospital: "Riverside Hospital", status: "active", stock: { "A+": 12, "A-": 6, "B+": 18, "B-": 7, "AB+": 5, "AB-": 5, "O+": 20, "O-": 6 } },
  { id: "bb4", name: "Hope Blood Centre", city: "Durgapur", phone: "9830014006", linkedHospital: "Sunrise Clinic", status: "suspended", stock: { "A+": 4, "A-": 0, "B+": 6, "B-": 1, "AB+": 2, "AB-": 0, "O+": 8, "O-": 0 } },
]

export const adminCamps: AdminCamp[] = [
  { id: "cp1", title: "Winter Blood Drive", organiser: "Rotary Club Salt Lake", bloodBank: "City Blood Bank", city: "Salt Lake", date: "2026-12-05", registered: 85, collected: 0, status: "upcoming" },
  { id: "cp2", title: "College Donation Camp", organiser: "Howrah Youth Club", bloodBank: "Red Drop Blood Bank", city: "Howrah", date: "2026-11-15", registered: 120, collected: 96, status: "completed" },
  { id: "cp3", title: "Office Health Day", organiser: "Tech Park Welfare", bloodBank: "City Blood Bank", city: "New Town", date: "2026-11-22", registered: 40, collected: 0, status: "cancelled" },
]

export const adminDonors: AdminDonor[] = [
  { id: "dn1", name: "Rahul Sen", bloodGroup: "O-", city: "Kolkata", phone: "9830015001", lastDonation: "2026-07-02", donations: 6, status: "active" },
  { id: "dn2", name: "Priya Das", bloodGroup: "A+", city: "Howrah", phone: "9830015002", lastDonation: "2026-10-20", donations: 3, status: "active" },
  { id: "dn3", name: "Arjun Paul", bloodGroup: "B+", city: "Kolkata", phone: "9830015003", lastDonation: "", donations: 0, status: "active" },
  { id: "dn4", name: "Meera Bose", bloodGroup: "AB-", city: "Salt Lake", phone: "9830015004", lastDonation: "2026-08-15", donations: 9, status: "active" },
  { id: "dn5", name: "Rohit Das", bloodGroup: "O+", city: "Durgapur", phone: "9830015005", lastDonation: "2026-09-30", donations: 2, status: "suspended" },
]

export const adminAppointments: AdminAppointment[] = [
  { id: "apt1", patient: "Rahul Sen", doctor: "Dr. Amit Roy", hospital: "Seva City Hospital", date: "2026-11-26", time: "10:30 AM", status: "confirmed" },
  { id: "apt2", patient: "Priya Das", doctor: "Dr. Rakesh Jain", hospital: "Seva City Hospital", date: "2026-11-26", time: "11:00 AM", status: "pending" },
  { id: "apt3", patient: "Imran Khan", doctor: "Dr. Nisha Verma", hospital: "Riverside Hospital", date: "2026-11-25", time: "4:00 PM", status: "completed" },
  { id: "apt4", patient: "Tania Dey", doctor: "Dr. Amit Roy", hospital: "Seva City Hospital", date: "2026-11-24", time: "9:30 AM", status: "cancelled" },
  { id: "apt5", patient: "Neha Roy", doctor: "Dr. Sourav Pal", hospital: "Sunrise Clinic", date: "2026-11-28", time: "12:00 PM", status: "pending" },
  { id: "apt6", patient: "Kabir Sinha", doctor: "Dr. Nisha Verma", hospital: "Riverside Hospital", date: "2026-11-29", time: "3:30 PM", status: "confirmed" },
]

export const adminBloodRequests: AdminBloodRequest[] = [
  { id: "br1", patient: "Imran Khan", hospital: "Seva City Hospital", bloodBank: "City Blood Bank", bloodGroup: "O-", units: 2, requestedOn: "2026-11-26", status: "pending", emergency: true },
  { id: "br2", patient: "Neha Roy", hospital: "Riverside Hospital", bloodBank: "Red Drop Blood Bank", bloodGroup: "A+", units: 1, requestedOn: "2026-11-25", status: "accepted", emergency: false },
  { id: "br3", patient: "Tania Dey", hospital: "Seva City Hospital", bloodBank: "City Blood Bank", bloodGroup: "B+", units: 3, requestedOn: "2026-11-23", status: "delivered", emergency: false },
  { id: "br4", patient: "Arjun Paul", hospital: "Sunrise Clinic", bloodBank: "Hope Blood Centre", bloodGroup: "AB-", units: 2, requestedOn: "2026-11-22", status: "rejected", emergency: false },
  { id: "br5", patient: "Meera Bose", hospital: "Riverside Hospital", bloodBank: "Red Drop Blood Bank", bloodGroup: "O+", units: 4, requestedOn: "2026-11-26", status: "pending", emergency: false },
]

export const adminEmergencyCases: AdminEmergencyCase[] = [
  { id: "em1", patient: "Unknown male", age: 40, condition: "Road accident, head injury", hospital: "Seva City Hospital", city: "Kolkata", ambulance: "WB 06 CD 5678", reportedAt: "12:40 AM", status: "incoming" },
  { id: "em2", patient: "Sima Ghosh", age: 62, condition: "Chest pain, suspected heart attack", hospital: "Riverside Hospital", city: "Kolkata", ambulance: "", reportedAt: "12:15 AM", status: "in-treatment" },
  { id: "em3", patient: "Bablu Saha", age: 9, condition: "High fever with fits", hospital: "Seva City Hospital", city: "Kolkata", ambulance: "WB 02 AB 1234", reportedAt: "11:50 PM", status: "stable" },
  { id: "em4", patient: "Rina Paul", age: 31, condition: "Burn injury", hospital: "Sunrise Clinic", city: "Durgapur", ambulance: "", reportedAt: "10:05 PM", status: "closed" },
]

export const adminHospitalCapacity: AdminHospitalCapacity[] = [
  { id: "h1", hospital: "Seva City Hospital", city: "Kolkata", generalTotal: 120, generalFree: 34, icuTotal: 20, icuFree: 2 },
  { id: "h3", hospital: "Riverside Hospital", city: "Kolkata", generalTotal: 80, generalFree: 22, icuTotal: 10, icuFree: 4 },
  { id: "h4", hospital: "Sunrise Clinic", city: "Durgapur", generalTotal: 24, generalFree: 6, icuTotal: 4, icuFree: 0 },
]

export const adminAmbulances: AdminAmbulance[] = [
  { id: "am1", vehicleNo: "WB 02 AB 1234", hospital: "Seva City Hospital", driver: "Ramesh Yadav", ambulanceType: "Basic life support", status: "available" },
  { id: "am2", vehicleNo: "WB 06 CD 5678", hospital: "Seva City Hospital", driver: "Sunil Mondal", ambulanceType: "Advanced life support", status: "on-duty" },
  { id: "am3", vehicleNo: "WB 04 EF 9012", hospital: "Riverside Hospital", driver: "Bikash Halder", ambulanceType: "Basic life support", status: "available" },
  { id: "am4", vehicleNo: "WB 08 GH 3456", hospital: "Sunrise Clinic", driver: "Pintu Saha", ambulanceType: "Patient transport", status: "maintenance" },
]

export const adminFeedback: AdminFeedback[] = [
  { id: "fb1", author: "Rahul Sen", target: "doctor", targetId: "d1", targetName: "Dr. Leslie Alexander", rating: 5, comment: "Explained everything clearly and was very kind.", postedOn: "2026-11-25", status: "pending", reviewedOn: "", adminRemarks: "" },
  { id: "fb2", author: "Kabir Sinha", target: "hospital", targetId: "h1", targetName: "Seva City Hospital", rating: 1, comment: "Worst place ever, the staff are useless idiots.", postedOn: "2026-11-25", status: "pending", reviewedOn: "", adminRemarks: "" },
  { id: "fb3", author: "Priya Das", target: "bloodBank", targetId: "bb2", targetName: "Red Drop Blood Bank", rating: 4, comment: "Quick service, blood was ready on time.", postedOn: "2026-11-24", status: "pending", reviewedOn: "", adminRemarks: "" },
  { id: "fb4", author: "Meera Bose", target: "camp", targetId: "bc1", targetName: "Seva with Local Clubs Forum", rating: 5, comment: "Well organised camp, the volunteers were very helpful.", postedOn: "2026-11-23", status: "approved", reviewedOn: "2026-11-24", adminRemarks: "" },
  { id: "fb5", author: "Ananya Mitra", target: "doctor", targetId: "d1", targetName: "Dr. Leslie Alexander", rating: 2, comment: "Had to wait two hours past my slot.", postedOn: "2026-11-20", status: "approved", reviewedOn: "2026-11-21", adminRemarks: "" },
  { id: "fb6", author: "Anonymous", target: "hospital", targetId: "h1", targetName: "Seva City Hospital", rating: 1, comment: "Spam: buy cheap medicines at this link", postedOn: "2026-11-19", status: "rejected", reviewedOn: "2026-11-19", adminRemarks: "Spam link, not a real review." },
]
