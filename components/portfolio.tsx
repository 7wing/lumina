'use client'

import Lenis from 'lenis'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Headphones, Mail, MapPin, Music2, Pause, Play, Volume2 } from 'lucide-react'
import guitarImage from '@/images/no_bg_guitar.png'
import soccerImage from '@/images/no_bg_soccer.png'

const projects = [
  { number: '01', title: 'Field Notes', type: 'Digital experience', year: '2024', color: 'coral', src: '/run.html', desc: 'A tactile archive for the rituals, rivalries, and poetry of the beautiful game.' },
  { number: '02', title: 'Sonic Bloom', type: 'Creative technology', year: '2023', color: 'lavender', src: '/investigate.html', desc: 'A generative music visualizer where every beat grows into a new landscape.' },
  { number: '03', title: 'Open Air', type: 'Brand world', year: '2023', color: 'mint', src: '/build.html', desc: 'A luminous identity system for a community moving culture forward.' },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Nav({ active, setActive, music, playing, setMusic }: { active: string; setActive: (s: string) => void; music: boolean; playing: boolean; setMusic: (v: boolean) => void }) {
  return <>
    <aside className="float-nav">
      <div className="nav-mark">A<span>/</span>R</div>
      <div className="nav-links">
        {['about', 'projects', 'contact'].map((item) => <button key={item} type="button" className={active === item ? 'active' : ''} onClick={() => { setActive(item); scrollToSection(item) }}>{item}</button>)}
      </div>
      <button className={`audio-pill ${music ? 'playing' : ''}`} onClick={() => setMusic(!music)} aria-label="Toggle audio">
        <span className="audio-dot">{music ? <Volume2 size={13} /> : <Headphones size={13} />}</span>
        <span>{!playing ? 'PAUSED' : music ? 'NOW PLAYING' : 'AUDIO OFF'}</span>
      </button>
    </aside>
  </>
}

function AvatarScene({ music, ready }: { music: boolean; ready: boolean }) {
  return <div className={`scene ${music ? 'scene-playing' : ''}`} aria-label="Interactive avatar scene">
    <div className="sun-glow" />
    <div className="scene-label"><span className="live-dot" /> {music ? 'Sonic mode' : 'Football Mode'}</div>
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="avatar-shadow" />
    <div className="character-button" aria-label={`Activate ${music ? 'guitar mode' : 'soccer mode'}`}>
      <div className="character-slab">
        <img src={soccerImage.src} alt={music ? '' : 'soccer mode'} aria-hidden={music} className={`character-image ${ready && !music ? 'is-active' : ''}`} loading="eager" draggable={false} fetchPriority="high" />
        <img src={guitarImage.src} alt={music ? 'guitar mode' : ''} aria-hidden={!music} className={`character-image guitar-image ${ready && music ? 'is-active' : ''}`} loading="eager" draggable={false} fetchPriority="high" />
      </div>
    </div>
    <div className="floating-note note-one">♪</div><div className="floating-note note-two">✦</div>
  </div>
}

function Equalizer({ active }: { active: boolean }) {
  return <div className={`equalizer ${active ? 'eq-active' : ''}`}>{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>
}

function MiniGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(12)
  const [position, setPosition] = useState({ x: 55, y: 48 })
  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle')

  useEffect(() => {
    if (status !== 'playing') return

    const countdown = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdown)
          setStatus('over')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(countdown)
  }, [status])

  useEffect(() => {
    if (status !== 'playing') return

    const moveTarget = window.setInterval(() => {
      setPosition({
        x: 15 + Math.random() * 70,
        y: 18 + Math.random() * 58,
      })
    }, 850)

    return () => window.clearInterval(moveTarget)
  }, [status])

  const handleHit = () => {
    if (status !== 'playing') return
    setScore((prev) => prev + 1)
    setPosition({
      x: 15 + Math.random() * 70,
      y: 18 + Math.random() * 58,
    })
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(12)
    setPosition({ x: 55, y: 48 })
    setStatus('playing')
  }

  const reset = () => {
    setScore(0)
    setTimeLeft(12)
    setStatus('idle')
    setPosition({ x: 55, y: 48 })
  }

  return <div className="mini-game">
    <div className="mini-game-header">
      <div className="mini-game-title">TAP THE VIBE, WIN THE FLEX</div>
      <div className="mini-game-topbar">
        <span>score {score}</span>
        <span>{timeLeft}s</span>
      </div>
    </div>
    <div className="mini-game-board" onClick={handleHit} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHit() }}>
      {status === 'idle' ? (
        <div className="mini-game-start">
          <strong>Ready?</strong>
          <button type="button" onClick={startGame}>start game</button>
        </div>
      ) : status === 'playing' ? (
        <button
          type="button"
          className="mini-game-target"
          onClick={handleHit}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
          aria-label="Catch the orb"
        />
      ) : (
        <div className="mini-game-over">
          <strong>Nice!</strong>
          <span>You scored {score}</span>
          <button type="button" onClick={reset}>play again</button>
        </div>
      )}
    </div>
  </div>
}

