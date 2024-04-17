import React from 'react'
import useGetWeather from './Weather'
import {
  FaAndroid,
  FaAppStoreIos,
  FaHtml5,
  FaPython,
  FaReact,
} from 'react-icons/fa6'
import { RiFlutterFill } from 'react-icons/ri'
import { SiDart, SiRedux } from 'react-icons/si'
import { IoLogoCss3, IoLogoJavascript } from 'react-icons/io5'
import { TbBrandReactNative } from 'react-icons/tb'
import { BiLogoTypescript } from 'react-icons/bi'

const slides = [
  'https://w7.pngwing.com/pngs/403/269/png-transparent-react-react-native-logos-brands-in-colors-icon-thumbnail.png',
  'https://static-00.iconduck.com/assets.00/sdk-react-native-icon-512x490-ynyk8t4w.png',
  'https://images.pexels.com/photos/20386770/pexels-photo-20386770/free-photo-of-a-photo-of-a-forest-with-fog-and-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
]

const RightWidget = ({ width }: { width: number }) => {
  const weather = useGetWeather() as any
  return (
    <div
      className={`aspect-video flex flex-col justify-center space-y-8 items-center rounded-xl bg-white/10 shadow-lg py-8 w-[250px] ms-4 ${
        width < 1000 ? 'hidden' : undefined
      }`}
    >
      {weather && (
        <div
          className='hover:before:bg-redborder-red-500 relative h-[200px] w-[220px] flex flex-col rounded-lg justify-center items-center
      overflow-hidden bg-[#489823] px-3 shadow-2xl
      transition-all before:absolute before:bottom-0 before:left-0 before:top-0
      before:z-0 before:h-full before:w-0 before:bg-[#568441]
      before:transition-all before:duration-500 hover:text-white
      hover:shadow-white/45 hover:before:left-0 hover:before:w-full'
        >
          <div className='flex flex-col z-10 items-center justify-center w-full'>
            <img src={weather?.current?.condition?.icon} />
            <p className='text-white text-3xl'>{weather?.current?.temp_c} ºC</p>
            <p className='text-white/60 text-sm'>
              Feels like, {weather?.current?.feelslike_c} ºC
            </p>
            <p className='text-white/60 text-sm'>
              {weather?.current?.condition?.text}
            </p>
            <div className='flex space-x-1 text-sm text-white/60'>
              <p>{weather?.location?.name}</p>
              <p>{weather?.location?.region}</p>
            </div>
          </div>
        </div>
      )}

      <div className='border border-1 w-[220px] bg-white/20 border-white/40 p-1 pt-3 rounded-2xl shadow-xl'>
        <p className='text-white text-md ms-2 mb-4'>Skills</p>
        <div className='flex flex-wrap items-center w-full justify-center'>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <FaReact color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>React</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <SiRedux color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Redux</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <IoLogoJavascript color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>React</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <TbBrandReactNative color={'white'} size={35} />
            <p className='text-[8px] text-white/40 flex justify-center items-center'>
              React Native
            </p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <BiLogoTypescript color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Typescript</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <RiFlutterFill color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Flutter</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <FaAndroid color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Android</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <FaAppStoreIos color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>iOS</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <FaPython color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Python</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <FaHtml5 color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>HTML</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <IoLogoCss3 color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>CSS</p>
          </div>
          <div className='flex flex-col items-center justify-center me-3 mb-3'>
            <SiDart color={'white'} size={35} />
            <p className='text-[8px] text-white/40'>Dart</p>
          </div>
        </div>
      </div>
      {/* <div className='flex space-x-4'></div> */}
    </div>
  )
}

export default RightWidget
