'use client'

import { useState } from 'react'
import { ArrowUpRight, Headphones, Mail, MapPin, Pause, Play, Plus, Send, Sparkles, Volume2 } from 'lucide-react'

const projects = [
  { number: '01', title: 'Field Notes', type: 'Digital experience', year: '2024', color: 'coral', desc: 'A tactile archive for the rituals, rivalries, and poetry of the beautiful game.' },
  { number: '02', title: 'Sonic Bloom', type: 'Creative technology', year: '2023', color: 'lavender', desc: 'A generative music visualizer where every beat grows into a new landscape.' },
  { number: '03', title: 'Open Air', type: 'Brand world', year: '2023', color: 'mint', desc: 'A luminous identity system for a community moving culture forward.' },
]

function Nav({ active, setActive, music, setMusic }: { active: string; setActive: (s: string) => void; music: boolean; setMusic: (v: boolean) => void }) {
  return <aside className="float-nav">
    <div className="nav-mark">A<span>/</span>R</div>
    <div className="nav-links">
      {['projects', 'about', 'contact'].map((item) => <a key={item} className={active === item ? 'active' : ''} href={`#${item}`} onClick={() => setActive(item)}>{item}</a>)}
    </div>
    <button className={`audio-pill ${music ? 'playing' : ''}`} onClick={() => setMusic(!music)} aria-label="Toggle audio">
      <span className="audio-dot">{music ? <Volume2 size={13} /> : <Headphones size={13} />}</span>
      <span>{music ? 'NOW PLAYING' : 'AUDIO OFF'}</span>
    </button>
  </aside>
}

function AvatarScene({ music, onActivate }: { music: boolean; onActivate: () => void }) {
  return <div className={`scene ${music ? 'scene-playing' : ''}`} aria-label="Interactive avatar scene">
    <div className="sun-glow" />
    <div className="scene-label"><span className="live-dot" /> {music ? 'live / sonic mode' : 'interactive scene'}</div>
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="avatar-shadow" />
    <div className="avatar">
      <div className="hair" /><div className="head"><div className="eye eye-l" /><div className="eye eye-r" /><div className="smile" /></div>
      <div className="neck" /><div className="torso"><div className="shirt-mark">{music ? '♪' : '07'}</div></div>
      <div className="arm arm-left" /><div className="arm arm-right" /><div className="leg leg-left" /><div className="leg leg-right" />
    </div>
    <button className="guitar" onClick={onActivate} aria-label="Play the guitar to activate music"><span className="guitar-neck" /><span className="guitar-body"><span>♪</span></span></button>
    <div className="ball"><span /></div>
    <div className="scene-caption"><span>click the guitar</span><ArrowUpRight size={16} /></div>
    <div className="floating-note note-one">♪</div><div className="floating-note note-two">✦</div>
  </div>
}

function Equalizer({ active }: { active: boolean }) {
  return <div className={`equalizer ${active ? 'eq-active' : ''}`}>{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>
}

export default function Portfolio() {
  const [active, setActive] = useState('projects')
  const [music, setMusic] = useState(false)
  const [playing, setPlaying] = useState(true)
  return <main className="portfolio">
    <Nav active={active} setActive={setActive} music={music} setMusic={setMusic} />
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span>01</span> creative developer / athlete / musician</div>
        <h1>MAKE<br /><em>NOISE.</em><br /><span>MOVE</span> CULTURE.</h1>
        <p className="hero-intro">I&apos;m Alexa Rivera — a creative developer building digital worlds with code, rhythm, and a little competitive spirit.</p>
        <a href="#projects" className="enter-link"><span className="enter-icon"><ArrowUpRight size={18} /></span> ENTER EXPERIENCE</a>
        <div className="scroll-cue"><span /> scroll to explore</div>
      </div>
      <div className="hero-scene"><AvatarScene music={music} onActivate={() => { setMusic(true); setPlaying(true) }} /><div className="vertical-type">SELECTED WORK / 2023—24</div></div>
    </section>

    <section className="about" id="about">
      <div className="section-kicker">02 — THE PRACTICE</div>
      <div className="about-grid"><h2>DISCIPLINE<br />MEETS <em>PLAY.</em></h2><div className="about-copy"><p>There&apos;s a particular magic in the space between structure and spontaneity. I find it on the pitch, in a rehearsal room, and inside a new line of code.</p><p>My work lives at that intersection — making identities, interfaces, and experiences that feel as good as they function.</p><div className="location"><MapPin size={15} /> Brooklyn, NY <span>—</span> available worldwide</div></div></div>
      <div className="orbit-word">RHYTHM / RIGOR / RISK / REPEAT /</div>
    </section>

    <section className="projects" id="projects">
      <div className="section-heading"><div><div className="section-kicker">03 — SELECTED WORK</div><h2>IN <em>ROTATION.</em></h2></div><p>Three recent experiments<br />in making things matter.</p></div>
      <div className="project-list">{projects.map((project) => <article className={`project-card ${project.color}`} key={project.number}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span><span>{project.year}</span></div><div className="project-art"><div className="art-ring" /><div className="art-word">{project.title}</div><div className="art-plus"><Plus /></div></div><div className="project-bottom"><h3>{project.title}</h3><p>{project.desc}</p><ArrowUpRight /></div></article>)}</div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-top"><div className="section-kicker">04 — OPEN CHANNEL</div><div className="signal">● signal is strong</div></div>
      <div className="contact-grid"><div><h2>LET&apos;S MAKE<br /><em>SOMETHING</em><br />UNEXPECTED.</h2><a className="email-link" href="mailto:hello@alexarivera.studio">hello@alexarivera.studio <ArrowUpRight size={18} /></a></div><div className="audio-card"><div className="audio-card-top"><span><Sparkles size={15} /> CURRENTLY PLAYING</span><span>00:42 / 03:18</span></div><div className="track-title">Late Bloomer <small>— Alexa Rivera</small></div><Equalizer active={music && playing} /><div className="audio-controls"><button onClick={() => setPlaying(!playing)} aria-label="Play or pause track">{playing ? <Pause size={17} /> : <Play size={17} />}</button><div className="track-line"><span /></div><Volume2 size={15} /></div></div></div>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}><label><span>01 / YOUR NAME</span><input required placeholder="What should I call you?" /></label><label><span>02 / YOUR EMAIL</span><input required type="email" placeholder="you@somewhere.com" /></label><label className="message-field"><span>03 / YOUR MESSAGE</span><textarea required placeholder="Tell me what you&apos;re imagining..." /></label><button type="submit" className="send-button">SEND TRANSMISSION <Send size={17} /></button></form>
      <footer><span>© 2024 ALEXA RIVERA</span><span>CREATIVE DEVELOPER / NYC</span><span>IG / LI / ARE.NA</span></footer>
    </section>
  </main>
}
