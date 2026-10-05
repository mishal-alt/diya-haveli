import { useEffect, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useFinePointer, useMotionOk } from '../hooks/useMedia'
import { cn } from '../lib/cn'

// Desktop-only dot navigation that follows the active [data-section].
export default function SectionNav({ sections }) {
  const fine = useFinePointer()
  const motionOk = useMotionOk()
  const [active, setActive] = useState(null)

  useGSAP(() => {
    if (!fine || !motionOk) return
    const triggers = []
    sections.forEach(({ id }) => {
      const el = document.querySelector(`[data-section="${id}"]`)
      if (!el) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(id)
          },
        },
      })
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    })
    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [fine, motionOk, sections])

  const jump = (id) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) gsap.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: { y: el, autoKill: false, offsetY: 60 } })
  }

  useEffect(() => {
    if (!fine) return
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 50)
    return () => window.clearTimeout(t)
  }, [fine])

  if (!fine || !motionOk) return null
  return (
    <div className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex" aria-label="Section navigation">
      {sections.map((s) => {
        const on = active === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => jump(s.id)}
            aria-label={`Jump to ${s.label}`}
            aria-current={on ? 'true' : undefined}
            className={cn('group flex items-center gap-3 transition-opacity', on ? 'opacity-100' : 'opacity-50 hover:opacity-90')}
          >
            <span
              className={cn(
                'hidden text-[0.55rem] uppercase tracking-[0.3em] text-gold-soft/80 transition-opacity lg:block',
                on ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
              )}
            >
              {s.label}
            </span>
            <span className={cn('h-1.5 w-1.5 rounded-full transition-all duration-500', on ? 'scale-[2] bg-gold' : 'bg-gold-soft/60 group-hover:bg-gold-soft')} />
          </button>
        )
      })}
    </div>
  )
}
