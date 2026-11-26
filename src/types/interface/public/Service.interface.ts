import type { LucideIcon } from "lucide-react"

export interface IService {
  title: string
  description: string
  to: string
  icon: LucideIcon
}

export interface IStat {
  value: string
  label: string
}
