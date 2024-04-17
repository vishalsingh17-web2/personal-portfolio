import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

const Screen = ({
  title,
  onBack,
  children,
}: {
  title: string
  onBack: () => void
  children: React.ReactNode
}) => {
  return (
    <div className='flex-col h-full'>
      <div className='w-full flex px-6 pb-4 justify-between border-b-[1px] border-b-white/40'>
        <div
          onClick={onBack}
          className='bg-transparent rounded-full transform transition-all duration-200 hover:bg-white/40 hover:scale-125 hover:p-1 bg-[#252525]'
        >
          <IoIosArrowBack
            size={'20px'}
            color='#ccc'
            className='transform hover:scale-110 transition duration-200'
          />
        </div>
        <p className='text-white'>{title}</p>
        <div className='w-[10px]' />
      </div>
      {children && children}
    </div>
  )
}

export default Screen
