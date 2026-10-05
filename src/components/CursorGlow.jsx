import { useEffect, useRef, useState } from 'react'
import { useFinePointer } from '../hooks/useMedia'

// Soft golden dot that trails the mouse (fine pointers only).
export default function CursorGlow() {
  const fine = useFinePointer()
  const el = useRef(null)
  const target = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!fine) return
    setMounted(true)
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('pointermove', move, { passive: true })
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18
      pos.current.y += (target.current.y - pos.current.y) * 0.18
      if (el.current) el.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      if (raf.current != null) cancelAnimationFrame(raf.current)
    }
  }, [fine])

  if (!fine || !mounted) return null
  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-2 w-2 rounded-full bg-gold-soft/70 mix-blend-screen"
      style={{ filter: 'blur(0.5px)' }}
    />
  )
}
