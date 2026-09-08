import { CinematicExperience } from './cinematic/CinematicExperience'
import './index.css'

function App() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <span className="topbar__mark">LH</span>
        <span className="topbar__label">Private residence / 01</span>
        <span className="topbar__menu">Menu</span>
      </header>

      <section className="content-section content-section--hero">
          <div className="section-copy section-copy--hero">
            <p className="eyebrow">A private residence / Malibu, CA</p>
            <h1>Lumen<br />House</h1>
            <p className="hero-subtitle">Architecture shaped by light.</p>
          </div>
          <div className="scroll-cue"><span />Scroll to explore</div>
      </section>
      <CinematicExperience />
    </main>
  )
}

export default App
