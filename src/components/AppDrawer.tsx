import React, { useState } from 'react'
import Work from '../assets/Work.json'
import projects from '../assets/projects.json'
import Education from '../assets/Education.json'
import Lottie from 'lottie-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { IoMdDownload } from 'react-icons/io'
import Screen from './Screen'
import Experience from './Experience'
import EducationDiv from './EducationDiv'
import Projects from './Projects'

const DrawerIcon = ({
  onClick,
  children,
  title,
  size,
  iconSize,
}: {
  onClick: () => void
  children: React.ReactNode
  title: string
  size?: string
  iconSize?: string
}) => {
  return (
    <button
      className={`border border-white/20 border-1 p-3 mr-1 w-[120px] hover:scale-110 overflow-hidden transition rounded-3xl duration-300 ease-in-out`}
      onClick={onClick}
    >
      <div className='flex flex-col justify-center items-center'>
        <div
          className={`w-[${iconSize ?? '120px'}] h-[${
            iconSize ?? '120px'
          }] flex flex-col justify-center items-center`}
        >
          {children && children}
        </div>
        <p className='text-white text-sm self-center text-center mb-1'>
          {title}
        </p>
      </div>
    </button>
  )
}

const AppDrawer = ({ isUnlocked }: { isUnlocked: boolean }) => {
  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/vishal-singh-1703/', '_blank')
  }
  const openLeetCode = () => {
    window.open('https://leetcode.com/Vishal_Singh_17/', '_blank')
  }
  const openGithub = () => {
    window.open('https://github.com/vishalsingh17-web2', '_blank')
  }

  const openMail = () => {
    const email = 'vishal.workcontact@gmail.com'
    const subject = 'Subject of the email'
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    window.location.href = mailtoUrl
  }

  const [tab, setTab] = useState<'education' | 'project' | 'experience' | null>(
    null,
  )
  const isEducation = tab === 'education'
  const isProject = tab === 'project'
  const isExperience = tab === 'experience'

  return (
    <div
      className={`w-full h-full px-3  transform ${
        isUnlocked ? '-translate-y-full' : ''
      } transition duration-500 ease-in-out`}
    >
      <div
        className={`bottom-0 w-full h-full transform ${
          isUnlocked && tab == null ? ' scale-100' : ' scale-0'
        } transition-all duration-[900ms] ease-in-out`}
      >
        <div className='items-center px-3'>
          <p className='text-gray-300 text-xl my-4 ms-2 hover:text-white transition duration-200 ease-in-out'>
            About me
          </p>

          <div className='flex justify-around items-center'>
            <DrawerIcon
              onClick={() => setTab('experience')}
              title={'Experience'}
              iconSize='80px'
            >
              <Lottie animationData={Work} loop />
            </DrawerIcon>

            <DrawerIcon
              onClick={() => setTab('project')}
              title={'Projects'}
              iconSize='80px'
            >
              <Lottie animationData={projects} loop />
            </DrawerIcon>

            <DrawerIcon
              onClick={() => setTab('education')}
              title={'Education'}
              iconSize='80px'
            >
              <Lottie animationData={Education} loop />
            </DrawerIcon>
          </div>

          <p className='text-gray-300 text-xl mt-8 mb-4 ms-2 hover:text-white transition duration-200 ease-in-out'>
            Profiles
          </p>

          <div className='flex justify-around items-center'>
            <DrawerIcon
              onClick={openLinkedIn}
              title={'LinkedIn'}
              iconSize='80px'
            >
              <FaLinkedin
                size={70}
                color='#2596be'
                className='bg-white rounded-md'
              />
            </DrawerIcon>
            <DrawerIcon onClick={openGithub} title={'GitHub'} iconSize='80px'>
              <FaGithub size={70} color='#fff' />
            </DrawerIcon>

            <DrawerIcon
              onClick={openLeetCode}
              title={'Leetcode'}
              iconSize='80px'
            >
              <SiLeetcode size={70} color='#fff' />
            </DrawerIcon>
          </div>

          {/* <div
            className='flex mt-12 ms-2 border p-3 rounded-lg bg--500 justify-start items-center hover:scale-105 transition duration-200'
            onClick={() => {}}
          >
            <IoMdDownload size={25} color='white' />
            <p className='ms-2 text-white text-sm '>Download profile as pdf</p>
          </div> */}
          <div className='h-[300px]' />

          <div className='flex flex-col justify-end'>
            <div
              className='flex mt-[4px] ms-2 justify-start items-center hover:underline text-red-300 transition duration-200'
              onClick={openMail}
            >
              <MdEmail size={25} />
              <p className='mt-[4px] ms-2 text-white text-sm hover:text-red-300 transition duration-200'>
                vishal.workcontact@gmail.com
              </p>
            </div>
            <div className='flex mt-[4px] ms-2 justify-start items-center hover:underline text-green-300 transition duration-200'>
              <BsTelephoneFill size={20} />
              <p className='mt-[4px] ms-2 text-white text-sm hover:text-green-300 transition duration-200'>
                +91-7084324572
              </p>
            </div>
          </div>

          {/* <div className='flex justify-start items-center'></div> */}
        </div>
      </div>
      <div
        className={`absolute left-0 z-0 top-0 w-full h-full transform ${
          isExperience ? ' scale-100' : ' scale-0'
        } transition-all duration-[600ms] ease-in-out`}
      >
        <Screen title='Experience' onBack={() => setTab(null)}>
          <Experience />
        </Screen>
      </div>

      <div
        className={`absolute left-0 z-0 top-0 w-full h-full transform ${
          isProject ? ' scale-100' : ' scale-0'
        } transition-all duration-[600ms] ease-in-out`}
      >
        <Screen title='Projects' onBack={() => setTab(null)}>
          <Projects />
        </Screen>
      </div>

      <div
        className={`absolute left-0 z-0 top-0 w-full h-full transform ${
          isEducation ? 'scale-100' : 'scale-0'
        } transition-all duration-[600ms] ease-in-out`}
      >
        <Screen title='Education' onBack={() => setTab(null)}>
          <EducationDiv />
        </Screen>
      </div>
    </div>
  )
}

export default AppDrawer
