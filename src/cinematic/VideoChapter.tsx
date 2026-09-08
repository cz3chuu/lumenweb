import { useRef, useState } from 'react'
import type { Chapter } from '../config/chapters'
import { useVideoScrub } from '../hooks/useVideoScrub'

type VideoChapterProps = {
  chapter: Chapter
  index: number
  onReady?: () => void
}

export function VideoChapter({ chapter, index, onReady }: VideoChapterProps) {
  const triggerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useVideoScrub({
    videoRef,
    triggerRef,
    scrollLength: chapter.scrollLength,
    onReady,
  })

  return (
    <section ref={triggerRef} className={`video-chapter video-chapter--${chapter.fallback}`} data-chapter={chapter.id}>
      <div className="video-frame" style={{ '--chapter-index': index } as React.CSSProperties}>
        {!failed && (
          <video
            ref={videoRef}
            className="video-frame__media"
            muted
            playsInline
            preload={index === 0 ? 'auto' : 'metadata'}
            onError={() => {
              setFailed(true)
              onReady?.()
            }}
            aria-hidden="true"
          >
            <source src={chapter.video} type="video/mp4" media="(min-width: 701px)" />
            <source src={chapter.mobileVideo ?? chapter.video} type="video/mp4" media="(max-width: 700px)" />
          </video>
        )}
        <div className="video-frame__wash" />
      </div>
      <div className="chapter-copy chapter-copy--left">
        <p className="eyebrow">{chapter.eyebrow}</p>
        <h2>{chapter.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
        <p className="chapter-copy__subtitle">{chapter.subtitle}</p>
      </div>
      <span className="chapter-progress">Scroll / {String(index + 1).padStart(2, '0')}</span>
    </section>
  )
}