import { useEffect, useState } from 'react'
import { chapters } from '../config/chapters'
import { Loader } from '../components/ui/Loader'
import { VideoChapter } from './VideoChapter'

export function CinematicExperience() {
  const [firstVideoReady, setFirstVideoReady] = useState(false)

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => setFirstVideoReady(true), 1600)
    return () => window.clearTimeout(fallbackTimer)
  }, [])

  return (
    <div className="cinematic-experience">
      <Loader visible={!firstVideoReady} />
      {chapters.map((chapter, index) => (
        <VideoChapter
          key={chapter.id}
          chapter={chapter}
          index={index}
          onReady={index === 0 ? () => setFirstVideoReady(true) : undefined}
        />
      ))}
    </div>
  )
}