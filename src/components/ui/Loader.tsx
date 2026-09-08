type LoaderProps = { visible: boolean }

export function Loader({ visible }: LoaderProps) {
  if (!visible) return null

  return (
    <div className="loading-screen" aria-live="polite">
      <div className="loading-screen__brand">Lumen</div>
      <div className="loading-screen__progress">Preparing film</div>
    </div>
  )
}