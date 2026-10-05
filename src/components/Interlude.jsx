import { cn } from '../lib/cn'

export default function Interlude({ ornament = '✦', children, className }) {
  return (
    <section aria-hidden className={cn('flex flex-col items-center gap-3 px-6 py-20 text-center', className)}>
      <span className="font-display text-2xl gold-text">{ornament}</span>
      <p className="max-w-md font-display text-base italic text-gold-soft/80">{children}</p>
    </section>
  )
}
