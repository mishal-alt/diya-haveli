import { useCallback, useEffect, useRef, useState } from 'react'
import { media } from '../data'
import CoverImage from './CoverImage'
import HoldButton from './HoldButton'
import SkipButton from './SkipButton'
import TapRipple from './TapRipple'

const LOTUS_LEAD = 2.4 // seconds before the opener ends when the lotus clip takes over

// cover -> opener video -> lotus video -> still frame (then fades out)
export default function Opening({ onFinish }) {
  const [stage, setStage] = useState('cover')
  const [gone, setGone] = useState(false)
  const [tap, setTap] = useState(null)
  const opener = useRef(null)
  const lotus = useRef(null)
  const tapId = useRef(0)

  const finish = useCallback(() => {
    setStage('still')
    onFinish()
    window.setTimeout(() => setGone(true), 1600)
  }, [onFinish])

  const start = useCallback(() => {
    if (stage !== 'cover') return
    setStage('opener')
    const v = opener.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => finish())
    })
  }, [stage, finish])

  useEffect(() => {
    const v = opener.current
    if (!v || stage !== 'opener') return
    const check = () => {
      if (v.duration && v.duration - v.currentTime <= LOTUS_LEAD) {
        setStage('lotus')
        const l = lotus.current
        if (l) {
          l.currentTime = 0
          l.play().catch(() => {
            l.muted = true
            l.play().catch(() => finish())
          })
        }
      }
    }
    v.addEventListener('timeupdate', check)
    v.addEventListener('ended', check)
    return () => {
      v.removeEventListener('timeupdate', check)
      v.removeEventListener('ended', check)
    }
  }, [stage, finish])

  useEffect(() => {
    if (stage === 'cover' || stage === 'done') return
    const onKey = (e) => e.key === 'Escape' && finish()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, finish])

  if (gone) return null
  const isCover = stage === 'cover'
  const isOpener = stage === 'opener'
  const isLotus = stage === 'lotus'

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-deep transition-opacity duration-[1400ms] ${stage === 'still' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <HoldButton
        onActivate={start}
        onTap={(x, y) => {
          tapId.current += 1
          setTap({ x, y, id: tapId.current })
        }}
        className={`absolute inset-0 z-20 h-full w-full transition-opacity duration-1000 ${isCover ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <CoverImage src={media.cover} alt="Ornate golden and vermilion wedding invitation cover" paused={!isCover} />
        <span className="pointer-events-none absolute inset-x-0 bottom-[8%] mx-auto block w-40 rounded-full py-2 text-center text-[0.7rem] tracking-[0.35em] text-primary-foreground/0">
          open
        </span>
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 float-slow" />
      </HoldButton>
      <video
        ref={opener}
        src={media.opener}
        playsInline
        preload="auto"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${isOpener ? 'opacity-100' : 'opacity-0'}`}
      />
      <video
        ref={lotus}
        src={media.lotus}
        playsInline
        preload="auto"
        onEnded={finish}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${isLotus ? 'opacity-100' : 'opacity-0'}`}
      />
      <img
        src={media.lastFrame}
        alt="Bride and groom feet with lotus motifs"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${stage === 'still' ? 'opacity-100' : 'opacity-0'}`}
      />
      <TapRipple tap={tap} />
      {stage !== 'cover' && stage !== 'still' && <SkipButton onClick={finish} />}
    </div>
  )
}
