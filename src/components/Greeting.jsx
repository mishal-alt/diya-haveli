import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useMotionOk } from '../hooks/useMedia'

const greet = (h) =>
  h < 5 ? 'Good night, dear guest'
  : h < 12 ? 'Good morning, dear guest'
  : h < 17 ? 'Good afternoon, dear guest'
  : h < 21 ? 'Good evening, dear guest'
  : 'Good night, dear guest'

// Time-of-day greeting above the countdown.
export default function Greeting() {
  const ref = useRef(null)
  const [text, setText] = useState('')
  const motionOk = useMotionOk()

  useEffect(() => {
    setText(greet(new Date().getHours()))
    const id = window.setInterval(() => setText(greet(new Date().getHours())), 6e4)
    return () => window.clearInterval(id)
  }, [])

  useGSAP(() => {
    if (!motionOk || !ref.current) return
    gsap.fromTo(ref.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 })
    return () => {
      if (ref.current) gsap.killTweensOf(ref.current)
    }
  }, [motionOk, text])

  return text ? (
    <p ref={ref} className="mb-3 text-center font-display text-base italic text-gold-soft/80">
      {text}
    </p>
  ) : null
}
