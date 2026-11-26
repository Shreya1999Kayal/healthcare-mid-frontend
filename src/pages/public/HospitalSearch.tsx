
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material"
import { Search, SearchX } from "lucide-react"

import { ALL_HOSPITALS, hospitalCategories, hospitalSortOptions, hospitalsList } from "../../constants/public/hospital.constants"
import type { HospitalSort } from "../../types/type/public/Hospital.type"
import HospitalListCard from "../../components/common/HospitalComponent/HospitalListCard"

const isHospitalSort = (value: string | null): value is HospitalSort =>
  hospitalSortOptions.some((option) => option.value === value)

const HospitalSearch = () => {
  // Filters live in the URL, so /hospitals?search=Eye care (from Popular searches) works
  // and a filtered list can be shared or bookmarked.
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ALL_HOSPITALS
  const sortParam = searchParams.get("sort")
  const sort: HospitalSort = isHospitalSort(sortParam) ? sortParam : "relevance"

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

  const visibleHospitals = useMemo(() => {
    const term = query.trim().toLowerCase()

    const filtered = hospitalsList.filter((hospital) => {
      const matchesCategory = category === ALL_HOSPITALS || hospital.category === category
      const matchesQuery =
        !term || [hospital.name, hospital.category, hospital.location].join(" ").toLowerCase().includes(term)
      return matchesCategory && matchesQuery
    })

    // filter() returns a new array, so sorting it never changes hospitalsList
    return filtered.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating
      if (sort === "beds") return b.beds - a.beds
      if (sort === "name") return a.name.localeCompare(b.name)
      return 0 // "relevance": keep the original order
    })
  }, [query, category, sort])

  const clearFilters = () => setSearchParams({}, { replace: true })
  const hasFilters = query !== "" || category !== ALL_HOSPITALS

  return (
    <>
      {/* Header + search */}
      <section className="w-full bg-linear-to-br from-white via-medical-bg to-medical-bg-soft px-6 py-14 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, lineHeight: 1.15 }}>
            Find the right hospital
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2 }}>
            Search verified hospitals by name, type or area, then open one to see the full details.
          </Typography>

          <TextField
            fullWidth
            value={query}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search a hospital, type or area"
            aria-label="Search hospitals"
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
            label="Hospital type"
            value={category}
            onChange={(e) => updateParam("category", e.target.value, ALL_HOSPITALS)}
            sx={{ minWidth: 240, bgcolor: "#FFFFFF", borderRadius: 1 }}
          >
            {hospitalCategories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
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
            {hospitalSortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <p className="mt-6 text-sm font-medium text-medical-muted" aria-live="polite">
          {visibleHospitals.length} {visibleHospitals.length === 1 ? "hospital" : "hospitals"} found
          {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
        </p>

        {visibleHospitals.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleHospitals.map((hospital) => (
              <HospitalListCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-medical-border bg-white px-6 py-12 text-center">
            <SearchX size={48} className="text-medical-primary" />
            <Typography sx={{ fontWeight: 700, color: "secondary.main", fontSize: "1.2rem", mt: 2 }}>
              No hospitals match your search
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
              Try a different name or area, or clear the filters to see every hospital.
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

export default HospitalSearch