import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// "Skip" button with a countdown ring that fills over `duration` seconds.
export default function SkipButton({ onClick, duration = 14 }) {
  const ring = useRef(null)
  useGSAP(() => {
    const el = ring.current
    if (!el) return
    const c = 2 * Math.PI * 14
    el.style.strokeDasharray = `${c}`
    gsap.fromTo(el, { strokeDashoffset: c }, { strokeDashoffset: 0, duration, ease: 'none' })
    return () => {
      gsap.killTweensOf(el)
    }
  }, [duration])
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Skip opening sequence"
      className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-deep/40 backdrop-blur-sm transition-colors hover:bg-deep/70"
    >
      <svg aria-hidden className="absolute inset-0" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="none" stroke="oklch(0.93 0.07 86 / 0.2)" strokeWidth="1.5" />
        <circle
          ref={ring}
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="oklch(0.93 0.07 86 / 0.95)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 16 16)"
        />
      </svg>
      <span className="relative text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft/90">Skip</span>
    </button>
  )
}
