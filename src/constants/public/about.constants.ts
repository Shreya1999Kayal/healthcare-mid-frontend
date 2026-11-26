import { HandHeart, Lock, Search, ShieldCheck, Siren, Users } from "lucide-react"

import { stats } from "./services.constants"
import type { IStat } from "../../types/interface/public/Service.interface"
import type { ITestimonial, IValue } from "../../types/interface/public/about.interface"


// Same placeholder numbers as the Services page, plus the donor count used on the blood cards
export const aboutStats: IStat[] = [...stats, { value: "120+", label: "Registered blood donors" }]

export const coreValues: IValue[] = [
  {
    title: "Trust and verification",
    description: "Every doctor, hospital and blood bank is checked before it appears on Seva.",
    icon: ShieldCheck,
  },
  {
    title: "Speed when it matters",
    description: "Ambulance, ICU bed and urgent blood information is one click away, not buried in searches.",
    icon: Siren,
  },
  {
    title: "Care for everyone",
    description: "Clear fees, timings and languages, so every family can choose with confidence.",
    icon: HandHeart,
  },
  {
    title: "Privacy first",
    description: "Your records and prescriptions stay in your account, and donor details stay privacy-safe.",
    icon: Lock,
  },
  {
    title: "A community of givers",
    description: "Donors, blood banks and camps work together so help reaches people in time.",
    icon: Users,
  },
  {
    title: "Honest information",
    description: "We show what we know, including availability and ratings, without hiding the details.",
    icon: Search,
  },
]

export const storyPoints = [
  "Verified doctors, hospitals and blood banks in one place",
  "Live blood availability and urgent requests",
  "Appointments, prescriptions and records in one account",
]

// Placeholder feedback, replace with real patient and donor feedback before launch
export const testimonials: ITestimonial[] = [
  {
    name: "Riya S.",
    role: "Patient",
    quote: "I found a cardiologist near me and booked a slot in a few minutes. No calls and no waiting in a queue.",
    image: "/images/testimonials/riya.jpeg" 
  },
  {
    name: "Arjun M.",
    role: "Family member",
    quote: "When my father needed blood late at night, Seva showed me nearby donors and blood banks quickly.",
  },
  {
    name: "Sneha D.",
    role: "Blood donor",
    quote: "I can see camps close to me with dates and venues, and register in a few taps.",
  },
  {
    name: "Imran H.",
    role: "Patient's relative",
    quote: "Checking ICU and oxygen bed availability before travelling saved us a lot of stress.",
  },
  {
    name: "Pooja R.",
    role: "Patient",
    quote: "Doctor profiles show qualifications, fees and timings clearly, so I could choose with confidence.",
  },
  {
    name: "Subhajit B.",
    role: "Camp organiser",
    quote: "Our camp reached more people because donors could see the details in one place.",
  },
]