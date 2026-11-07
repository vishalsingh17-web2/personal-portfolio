import { useState, useEffect, useRef, forwardRef, useImperativeHandle, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { track } from '@vercel/analytics'
import {
  ChevronLeft, ChevronRight, MapPin, ExternalLink, Briefcase, FolderKanban,
  Mail, FileText, Github, Linkedin, Twitter, Download, ArrowUpRight,
  GraduationCap, User, Copy, Check, ChevronDown,
} from 'lucide-react'
import { personalInfo, experiences, projects, skills, education } from '@/data/portfolio-data'
import { haptic } from '@/lib/utils'
import { EmphasizedText } from './EmphasizedText'

type Screen = 'home' | 'about' | 'experience' | 'projects' | 'contact' | 'resume' | 'education'

function StatusBar() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className="ios-status" aria-hidden="true">
      <span>{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}</span>
      <div className="ios-status-signals">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect y="8" width="3" height="4" rx=".6" /><rect x="5" y="5" width="3" height="7" rx=".6" />
          <rect x="10" y="2" width="3" height="10" rx=".6" /><rect x="15" width="3" height="12" rx=".6" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1 3.5Q8-2 15 3.5M3.5 6Q8 2.5 12.5 6M6 8.5Q8 7 10 8.5" /><circle cx="8" cy="11" r=".8" fill="currentColor" stroke="none" />
        </svg>
        <span className="ios-battery"><span /></span>
      </div>
    </div>
  )
}

const pageIllustrations: Record<string, string> = {
  Overview: 'overview',
  'About Me': 'about',
  Experience: 'experience',
  Projects: 'projects',
  Resume: 'resume',
  Education: 'education',
  Contact: 'contact',
}

