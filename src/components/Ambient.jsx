// Decorative fixed overlays: falling petals, floating stars, or a vertical thread.
export default function Ambient({ type = 'petals', count = 9 }) {
  if (type === 'thread') return <Thread />
  if (type === 'stars') return <Stars count={count} />
  return <Petals count={count} />
}

function Petals({ count }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute top-0 block h-2 w-1 rounded-[100%_0_100%_0] bg-gold/35"
          style={{
            left: `${(i * 97) % 100}%`,
            '--drift': `${((i % 5) - 2) * 32}px`,
            animation: `petal-fall ${22 + (i % 5) * 4}s linear ${i * 1.9}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Stars({ count }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute font-display text-gold-soft/50"
          style={{
            left: `${10 + ((i * 23 + 7) % 80)}%`,
            top: `${15 + ((i * 31) % 70)}%`,
            fontSize: `${10 + (i % 3) * 2}px`,
            animation: `soft-float ${6 + (i % 3) * 2}s ease-in-out ${i * 0.7}s infinite`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

function Thread() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      <svg className="absolute -top-20 left-1/2 h-[140vh] w-px -translate-x-1/2" viewBox="0 0 1 1400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="thread" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.93 0.07 86 / 0)" />
            <stop offset="20%" stopColor="oklch(0.93 0.07 86 / 0.4)" />
            <stop offset="80%" stopColor="oklch(0.93 0.07 86 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.93 0.07 86 / 0)" />
          </linearGradient>
        </defs>
        <line x1="0.5" y1="0" x2="0.5" y2="1400" stroke="url(#thread)" strokeWidth="1" />
      </svg>
    </div>
  )
}
