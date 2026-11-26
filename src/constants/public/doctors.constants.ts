import type { Doctor, DoctorSort } from "../../types/type/public/Doctor.type"

// Put the photos in /public/images/doctors/ (doctor1.jpeg ... doctor4.jpeg).
// If a photo is missing, the card shows the doctor's initials instead.

export const HOME_DOCTORS_COUNT = 4

export const ALL_SPECIALITIES = "All"

export const doctorSortOptions: { value: DoctorSort; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Highest rated" },
  { value: "experience", label: "Most experienced" },
  { value: "fee", label: "Lowest fee" },
]

// Placeholder data, replace with real data from the API later
export const doctorsList: Doctor[] = [
  {
    id: "1",
    name: "Dr. Leslie Alexander",
    speciality: "Dental Surgery",
    image: "/images/doctors/doctor1.jpeg",
    experience: 12,
    hospital: "Green Cross Medical Centre",
    location: "Dum Dum, Kolkata",
    rating: 4.8,
    fee: 600,
    qualifications: "BDS, MDS (Oral Surgery)",
    languages: ["English", "Bengali", "Hindi"],
    availability: "Mon to Sat, 10:00 AM to 4:00 PM",
    about:
      "Treats complex tooth extractions, dental implants and jaw surgery with a gentle, pain-conscious approach.",
  },
  {
    id: "2",
    name: "Dr. Kathryn Murphy",
    speciality: "Pediatric Medicine",
    image: "/images/doctors/doctor2.jpeg",
    experience: 9,
    hospital: "Seva City Hospital",
    location: "Salt Lake, Kolkata",
    rating: 4.6,
    fee: 500,
    qualifications: "DPM, MS (Orthopaedics)",
    languages: ["English", "Bengali"],
    availability: "Tue to Sat, 11:00 AM to 5:00 PM",
    about:
      "Cares for foot and ankle problems including diabetic foot, heel pain, sports injuries and deformities.",
  },
  {
    id: "3",
    name: "Dr. Robert Fox",
    speciality: "Gastroenterologist",
    image: "/images/doctors/doctor3.jpeg",
    experience: 15,
    hospital: "Seva City Hospital",
    location: "Salt Lake, Kolkata",
    rating: 4.9,
    fee: 900,
    qualifications: "MBBS, MD, DM (Gastroenterology)",
    languages: ["English", "Hindi"],
    availability: "Mon to Fri, 9:00 AM to 2:00 PM",
    about:
      "Specialises in liver, stomach and bowel disorders, with extensive experience in endoscopy and colonoscopy.",
  },
  {
    id: "4",
    name: "Dr. Esther Howard",
    speciality: "Thoracic Surgeon",
    image: "/images/doctors/doctor4.jpeg",
    experience: 18,
    hospital: "HeartCare Institute",
    location: "Howrah, West Bengal",
    rating: 4.9,
    fee: 1200,
    qualifications: "MBBS, MS, MCh (Thoracic Surgery)",
    languages: ["English", "Bengali", "Hindi"],
    availability: "Mon, Wed, Fri, 10:00 AM to 3:00 PM",
    about:
      "Performs lung and chest surgeries, including minimally invasive procedures, with a focus on faster recovery.",
  },
  {
    id: "5",
    name: "Dr. Jenny Wilson",
    speciality: "Cardiologist",
    image: "/images/doctors/doctor1.jpeg",
    experience: 14,
    hospital: "HeartCare Institute",
    location: "Howrah, West Bengal",
    rating: 4.8,
    fee: 1000,
    qualifications: "MBBS, MD, DM (Cardiology)",
    languages: ["English", "Bengali"],
    availability: "Mon to Sat, 9:00 AM to 1:00 PM",
    about:
      "Manages heart disease, high blood pressure and heart failure, and guides patients through cardiac rehabilitation.",
  },
  {
    id: "6",
    name: "Dr. Cody Fisher",
    speciality: "Neurologist",
    image: "/images/doctors/doctor2.jpeg",
    experience: 11,
    hospital: "Lifeline Trauma Centre",
    location: "Park Street, Kolkata",
    rating: 4.7,
    fee: 900,
    qualifications: "MBBS, MD, DM (Neurology)",
    languages: ["English", "Hindi"],
    availability: "Tue to Sat, 12:00 PM to 6:00 PM",
    about:
      "Treats migraine, epilepsy, stroke recovery and nerve disorders, with a calm and thorough consultation style.",
  },
  {
    id: "7",
    name: "Dr. Darlene Robertson",
    speciality: "Pediatrician",
    image: "/images/doctors/doctor3.jpeg",
    experience: 8,
    hospital: "Little Steps Children's Hospital",
    location: "New Town, Kolkata",
    rating: 4.9,
    fee: 500,
    qualifications: "MBBS, MD (Pediatrics)",
    languages: ["English", "Bengali", "Hindi"],
    availability: "Mon to Sat, 9:00 AM to 5:00 PM",
    about:
      "Looks after newborns, children and teenagers, from vaccinations and growth checks to everyday illnesses.",
  },
  {
    id: "8",
    name: "Dr. Guy Hawkins",
    speciality: "Orthopedic",
    image: "/images/doctors/doctor4.jpeg",
    experience: 16,
    hospital: "Lifeline Trauma Centre",
    location: "Park Street, Kolkata",
    rating: 4.7,
    fee: 800,
    qualifications: "MBBS, MS (Orthopaedics)",
    languages: ["English", "Bengali"],
    availability: "Mon to Fri, 10:00 AM to 4:00 PM",
    about:
      "Handles fractures, joint replacement and sports injuries, with a strong focus on physiotherapy and recovery.",
  },
]