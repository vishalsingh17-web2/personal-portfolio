import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Accelerating progress curve
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1
        return Math.min(prev + increment, 100)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase('reveal'), 300)
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 1200)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Animated phone icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotateY: -90 }}
              animate={
                phase === 'reveal'
                  ? { scale: [1, 1.2, 0], rotateY: [0, 0, 90], y: [0, 0, -50] }
                  : { scale: 1, rotateY: 0 }
              }
              transition={
                phase === 'reveal'
                  ? { duration: 0.8, ease: [0.36, 0, 0.66, -0.56] }
                  : { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }
              }
            >
              {/* Phone silhouette */}
              <div className="w-[60px] h-[100px] rounded-[14px] border-2 border-zinc-600 bg-zinc-900/80 relative overflow-hidden">
                {/* Screen shimmer */}
                <motion.div
                  className="absolute inset-[3px] rounded-[10px] overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
                  />
                </motion.div>
                {/* Dynamic island */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[20px] h-[6px] bg-black rounded-full" />
                {/* Home indicator */}
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[18px] h-[3px] bg-zinc-600 rounded-full" />
              </div>

              {/* Floating particles around phone */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-400/60"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i / 6) * Math.PI * 2) * 50],
                    y: [0, Math.sin((i / 6) * Math.PI * 2) * 50],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Name and title */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={phase === 'reveal' ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              transition={{ delay: phase === 'reveal' ? 0 : 0.5, duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
                Vishal<span className="text-blue-400">.</span>
              </h1>
              <p className="text-sm text-zinc-500">Portfolio</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48"
              initial={{ opacity: 0 }}
              animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: phase === 'reveal' ? 0 : 0.7 }}
            >
              <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    width: { duration: 0.1, ease: 'linear' },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
                  }}
                />
              </div>
              <motion.p
                className="text-[10px] text-zinc-600 text-center mt-2 font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress < 100 ? 'Loading experience...' : 'Ready'}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
