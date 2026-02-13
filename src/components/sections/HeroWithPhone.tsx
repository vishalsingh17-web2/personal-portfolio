import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'
import { personalInfo } from '@/data/portfolio-data'
import { IPhone3D } from '@/components/visuals/IPhone3D'
import { StarField } from '@/components/visuals/StarField'
import { PhoneContent } from '@/components/phone/PhoneContent'

// Roles for typewriter effect
const ROLES = [
  'Full Stack Mobile Developer',
  'React Native Engineer',
  'Flutter Developer',
  'iOS & Android Builder',
  'UI/UX Enthusiast',
]

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 1800) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      setDisplayText(currentWord.slice(0, displayText.length + 1))
      if (displayText.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
        return
      }
    } else {
      setDisplayText(currentWord.slice(0, displayText.length - 1))
      if (displayText.length - 1 === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [displayText, isDeleting, wordIndex, words, pauseDuration])

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typingSpeed, deletingSpeed])

  return displayText
}

// Mobile breakpoint - show full phone content directly
const MOBILE_BREAKPOINT = 1024

export function HeroWithPhone() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const typedRole = useTypewriter(ROLES)
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
    if (isMobile) return
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
  }, [isMobile])

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
    <div className="h-screen w-screen overflow-hidden bg-[#030712] relative">
      {/* Mouse spotlight glow */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          zIndex: 1,
          opacity: 0,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.04) 30%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Animated star field background */}
      <StarField />

      {/* Ambient background effects (subtle gradients behind stars) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-12 h-full">
          <div className="grid grid-cols-2 gap-16 items-center h-full">
            {/* Left side - Text content */}
            <div className="text-left">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-zinc-400">Available for work</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span className="text-sm text-zinc-400">{personalInfo.location}</span>
                </div>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-zinc-400 text-lg mb-3"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-7xl font-bold mb-4 tracking-tight"
              >
                <span className="text-white">{personalInfo.name}</span>
                <span className="text-blue-400">.</span>
              </motion.h1>

              {/* Title - Typewriter */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-3xl text-zinc-400 mb-6 font-light h-[40px]"
              >
                {typedRole}
                <motion.span
                  className="inline-block w-[2px] h-[1em] bg-blue-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                />
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-zinc-500 max-w-xl mb-8 leading-relaxed"
              >
                {personalInfo.tagline}. Explore my work by interacting with the
                phone on the right.
              </motion.p>

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
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition-all group backdrop-blur-sm"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-8 text-xs text-zinc-600"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border border-zinc-700 rounded flex items-center justify-center text-[10px]">
                    ↔
                  </span>
                  Move your mouse to interact with the phone
                </span>
              </motion.p>
            </div>

            {/* Right side - 3D Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="h-full min-h-[500px] max-h-screen py-4"
            >
              <IPhone3D>
                <PhoneContent isDesktop />
              </IPhone3D>
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