export default function Portfolio() {
  const [active, setActive] = useState('')
  const [music, setMusic] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [imagesReady, setImagesReady] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const panelRefs = useRef<Array<HTMLElement | null>>([])
  const projectDialogRef = useRef<HTMLDialogElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const dialog = projectDialogRef.current
    if (!dialog) return

    if (selectedProject && !dialog.open) dialog.showModal()
    if (!selectedProject && dialog.open) dialog.close()
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenisRef.current?.stop()

    return () => {
      document.body.style.overflow = previousOverflow
      lenisRef.current?.start()
    }
  }, [selectedProject])

  useEffect(() => {
    const preload = (src: string) => new Promise<void>((resolve) => {
      const img = new window.Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = src
    })

    Promise.all([preload(soccerImage.src), preload(guitarImage.src)]).then(() => setImagesReady(true))
  }, [])

  useEffect(() => {
    const updateActiveSection = () => {
      const activationPoint = window.scrollY + window.innerHeight * 0.35
      let current = ''

      for (const id of ['about', 'projects', 'contact']) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= activationPoint) current = id
      }

      setActive(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      overscroll: false,
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const updateStackedPanels = () => {
      const panels = panelRefs.current.filter(Boolean) as HTMLElement[]
      if (!panels.length) return

      const vh = window.innerHeight

      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect()
        const distance = rect.top - vh * 0.22
        const progress = Math.min(Math.max(distance / (vh * 0.8), 0), 1)
        const lift = index === 0 ? 0 : Math.max(0, (1 - progress) * (index * 26))
        const scale = 1 - index * 0.005 + Math.max(0, (1 - progress)) * 0.008
        const overlap = index === 0 ? 0 : Math.max(0, (1 - progress) * 68)

        panel.style.transform = `translate3d(0, ${-lift}px, 0) scale(${scale})`
        panel.style.marginTop = `${-overlap}px`
        panel.style.opacity = '1'
        panel.style.zIndex = String(40 + index)
      })
    }

    requestAnimationFrame(updateStackedPanels)
    window.addEventListener('scroll', updateStackedPanels, { passive: true })
    window.addEventListener('resize', updateStackedPanels)

    return () => {
      window.removeEventListener('scroll', updateStackedPanels)
      window.removeEventListener('resize', updateStackedPanels)
    }
  }, [])

  return <main className="portfolio">
    <Nav active={active} setActive={setActive} music={music} playing={playing} setMusic={setMusic} />
    <section ref={(node) => { panelRefs.current[0] = node }} className="hero panel hero-panel" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span>01</span> creative developer / athlete / musician</div>
        <h1>MAKE<br /><em>NOISE.</em><br /><span>MOVE</span> CULTURE.</h1>
        <p className="hero-intro">I&apos;m Alexa Rivera — a creative developer building digital worlds with code, rhythm, and a little competitive spirit.</p>
        <button type="button" className="enter-link" onClick={() => scrollToSection('projects')}><span className="enter-icon"><ArrowUpRight size={18} /></span> ENTER EXPERIENCE</button>
        <div className="scroll-cue"><span /> scroll to explore</div>
      </div>
      <div className="hero-scene"><AvatarScene music={music} ready={imagesReady} /><div className="vertical-type">SELECTED WORK / 2023—24</div></div>
    </section>

    <section ref={(node) => { panelRefs.current[1] = node }} className="about panel about-panel" id="about">
      <div className="section-kicker">02 — THE PRACTICE</div>
      <div className="about-grid"><h2>DISCIPLINE<br />MEETS <em>PLAY.</em></h2><div className="about-copy"><p>There&apos;s a particular magic in the space between structure and spontaneity. I find it on the pitch, in a rehearsal room, and inside a new line of code.</p><p>My work lives at that intersection — making identities, interfaces, and experiences that feel as good as they function.</p><div className="location"><MapPin size={15} /> Brooklyn, NY <span>—</span> available worldwide</div></div></div>
      <div className="orbit-word">RHYTHM / RIGOR / RISK / REPEAT /</div>
    </section>

    <section ref={(node) => { panelRefs.current[2] = node }} className="projects panel projects-panel" id="projects">
      <div className="section-heading"><div><div className="section-kicker">03 — SELECTED WORK</div><h2>IN <em>ROTATION.</em></h2></div><a className="projects-demo-pill" href="/demos">DEMO ROOM</a></div>
      <div className="project-list">{projects.map((project) => <button type="button" className={`project-card ${project.color}`} key={project.number} onClick={() => setSelectedProject(project)}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span><span>{project.year}</span></div><div className="project-art"><div className="art-ring" /><div className="art-word">{project.title}</div></div><div className="project-bottom"><h3>{project.title}</h3><p>{project.desc}</p></div></button>)}</div>
    </section>

    <section ref={(node) => { panelRefs.current[3] = node }} className="contact panel contact-panel" id="contact">
      <div className="contact-top"><div className="section-kicker">04 — OPEN CHANNEL</div><div className="signal">● signal is strong</div></div>
      <div className="contact-grid"><div><h2>LET&apos;S MAKE<br /><em>SOMETHING</em><br />UNEXPECTED.</h2><a className="email-link" href="mailto:hello@alexarivera.studio">hello@alexarivera.studio <ArrowUpRight size={18} /></a></div><div className="audio-card"><div className="audio-card-top"><span><Music2 size={15} /> CURRENTLY PLAYING</span><span>00:42 / 03:18</span></div><div className="track-title">Late Bloomer <small>— Alexa Rivera</small></div><Equalizer active={music && playing} /><div className="audio-controls"><button type="button" onClick={() => setPlaying(!playing)} aria-label="Play or pause track" aria-pressed={playing}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><div className="track-line"><span /></div></div></div></div>
    </section>
    <section className="page-end" aria-label="End of page">
      <MiniGame />
    </section>
    <footer className="page-footer"><span>© 2024 ALEXA RIVERA</span><span>CREATIVE DEVELOPER / NYC</span><span>IG / LI / ARE.NA</span></footer>
    <dialog ref={projectDialogRef} className="project-dialog" aria-label="Project preview" onClose={() => setSelectedProject(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
      <div className="project-dialog-content">
        {selectedProject && <iframe key={selectedProject.src} src={selectedProject.src} title={selectedProject.title} />}
      </div>
    </dialog>
  </main>
}
