import { useEffect, useState } from 'react'
// import { BackgroundGradientAnimation } from './components/gradient'
// import { Background } from './components/Background'
import { TextGenerateEffect } from './components/TextGenerate'
import { FaCamera } from 'react-icons/fa6'
import { IoFlashlightSharp, IoLockClosed } from 'react-icons/io5'

import useGreetings from './hooks/useGreetings'
import UpwardArrow from './components/UpwardArrow'
import AppDrawer from './components/AppDrawer'
import Header from './components/Header'
import profile from './assets/profile_pic.jpeg'
import LeftWidget, { themeConfigs } from './components/LeftWidget'
import file from "./assets/Vishal's Resume.pdf"
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

import { Document, Page } from 'react-pdf'
import { IoMdClose } from 'react-icons/io'
import RightWidget from './components/RightWidget'

export default function App() {
  const { parsedTime, meridian, day, clockTime } = useGreetings()
  const [currentTheme, setTheme] = useState(themeConfigs.theme1)
  const [openResume, setResume] = useState(false)

  const [{ width }, setSize] = useState({
    width: undefined,
    height: undefined,
  })
  const [isUnlocked, setUnlocked] = useState(false)
  const [startY, setStartY] = useState(null)

  const handleStart = (e) => {
    setStartY(getClientY(e))
  }

  const handleMove = (e) => {
    if (startY !== null && getClientY(e) < startY - 50) {
      handleUnlock()
    }
  }

  const handleEnd = () => {
    setStartY(null)
  }

  const handleUnlock = () => {
    setUnlocked(true)
  }

  const getClientY = (e) => {
    return e.touches ? e.touches[0].clientY : e.clientY
  }

  const gestureProps = {
    onMouseDown: handleStart,
    onMouseMove: handleMove,
    onMouseUp: handleEnd,
    onTouchStart: handleStart,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
  }

  useEffect(() => {
    const loadListener = window.addEventListener('load', (e) => {
      const width = e.target.outerWidth
      const height = e.target.outerHeight

      setSize({ width, height })
    })
    const listener = window.addEventListener('resize', (e) => {
      const width = e.target.outerWidth
      const height = e.target.outerHeight

      setSize({ width, height })
    })
    return () => {
      window.removeEventListener('resize', listener)
      window.removeEventListener('load', loadListener)
    }
  }, [])

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center select-none bg-gradient-to-br ${currentTheme}`}
    >
      <LeftWidget
        clockTime={clockTime}
        day={day}
        meridian={meridian}
        width={width}
        selectedTheme={currentTheme}
        openResume={() => setResume(true)}
        setTheme={(val) => setTheme(val)}
      />

      <div
        className={`border-4 border-solid bg-white/10 border-black overflow-hidden shadow-lg self-center ${
          width > 450 || width == undefined
            ? 'w-1/4 h-5/6 min-w-[420px] min-h-[850px] rounded-3xl transition-all duration-200'
            : 'w-full h-full transition-all duration-200'
        }`}
      >
        <Header parsedTime={parsedTime} />
        <div
          className={`w-full h-full px-3 transform ${
            isUnlocked ? '-translate-y-full' : ''
          } transition duration-500 ease-in-out`}
          {...gestureProps}
        >
          <div className='h-[30px] flex' {...gestureProps} />
          <div className='flex flex-col justify-center items-center align-middle object-center mb-14'>
            <IoLockClosed
              size={24}
              color='#fff'
              className='text-center mb-2 opacity-80'
            />
            <p className='text-white text-xl text-center mr-2 font-light'>
              {day}
            </p>
            <div className='flex justify-center align-baseline items-baseline'>
              <p className='text-gray-300 text-5xl text-center mr-2 font-bold'>
                {parsedTime}
              </p>
              <p className='text-white text-sm text-center mr-2'>{meridian}</p>
            </div>
          </div>

          <div className='flex justify-center items-center mt-2 mb-8'>
            <img
              src={profile}
              className='w-[160px] h-[160px] object-cover mr-6 rounded-full'
            />
            <div className='w-[200px]'>
              <p className='text-gray-300 text-2xl font-bold hover:text-white transition duration-300 ease-in-out mb-3'>
                {"Hi I'm Vishal"}
              </p>
              <p className='text-gray-200 text-[14px]'>
                React | React native | Flutter | Android | iOS
              </p>
            </div>
          </div>

          <TextGenerateEffect words="Welcome to my portfolio app!. I've been building apps with React Native for 2 years. I focus on making apps that are easy to use and feel great, helping businesses succeed while also making people's lives better. 🚀" />

          <div className='absolute w-full bottom-20 left-0'>
            <UpwardArrow />
            <div
              className='flex justify-between items-center'
              {...gestureProps}
            >
              <div
                className='bg-gray-300 ms-8 ring-transparent w-12 h-12 flex justify-center items-center rounded-full p-2 hover:scale-125 transition duration-150 ease-in-out'
                {...gestureProps}
              >
                <IoFlashlightSharp color='#404040' size={'25px'} />
              </div>
              <p
                className='text-white/65 text-sm hover:text-white transition duration-300 ease-in-out mb-3'
                {...gestureProps}
              >
                Swipe up to unlock
              </p>
              <div
                className='bg-gray-300 me-8 w-12 h-12 flex justify-center items-center rounded-full p-2 hover:scale-125 transition duration-150 ease-in-out'
                {...gestureProps}
              >
                <FaCamera color='#404040' size={'25px'} />
              </div>
            </div>
          </div>
        </div>

        <AppDrawer isUnlocked={isUnlocked} />
      </div>
      <RightWidget width={width} />

      <div
        className={`rounded-xl flex flex-col items-center justify-center absolute bg-white/40 overflow-hidden transition transform backdrop-blur ${
          !openResume
            ? 'translate-x-[-100%] scale-0'
            : 'translate-x-0 scale-100'
        } duration-300 ease-in-out`}
      >
        <div className='flex p-3 bg-white'>
          <Document file={file}>
            <Page pageNumber={1} />
          </Document>
          <IoMdClose size={20} onClick={() => setResume(false)} />
        </div>
      </div>
    </div>

    // </BackgroundGradientAnimation>
  )
}
