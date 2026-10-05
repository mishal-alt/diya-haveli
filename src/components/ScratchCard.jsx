import { useCallback, useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

const REVEAL_RATIO = 0.42

// Gold scratch-off surface revealing the wedding date.
export default function ScratchCard() {
  const canvas = useRef(null)
  const drawing = useRef(false)
  const distance = useRef(0)
  const last = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)

  const paint = useCallback(() => {
    const c = canvas.current
    if (!c) return
    const rect = c.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = rect.width * dpr
    c.height = rect.height * dpr
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    if (revealed) return
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    g.addColorStop(0, '#b87327')
    g.addColorStop(0.35, '#f2cf7a')
    g.addColorStop(0.62, '#9d581e')
    g.addColorStop(1, '#e4b85f')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.globalAlpha = 0.24
    ctx.fillStyle = '#fff5cf'
    for (let x = -rect.height; x < rect.width; x += 14) ctx.fillRect(x, 0, 1, rect.height)
    ctx.globalAlpha = 1
    ctx.fillStyle = '#55230d'
    ctx.font = '500 11px Marcellus, serif'
    ctx.textAlign = 'center'
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 + 4)
  }, [revealed])

  useEffect(() => {
    paint()
    const ro = new ResizeObserver(paint)
    if (canvas.current) ro.observe(canvas.current)
    return () => ro.disconnect()
  }, [paint])

  const reveal = useCallback(() => {
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (c && ctx) ctx.clearRect(0, 0, c.width, c.height)
    setRevealed(true)
    drawing.current = false
  }, [])

  const scratch = (e) => {
    if (!drawing.current || revealed) return
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const rect = c.getBoundingClientRect()
    const k = c.width / rect.width
    const p = { x: (e.clientX - rect.left) * k, y: (e.clientY - rect.top) * k }
    const from = last.current ?? p
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 34 * k
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    distance.current += Math.hypot(p.x - from.x, p.y - from.y) / k
    last.current = p
    setStarted(true)
    if (distance.current / Math.max(rect.width * 3.4, 1) > REVEAL_RATIO) reveal()
  }

  return (
    <div className="mt-7 flex flex-col items-center">
      <div
        className={`scratch-card relative w-[min(92vw,44rem)] overflow-hidden rounded-[1.75rem] border border-gold/40 transition-all duration-700 ${revealed ? 'scratch-card-revealed' : ''}`}
      >
        <div className="relative grid min-h-36 place-items-center bg-deep/75 px-8 py-8 text-center sm:min-h-44">
          <Sparkles
            className={`absolute left-5 top-5 h-3.5 w-3.5 text-gold transition-all duration-700 ${revealed ? 'rotate-12 scale-125 opacity-100' : 'opacity-0'}`}
          />
          <div>
            <p className="font-display text-4xl tracking-[0.12em] text-gold-soft sm:text-6xl">14 · 02 · 2027</p>
            <p className="mt-2 text-[0.58rem] uppercase tracking-[0.45em] text-gold/75">Jaipur · at half past six</p>
          </div>
        </div>
        <canvas
          ref={canvas}
          className={`absolute inset-0 h-full w-full touch-none cursor-crosshair transition-opacity duration-700 ${revealed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          onPointerDown={(e) => {
            drawing.current = true
            last.current = null
            e.currentTarget.setPointerCapture(e.pointerId)
            scratch(e)
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false
            last.current = null
          }}
          onPointerCancel={() => {
            drawing.current = false
            last.current = null
          }}
          aria-label="Scratch the gold surface to reveal the wedding date"
        />
      </div>
      <button
        type="button"
        onClick={reveal}
        className={`mt-3 text-[0.56rem] uppercase tracking-[0.3em] text-gold-soft/60 transition-all hover:text-gold-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${revealed ? 'pointer-events-none translate-y-1 opacity-0' : 'opacity-100'}`}
      >
        {started ? 'keep going' : 'or tap to reveal'}
      </button>
    </div>
  )
}
