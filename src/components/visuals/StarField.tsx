import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

// Deterministic positions keep the background stable across mounts and resizes.
let seed = 1747
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}
const stars = Array.from({ length: 90 }, () => ({
  left: `${random() * 100}%`,
  top: `${random() * 100}%`,
  size: random() > 0.8 ? 2 : 1,
  opacity: 0.12 + random() * 0.18,
}))

export function StarField() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !document.hidden)
  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return (
    <div className="starfield-2d" aria-hidden="true">
      <div className="starfield-layer" style={{ animationPlayState: visible && !reduceMotion ? 'running' : 'paused' }}>
        {stars.map((star, index) => <span key={index} style={{ left: star.left, top: star.top, width: star.size, height: star.size, opacity: star.opacity }} />)}
      </div>
    </div>
  )
}

export default StarField
