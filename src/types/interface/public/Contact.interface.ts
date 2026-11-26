import type { ChangeEvent, ReactNode } from "react"
import type { ContactFormConfig } from "../../type/public/Contact.type"


export interface ContactFormProps {
  config: ContactFormConfig
}

export interface ContactTabsProps {
  tabs: ContactFormConfig[]
}

export interface FormFieldProps {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}

export interface FormSelectProps {
  name: string
  value: string
  placeholder: string
  options: string[]
  required?: boolean
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}