function ScreenLayout({ title, subtitle, onBack, children }: {
  title: string; subtitle?: string; onBack?: () => void; children: ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  return (
    <section className="ios-screen" aria-label={title} data-page={title}>
      <StatusBar />
      <nav className="ios-navigation" aria-label="Screen navigation" data-scrolled={scrolled && !!onBack}>
        {onBack && <button className="ios-back" onClick={onBack} aria-label={`Go back from ${title}`}><ChevronLeft size={25} strokeWidth={2.5} />Back</button>}
        {onBack && <span className="ios-navigation-title" aria-hidden="true">{scrolled ? title : ''}</span>}
      </nav>
      <div className="ios-scroll" onScroll={event => setScrolled(event.currentTarget.scrollTop > 56)}>
        <div className="ios-content">
          <header className="ios-page-heading">
            <div className="ios-title-row"><h1>{title}</h1>{pageIllustrations[title] && <img src={`/illustrations/${pageIllustrations[title]}.svg`} className="ios-page-illustration" alt="" width="52" height="56" />}</div>
            {subtitle && <p>{subtitle}</p>}
          </header>
          {children}
        </div>
      </div>
      <div className="ios-home-area" aria-hidden="true"><span /></div>
    </section>
  )
}

function Group({ title, footer, children }: { title?: string; footer?: string; children: ReactNode }) {
  return (
    <section className="ios-section">
      {title && <h2 className="ios-section-label">{title}</h2>}
      <div className="ios-group">{children}</div>
      {footer && <p className="ios-section-footer">{footer}</p>}
    </section>
  )
}

const menuItems = [
  { screen: 'experience', label: 'Experience', detail: 'My career so far', icon: Briefcase },
  { screen: 'projects', label: 'Projects', detail: 'Things I’ve built', icon: FolderKanban },
  { screen: 'resume', label: 'Resume', detail: 'View or download', icon: FileText },
  { screen: 'about', label: 'About Me', detail: 'Background & skills', icon: User },
  { screen: 'education', label: 'Education', detail: 'Academic background', icon: GraduationCap },
  { screen: 'contact', label: 'Contact', detail: 'Get in touch', icon: Mail },
] as const

function HomeScreen({ navigate, isDesktop }: { navigate: (screen: Screen) => void; isDesktop: boolean }) {
  return (
    <ScreenLayout title="Overview">
      {!isDesktop && <Group>
        <button className="ios-profile" onClick={() => navigate('about')} aria-label="View profile">
          <div><span className="ios-eyebrow">MOBILE & WEB DEVELOPMENT</span><h2>{personalInfo.name}</h2><p>{personalInfo.title}</p></div>
          <ChevronRight className="ios-chevron" size={20} />
        </button>
        <div className="ios-profile-footer"><MapPin size={13} /><span>{personalInfo.location}</span></div>
      </Group>}
      {['Work', 'More about me'].map((label, groupIndex) => (
        <Group title={label} key={label}>
          {menuItems.slice(groupIndex * 3, groupIndex * 3 + 3).map(item => (
            <button key={item.screen} className="ios-menu-row" data-featured={item.screen === 'experience' || item.screen === 'projects'} onClick={() => navigate(item.screen)} aria-label={item.label}>
              <span className="ios-menu-icon"><item.icon size={19} strokeWidth={1.8} /></span>
              <span className="ios-menu-text"><span>{item.label}</span><small>{item.detail}</small></span>
              <ChevronRight size={17} className="ios-chevron" />
            </button>
          ))}
        </Group>
      ))}
      {!isDesktop && <p className="ios-availability"><span />Available for work</p>}
    </ScreenLayout>
  )
}

function AboutScreen({ onBack }: { onBack: () => void }) {
  const skillGroups = [
    { label: 'Mobile', categories: ['Mobile'] },
    { label: 'Web & language', categories: ['Frontend', 'Language'] },
    { label: 'Backend & state', categories: ['Backend', 'State'] },
    { label: 'Tools & testing', categories: ['Tools', 'Testing'] },
  ]
  return (
    <ScreenLayout title="About Me" onBack={onBack}>
      <Group title="Introduction">
        <div className="ios-prose"><h2 className="ios-card-title">Hi, I’m {personalInfo.name}.</h2><p>{personalInfo.bio}</p></div>
      </Group>
      <Group title="What I work with" footer="From the interface to native platform integrations and release pipelines.">
        {skillGroups.map(group => (
          <div className="ios-detail-row" key={group.label}><h3>{group.label}</h3><p>{skills.filter(skill => group.categories.includes(skill.category)).map(skill => skill.name).join(', ')}</p></div>
        ))}
      </Group>
      <Group title="Beyond the screen"><p className="ios-prose">Chess, music, travel, and building side projects.</p></Group>
    </ScreenLayout>
  )
}

function Contributions({ items }: { items: string[] }) {
  return <ul className="ios-contributions">{items.map(item => <li key={item}><EmphasizedText text={item} /></li>)}</ul>
}

function MoreDetails({ label, children }: { label: string; children: ReactNode }) {
  return <details className="ios-disclosure"><summary>{label}<ChevronDown size={16} /></summary><div className="ios-disclosure-content">{children}</div></details>
}

function ExperienceScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenLayout title="Experience" subtitle="Building mobile products, from early teams to retail at scale." onBack={onBack}>
      <div className="ios-timeline">
        {experiences.map((exp, index) => (
          <article className="ios-career-entry" key={exp.company} data-current={index === 0}>
            <div className="ios-timeline-marker" aria-hidden="true" />
            <div className="ios-date-line"><p className="ios-date">{exp.duration}</p>{index === 0 && <span className="ios-current">Current</span>}</div>
            <div className="ios-group">
              <header className="ios-company-header">
                {exp.logo && <img src={exp.logo} alt="" className="ios-company-logo" />}
                <div><h2>{exp.company}</h2><p>{exp.role}</p></div>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="ios-icon-action" aria-label={`Visit ${exp.company}`}><ArrowUpRight size={18} /></a>
              </header>
              <div className="ios-career-body">
                <Contributions items={exp.description.slice(0, 2)} />
                <MoreDetails label={exp.description.length > 2 ? 'More about this role' : 'Tools & technologies'}>
                  <Contributions items={exp.description.slice(2)} />
                  <h3 className="ios-small-heading">Tools & technologies</h3><p className="ios-stack">{exp.skills.join(' · ')}</p>
                </MoreDetails>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ScreenLayout>
  )
}

function ProjectsScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenLayout title="Projects" subtitle="A selection of personal projects and experiments." onBack={onBack}>
      <div className="ios-projects">
        {projects.map((project, index) => (
          <article className="ios-group ios-project" key={project.title}>
            <div className="ios-project-heading"><span className="ios-eyebrow">PROJECT {String(index + 1).padStart(2, '0')}</span><div className="ios-project-links">
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="ios-icon-action" aria-label={`View ${project.title} source code on GitHub`} onClick={() => track('project_link_click', { project: project.title, type: 'github' })}><Github size={18} /></a>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="ios-icon-action" aria-label={`Open ${project.title} live project`} onClick={() => track('project_link_click', { project: project.title, type: 'live' })}><ArrowUpRight size={18} /></a>}
            </div></div>
            <h2>{project.title}</h2><p className="ios-project-description"><EmphasizedText text={project.description} /></p>
            {project.highlights[0] && <p className="ios-project-preview"><EmphasizedText text={project.highlights[0]} /></p>}
            <p className="ios-stack ios-project-stack">{project.techStack.slice(0, 4).join(' · ')}{project.techStack.length > 4 && ` +${project.techStack.length - 4}`}</p>
            <MoreDetails label="What went into it">
              <Contributions items={project.highlights.slice(1)} />
              {project.funfacts && <aside className="ios-project-note">{project.funfacts.map(fact => <p key={fact}>{fact.replace(/^-\s*/, '')}</p>)}</aside>}
              {project.techStack.length > 4 && <><h3 className="ios-small-heading">Full stack</h3><p className="ios-stack">{project.techStack.join(' · ')}</p></>}
            </MoreDetails>
          </article>
        ))}
      </div>
    </ScreenLayout>
  )
}

function ResumeScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenLayout title="Resume" subtitle="A clear overview of my background." onBack={onBack}>
      <div className="ios-resume-actions">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ios-primary-action" onClick={() => track('resume_view')}><FileText size={18} />View PDF<ArrowUpRight size={16} /></a>
        <a href="/resume.pdf" download="Vishal_Resume.pdf" className="ios-secondary-action" aria-label="Download resume PDF" onClick={() => track('resume_download')}><Download size={18} />Download</a>
      </div>
      <Group title="Experience">
        {experiences.map(exp => <div className="ios-resume-row" key={exp.company}><h3>{exp.role}</h3><p>{exp.company}</p><span>{exp.duration}</span></div>)}
      </Group>
      <Group title="Education">
        {education.map(edu => <div className="ios-resume-row" key={edu.degree}><h3>{edu.institution}</h3><p>{edu.degree}</p><span>{edu.duration}</span></div>)}
      </Group>
      <Group title="Core skills"><p className="ios-prose">{skills.slice(0, 9).map(skill => skill.name).join(' · ')}</p></Group>
      <p className="ios-section-footer">Open the PDF for the full resume.</p>
    </ScreenLayout>
  )
}

function ContactScreen({ onBack }: { onBack: () => void }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopyState('copied')
      haptic([10, 20, 10])
      track('email_copy')
    } catch { setCopyState('failed') }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopyState('idle'), 2500)
  }
  const socialLinks = [
    { label: 'LinkedIn', description: 'Professional profile', icon: Linkedin, href: personalInfo.social.linkedin },
    { label: 'GitHub', description: 'Code & side projects', icon: Github, href: personalInfo.social.github },
    { label: 'Twitter', description: 'Find me on Twitter', icon: Twitter, href: personalInfo.social.twitter },
  ]
  return (
    <ScreenLayout title="Contact" subtitle="Have a role or a project in mind? Let’s talk." onBack={onBack}>
      <Group title="Email">
        <div className="ios-email-card"><Mail size={23} /><a href={`mailto:${personalInfo.email}`} onClick={() => track('contact_click', { label: 'Email' })}>{personalInfo.email}</a><p>The best way to reach me.</p></div>
        <div className="ios-email-actions"><a href={`mailto:${personalInfo.email}`} onClick={() => track('contact_click', { label: 'Email' })}>Write an email<ArrowUpRight size={16} /></a><button onClick={() => void copyEmail()} aria-label="Copy email address">{copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}{copyState === 'copied' ? 'Copied' : 'Copy'}</button></div>
      </Group>
      <div className="ios-copy-status" role="status">{copyState === 'failed' ? 'Couldn’t copy. Select the email address above to send a message.' : copyState === 'copied' ? 'Email address copied.' : ''}</div>
      <Group title="Elsewhere">
        {socialLinks.map(social => <a className="ios-menu-row" key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" onClick={() => track('contact_click', { label: social.label })}><span className="ios-social-icon"><social.icon size={21} strokeWidth={1.7} /></span><span className="ios-menu-text"><span>{social.label}</span><small>{social.description}</small></span><ExternalLink size={15} className="ios-chevron" /></a>)}
      </Group>
      <p className="ios-location"><MapPin size={14} />Based in {personalInfo.location}</p>
    </ScreenLayout>
  )
}

function EducationScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenLayout title="Education" subtitle="Academic background and qualifications." onBack={onBack}>
      {education.map(edu => <div key={edu.degree}>
        <section className="ios-group ios-study-card">
          <div className="ios-study-top"><span className="ios-eyebrow">UNDERGRADUATE</span></div>
          <h2>{edu.institution}</h2>
          <p className="ios-study-degree">{edu.degree}</p>
          <div className="ios-study-period"><span>Study period</span><strong>{edu.duration}</strong></div>
        </section>
        {edu.achievements && <Group title="Academic result">{edu.achievements.map(achievement => <div className="ios-study-result" key={achievement}><span>Grade point average</span><strong>{achievement.replace(/^GPA:\s*/, '')}</strong></div>)}</Group>}
        <Group title="Program"><p className="ios-prose">{edu.description}</p></Group>
      </div>)}
    </ScreenLayout>
  )
}

