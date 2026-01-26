import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'
import { personalInfo } from '@/data/portfolio-data'
import { IPhone3D } from '@/components/visuals/IPhone3D'
import { PhoneContent } from '@/components/phone/PhoneContent'

export function HeroWithPhone() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#030712] relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>


      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-6"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-zinc-400">
                    Available for work
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span className="text-xs sm:text-sm text-zinc-400">
                    {personalInfo.location}
                  </span>
                </div>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-zinc-400 text-base sm:text-lg mb-3"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
              >
                <span className="text-white">{personalInfo.name}</span>
                <span className="text-blue-400">.</span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl text-zinc-400 mb-6 font-light"
              >
                {personalInfo.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                {personalInfo.tagline}. Explore my work by interacting with the
                phone on the right.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex justify-center lg:justify-start gap-3"
              >
                {[
                  {
                    icon: Github,
                    href: personalInfo.social.github,
                    label: 'GitHub',
                  },
                  {
                    icon: Linkedin,
                    href: personalInfo.social.linkedin,
                    label: 'LinkedIn',
                  },
                  {
                    icon: Twitter,
                    href: personalInfo.social.twitter,
                    label: 'Twitter',
                  },
                  {
                    icon: Mail,
                    href: `mailto:${personalInfo.email}`,
                    label: 'Email',
                  },
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
                className="mt-8 text-xs text-zinc-600 hidden lg:block"
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
              className="h-full min-h-[500px] max-h-screen py-4 order-1 lg:order-2"
            >
              <IPhone3D>
                <PhoneContent />
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
