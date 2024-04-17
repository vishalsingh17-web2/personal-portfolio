import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '../utils/cn'
import React from 'react'

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [scope, animate] = useAnimate()
  let wordsArray = words.split(' ')
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.1),
      },
    )
  }, [scope.current])

  const renderWords = () => {
    const [highlighter, setHighlight] = useState(0)
    const n = wordsArray.length

    useEffect(() => {
      const interval = setInterval(() => {
        setHighlight(Math.floor(Math.random() * n))
      }, 3000)

      return () => clearInterval(interval)
    }, [])
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`dark:text-gray-400 text-black opacity-0 hover:text-white transition-all ${
                highlighter === idx ? 'text-white' : 'text-gray-400'
              } duration-300 ease-in-out text-sm `}
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn('font-semibold text-center', className)}>
      <div>
        <div className=' dark:text-white text-black text-2xl leading-snug tracking-wide'>
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
