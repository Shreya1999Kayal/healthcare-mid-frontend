import type { Hospital, HospitalSort } from "../../types/type/public/Hospital.type"

export const ALL_HOSPITALS = "All Hospitals"

export const hospitalSortOptions: { value: HospitalSort; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Highest rated" },
  { value: "beds", label: "Most beds" },
  { value: "name", label: "Name (A to Z)" },
]

// Put the photos in /public/images/hospitals/ (hospital1.jpeg ... hospital6.jpeg).
// If a photo is missing, the card shows a hospital icon instead.

export const hospitalCategories: string[] = [
  ALL_HOSPITALS,
  "Multi-speciality",
  "Emergency & trauma",
  "Children's",
  "Eye care",
  "Cardiac care",
]

export const HOME_HOSPITALS_COUNT = 3

// Phone numbers, addresses and beds are placeholder data, replace with real data from the API later
export const hospitalsList: Hospital[] = [
  {
    id: "1",
    name: "Seva City Hospital",
    category: "Multi-speciality",
    location: "Salt Lake, Kolkata",
    rating: 4.9,
    bio: "A 400-bed multi-speciality hospital with 24x7 emergency care, advanced diagnostics and experienced specialists under one roof.",
    image: "/images/hospitals/hospital1.jpeg",
    address: "Sector V, Salt Lake, Kolkata 700091",
    phone: "+91 33 0000 0001",
    beds: 400,
    emergency: true,
    timings: "Open 24 hours",
    departments: ["Cardiology", "Neurology", "Gastroenterology", "Orthopaedics", "Oncology"],
    facilities: ["ICU", "Ambulance", "Blood bank", "Pharmacy", "Pathology lab", "Cafeteria"],
  },
  {
    id: "2",
    name: "Lifeline Trauma Centre",
    category: "Emergency & trauma",
    location: "Park Street, Kolkata",
    rating: 4.8,
    bio: "Round-the-clock trauma and emergency unit with ambulance support, ICU beds and a rapid response team for critical cases.",
    image: "/images/hospitals/hospital2.jpeg",
    address: "Park Street, Kolkata 700016",
    phone: "+91 33 0000 0002",
    beds: 250,
    emergency: true,
    timings: "Open 24 hours",
    departments: ["Emergency medicine", "Trauma surgery", "Critical care", "Neurosurgery"],
    facilities: ["Trauma ICU", "Ambulance", "Blood bank", "Operation theatres"],
  },
  {
    id: "3",
    name: "Little Steps Children's Hospital",
    category: "Children's",
    location: "New Town, Kolkata",
    rating: 4.9,
    bio: "Child-friendly care from newborn to adolescent, with paediatric specialists, vaccination clinics and a dedicated NICU.",
    image: "/images/hospitals/hospital3.jpeg",
    address: "Action Area I, New Town, Kolkata 700156",
    phone: "+91 33 0000 0003",
    beds: 180,
    emergency: true,
    timings: "Open 24 hours",
    departments: ["Paediatrics", "Neonatology", "Paediatric surgery", "Vaccination clinic"],
    facilities: ["NICU", "Ambulance", "Play area", "Pharmacy"],
  },
  {
    id: "4",
    name: "ClearView Eye Institute",
    category: "Eye care",
    location: "Ballygunge, Kolkata",
    rating: 4.7,
    bio: "Specialised eye hospital offering cataract surgery, retina care, LASIK and complete vision check-ups with modern equipment.",
    image: "/images/hospitals/hospital4.jpeg",
    address: "Gariahat Road, Ballygunge, Kolkata 700019",
    phone: "+91 33 0000 0004",
    beds: 90,
    emergency: false,
    timings: "Mon to Sat, 8:00 AM to 7:00 PM",
    departments: ["Cataract surgery", "Retina care", "LASIK", "Glaucoma clinic"],
    facilities: ["Eye operation theatres", "Optical shop", "Pharmacy", "Diagnostics"],
  },
  {
    id: "5",
    name: "HeartCare Institute",
    category: "Cardiac care",
    location: "Howrah, West Bengal",
    rating: 4.8,
    bio: "Dedicated cardiac centre for angiography, bypass surgery and heart rehabilitation, backed by a 24x7 cardiac ICU.",
    image: "/images/hospitals/hospital5.jpeg",
    address: "G.T. Road, Howrah 711101",
    phone: "+91 33 0000 0005",
    beds: 220,
    emergency: true,
    timings: "Open 24 hours",
    departments: ["Cardiology", "Cardiac surgery", "Cardiac rehabilitation", "Thoracic surgery"],
    facilities: ["Cardiac ICU", "Cath lab", "Ambulance", "Blood bank", "Pharmacy"],
  },
  {
    id: "6",
    name: "Green Cross Medical Centre",
    category: "Multi-speciality",
    location: "Dum Dum, Kolkata",
    rating: 4.6,
    bio: "Trusted community hospital with outpatient clinics, day-care surgery, pathology and a well-stocked in-house pharmacy.",
    image: "/images/hospitals/hospital6.jpeg",
    address: "B.T. Road, Dum Dum, Kolkata 700028",
    phone: "+91 33 0000 0006",
    beds: 120,
    emergency: false,
    timings: "Mon to Sun, 7:00 AM to 10:00 PM",
    departments: ["General medicine", "Day-care surgery", "Dental", "Pathology"],
    facilities: ["Outpatient clinics", "In-house pharmacy", "Pathology lab", "Parking"],
  },
]