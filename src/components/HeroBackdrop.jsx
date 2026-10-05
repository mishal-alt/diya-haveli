import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'
import { media } from '../data'

// Full-bleed hero photo with scroll-scrubbed parallax.
export default function HeroBackdrop() {
  const root = useRef(null)
  const front = useRef(null)
  const back = useRef(null)
  const motionOk = useMotionOk()

  useGSAP(() => {
    if (!motionOk || !root.current || !front.current || !back.current) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
    })
    tl.to(front.current, { yPercent: -12, scale: 1.06 }, 0)
    tl.to(back.current, { yPercent: 18, scale: 1.12 }, 0)
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [motionOk])

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
      <img ref={back} src={media.lastFrame} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" style={{ transform: 'scale(1.06)' }} />
      <img
        ref={front}
        src={media.lastFrame}
        alt="Bride and groom standing together, framed by golden lotus motifs"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: 'scale(1.06)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/10 via-transparent to-deep/85" />
    </div>
  )
}
