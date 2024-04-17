import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

const useGreetings = () => {
  const morningGreetings = useMemo(
    () => ['Good morning!', 'Rise & shine!', 'Joyful day!'],
    [],
  )
  const afternoonGreetings = useMemo(
    () => ['Good afternoon!', 'Productive PM!', 'Energetic return!'],
    [],
  )
  const eveningGreetings = useMemo(
    () => ['Good evening!', 'Peaceful evening!', 'Delightful evening!'],
    [],
  )

  function getRandomNightGreeting() {
    const greetings = ['Sweet dreams!', 'Rest well!', 'Good night!']
    const randomIndex = Math.floor(Math.random() * greetings.length)
    return greetings[randomIndex]
  }

  const [{ currentTime, greetings }, setCurrentTime] = useState({
    currentTime: new Date(),
    greetings: '',
  })

  const parsedTime = dayjs(currentTime).format('hh:mm')
  const clockTime = dayjs(currentTime).format('hh:mm:ss')
  const meridian = dayjs(currentTime).format('A')
  const day = dayjs(currentTime).format('dddd, DD MMMM')

  const hour = currentTime.getHours()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((pre) => ({ ...pre, currentTime: new Date() }))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const updateGreeting = () => {
      let newGreeting = ''
      switch (true) {
        case hour >= 5 && hour < 12:
          newGreeting =
            morningGreetings[
              Math.floor(Math.random() * morningGreetings.length)
            ]
          break
        case hour >= 12 && hour < 17:
          newGreeting =
            afternoonGreetings[
              Math.floor(Math.random() * afternoonGreetings.length)
            ]
          break
        case hour >= 17 && hour < 21:
          newGreeting =
            eveningGreetings[
              Math.floor(Math.random() * eveningGreetings.length)
            ]
          break
        default:
          newGreeting = getRandomNightGreeting()
      }

      setCurrentTime((pre) => ({ ...pre, greetings: newGreeting }))
    }

    updateGreeting()

    const intervalId = setInterval(updateGreeting, 60000)

    return () => clearInterval(intervalId)
  }, [afternoonGreetings, hour, eveningGreetings, morningGreetings])

  return { parsedTime, greetings, meridian, day, clockTime }
}

export default useGreetings
