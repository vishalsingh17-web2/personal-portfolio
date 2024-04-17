import React, { useEffect, useState } from 'react'

const ScrollView = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [scrollTop, setScrollTop] = useState(20)

  const handleMouseDown = (event) => {
    setIsDragging(true)
    setStartY(event.clientY)
  }

  const handleMouseMove = (event) => {
    if (!isDragging) return
    const deltaY = event.clientY - startY
    const newScrollTop = scrollTop + deltaY

    if (newScrollTop < 20) {
      setScrollTop(newScrollTop)
      setStartY(event.clientY)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    return () => {
      setStartY(0)
    }
  }, [])
  return (
    <div
      className={`p-[16px] max-h-screen w-full overflow-scroll scroll-smooth scrollbar-hide cursor-pointer ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className='flex max-h-screen overflow-y-scroll w-full relative scrollbar-hide'
        style={{ top: `${scrollTop}px` }}
      >
        {children && children}
      </div>
    </div>
  )
}

export default ScrollView
