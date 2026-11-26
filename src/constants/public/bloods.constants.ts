import type {
  BankView,
  BloodBankItem,
  BloodCamp,
  BloodGroup,
  BloodService,
  // BloodTab,
  CampView,
  HospitalBloodBank,
  SwitchOption,
} from "../../types/type/public/Blood.type"

// Put the photos in /public/images/blood/ (donors.jpeg, camps.jpeg, blood-banks.jpeg).
// If a photo is missing, the card shows a droplet icon instead.
// Links go to the future Blood page, which will open the matching tab.
export const bloodServices: BloodService[] = [
  {
    id: "donors",
    title: "Blood donors",
    description:
      "Find registered donors by blood group and reach out quickly when someone needs blood.",
    highlight: "120+ donors registered",
    image: "/images/blood/donors.jpeg",
    path: "/blood?tab=donors",
    buttonLabel: "Find a donor",
  },
  {
    id: "camps",
    title: "Upcoming blood camps",
    description:
      "Join a donation camp near you and help save lives. See dates, venues and timings.",
    highlight: "Next camp: 6 Dec, Salt Lake",
    image: "/images/blood/camps.jpeg",
    path: "/blood?tab=camps",
    buttonLabel: "See all camps",
  },
  {
    id: "blood-banks",
    title: "Blood banks",
    description:
      "Check blood availability at blood banks near you before you travel.",
    highlight: "8 banks open now",
    image: "/images/blood/blood-banks.jpeg",
    path: "/blood?tab=blood-banks",
    buttonLabel: "View blood banks",
  },
]


// export const bloodTabs: SwitchOption<BloodTab>[] = [
//   { id: "camps", label: "Blood camps" },
//   { id: "donors", label: "Donors" },
//   { id: "blood-banks", label: "Blood banks" },
// ]

export const campViews: SwitchOption<CampView>[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "existing", label: "Existing" },
]

export const bankViews: SwitchOption<BankView>[] = [
  { id: "hospital", label: "Hospital blood banks" },
  { id: "organisation", label: "Other organisations" },
]

export const ALL_GROUPS = "All"

export const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

// Placeholder data, replace with real data from the API later
// Placeholder data, replace with real data from the API later
export const bloodCamps: BloodCamp[] = [
  {
    id: "c1",
    title: "Winter Mega Blood Donation Camp",
    organiser: "Seva City Hospital",
    organiserId: "o1",
    date: "2026-12-06",
    time: "9:00 AM - 3:00 PM",
    venue: "Salt Lake Stadium Hall",
    city: "Kolkata",
    status: "upcoming",
    note: "Walk-ins welcome",
  },
  {
    id: "c2",
    title: "Corporate Drive, Sector V",
    organiser: "Seva with Tech Park Association",
    organiserId: "o2",
    date: "2026-12-20",
    time: "10:00 AM - 4:00 PM",
    venue: "Tech Park Atrium, Sector V",
    city: "Kolkata",
    status: "upcoming",
    note: "Register to get a time slot",
  },
  {
    id: "c3",
    title: "New Year Lifesaver Camp",
    organiser: "Lifeline Trauma Centre",
    organiserId: "o3",
    date: "2027-01-09",
    time: "9:00 AM - 2:00 PM",
    venue: "Lifeline Trauma Centre, Park Street",
    city: "Kolkata",
    status: "upcoming",
    note: "Refreshments for all donors",
  },
  {
    id: "c4",
    title: "Community Puja Camp",
    organiser: "Seva with Local Clubs Forum",
    organiserId: "o4",
    date: "2026-10-12",
    time: "10:00 AM - 5:00 PM",
    venue: "Salt Lake Community Hall",
    city: "Kolkata",
    status: "existing",
    note: "112 units collected",
  },
  {
    id: "c5",
    title: "College Donation Drive",
    organiser: "Seva with City College",
    organiserId: "o5",
    date: "2026-09-14",
    time: "10:00 AM - 3:00 PM",
    venue: "City College Campus",
    city: "Kolkata",
    status: "existing",
    note: "86 units collected",
  },
  {
    id: "c6",
    title: "Heart Health and Blood Camp",
    organiser: "HeartCare Institute",
    organiserId: "o6",
    date: "2026-08-02",
    time: "9:00 AM - 1:00 PM",
    venue: "HeartCare Institute, Rajarhat",
    city: "Kolkata",
    status: "existing",
    note: "64 units collected",
  },
]

// Below this many units a blood group shows as "Low stock"
export const LOW_STOCK_UNITS = 10

// Only some Seva hospitals have a blood bank. Hospitals not listed here do not appear on the Blood banks tab.
// hospitalId must match an id in hospitalsList. stock = units available per blood group (0 = out of stock).
export const hospitalBloodBanks: HospitalBloodBank[] = [
  {
    hospitalId: "1",
    phone: "+91 33 0000 0101",
    timings: "Open 24 hours",
    stock: { "A+": 42, "A-": 0, "B+": 35, "B-": 0, "O+": 58, "O-": 9, "AB+": 16, "AB-": 0 },
  },
  {
    hospitalId: "2",
    phone: "+91 33 0000 0102",
    timings: "Open 24 hours",
    stock: { "A+": 30, "A-": 12, "B+": 25, "B-": 0, "O+": 40, "O-": 7, "AB+": 0, "AB-": 0 },
  },
  {
    hospitalId: "5",
    phone: "+91 33 0000 0105",
    timings: "8:00 AM - 8:00 PM",
    stock: { "A+": 20, "A-": 0, "B+": 18, "B-": 6, "O+": 33, "O-": 0, "AB+": 0, "AB-": 3 },
  },
]

// Independent blood banks run by other organisations, not connected to Seva hospitals
export const organisationBloodBanks: BloodBankItem[] = [
  {
    id: "org1",
    name: "Red Drop Blood Bank",
    location: "Park Circus, Kolkata",
    address: "12 Park Circus Road, Kolkata 700017",
    phone: "+91 33 0000 0201",
    timings: "8:00 AM - 9:00 PM",
    availableGroups: ["A+", "B+", "O+", "AB+"],
  },
  {
    id: "org2",
    name: "Lifespring Voluntary Blood Bank",
    location: "Howrah, Kolkata",
    address: "45 GT Road, Howrah 711101",
    phone: "+91 33 0000 0202",
    timings: "Open 24 hours",
    availableGroups: ["A+", "A-", "B+", "B-", "O+", "O-"],
  },
  {
    id: "org3",
    name: "Mercy Blood Centre",
    location: "Dum Dum, Kolkata",
    address: "7 Jessore Road, Dum Dum 700028",
    phone: "+91 33 0000 0203",
    timings: "9:00 AM - 6:00 PM",
    availableGroups: ["B+", "O+", "O-", "AB-"],
  },
]