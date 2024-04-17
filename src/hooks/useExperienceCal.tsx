import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

export const useExperienceCal = () => {
  const [difference, setDifference] = useState({ months: 0, years: 0 })

  useEffect(() => {
    const currentDate = dayjs()
    const startDate = dayjs('2022-10-26') // Provide your start date here
    const diffInMonths = currentDate.diff(startDate, 'month')
    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths % 12

    setDifference({ months, years })
  }, [])

  return difference
}
