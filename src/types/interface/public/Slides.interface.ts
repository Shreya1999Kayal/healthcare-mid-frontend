import type { Slide } from "../../type/public/Slide.type"


export interface SlidesProps {
  slides: Slide[]
  current: number
}

export interface VideoSlideProps {
  src: string
  isActive: boolean
}