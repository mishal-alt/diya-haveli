import { useSyncExternalStore } from 'react'

function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

// True when the user has NOT asked for reduced motion.
export const useMotionOk = () => useMediaQuery('(prefers-reduced-motion: no-preference)')
// True on devices with a mouse / hover.
export const useFinePointer = () => useMediaQuery('(pointer: fine) and (hover: hover)')
