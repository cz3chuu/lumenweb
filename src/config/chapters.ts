export type Chapter = {
  id: 'arrival' | 'architecture'
  video: string
  mobileVideo?: string
  scrollLength: number
  title: string
  subtitle: string
  eyebrow: string
  fallback: string
}

export const chapters: Chapter[] = [
  {
    id: 'arrival',
    video: '/videos/01-arrival.mp4',
    mobileVideo: '/videos/01-arrival-mobile.mp4',
    scrollLength: 1.45,
    title: 'A slower way\nto arrive.',
    subtitle: 'Where architecture meets nature.',
    eyebrow: '01 / Arrival',
    fallback: 'arrival',
  },
  {
    id: 'architecture',
    video: '/videos/02-architecture.mp4',
    mobileVideo: '/videos/02-architecture-mobile.mp4',
    scrollLength: 1.65,
    title: 'Form follows\nthe horizon.',
    subtitle: 'Designed around space, light and nature.',
    eyebrow: '02 / Architecture',
    fallback: 'architecture',
  },
]