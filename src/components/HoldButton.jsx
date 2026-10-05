import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useFinePointer, useMotionOk } from '../hooks/useMedia'
import { cn } from '../lib/cn'

const C = 2 * Math.PI * 36

// Full-surface button: tap anywhere, or press-and-hold (mouse) to fill the ring.
export default function HoldButton({ onActivate, onTap, children, className }) {
  const fine = useFinePointer()
  const motionOk = useMotionOk()
  const ring = useRef(null)
  const held = useRef(false)
  const [pressing, setPressing] = useState(false)

  useGSAP(() => {
    if (!fine || !motionOk || !ring.current) return
    const el = ring.current
    el.style.strokeDasharray = `${C}`
    el.style.strokeDashoffset = `${C}`
    return () => {
      gsap.killTweensOf(el)
    }
  }, [fine, motionOk])

  const down = (e) => {
    if (!fine) return
    held.current = false
    setPressing(true)
    onTap(e.clientX, e.clientY)
    if (!ring.current) return
    gsap.killTweensOf(ring.current)
    gsap.fromTo(
      ring.current,
      { strokeDashoffset: C },
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'none',
        onComplete: () => {
          held.current = true
          setPressing(false)
          onActivate()
        },
      },
    )
  }
  const up = () => {
    if (!fine) return
    setPressing(false)
    if (ring.current) {
      gsap.killTweensOf(ring.current)
      gsap.to(ring.current, { strokeDashoffset: C, duration: 0.18, ease: 'power2.out' })
    }
  }

  return (
    <button
      type="button"
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
      onClick={(e) => {
        if (!(fine && held.current)) {
          onTap(e.clientX, e.clientY)
          onActivate()
        }
        held.current = false
      }}
      className={cn('relative', className)}
      aria-label="Tap or hold to open the invitation"
    >
      {children}
      {fine && motionOk && (
        <svg
          aria-hidden
          className={cn('pointer-events-none absolute inset-0 m-auto h-20 w-20 transition-opacity', pressing ? 'opacity-100' : 'opacity-0')}
          viewBox="0 0 80 80"
        >
          <circle cx="40" cy="40" r="36" fill="none" stroke="oklch(0.93 0.07 86 / 0.25)" strokeWidth="2" />
          <circle
            ref={ring}
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="oklch(0.93 0.07 86 / 0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
      )}
    </button>
  )
}
