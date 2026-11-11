import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoPreview } from '@/components/demo-preview'
import { demos } from '@/lib/demos'

export function generateStaticParams() {
  return demos.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const demo = demos.find((item) => item.slug === slug)
  return { title: demo ? `${demo.title} — Demo Room` : 'Demo Room — Alexa Rivera' }
}

export default async function DemoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const demo = demos.find((item) => item.slug === slug)
  if (!demo) notFound()

  return <main className={`demo-detail demo-tone-${demo.tone}`}>
    <header className="demo-detail-header"><a href="/demos"><ArrowLeft size={16} /> ALL DEMOS</a><span>A/R · SIDE B</span></header>
    <section className="demo-detail-main">
      <DemoPreview demo={demo} />
      <div className="demo-detail-copy"><span>{demo.number} / {demo.category}</span><h1>{demo.title}</h1><p>{demo.description}</p><a href="/demos">BACK TO THE DEMO ROOM <ArrowUpRight size={16} /></a></div>
    </section>
  </main>
}