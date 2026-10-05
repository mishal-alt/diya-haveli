import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { AUDIO_URL } from '../data'
import { cn } from '../lib/cn'

// Background music button (appears once the opening is done).
export default function MusicToggle({ visible }) {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const a = new Audio(AUDIO_URL)
    a.loop = true
    a.preload = 'none'
    a.addEventListener('error', () => setFailed(true), { once: true })
    audio.current = a
    return () => {
      a.pause()
      audio.current = null
    }
  }, [])

  if (!visible) return null
  return (
    <button
      type="button"
      onClick={() => {
        const a = audio.current
        if (!a || failed) return
        if (playing) {
          a.pause()
          setPlaying(false)
        } else {
          a.play().then(() => setPlaying(true)).catch(() => setFailed(true))
        }
      }}
      aria-label={playing ? 'Mute music' : 'Play music'}
      className={cn(
        'fixed bottom-5 left-5 z-30 grid h-10 w-10 place-items-center rounded-full',
        'border border-gold/30 bg-deep/70 text-gold-soft backdrop-blur-sm',
        'transition-colors hover:bg-deep/90',
      )}
    >
      {failed ? <span className="text-[0.6rem]">—</span> : playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  )
}
