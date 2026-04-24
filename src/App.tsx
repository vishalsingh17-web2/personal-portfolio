import { lazy, Suspense, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { Analytics } from '@vercel/analytics/react'

const HeroWithPhone = lazy(() =>
  import('./components/sections/HeroWithPhone').then((module) => ({
    default: module.HeroWithPhone,
  }))
)

const SplashScreen = lazy(() =>
  import('./components/visuals/SplashScreen').then((module) => ({
    default: module.SplashScreen,
  }))
)

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <Analytics />
      <Suspense fallback={<div className="h-[100dvh] w-screen bg-[#030712]" />}>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <HeroWithPhone />
      </Suspense>
    </MotionConfig>
  )
}


export default App;
