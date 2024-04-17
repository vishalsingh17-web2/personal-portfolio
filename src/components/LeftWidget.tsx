import React from 'react'
import { FaCheck } from 'react-icons/fa'

export const themeConfigs = {
  theme1: 'from-[#1D2671] to-[#C33764]',
  theme2: 'from-[#4f1c2f] to-[#905900]',
  theme3: 'from-[#133a16] to-[#8a8100]',
  theme4: 'from-[#461717] to-[#a10000]',
  theme5: 'from-[#16183e] to-[#661fad]',
  theme6: 'from-[#9d005e] to-[#eb4242]',
}

const LeftWidget = ({
  width,
  clockTime,
  meridian,
  day,
  selectedTheme,
  setTheme,
  openResume,
}: {
  width: number
  clockTime: string
  meridian: string
  day: string
  selectedTheme: string
  setTheme: (color: string) => void
  openResume: () => void
}) => {
  const { theme1, theme2, theme3, theme4, theme5, theme6 } = themeConfigs
  return (
    <div
      className={`flex flex-col space-y-8 p-4 justify-center rounded-xl bg-white/10 shadow-lg h-[700px] w-[250px] me-4 ${
        width < 1000 ? 'hidden' : undefined
      }`}
    >
      <div
        className='hover:before:bg-redborder-red-500 relative h-[200px] w-[220px] flex flex-col rounded-lg justify-center items-center
      overflow-hidden bg-[#b76b56] px-3 shadow-2xl
      transition-all before:absolute before:bottom-0 before:left-0 before:top-0
      before:z-0 before:h-full before:w-0 before:bg-[#b2644e]
      before:transition-all before:duration-500 hover:text-white
      hover:shadow-red-500 hover:before:left-0 hover:before:w-full'
      >
        <p className='text-white relative z-10 text-xl'>{day}</p>
        <p className='text-white relative z-10 text-3xl'>
          {clockTime} {meridian}
        </p>
      </div>
      <div className='bg-[#bcbcbc] hover:before:bg-redborder-red-500 relative h-[160px] w-[220px] flex flex-col rounded-lg justify-center items-center'>
        <div className='flex items-center justify-center space-x-2 mb-2'>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden bg-gradient-to-br items-center justify-center ${theme1} ${
              selectedTheme === theme1 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme1)}
          >
            {selectedTheme === theme1 && <FaCheck size={30} color='white' />}
          </div>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden items-center justify-center bg-gradient-to-br ${theme2} ${
              selectedTheme === theme2 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme2)}
          >
            {selectedTheme === theme2 && <FaCheck size={30} color='white' />}
          </div>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden items-center justify-center bg-gradient-to-br ${theme3} ${
              selectedTheme === theme3 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme3)}
          >
            {selectedTheme === theme3 && <FaCheck size={30} color='white' />}
          </div>
        </div>
        <div className='flex items-center justify-center space-x-2'>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden items-center justify-center bg-gradient-to-br ${theme4} ${
              selectedTheme === theme4 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme4)}
          >
            {selectedTheme === theme4 && <FaCheck size={30} color='white' />}
          </div>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden items-center justify-center bg-gradient-to-br ${theme5} ${
              selectedTheme === theme5 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme5)}
          >
            {selectedTheme === theme5 && <FaCheck size={30} color='white' />}
          </div>
          <div
            className={`flex h-[60px] w-[60px] rounded-md overflow-hidden items-center justify-center bg-gradient-to-br ${theme6} ${
              selectedTheme === theme6 ? 'border-4 border-black' : undefined
            }`}
            onClick={() => setTheme(theme6)}
          >
            {selectedTheme === theme6 && <FaCheck size={30} color='white' />}
          </div>
        </div>
      </div>
      <div
        className='hover:before:bg-redborder-red-500 relative h-[200px] w-[220px] flex flex-col rounded-lg justify-center items-center
      overflow-hidden bg-[#827eb3] px-3 shadow-2xl
      transition-all before:absolute before:bottom-0 before:left-0 before:top-0
      before:z-0 before:h-full before:w-0 before:bg-[#65648e]
      before:transition-all before:duration-500 hover:text-white/45
      hover:shadow-white hover:before:left-0 hover:before:w-full'
        onClick={() => openResume()}
      >
        <p className='text-white relative z-10 text-xl'>Resume</p>
      </div>
    </div>
  )
}

export default LeftWidget
