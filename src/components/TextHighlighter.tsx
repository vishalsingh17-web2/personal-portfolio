import React from 'react'

const TextHighlighter = ({ words }: { words: string[] }) => {
  return (
    <div>
      {words.map((word, index) => {
        if (word.startsWith('*')) {
          return (
            <span key={index} className='text-yellow-500'>
              {word.substring(1)}
              {index !== words.length - 1 && ' '}
            </span>
          )
        } else {
          return (
            <span key={index}>
              {word}
              {index !== words.length - 1 && ' '}
            </span>
          )
        }
      })}
    </div>
  )
}

export default TextHighlighter
