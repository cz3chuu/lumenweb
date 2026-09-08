import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type UseVideoScrubOptions = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  triggerRef: React.RefObject<HTMLElement | null>
  scrollLength: number
  onReady?: () => void
}

export function useVideoScrub({ videoRef, triggerRef, scrollLength, onReady }: UseVideoScrubOptions) {
  const targetTime = useRef(0)
  const currentTime = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    const trigger = triggerRef.current
    if (!video || !trigger) return

    let frame = 0
    let duration = 0
    let metadataReady = false

    const renderFrame = () => {
      if (metadataReady && video.readyState >= 1 && Number.isFinite(duration)) {
        currentTime.current += (targetTime.current - currentTime.current) * 0.16
        if (Math.abs(targetTime.current - currentTime.current) > 0.01) {
          video.currentTime = currentTime.current
        }
      }
      frame = requestAnimationFrame(renderFrame)
    }

    const handleMetadata = () => {
      duration = video.duration
      metadataReady = Number.isFinite(duration) && duration > 0
      if (metadataReady) {
        video.currentTime = 0
        onReady?.()
      }
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: `+=${Math.round(window.innerHeight * scrollLength)}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (instance) => {
        if (metadataReady) targetTime.current = instance.progress * duration
      },
      onEnter: () => crossfadeToCurrentFrame(trigger),
      onEnterBack: () => crossfadeToCurrentFrame(trigger),
    })

    if (video.readyState >= 1) handleMetadata()
    else video.addEventListener('loadedmetadata', handleMetadata, { once: true })
    frame = requestAnimationFrame(renderFrame)

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata)
      cancelAnimationFrame(frame)
      scrollTrigger.kill()
    }
  }, [onReady, scrollLength, triggerRef, videoRef])
}

function crossfadeToCurrentFrame(trigger: HTMLElement) {
  const currentFrame = trigger.querySelector<HTMLElement>('.video-frame')
  const allFrames = document.querySelectorAll<HTMLElement>('.video-frame')
  if (!currentFrame) return

  gsap.to(allFrames, { opacity: 0, duration: 0.55, ease: 'power2.out', overwrite: true })
  gsap.to(currentFrame, { opacity: 1, duration: 0.8, ease: 'power2.out', overwrite: true })
}