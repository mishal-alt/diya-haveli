import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'
import { milestones } from '../data'
import { cn } from '../lib/cn'
import SectionHeader from './SectionHeader'

export default function Story() {
  const list = useRef(null)
  const motionOk = useMotionOk()

  useGSAP(() => {
    if (!motionOk || !list.current) return
    const root = list.current
    const thread = root.querySelector('[data-thread]')
    const stars = root.querySelectorAll('[data-star]')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 70%', scrub: 0.5 },
    })
    if (thread) tl.fromTo(thread, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top center' }, 0)
    if (stars.length > 0) tl.fromTo(stars, { opacity: 0.2, scale: 0.8 }, { opacity: 1, scale: 1, ease: 'power2.out', stagger: 0.2 }, 0)
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [motionOk])

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 50)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section data-section="story" className="relative px-6 py-32">
      <SectionHeader eyebrow="The Story" title="Four moments, one beginning." align="center" className="mx-auto max-w-2xl" />
      <div ref={list} className="relative mx-auto mt-20 max-w-4xl pl-10">
        <span
          data-thread
          aria-hidden
          className="absolute left-[14px] top-0 h-full w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, oklch(0.93 0.07 86 / 0.55) 12%, oklch(0.93 0.07 86 / 0.55) 88%, transparent 100%)',
          }}
        />
        <ol className="space-y-24">
          {milestones.map((m) => (
            <li key={m.year}>
              <Milestone milestone={m} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Milestone({ milestone: m }) {
  const photo = m.photo
  const dir = photo?.placement === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
  return (
    <article className="relative">
      <span data-star aria-hidden className="absolute -left-10 top-1 font-display text-lg gold-text">✦</span>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/70">{m.year}</p>
          <h3 className="mt-3 font-display text-3xl leading-snug gold-text sm:text-4xl">{m.title}</h3>
        </div>
        <p className="max-w-xl font-display text-base leading-loose text-foreground/85 sm:text-lg">{m.text}</p>
        {photo && (
          <figure className={cn('flex flex-col gap-4', photo.placement === 'below' ? '' : `md:flex-row md:items-start ${dir}`)}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={cn('object-cover', photo.placement === 'below' ? 'aspect-[16/9] w-full rounded-sm' : 'aspect-[3/4] w-full max-w-[200px] rounded-sm')}
            />
            <figcaption className={cn('text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/50', photo.placement === 'below' ? '' : 'md:pt-2 md:max-w-[160px]')}>
              {photo.alt}
            </figcaption>
          </figure>
        )}
      </div>
    </article>
  )
}
