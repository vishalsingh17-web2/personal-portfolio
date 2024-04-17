import React, { useState } from 'react'
import ScrollView from './ScrollView'
import TextHighlighter from './TextHighlighter'
import { ProjectData, ProjectProps } from '../../AppData'

const Projects = () => {
  return (
    <div className='flex h-full'>
      <ScrollView>
        <div>
          <div
            className={`h-[1000px] transition-opacity duration-300 scrollbar-hide`}
          >
            {ProjectData.map(({ title, points }) => (
              <div
                key={title}
                className='border-[1px] scrollbar-hide border-white/45 rounded-2xl p-2 mb-6'
              >
                <p className='text-white text-sm'>{title}</p>
                <div className='w-full border-[1px] border-white/45 my-1' />
                <ul className='list-disc text-[#ccc] text-[12px] font-light hover:text-white transition duration-150 ps-6'>
                  {points?.map((ele, index) => (
                    <li key={index} className='mt-1'>
                      <TextHighlighter words={ele.split(' ')} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollView>
    </div>
  )
}

export default Projects
