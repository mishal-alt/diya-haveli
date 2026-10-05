import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'

// Words brighten one by one as you scroll through the quote.
export default function WordReveal({ text }) {
  const ref = useRef(null)
  const motionOk = useMotionOk()

  useGSAP(() => {
    if (!motionOk || !ref.current) return
    const words = ref.current.querySelectorAll('[data-word]')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
    })
    tl.fromTo(words, { opacity: 0.15 }, { opacity: 1, stagger: 0.04, ease: 'power1.out' }, 0)
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [motionOk])

  const words = text.split(' ')
  return (
    <p ref={ref} className="font-display text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
