import { useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CalendarPlus } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'
import { events, media } from '../data'
import { icsDataUrl } from '../calendar'
import { cn } from '../lib/cn'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Celebrations() {
  return (
    <section
      data-section="celebrations"
      className="relative bg-cover bg-center bg-no-repeat px-6 py-32"
      style={{ backgroundImage: `url(${media.celebrationsBg})` }}
    >
      <div
        aria-hidden
        className="ken-burns-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${media.celebrationsBg})` }}
      />
      <div className="absolute inset-0 bg-deep/75" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeader eyebrow="The Celebrations" title="Four evenings, woven together." className="mx-auto max-w-2xl" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 120}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Tilt-on-hover card; click opens an "add to calendar" popover.
function EventCard({ event }) {
  const card = useRef(null)
  const motionOk = useMotionOk()
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    if (!motionOk || !card.current) return
    const el = card.current
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      gsap.to(el, { rotateX: -y * 4, rotateY: x * 5, transformPerspective: 800, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
    }
    const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [motionOk])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          ref={card}
          className={cn(
            'group h-full cursor-pointer rounded-xl border border-gold/25 p-7 paper',
            'transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(225,190,120,0.4)]',
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="flex items-center gap-2">
            <img src={media.eventBadge} alt="" aria-hidden className="h-5 w-5 rounded-full object-cover ring-1 ring-gold/40" />
            <h3 className="font-display text-3xl gold-text">{event.name}</h3>
          </div>
          <div className="mt-3 w-12 gold-rule transition-all duration-500 group-hover:w-24" />
          <p className="mt-4 text-sm tracking-[0.2em] text-gold-soft/90">
            {event.date} · {event.time}
          </p>
          <p className="mt-2 text-sm text-foreground/85">{event.place}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{event.note}</p>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="center"
          sideOffset={4}
          className={cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)',
            'w-72 border-gold/30 bg-card text-foreground',
          )}
        >
          <div className="space-y-3">
            <p className="font-display text-xl gold-text">Save your seat for {event.name}</p>
            <p className="text-xs text-muted-foreground">
              {event.date} · {event.time} · {event.place}
            </p>
            <a
              href={icsDataUrl(event)}
              download={`aarav-meera-${event.slug}.ics`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft transition-colors hover:bg-gold/10"
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Add to calendar
            </a>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
