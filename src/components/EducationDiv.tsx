import React from 'react'
import ScrollView from './ScrollView'
import TextHighlighter from './TextHighlighter'

interface EducationProps {
  institution: string
  degree: string
  score: string
  yearRange: string
  imageLogo?: string
}

const EducationData: EducationProps[] = [
  {
    institution: 'Vellore Institute Of Technology, Vellore',
    degree: 'B. Tech (ECE)',
    score: '9.09 CGPA',
    yearRange: 'July, 2019 - July, 2023',
    imageLogo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1920px-Vellore_Institute_of_Technology_seal_2017.svg.png',
  },
  {
    institution: 'Shah Faiz Public School',
    degree: 'HSC/12th',
    score: '91.6 %',
    yearRange: 'July, 2018',
    imageLogo:
      'http://www.kulguru.com/resource/img/school/shah-faiz-public-school-fmh5ok6i.gif',
  },
  {
    institution: 'Shah Faiz Public School',
    degree: 'HSC/10th',
    score: '9.6 CGPA',
    yearRange: 'June, 2016',
    imageLogo:
      'http://www.kulguru.com/resource/img/school/shah-faiz-public-school-fmh5ok6i.gif',
  },
]

const EducationDiv = () => {
  return (
    <div className='flex h-full w-full'>
      <ScrollView className='p-0 w-full m-0'>
        <div className='w-full p-0 m-0'>
          {EducationData.map(
            ({ institution, degree, score, yearRange, imageLogo }) => (
              <div
                key={JSON.stringify(institution + degree)}
                className='pb-6 mb-6 border-b-[0.5px] border-b-white/40 w-full flex'
              >
                <img
                  src={imageLogo}
                  className='w-[50px] h-[50px] me-4  bg-white rounded-sm'
                />

                <div className='w-full'>
                  <div>
                    <p className='text-white text-sm'>{institution}</p>
                    <p className='text-[12px] text-[#ccc]'>{yearRange}</p>
                  </div>

                  <div className='flex w-full justify-between'>
                    <p className='text-[12px] text-[#ccc]'>{degree}</p>
                    <p className='text-[12px] text-[#ccc]'>{score}</p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </ScrollView>
    </div>
  )
}

export default EducationDiv
