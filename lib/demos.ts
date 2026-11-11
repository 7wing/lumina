export type Demo = {
  slug: string
  number: string
  title: string
  category: string
  summary: string
  description: string
  previewTitle: string
  visual: 'field' | 'wave' | 'orbit' | 'gallery' | 'timeline' | 'playlist' | 'ticker' | 'studio' | 'map' | 'notebook'
  tone: 'coral' | 'mint' | 'yellow' | 'blue' | 'pink' | 'green' | 'orange' | 'sky' | 'red' | 'lilac'
}

export const demos: Demo[] = [
  { slug: 'field-notes', number: '01', title: 'Field Notes', category: 'SPORT / CULTURE', summary: 'A living archive for the rituals, rivalries, and poetry of the beautiful game.', description: 'Matchday memories collected like liner notes: a little history, a little noise, and the details that stay with you after the final whistle.', previewTitle: 'The beautiful game, between the lines.', visual: 'field', tone: 'coral' },
  { slug: 'sonic-bloom', number: '02', title: 'Sonic Bloom', category: 'SOUND / GENERATIVE', summary: 'An audio-reactive garden where every beat finds a new shape.', description: 'A playful visualizer turns a rhythm into a growing landscape. The page shifts from quiet sprouts to full bloom as the tempo rises.', previewTitle: 'Sound takes root.', visual: 'wave', tone: 'mint' },
  { slug: 'open-air', number: '03', title: 'Open Air', category: 'IDENTITY / EVENTS', summary: 'A bright identity for a community moving culture forward.', description: 'A modular event world built to feel like the first hour of a great outdoor set: open, warm, and full of possibility.', previewTitle: 'Make room for a little more.', visual: 'orbit', tone: 'yellow' },
  { slug: 'soft-focus', number: '04', title: 'Soft Focus', category: 'IMAGE / JOURNAL', summary: 'A photo journal for the moments that almost slipped by.', description: 'A calm, image-led journal gives each photograph room to breathe, with notes that feel like the back of a print.', previewTitle: 'The light was like this.', visual: 'gallery', tone: 'pink' },
  { slug: 'night-shift', number: '05', title: 'Night Shift', category: 'MUSIC / CITY GUIDE', summary: 'A late-night guide tuned to the people making the city hum.', description: 'Find a room, catch a set, and keep moving. Night Shift turns a sprawling city calendar into a pocket-sized after-hours companion.', previewTitle: 'The city is still playing.', visual: 'timeline', tone: 'blue' },
  { slug: 'side-a', number: '06', title: 'Side A', category: 'RECORDS / DISCOVERY', summary: 'A record shelf that follows a feeling, not a genre.', description: 'A tactile listening guide connects records by mood, memory, and the small details that make you flip to the other side.', previewTitle: 'Start anywhere. Stay awhile.', visual: 'playlist', tone: 'orange' },
  { slug: 'good-company', number: '07', title: 'Good Company', category: 'COMMUNITY / PEOPLE', summary: 'A small directory for finding your people and making something together.', description: 'A warm, low-friction directory helps collaborators find one another through shared interests and the work they want to make next.', previewTitle: 'Better things happen together.', visual: 'ticker', tone: 'green' },
  { slug: 'green-room', number: '08', title: 'Green Room', category: 'BACKSTAGE / TOOLKIT', summary: 'A useful backstage home for artists, crews, and their next set.', description: 'A compact artist dashboard brings the set list, day-of notes, and key contacts into one clear space before the doors open.', previewTitle: 'Everything before the lights.', visual: 'studio', tone: 'sky' },
  { slug: 'home-stand', number: '09', title: 'Home Stand', category: 'SPORT / COMMUNITY', summary: 'A neighborhood scoreboard for local teams and the people behind them.', description: 'A community-first match view puts local fixtures, familiar faces, and the atmosphere around the game in the same frame.', previewTitle: 'Your side of the story.', visual: 'map', tone: 'red' },
  { slug: 'daybreak', number: '10', title: 'Daybreak', category: 'RHYTHM / ROUTINE', summary: 'A softer start to the day, built around sound and small intentions.', description: 'A gentle morning dashboard pairs a short listening ritual with one clear intention, so the day starts with a little less static.', previewTitle: 'Find your first note.', visual: 'notebook', tone: 'lilac' },
]