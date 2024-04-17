import React, { useEffect, useState } from 'react'
import { IoLogoReact } from 'react-icons/io5'
import { RiFlutterFill } from 'react-icons/ri'
import { FaCircleNotch } from 'react-icons/fa6'
import ScrollView from './ScrollView'
import { ExperienceData } from '../../AppData'
import { useExperienceCal } from '../hooks/useExperienceCal'
import TextHighlighter from './TextHighlighter'

const ExperienceCard = ({
  years,
  months,
  points,
  title,
  range,
  role,
  titlePress,
  organizationLink,
  organisationLogo,
}: {
  years: number
  months: number
  points: string[]
  title: string
  range: string
  role: string
  titlePress?: () => void
  organizationLink?: string
  organisationLogo?: string
}) => {
  function makeRange() {
    if (years) {
      if (years > 1) {
        return `${range} (${years} yrs, ${months} mos)`
      } else {
        return `${range} (${years} yr, ${months} mos)`
      }
    } else {
      return `${range} (${months} mos)`
    }
  }

  const onTitlePress = () => {
    if (titlePress) {
      titlePress()
    } else {
      window.open(organizationLink, '_blank')
    }
  }
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <img src={organisationLogo} className='h-[30px] w-[30px] ms-2' />
        <div>
          <p
            onClick={onTitlePress}
            className='text-[#ADD8E6] text-[12px] ms-1 font-bold transform hover:scale-110 transition-all duration-150 hover:translate-x-2 hover:text-[#d6aa6f] hover:underline'
          >
            {title}
          </p>
          <p className='text-[#ddd] text-[12px] ms-1 hover:text-white transition duration-150'>
            {makeRange()}
          </p>
          <p className='text-[#bbb] text-[12px] ms-1 hover:text-white transition duration-150'>
            {role}
          </p>
        </div>
      </div>
      <div className='p-2 px-6 w-full border-[0.2px] border-white/50 mt-1 rounded-2xl'>
        <ul className='list-disc text-[#ccc] text-[12px] font-light hover:text-white transition duration-150'>
          {points?.map((ele) => {
            const words = ele.split(' ')
            return (
              <li key={ele} className='mt-1'>
                <TextHighlighter words={words} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const SkillsCard = ({ skills }: { skills: string[] }) => {
  return (
    <div className='flex flex-wrap items-center'>
      <p className='text-white text-[12px] me-2'>Skills:</p>
      {skills?.map?.((ele) => {
        return (
          <p
            className='bg-white/30 text-[#eee] rounded-3xl px-2 text-[10px] m-1 hover:scale-110'
            key={ele}
          >
            {ele}
          </p>
        )
      })}
    </div>
  )
}

const Experience = () => {
  const { months, years } = useExperienceCal()

  return (
    <div className='flex h-full hide-scrollbar'>
      <ScrollView>
        <div className='flex flex-col items-center flex-grow h-[1400px] hide-scrollbar'>
          <IoLogoReact
            className='transform transition hover:rotate-180 duration-200 ease-in-out'
            color='#ADD8E6'
            size={'24px'}
          />
          <div className='h-[370px] bg-white/40 w-[2px]' />
          <RiFlutterFill
            className='transform transition hover:rotate-[360deg] duration-200 ease-in-out'
            color='#ADD8E6'
            size={'24px'}
          />
          <div className='h-[255px] bg-white/40 w-[2px]' />
          <RiFlutterFill
            className='transform transition hover:rotate-[360deg] duration-200 ease-in-out'
            color='#ADD8E6'
            size={'24px'}
          />
          <div className='h-[180px] bg-white/40 w-[2px]' />
          <FaCircleNotch color='#ADD8E6' size={'12px'} />
        </div>
        <div className='w-full hide-scrollbar'>
          {ExperienceData?.map?.((ele) => {
            const { skills, ...experience } = ele
            return (
              <div className='mb-6'>
                <ExperienceCard
                  months={experience.months ?? months}
                  years={experience.years ?? years}
                  {...experience}
                />
                <SkillsCard skills={skills} />
              </div>
            )
          })}
        </div>
      </ScrollView>
    </div>
  )
}

export default Experience
