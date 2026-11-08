import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react'
import { personalInfo } from '@/data/portfolio-data'
import { StarField } from '@/components/visuals/StarField'
import { PhoneContent } from '@/components/phone/PhoneContent'

const DesktopPhone = lazy(() => import('@/components/visuals/DesktopPhone'))

// Mobile breakpoint - show full phone content directly
const MOBILE_BREAKPOINT = 1024

export function HeroWithPhone() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion() ?? false
  const [projectsRequest, setProjectsRequest] = useState(0)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkMobile()
    setMounted(true)

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse spotlight tracking (desktop only)
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`
        spotlightRef.current.style.top = `${e.clientY}px`
        spotlightRef.current.style.opacity = '1'
      }
    }
    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0'
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMobile, shouldReduceMotion])

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="h-[100dvh] w-screen bg-black" />
  }

  // Mobile: Show phone content directly, fullscreen
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 bg-black"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
      >
        <PhoneContent />
      </div>
    )
  }

  // Desktop: Show full layout with 3D phone
  return (
    <div className="desktop-hero-viewport h-[100dvh] w-screen overflow-hidden bg-[#030712] relative">
      {/* Mouse spotlight glow */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          zIndex: 1,
          opacity: 0,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,145,255,0.035) 0%, rgba(0,145,255,0.015) 30%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Animated star field background */}
      <StarField />

      {/* Main content */}
      <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-12 h-full">
          <div className="desktop-hero-grid">
            {/* Left side - Text content */}
            <div className="desktop-hero-copy">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--apple-blue)] rounded-full" />
                  <span className="text-sm text-zinc-300">Available for work</span>
                </div>
                <div className="flex items-center gap-1 border-l border-zinc-700 pl-4 ml-2">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span className="text-sm text-zinc-300">{personalInfo.location}</span>
                </div>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-zinc-300 text-lg mb-3"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="desktop-hero-name font-bold mb-5 tracking-tight"
              >
                <span className="text-white">{personalInfo.name}</span>
                <span className="text-[var(--apple-blue)]">.</span>
              </motion.h1>

              {/* Primary role */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-3xl text-zinc-200 mb-6 font-normal min-h-[40px]"
              >
                React Native Engineer
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-zinc-300 max-w-lg mb-8 leading-[1.8]"
              >
                {personalInfo.tagline.split(/(React Native|Best Buy)/g).map((part, index) =>
                  part === 'React Native' || part === 'Best Buy'
                    ? <strong key={index} className="font-semibold text-zinc-100">{part}</strong>
                    : part
                )}.
              </motion.p>

              <motion.button
                type="button"
                className="desktop-projects-action"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                onClick={() => {
                  track('hero_projects_click')
                  setProjectsRequest(request => request + 1)
                }}
              >
                View projects <ArrowRight size={18} aria-hidden="true" />
              </motion.button>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex gap-3"
              >
                {[
                  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                  { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter' },
                  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('desktop_social_click', { platform: social.label })}
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition-all group backdrop-blur-sm"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-7 text-sm text-zinc-400 leading-relaxed"
              >
                Choose a section on the phone to explore my work.
              </motion.p>
            </div>

            {/* Right side - 3D Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="desktop-phone-stage"
            >
              <Suspense fallback={
                <div className="phone-loading" role="status">
                  <img src="/illustrations/overview.svg" alt="" width="52" height="56" />
                  <span>Opening overview…</span>
                </div>
              }>
                <DesktopPhone projectsRequest={projectsRequest} />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </div>
  )
}

export default HeroWithPhone
