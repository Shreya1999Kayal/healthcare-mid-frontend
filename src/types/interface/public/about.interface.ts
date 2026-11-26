import type { LucideIcon } from "lucide-react"

export interface IValue {
  title: string
  description: string
  icon: LucideIcon
}

export interface ITestimonial {
  name: string
  role: string
  quote: string
  image?: string 
}