export interface PhoneContentHandle {
  openProjects: () => void
}

export const PhoneContent = forwardRef<PhoneContentHandle, { isDesktop?: boolean }>(function PhoneContent({ isDesktop = false }, ref) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [direction, setDirection] = useState(1)
  const currentScreenRef = useRef<Screen>('home')
  const backRequested = useRef(false)
  const reduceMotion = useReducedMotion()
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => { window.history.replaceState({ screen: 'home' }, '') }, [])
  const navigate = (screen: Screen) => {
    if (currentScreenRef.current === screen) return
    haptic(10)
    track('screen_view', { screen, surface: isDesktop ? 'desktop-phone' : 'mobile-phone' })
    currentScreenRef.current = screen
    setDirection(1)
    setCurrentScreen(screen)
    window.history.pushState({ screen }, '')
  }
  useImperativeHandle(ref, () => ({ openProjects: () => navigate('projects') }))
  const goBack = () => {
    if (currentScreenRef.current === 'home') return
    haptic([8, 20, 8])
    track('screen_back', { from: currentScreenRef.current })
    backRequested.current = true
    window.history.back()
  }
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const candidate = event.state?.screen
      const screen: Screen = ['about', 'experience', 'projects', 'contact', 'resume', 'education'].includes(candidate) ? candidate : 'home'
      if (currentScreenRef.current === screen) return
      currentScreenRef.current = screen
      setDirection(backRequested.current || screen === 'home' ? -1 : 1)
      backRequested.current = false
      setCurrentScreen(screen)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  return (
    <div className="portfolio-surface"
      onTouchStart={event => {
        const touch = event.touches[0]
        const left = event.currentTarget.getBoundingClientRect().left
        touchStart.current = touch && touch.clientX - left < 24 ? { x: touch.clientX, y: touch.clientY } : null
      }}
      onTouchEnd={event => {
        const start = touchStart.current
        const touch = event.changedTouches[0]
        if (start && touch && touch.clientX - start.x > 90 && Math.abs(touch.clientY - start.y) < 60) goBack()
        touchStart.current = null
      }} onTouchCancel={() => { touchStart.current = null }}>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div key={currentScreen} custom={direction}
          variants={{ initial: (dir: number) => ({ x: reduceMotion ? 0 : dir > 0 ? '12%' : '-8%', opacity: 0 }), animate: { x: 0, opacity: 1 }, exit: (dir: number) => ({ x: reduceMotion ? 0 : dir > 0 ? '-8%' : '12%', opacity: 0 }) }}
          initial="initial" animate="animate" exit="exit" transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }} className="ios-screen-container">
          {currentScreen === 'home' && <HomeScreen navigate={navigate} isDesktop={isDesktop} />}
          {currentScreen === 'about' && <AboutScreen onBack={goBack} />}
          {currentScreen === 'experience' && <ExperienceScreen onBack={goBack} />}
          {currentScreen === 'projects' && <ProjectsScreen onBack={goBack} />}
          {currentScreen === 'education' && <EducationScreen onBack={goBack} />}
          {currentScreen === 'resume' && <ResumeScreen onBack={goBack} />}
          {currentScreen === 'contact' && <ContactScreen onBack={goBack} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

export default PhoneContent
