import { useEffect, useState } from 'react'
import { ScrollTrigger, useGSAP } from './lib/gsap'
import { sections, WEDDING_DATE } from './data'
import Opening from './components/Opening'
import CursorGlow from './components/CursorGlow'
import SectionNav from './components/SectionNav'
import MusicToggle from './components/MusicToggle'
import Reveal from './components/Reveal'
import SectionHeader from './components/SectionHeader'
import Interlude from './components/Interlude'
import HeroBackdrop from './components/HeroBackdrop'
import Names from './components/Names'
import ScratchCard from './components/ScratchCard'
import Ambient from './components/Ambient'
import WordReveal from './components/WordReveal'
import FloatingBadge from './components/FloatingBadge'
import Greeting from './components/Greeting'
import Countdown from './components/Countdown'
import Story from './components/Story'
import Portrait from './components/Portrait'
import DiyaRitual from './components/DiyaRitual'
import Celebrations from './components/Celebrations'
import PalaceReveal from './components/PalaceReveal'
import VenueMap from './components/VenueMap'
import Credit from './components/Credit'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [progress, setProgress] = useState(0)

  // Page scroll is locked until the opening sequence finishes.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setProgress(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 80)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Opening onFinish={() => setOpened(true)} />
      <CursorGlow />
      <SectionNav sections={sections} />
      <MusicToggle visible={opened} />
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gold/80 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <section data-section="hero" className="relative flex min-h-screen items-end justify-center overflow-hidden">
        <HeroBackdrop />
        <div className="relative z-10 mb-16 px-6 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-gold-soft/80">Together with their families</p>
          </Reveal>
          <Reveal delay={200}>
            <Names />
          </Reveal>
          <Reveal delay={400}>
            <ScratchCard />
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-10 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/60">
              scroll
              <div className="mx-auto mt-3 h-10 w-px shimmer-line" />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-section="blessing" className="relative px-6 py-28">
        {opened && <Ambient type="petals" count={7} />}
        <div className="relative mx-auto max-w-2xl text-center">
          <WordReveal text="“Where two souls meet, the lotus blooms — and every path becomes a garden.”" />
          <Reveal delay={200}>
            <div className="mx-auto mt-8 w-24 gold-rule" />
            <p className="mt-6 text-sm leading-loose text-muted-foreground">
              With the blessings of Shri &amp; Smt. Raghav Menon and Shri &amp; Smt. Devang Sharma, we invite you to share in the joy of our wedding.
            </p>
          </Reveal>
        </div>
        <FloatingBadge />
      </section>

      <section data-section="countdown" className="relative px-6 pb-28">
        <SectionHeader eyebrow="The Countdown" title="179 days, still counting." className="mx-auto max-w-2xl" />
        <div className="mt-10">
          <Greeting />
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft/70">The wedding begins in</p>
          </Reveal>
          <Reveal delay={150}>
            <Countdown target={WEDDING_DATE} />
          </Reveal>
        </div>
      </section>

      <Story />
      <Portrait />
      <DiyaRitual />
      <Celebrations />
      <Interlude>Every journey has a place.</Interlude>
      <PalaceReveal />

      <section data-section="venue" className="relative px-6 py-32">
        <SectionHeader eyebrow="The Venue" title="Where we begin forever." className="mx-auto max-w-2xl" />
        <Reveal>
          <div className="mx-auto mt-12 max-w-xl text-center">
            <p className="font-display text-3xl gold-text sm:text-4xl">Rambagh Haveli</p>
            <p className="mt-3 text-sm tracking-[0.25em] text-gold-soft/80 uppercase">Amber Road · Jaipur · 302002</p>
            <p className="mt-8 font-display text-lg italic leading-relaxed text-foreground/80">
              A 19th-century palace set among eight acres of gardens — candlelit courtyards, mirrored halls, and the soft sound of fountains beneath a Jaipur sky.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="mx-auto mt-16 max-w-2xl">
            <VenueMap />
          </div>
        </Reveal>
      </section>

      <footer className="relative mt-20 overflow-hidden border-t border-gold/15 px-6 pb-12 pt-28 text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.12_84/0.18),transparent_68%)]"
        />
        <p className="relative text-[0.58rem] uppercase tracking-[0.55em] text-gold-soft/55">With love, and with your blessings</p>
        <p className="relative mt-7 text-balance font-display text-6xl leading-none gold-text sm:text-8xl">
          Aarav <span className="font-light italic text-gold-soft/55">&amp;</span> Meera
        </p>
        <p className="relative mx-auto mt-7 max-w-xl font-display text-lg italic leading-relaxed text-foreground/65">
          We cannot wait to begin this chapter surrounded by the people who made every page before it possible.
        </p>
        <div className="relative mx-auto mt-14 flex max-w-3xl items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 font-display text-xl text-gold-soft">✦</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
        </div>
        <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 text-[0.55rem] uppercase tracking-[0.3em] text-foreground/35 sm:flex-row">
          <span>14 February 2027 · Jaipur</span>
          <span>#TwoSoulsOneLotus</span>
        </div>
        <Credit />
      </footer>
    </main>
  )
}
