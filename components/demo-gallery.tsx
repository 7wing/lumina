'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Music2 } from 'lucide-react'
import { DemoPreview } from '@/components/demo-preview'
import { demos, type Demo } from '@/lib/demos'

export default function DemoGallery() {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedDemo && !dialog.open) dialog.showModal()
    if (!selectedDemo && dialog.open) dialog.close()
  }, [selectedDemo])

  useEffect(() => {
    if (!selectedDemo) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedDemo])

  return <main className="demo-hub">
    <div className="demo-hub-wrap">
      <header className="demo-hub-header">
        <a className="demo-back-link" href="/"><ArrowDownLeft size={16} /> BACK TO THE WORK</a>
        <span className="demo-hub-mark">A<span>/</span>R · SIDE B</span>
      </header>
      <section className="demo-hub-intro">
        <div className="demo-hub-kicker"><Music2 size={15} /> TEN SMALL WORLDS / ONE LOUD IDEA</div>
        <h1>PRESS PLAY<br /><em>ON AN IDEA.</em></h1>
        <div className="demo-hub-summary"><p>A little collection of things made to move, listen, explore, and play. Pick a board and step inside.</p><span>10 DEMOS<br />00:32:10 TOTAL</span></div>
        <div className="demo-hub-eq" aria-hidden="true">{Array.from({ length: 38 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 41 + 27) % 82)}%` }} />)}</div>
      </section>
      <section className="demo-board-grid" aria-label="Demo projects">
        {demos.map((demo) => <button key={demo.slug} type="button" className={`demo-board demo-tone-${demo.tone}`} onClick={() => setSelectedDemo(demo)}>
          <DemoPreview demo={demo} />
          <span className="demo-board-meta"><span>{demo.number} / {demo.category}</span><ArrowUpRight size={16} /></span>
          <strong className="demo-board-title">{demo.title}</strong>
          <span className="demo-board-summary">{demo.summary}</span>
        </button>)}
      </section>
      <footer className="demo-hub-footer"><span>END OF SIDE B</span><a href="/">BACK TO THE PORTFOLIO <ArrowUpRight size={15} /></a></footer>
    </div>
    <dialog ref={dialogRef} className="demo-dialog" aria-label="Demo preview" onClose={() => setSelectedDemo(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
      {selectedDemo && <div className="demo-dialog-content">
        <DemoPreview demo={selectedDemo} />
        <div className="demo-dialog-info">
          <div className="demo-dialog-heading"><span>{selectedDemo.number} / {selectedDemo.category}</span><h2>{selectedDemo.title}</h2></div>
          <p>{selectedDemo.description}</p>
          <a className="demo-launch-link" href={`/demos/${selectedDemo.slug}`}>OPEN DEMO <ArrowUpRight size={17} /></a>
        </div>
      </div>}
    </dialog>
  </main>
}