// Each letter is its own span (letter-level styling hooks via data-letter).
function Letters({ text, className = '' }) {
  return (
    <span aria-label={text} className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-letter={ch === ' ' ? ' ' : ch} className="inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Names() {
  return (
    <h1 className="mt-5 font-display text-6xl leading-none gold-text sm:text-8xl" style={{ opacity: 1 }}>
      <Letters text="Aarav" />
      <span className="mx-3 align-middle text-3xl sm:text-5xl">&amp;</span>
      <Letters text="Meera" />
    </h1>
  )
}
