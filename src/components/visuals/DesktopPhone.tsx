import { useEffect, useRef } from 'react'
import { IPhone3D } from './IPhone3D'
import { PhoneContent, type PhoneContentHandle } from '@/components/phone/PhoneContent'

// This module is only requested after the desktop layout is selected.
export default function DesktopPhone({ projectsRequest }: { projectsRequest: number }) {
  const phoneRef = useRef<PhoneContentHandle>(null)
  useEffect(() => {
    if (projectsRequest > 0) phoneRef.current?.openProjects()
  }, [projectsRequest])

  return <IPhone3D><PhoneContent ref={phoneRef} isDesktop /></IPhone3D>
}
