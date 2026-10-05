import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'

// Cover artwork with a slow ken-burns zoom.
export default function CoverImage({ src, alt, paused }) {
  const ref = useRef(null)
  const motionOk = useMotionOk()
  useGSAP(() => {
    if (!motionOk || !ref.current) return
    const tween = gsap.to(ref.current, { scale: 1.08, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true })
    return () => {
      tween.kill()
    }
  }, [motionOk])
  if (paused && ref.current) ref.current.style.transform = 'scale(1)'
  return <img ref={ref} src={src} alt={alt} className="h-full w-full object-cover" style={{ willChange: 'transform' }} />
}
