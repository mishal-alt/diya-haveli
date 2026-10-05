import { media } from '../data'

export default function FloatingBadge() {
  return (
    <img
      src={media.floatingBadge}
      alt=""
      aria-hidden
      className="float-slow pointer-events-none absolute bottom-12 right-6 h-16 w-16 rounded-full object-cover opacity-50 ring-1 ring-gold/30 sm:h-20 sm:w-20"
    />
  )
}
