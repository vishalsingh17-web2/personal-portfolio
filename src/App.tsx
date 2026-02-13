import { useState, useCallback } from "react";
import { HeroWithPhone } from "./components/sections/HeroWithPhone";
import { SplashScreen } from "./components/visuals/SplashScreen";
import { Analytics } from '@vercel/analytics/react'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  return (
    <>
      <Analytics />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <HeroWithPhone />
    </>
  )
}


export default App;
