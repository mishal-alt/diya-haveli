import { useEffect, useRef, useState } from 'react'
import { gsap, easeOutExpo, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'
import { cn } from '../lib/cn'

const LABELS = ['Days', 'Hours', 'Minutes', 'Seconds']
const pad = (n) => String(n).padStart(2, '0')

function remaining(ts) {
  const ms = Math.max(0, ts - Date.now())
  return [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60]
}

export default function Countdown({ target }) {
  const ts = new Date(target).getTime()
  const [vals, setVals] = useState(null)
  const prev = useRef([0, 0, 0, 0])
  const motionOk = useMotionOk()

  useEffect(() => {
    setVals(remaining(ts))
    const id = window.setInterval(() => {
      setVals((v) => {
        if (v) prev.current = v
        return remaining(ts)
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [ts])

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
      {LABELS.map((label, i) =>
        vals ? (
          <FlipCell
            key={label}
            label={label}
            value={vals[i] ?? 0}
            prev={prev.current[i] ?? vals[i] ?? 0}
            animate={motionOk}
            highlight={(label === 'Days' && (vals[0] ?? 0) <= 7) || (label === 'Hours' && (vals[1] ?? 0) <= 6)}
          />
        ) : (
          <FlipCell key={label} label={label} value={0} prev={0} animate={false} highlight={false} />
        ),
      )}
    </div>
  )
}

// One digit-pair tile that slides the new number in.
function FlipCell({ label, value, prev, animate, highlight }) {
  const box = useRef(null)
  const next = useRef(null)
  const old = useRef(null)
  const [ready, setReady] = useState(false)

  useGSAP(() => {
    if (!animate || !highlight || !box.current) return
    gsap.fromTo(
      box.current,
      { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
      { boxShadow: '0 0 0 8px rgba(225, 190, 120, 0.35)', duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' },
    )
  }, [animate, highlight])

  useGSAP(() => {
    if (!animate || !next.current || !old.current) return
    if (!ready) {
      setReady(true)
      return
    }
    if (value === prev) return
    const tl = gsap.timeline()
    tl.fromTo(next.current, { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: easeOutExpo }, 0)
    tl.fromTo(old.current, { yPercent: 0 }, { yPercent: 100, duration: 0.55, ease: easeOutExpo }, 0)
    return () => tl.kill()
  }, [animate, value])

  return (
    <div ref={box} className={cn('flip-stack rounded-lg border border-gold/25 bg-card/50 px-2 py-4 text-center backdrop-blur-sm')}>
      <div className="relative h-9 overflow-hidden">
        <div
          ref={old}
          aria-hidden
          className="flip-face font-display absolute inset-0 grid text-3xl gold-text tabular-nums"
          style={{ transform: animate ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <span>{pad(prev)}</span>
        </div>
        <div
          ref={next}
          className="flip-face font-display absolute inset-0 grid text-3xl gold-text tabular-nums"
          style={{ transform: animate ? 'translateY(-100%)' : 'translateY(0)' }}
        >
          <span>{pad(value)}</span>
        </div>
      </div>
      <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  )
}
