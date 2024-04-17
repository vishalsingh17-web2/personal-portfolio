import React from 'react'
import { IoIosWifi } from 'react-icons/io'
import { IoBatteryHalf } from 'react-icons/io5'

import { MdNetworkCell } from 'react-icons/md'

const Header = ({ parsedTime }: { parsedTime: string }) => {
  return (
    <div className='z-10 w-full rounded-t-2xl justify-between flex px-3 py-2'>
      <span className='flex'>
        {/* <p className='text-white py-1  ps-3 text-sm'>{parsedTime}</p> */}
        <p className='text-white py-1  ps-1 text-sm'>airtel</p>
      </span>
      <div className='w-6 h-6 rounded-full flex items-center justify-center'>
        <div className='ms-14 bg-gray-800 w-3 h-3 rounded-full self-center'>
          <div className='bg-gray-900 w-3 h-3 rounded-full self-center' />
        </div>
      </div>
      <span className='flex'>
        <MdNetworkCell color='#fff' size={'20px'} className='mr-2' />
        <IoIosWifi color='#fff' size={'20px'} className='mr-2' />
        <IoBatteryHalf color='#fff' size={'20px'} />
      </span>
    </div>
  )
}

export default Header
