import { useEffect, useRef, useState } from 'react'
import { media } from '../data'

// Curtains part over the palace courtyard when scrolled into view.
export default function PalaceReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setVisible(true), { threshold: 0.28 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className={`palace-reveal relative min-h-[85dvh] overflow-hidden ${visible ? 'palace-visible' : ''}`}>
      <img src={media.palaceCourtyard} alt="Candlelit Jaipur palace courtyard reflected in a still pool" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--deep),transparent_30%,transparent_65%,var(--deep))]" />
      <div className="palace-curtain palace-curtain-left absolute inset-y-0 left-0 w-1/2 bg-deep" />
      <div className="palace-curtain palace-curtain-right absolute inset-y-0 right-0 w-1/2 bg-deep" />
      <div className="relative z-10 flex min-h-[85dvh] items-end justify-center px-6 pb-20 text-center">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.5em] text-gold-soft/70">Your seat awaits</p>
          <h2 className="mt-3 text-balance font-display text-5xl text-gold-soft sm:text-7xl">Meet us beneath the Jaipur sky.</h2>
        </div>
      </div>
    </section>
  )
}
