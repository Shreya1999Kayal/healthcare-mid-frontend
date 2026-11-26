import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material"
import { Search, SearchX } from "lucide-react"
import { ALL_SPECIALITIES, doctorSortOptions, doctorsList } from "../../constants/public/doctors.constants"
import type { DoctorSort } from "../../types/type/public/Doctor.type"
import DoctorListCard from "../../components/common/userDoctor/DoctorListCard"
import { getDoctorChambers } from "../../services/helper/public/doctor.helper"

const specialities = [ALL_SPECIALITIES, ...Array.from(new Set(doctorsList.map((d) => d.speciality)))]

const isDoctorSort = (value: string | null): value is DoctorSort =>
  doctorSortOptions.some((option) => option.value === value)

const DoctorSearch = () => {
  // Filters live in the URL, so /doctors?search=Cardiologist (from Popular searches) works
  // and a filtered list can be shared or bookmarked.
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("search") ?? ""
  const speciality = searchParams.get("speciality") ?? ALL_SPECIALITIES
  const sortParam = searchParams.get("sort")
  const sort: DoctorSort = isDoctorSort(sortParam) ? sortParam : "relevance"

  const updateParam = (key: string, value: string, defaultValue = "") => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === defaultValue) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true }
    )
  }

  const visibleDoctors = useMemo(() => {
    const term = query.trim().toLowerCase()

    const filtered = doctorsList.filter((doctor) => {
      const matchesSpeciality = speciality === ALL_SPECIALITIES || doctor.speciality === speciality
      const matchesQuery =
        !term ||
        [
          doctor.name,
          doctor.speciality,
          doctor.location,
          // search also matches every hospital where the doctor sits
          ...getDoctorChambers(doctor.id).map((chamber) => chamber.hospitalName),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term)
      return matchesSpeciality && matchesQuery
    })

    // filter() returns a new array, so sorting it never changes doctorsList
    return filtered.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating
      if (sort === "experience") return b.experience - a.experience
      if (sort === "fee") return a.fee - b.fee
      return 0 // "relevance": keep the original order
    })
  }, [query, speciality, sort])

  const clearFilters = () => setSearchParams({}, { replace: true })
  const hasFilters = query !== "" || speciality !== ALL_SPECIALITIES

  return (
    <>
      {/* Header + search */}
      <section className="w-full bg-linear-to-br from-white via-medical-bg to-medical-bg-soft px-6 py-14 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, lineHeight: 1.15 }}>
            Find the right doctor
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2 }}>
            Search verified specialists by name, speciality or hospital, then open a profile to see the full details.
          </Typography>

          <TextField
            fullWidth
            value={query}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search a doctor, speciality or hospital"
            aria-label="Search doctors"
            sx={{
              mt: 4,
              bgcolor: "#FFFFFF",
              borderRadius: 999,
              "& .MuiOutlinedInput-root": { borderRadius: 999, pl: 1 },
              "& fieldset": { borderColor: "#CDECEF" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} className="text-medical-primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </section>

      {/* Filters + results */}
      <section className="w-full bg-medical-bg px-6 py-12 md:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <TextField
            select
            size="small"
            label="Speciality"
            value={speciality}
            onChange={(e) => updateParam("speciality", e.target.value, ALL_SPECIALITIES)}
            sx={{ minWidth: 240, bgcolor: "#FFFFFF", borderRadius: 1 }}
          >
            {specialities.map((item) => (
              <MenuItem key={item} value={item}>
                {item === ALL_SPECIALITIES ? "All specialities" : item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Sort by"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value, "relevance")}
            sx={{ minWidth: 190, bgcolor: "#FFFFFF", borderRadius: 1 }}
          >
            {doctorSortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <p className="mt-6 text-sm font-medium text-medical-muted" aria-live="polite">
          {visibleDoctors.length} {visibleDoctors.length === 1 ? "doctor" : "doctors"} found
          {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
        </p>

        {visibleDoctors.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleDoctors.map((doctor) => (
              <DoctorListCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-medical-border bg-white px-6 py-12 text-center">
            <SearchX size={48} className="text-medical-primary" />
            <Typography sx={{ fontWeight: 700, color: "secondary.main", fontSize: "1.2rem", mt: 2 }}>
              No doctors match your search
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
              Try a different name or speciality, or clear the filters to see everyone.
            </Typography>
            {hasFilters && (
              <Button variant="outlined" onClick={clearFilters} sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}>
                Clear filters
              </Button>
            )}
          </div>
        )}
      </section>
    </>
  )
}

export default DoctorSearch