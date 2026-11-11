import type { Demo } from '@/lib/demos'

function DemoVisual({ demo }: { demo: Demo }) {
  if (demo.visual === 'wave') {
    return <div className="demo-waveform" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 37 + 13) % 76)}%` }} />)}</div>
  }

  if (demo.visual === 'field') {
    return <div className="demo-field-list">{['A long way home', 'The 88th minute', 'A song from the stands'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i>↗</i></div>)}</div>
  }

  if (demo.visual === 'orbit') {
    return <div className="demo-orbit"><i /><i /><i /><strong>OPEN<br />AIR</strong><span>JULY 12—14</span></div>
  }

  if (demo.visual === 'gallery') {
    return <div className="demo-gallery">{['one', 'two', 'three', 'four'].map((tile) => <i key={tile} className={`tile-${tile}`} />)}</div>
  }

  if (demo.visual === 'timeline') {
    return <div className="demo-timeline">{[['9:30', 'Doors open'], ['10:15', 'Soft Signal'], ['11:40', 'Mira Sol']].map(([time, event]) => <div key={time}><span>{time}</span><strong>{event}</strong><i /></div>)}</div>
  }

  if (demo.visual === 'playlist') {
    return <div className="demo-playlist">{['Warm Static', 'Another Shape', 'Blue in June'].map((track, index) => <div key={track}><span className={`record record-${index + 1}`} /><strong>{track}</strong><small>0{index + 1}</small></div>)}</div>
  }

  if (demo.visual === 'ticker') {
    return <div className="demo-ticker"><span>MAKERS / MUSICIANS / MOVERS /</span><strong>Find your frequency.</strong><div><i /><i /><i /></div></div>
  }

  if (demo.visual === 'studio') {
    return <div className="demo-studio"><div className="studio-art"><span>GREEN<br />ROOM</span><i /></div><div className="studio-lines"><i /><i /><i /></div></div>
  }

  if (demo.visual === 'map') {
    return <div className="demo-map"><i /><i /><i /><i /><strong>HOME<br />SIDE</strong><span>40° 41′ 52″ N</span></div>
  }

  return <div className="demo-notebook"><span>MONDAY / 07:12</span><strong>Start with<br /><em>one good thing.</em></strong><div><i /><i /><i /></div></div>
}

export function DemoPreview({ demo }: { demo: Demo }) {
  return <div className={`demo-preview demo-tone-${demo.tone}`}>
    <div className="demo-preview-top"><span className="demo-window-dots"><i /><i /><i /></span><span>{demo.category}</span><span>{demo.number} / 10</span></div>
    <div className={`demo-preview-screen demo-screen-${demo.visual}`}>
      <div className="demo-preview-title"><span>AR / STUDIO</span><strong>{demo.previewTitle}</strong></div>
      <DemoVisual demo={demo} />
      <div className="demo-preview-footer"><span>MADE TO MOVE</span><span className="demo-preview-bars">{Array.from({ length: 9 }, (_, index) => <i key={index} style={{ height: `${25 + ((index * 23 + 15) % 68)}%` }} />)}</span></div>
    </div>
  </div>
}