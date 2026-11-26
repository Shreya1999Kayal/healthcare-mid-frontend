import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Ambulance,
  ArrowLeft,
  BedDouble,
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Siren,
  Star,
} from "lucide-react"
import SectionHeading from "../../components/common/AboutComponent/SectionHeading"

import { hospitalDoctors, hospitalExtras } from "../../constants/public/hospitalDetails.constants"
import { hospitalsList } from "../../constants/public/hospital.constants"
import HospitalInfoItem from "../../components/common/HospitalComponent/HospitalInfoItem"
import HospitalDoctorsTable from "../../components/common/HospitalComponent/HospitalDoctorsTable"
import HospitalReviews from "../../components/common/HospitalComponent/HospitalReviews"
import { hospitalBloodBanks } from "../../constants/public/bloods.constants"
import HospitalBloodStock from "../../components/common/HospitalComponent/HospitalBloodStock"



const HospitalDetails = () => {
  const { id } = useParams()
  const [imageFailed, setImageFailed] = useState(false)

  const hospital = hospitalsList.find((item) => item.id === id)
  const extra = hospitalExtras.find((item) => item.hospitalId === id)

  // Wrong or old link, e.g. /hospitals/999
  if (!hospital || !extra) {
    return (
      <section className="flex flex-col items-center bg-medical-bg px-4 py-24 text-center">
        <Building2 size={56} className="text-medical-primary" />
        <h1 className="mt-4 text-2xl font-extrabold text-medical-navy md:text-4xl">Hospital not found</h1>
        <p className="mb-6 mt-2 text-medical-muted">This hospital does not exist or may have been removed.</p>
        <Link
          to="/hospitals"
          className="rounded-full bg-linear-to-br from-medical-primary to-medical-primary-dark px-8 py-3 text-sm font-semibold text-white no-underline hover:opacity-90"
        >
          Back to all hospitals
        </Link>
      </section>
    )
  }

  const doctors = hospitalDoctors.filter((doctor) => doctor.hospitalId === hospital.id)
  // Only hospitals that have a blood bank show the blood section
  const bloodBank = hospitalBloodBanks.find((bank) => bank.hospitalId === hospital.id)

  return (
    <section className="bg-medical-bg px-4 py-10 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Link
          to="/hospitals"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-medical-primary-dark no-underline"
        >
          <ArrowLeft size={16} /> Back to all hospitals
        </Link>

        {/* Hero */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="h-72 overflow-hidden rounded-3xl bg-linear-to-br from-medical-primary to-medical-navy md:h-96">
            {imageFailed ? (
              <div className="flex h-full w-full items-center justify-center text-white">
                <Building2 size={72} />
              </div>
            ) : (
              <img
                src={hospital.image}
                alt={hospital.name}
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-medical-bg-soft px-3 py-1 text-xs font-semibold text-medical-primary-dark">
                {hospital.category}
              </span>
              {hospital.emergency && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <Siren size={13} /> 24x7 emergency
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-medical-navy md:text-4xl">{hospital.name}</h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-medical-muted">
              <MapPin size={16} /> {hospital.location}
            </p>

            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-medical-navy">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              {hospital.rating.toFixed(1)}
              <span className="font-normal text-medical-muted">({extra.reviews.length} reviews)</span>
            </p>

            <p className="mt-4 text-medical-muted">{hospital.bio}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-full bg-linear-to-br from-medical-primary to-medical-primary-dark px-8 py-3 text-sm font-semibold text-white no-underline hover:opacity-90"
              >
                Book appointment
              </Link>
              <a
                href={`tel:${hospital.phone.replace(/\s/g, "")}`}
                className="rounded-full border border-medical-primary px-8 py-3 text-sm font-semibold text-medical-primary-dark no-underline hover:bg-medical-bg-soft"
              >
                Call hospital
              </a>
            </div>
          </div>
        </div>

        {/* Key details */}
        <section aria-label="Hospital details">
          <SectionHeading title="Hospital details" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HospitalInfoItem
              icon={Phone}
              label="Contact number"
              value={hospital.phone}
              href={`tel:${hospital.phone.replace(/\s/g, "")}`}
            />
            <HospitalInfoItem icon={Mail} label="Email" value={extra.email} href={`mailto:${extra.email}`} />
            <HospitalInfoItem icon={MapPin} label="Location" value={hospital.address} />
            <HospitalInfoItem
              icon={Ambulance}
              label="Ambulances available"
              value={`${extra.ambulancesAvailable} ambulances`}
            />
            <HospitalInfoItem
              icon={BedDouble}
              label="Beds available"
              value={`${extra.bedsAvailable} of ${hospital.beds} beds`}
            />
            <HospitalInfoItem icon={Clock} label="Timings" value={hospital.timings} />
          </div>
        </section>

        {/* Departments and facilities */}
        <section aria-label="Departments and facilities" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-medical-border bg-white p-6 shadow-sm shadow-medical-navy/5">
            <h2 className="text-lg font-bold text-medical-navy">Departments</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.departments.map((department) => (
                <span
                  key={department}
                  className="rounded-full bg-medical-bg-soft px-3 py-1 text-xs font-semibold text-medical-primary-dark"
                >
                  {department}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-medical-border bg-white p-6 shadow-sm shadow-medical-navy/5">
            <h2 className="text-lg font-bold text-medical-navy">Facilities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.facilities.map((facility) => (
                <span
                  key={facility}
                  className="rounded-full bg-medical-bg-soft px-3 py-1 text-xs font-semibold text-medical-primary-dark"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section aria-label="Our doctors">
          <SectionHeading title="Our doctors" />
          <p className="mb-6 max-w-3xl text-medical-muted">
            Chamber days and timings repeat every week. Please book an appointment before you visit.
          </p>
          <HospitalDoctorsTable doctors={doctors} />
        </section>

        {/* Available blood (only hospitals with a blood bank) */}
        {bloodBank && (
          <section aria-label="Available blood">
            <SectionHeading title="Available blood" />
            <p className="mb-6 max-w-3xl text-medical-muted">
              Blood groups and the units in stock at this hospital's blood bank.
            </p>
            <HospitalBloodStock bank={bloodBank} />
          </section>
        )}

        {/* Ratings and reviews */}
        <section aria-label="Ratings and reviews">
          <SectionHeading title="Ratings and reviews" />
          <HospitalReviews rating={hospital.rating} reviews={extra.reviews} />
        </section>
      </div>
    </section>
  )
}

export default HospitalDetails