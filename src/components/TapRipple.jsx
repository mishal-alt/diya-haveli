import { useEffect, useState } from 'react'

// Ripple at the tap position (key by id so each tap restarts the animation).
export default function TapRipple({ tap }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!tap) return
    setOn(true)
    const t = window.setTimeout(() => setOn(false), 720)
    return () => window.clearTimeout(t)
  }, [tap])
  if (!tap || !on) return null
  return (
    <span
      key={tap.id}
      aria-hidden
      className="ripple-anim pointer-events-none fixed left-0 top-0 z-30 h-24 w-24 rounded-full border border-gold-soft/60 bg-gold-soft/10"
      style={{ left: tap.x, top: tap.y }}
    />
  )
}
