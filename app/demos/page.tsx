import type { Metadata } from 'next'
import DemoGallery from '@/components/demo-gallery'

export const metadata: Metadata = {
  title: 'Demo Room — Alexa Rivera',
  description: 'Ten small digital worlds made to move, listen, explore, and play.',
}

export default function DemosPage() {
  return <DemoGallery />
}