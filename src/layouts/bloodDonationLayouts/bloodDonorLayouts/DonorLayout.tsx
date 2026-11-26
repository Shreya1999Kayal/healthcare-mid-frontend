import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import DonorSidebar from "./DonorSidebar"
import DonorTopbar from "./DonorTopbar"
import { donorAccounts, donorStatusStyles } from "../../../constants/blood/donorConstants/donorVerification.constants"
import type { DonorAccount, DonorDocuments, DonorVerification, DonorVerificationValues } from "../../../types/type/blood/donorType/DonorVerification.type"
import { DONOR_TODAY, donorCardClass, donorNavLinks } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { donorPath, formatDonorDate, getDonorSection } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import type { DonorOutletContext } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { donationRecords } from "../../../constants/blood/donorConstants/donorRecord.constants"
import { isDonorSectionLocked } from "../../../services/helper/blood/donorHelper/donorVerification.helper"
import DonorNavItem from "../../../components/bloodDonation/bloodDonor/DonorNavItem"
import DonorLockedSection from "../../../components/bloodDonation/bloodDonor/DonorLockedSection"


const DonorLayout = () => {
  const { pathname } = useLocation()
  // :id of the child route, e.g. /donorDashboard/dashboard/d1 -> "d1"
  const { id = "" } = useParams()

  // Verification of every sample donor, kept here so the sidebar unlocks right after a submit (UI only)
  const [verifications, setVerifications] = useState<Record<string, DonorVerification>>(() =>
    Object.fromEntries(donorAccounts.map((account) => [account.id, account.verification])),
  )

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  const account = donorAccounts.find((item) => item.id === id)

  // Missing or unknown id: pick one of the sample donors (until login is built)
  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blood-bg p-4">
        <div className={`${donorCardClass} w-full max-w-md`}>
          <h1 className="text-xl font-bold text-blood-navy">{id ? "Donor not found" : "Choose a donor"}</h1>
          <p className="mt-1 text-sm text-blood-muted">{id ? `No donor has the id "${id}". ` : ""}Open one of the sample donors.</p>
          <ul className="mt-4 flex flex-col gap-2">
            {donorAccounts.map((item) => {
              const style = donorStatusStyles[verifications[item.id].status]

              return (
                <li key={item.id}>
                  <Link
                    to={donorPath("dashboard", item.id)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-blood-border px-4 py-3 text-sm font-semibold text-blood-navy no-underline hover:bg-blood-bg"
                  >
                    <span>
                      {item.name}{" "}
                      <span className="font-normal text-blood-muted">
                        ({item.id}, {item.bloodGroup})
                      </span>
                    </span>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  const donor: DonorAccount = { ...account, verification: verifications[account.id] }
  const status = donor.verification.status

  const submitVerification = (details: DonorVerificationValues, documents: DonorDocuments) => {
    const sent: DonorVerification = {
      ...verifications[account.id],
      status: "pending",
      submittedOn: formatDonorDate(DONOR_TODAY),
      reviewedOn: "",
      adminRemarks: "",
      details,
      documents,
    }
    setVerifications((prev) => ({ ...prev, [account.id]: sent }))
  }

  const outletContext: DonorOutletContext = {
    donor,
    records: donationRecords[donor.id] ?? [],
    onSubmitVerification: submitVerification,
  }

  return (
    <div className="flex min-h-screen bg-blood-bg">
      <DonorSidebar donor={donor} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DonorTopbar donor={donor} />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-blood-primary p-2 lg:hidden">
          {donorNavLinks.map(({ label, section, icon }) => (
            <DonorNavItem
              key={section}
              label={label}
              icon={icon}
              to={donorPath(section, donor.id)}
              locked={isDonorSectionLocked(section, status)}
              compact
            />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          {/* Before approval only Verification opens; a locked URL typed by hand shows the locked message */}
          {isDonorSectionLocked(getDonorSection(pathname), status) ? (
            <DonorLockedSection donorId={donor.id} status={status} />
          ) : (
            <Outlet key={donor.id} context={outletContext} />
          )}
        </main>
      </div>
    </div>
  )
}

export default DonorLayout