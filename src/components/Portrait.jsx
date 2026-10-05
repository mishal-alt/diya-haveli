import { useRef } from 'react'
import { media } from '../data'

// "One small distance" — tilt + moving light following the pointer.
export default function Portrait() {
  const ref = useRef(null)
  return (
    <section className="relative overflow-hidden px-6 py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative z-10 md:translate-y-14">
          <p className="font-display text-2xl italic text-gold-soft/75">One small distance.</p>
          <h2 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-gold-soft sm:text-7xl">Then, a lifetime within reach.</h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-foreground/65">
            Move across the photograph. The light follows the moment before two paths become one.
          </p>
        </div>
        <article
          ref={ref}
          onPointerMove={(e) => {
            const el = ref.current
            if (!el) return
            const r = el.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            el.style.setProperty('--tilt-x', `${y * -5}deg`)
            el.style.setProperty('--tilt-y', `${x * 7}deg`)
            el.style.setProperty('--light-x', `${(x + 0.5) * 100}%`)
            el.style.setProperty('--light-y', `${(y + 0.5) * 100}%`)
          }}
          onPointerLeave={() => {
            ref.current?.style.setProperty('--tilt-x', '0deg')
            ref.current?.style.setProperty('--tilt-y', '0deg')
          }}
          className="portrait-lens relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-[45%_45%_1.5rem_1.5rem] border border-gold/30"
        >
          <img src={media.weddingHands} alt="Bride and groom reaching toward one another over a glowing diya" className="h-full w-full object-cover" />
          <div className="portrait-light pointer-events-none absolute inset-0" />
          <span className="absolute bottom-5 right-5 text-[0.52rem] uppercase tracking-[0.35em] text-gold-soft/70">follow the light</span>
        </article>
      </div>
    </section>
  )
}
