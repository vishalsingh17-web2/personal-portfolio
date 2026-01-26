import { HeroWithPhone } from "./components/sections/HeroWithPhone";
import { Analytics } from '@vercel/analytics/react'
function App() {
  return (
    <>
      <Analytics />
      <HeroWithPhone />
    </>
  )
}


export default App;
