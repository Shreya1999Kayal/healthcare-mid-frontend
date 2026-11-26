import type { CampOrganiser } from "../../types/type/public/Blood.type"

// Placeholder data. donatedTo names should match hospital names in hospitalsList.
export const campOrganisers: CampOrganiser[] = [
  {
    id: "o1",
    name: "Seva City Hospital",
    image: "/camps/seva-city.jpg",
    since: 2014,
    about: "Our flagship hospital has run community blood camps for over ten years, supported by its own blood bank.",
    totalKg: 20,
    donatedTo: ["Seva City Hospital", "Lifeline Trauma Centre", "HeartCare Institute", "Little Steps Children's Hospital"],
    pastEvents: [
      { id: "e1", title: "Summer Blood Drive", date: "2026-05-18", units: 74 },
      { id: "e2", title: "World Blood Donor Day Camp", date: "2026-06-14", units: 98 },
      { id: "e3", title: "Winter Camp 2025", date: "2025-12-07", units: 121 },
    ],
    reviews: [
      { id: "r1", name: "Anita Sen", rating: 5, comment: "Very well organised, no waiting and friendly staff." },
      { id: "r2", name: "Rahul Das", rating: 4, comment: "Smooth process. Needed a few more seats for donors." },
    ],
  },
  {
    id: "o2",
    name: "Seva with Tech Park Association",
    image: "/camps/tech-park.jpg",
    since: 2019,
    about: "A corporate partnership that brings donation drives to the offices of Sector V every year.",
    totalKg: 12,
    donatedTo: ["Seva City Hospital", "Green Cross Medical Centre"],
    pastEvents: [
      { id: "e1", title: "Corporate Drive 2025", date: "2025-12-19", units: 88 },
      { id: "e2", title: "Office Donation Day", date: "2026-04-10", units: 61 },
    ],
    reviews: [
      { id: "r1", name: "Sneha Roy", rating: 5, comment: "Time slots made it easy to donate during work hours." },
      { id: "r2", name: "Amit Ghosh", rating: 4, comment: "Great initiative, good refreshments." },
    ],
  },
  {
    id: "o3",
    name: "Lifeline Trauma Centre",
    image: "/camps/lifeline.jpg",
    since: 2016,
    about: "A trauma and emergency centre that collects blood all year for accident and surgery patients.",
    totalKg: 15,
    donatedTo: ["Lifeline Trauma Centre", "Seva City Hospital", "HeartCare Institute"],
    pastEvents: [
      { id: "e1", title: "Road Safety Week Camp", date: "2026-01-20", units: 79 },
      { id: "e2", title: "Monsoon Emergency Drive", date: "2026-07-08", units: 66 },
    ],
    reviews: [
      { id: "r1", name: "Priya Mitra", rating: 5, comment: "Quick, clean and the doctors explained everything." },
      { id: "r2", name: "Sourav Paul", rating: 5, comment: "Best camp I have donated at so far." },
    ],
  },
  {
    id: "o4",
    name: "Seva with Local Clubs Forum",
    image: "/camps/local-clubs.jpg",
    since: 2017,
    about: "A group of neighbourhood clubs that organise festival-time camps with Seva's medical team.",
    totalKg: 9,
    donatedTo: ["Seva City Hospital", "Little Steps Children's Hospital"],
    pastEvents: [
      { id: "e1", title: "Spring Festival Camp", date: "2026-03-22", units: 52 },
      { id: "e2", title: "Community Puja Camp 2025", date: "2025-10-02", units: 95 },
    ],
    reviews: [
      { id: "r1", name: "Debasish Nag", rating: 4, comment: "Good turnout and a helpful volunteer team." },
      { id: "r2", name: "Mita Bose", rating: 4, comment: "Nice community feel." },
    ],
  },
  {
    id: "o5",
    name: "Seva with City College",
    image: "/camps/city-college.jpg",
    since: 2020,
    about: "Student volunteers and faculty organise a donation drive every semester on campus.",
    totalKg: 7,
    donatedTo: ["Seva City Hospital", "ClearView Eye Institute"],
    pastEvents: [
      { id: "e1", title: "Freshers Donation Drive", date: "2026-02-12", units: 58 },
      { id: "e2", title: "NSS Day Camp", date: "2026-01-24", units: 47 },
    ],
    reviews: [
      { id: "r1", name: "Ishita Dey", rating: 5, comment: "Students were so well prepared and polite." },
      { id: "r2", name: "Karan Shah", rating: 4, comment: "Short queue and quick check-up." },
    ],
  },
  {
    id: "o6",
    name: "HeartCare Institute",
    image: "/camps/heartcare.jpg",
    since: 2018,
    about: "A cardiac care institute that pairs every blood camp with a free heart health check-up.",
    totalKg: 11,
    donatedTo: ["HeartCare Institute", "Seva City Hospital", "Lifeline Trauma Centre"],
    pastEvents: [
      { id: "e1", title: "World Heart Day Camp", date: "2025-09-29", units: 70 },
      { id: "e2", title: "Heart Health Camp 2025", date: "2025-08-03", units: 59 },
    ],
    reviews: [
      { id: "r1", name: "Ritu Kar", rating: 5, comment: "The free heart check-up was a lovely bonus." },
      { id: "r2", name: "Joydeep Saha", rating: 4, comment: "Professional team, clean place." },
    ],
  },
]