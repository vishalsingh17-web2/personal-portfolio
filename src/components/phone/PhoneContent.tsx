import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  MapPin,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import { personalInfo, experiences, projects, skills } from '@/data/portfolio-data'

type Screen = 'home' | 'about' | 'experience' | 'projects' | 'contact'

// iOS Status Bar - Authentic design
function StatusBar() {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div className="absolute top-0 left-0 right-0 h-[47px] flex items-end justify-between px-8 pb-1 z-50">
      <span className="text-white text-[15px] font-semibold">{time}</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[126px] h-[37px] bg-black rounded-[20px]" />
      <div className="flex items-center gap-[5px]">
        {/* Cellular Signal - iOS style */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white"/>
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="white"/>
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="white"/>
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.4C10.7 2.4 13.1 3.5 14.8 5.3L16 4C14 1.8 11.2 0.5 8 0.5C4.8 0.5 2 1.8 0 4L1.2 5.3C2.9 3.5 5.3 2.4 8 2.4Z" fill="white"/>
          <path d="M8 5.9C9.9 5.9 11.6 6.7 12.8 8L14 6.7C12.5 5.1 10.4 4.1 8 4.1C5.6 4.1 3.5 5.1 2 6.7L3.2 8C4.4 6.7 6.1 5.9 8 5.9Z" fill="white"/>
          <path d="M8 9.4C9.1 9.4 10.1 9.9 10.8 10.7L12 9.4C11 8.3 9.6 7.6 8 7.6C6.4 7.6 5 8.3 4 9.4L5.2 10.7C5.9 9.9 6.9 9.4 8 9.4Z" fill="white"/>
          <circle cx="8" cy="11.5" r="1.5" fill="white"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-[2px]">
          <div className="w-[25px] h-[12px] border border-white/50 rounded-[3px] p-[2px] relative">
            <div className="h-full w-[80%] bg-white rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[5px] bg-white/50 rounded-r-full" />
        </div>
      </div>
    </div>
  )
}

// iOS Large Title Navigation Bar
function NavBarLarge({ title }: { title: string }) {
  return (
    <div className="pt-[60px] px-5 pb-2">
      <h1 className="text-[34px] font-bold text-white tracking-tight">{title}</h1>
    </div>
  )
}

// iOS Navigation Bar with Back
function NavBarWithBack({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="pt-[47px]">
      <div className="h-[44px] flex items-center px-4 relative">
        <button onClick={onBack} className="flex items-center text-[#007AFF] -ml-2 z-10">
          <ChevronLeft className="w-[28px] h-[28px] -mr-1" strokeWidth={2.5} />
          <span className="text-[17px]">Back</span>
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-[17px] font-semibold text-white">
          {title}
        </h1>
      </div>
    </div>
  )
}

// Home Indicator
function HomeIndicator() {
  return (
    <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2">
      <div className="w-[134px] h-[5px] bg-white rounded-full" />
    </div>
  )
}

// iOS Settings-style List Item
function ListItem({ 
  icon, 
  iconBg, 
  label, 
  onClick,
  showChevron = true,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  onClick: () => void
  showChevron?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-[11px] bg-[#1c1c1e] first:rounded-t-[10px] last:rounded-b-[10px] active:bg-[#2c2c2e] transition-colors"
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="w-[29px] h-[29px] rounded-[6px] flex items-center justify-center text-white"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <span className="text-white text-[17px] flex-1 text-left">{label}</span>
      {showChevron && (
        <ChevronLeft className="w-5 h-5 text-[#48484a] rotate-180" strokeWidth={2.5} />
      )}
    </motion.button>
  )
}

// ============ SCREENS ============

// Home Screen - iOS Settings Style
function HomeScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-black">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        <NavBarLarge title="Portfolio" />
        
        {/* Profile Card */}
        <div className="mx-4 mb-6">
          <motion.button
            onClick={() => navigate('about')}
            className="w-full flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-[12px] active:bg-[#2c2c2e] transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#5856D6] to-[#AF52DE] flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">{personalInfo.name[0]}</span>
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-white text-[17px] font-semibold">{personalInfo.name}</h2>
              <p className="text-[#8e8e93] text-[13px]">{personalInfo.title}</p>
              <p className="text-[#8e8e93] text-[13px]">View Profile →</p>
            </div>
          </motion.button>
        </div>

        {/* Menu Items */}
        <motion.div 
          className="mx-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="divide-y divide-[#38383a]">
            <ListItem
              icon={<span className="text-[14px]">👤</span>}
              iconBg="#5856D6"
              label="About Me"
              onClick={() => navigate('about')}
            />
            <ListItem
              icon={<span className="text-[14px]">💼</span>}
              iconBg="#FF9500"
              label="Experience"
              onClick={() => navigate('experience')}
            />
            <ListItem
              icon={<span className="text-[14px]">📁</span>}
              iconBg="#34C759"
              label="Projects"
              onClick={() => navigate('projects')}
            />
            <ListItem
              icon={<span className="text-[14px]">✉️</span>}
              iconBg="#007AFF"
              label="Contact"
              onClick={() => navigate('contact')}
            />
          </div>
        </motion.div>

        {/* Status Section */}
        <motion.div 
          className="mx-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[#8e8e93] text-[13px] uppercase px-4 mb-2">Status</p>
          <div className="bg-[#1c1c1e] rounded-[10px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
              <span className="text-[#34C759] text-[15px] font-medium">Available for work</span>
            </div>
            <div className="flex items-center gap-1 text-[#8e8e93] text-[13px]">
              <MapPin className="w-3 h-3" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div 
          className="mx-4 pb-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[#8e8e93] text-[13px] uppercase px-4 mb-2">Top Skills</p>
          <div className="bg-[#1c1c1e] rounded-[10px] p-4 flex flex-wrap gap-2">
            {skills.slice(0, 6).map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1.5 text-[13px] rounded-full bg-[#2c2c2e] text-white"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// About Screen
function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col bg-black">
      <StatusBar />
      <NavBarWithBack title="About Me" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5856D6] to-[#AF52DE] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{personalInfo.name[0]}</span>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{personalInfo.name}</h2>
            <p className="text-[#8e8e93] text-[15px]">{personalInfo.title}</p>
            <div className="flex items-center gap-1 mt-1 text-[#8e8e93] text-[13px]">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-[#1c1c1e] rounded-[10px] p-4 mb-4">
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-2">Bio</h3>
          <p className="text-white text-[15px] leading-relaxed">{personalInfo.bio}</p>
        </div>

        {/* Skills */}
        <div className="bg-[#1c1c1e] rounded-[10px] p-4 mb-4">
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-3">Skills</h3>
          <div className="space-y-3">
            {skills.slice(0, 6).map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-[15px] mb-1">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-[#8e8e93]">{skill.level}%</span>
                </div>
                <div className="h-[6px] bg-[#2c2c2e] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#5856D6] to-[#AF52DE] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-[#1c1c1e] rounded-[10px] p-4">
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-3">Focus Areas</h3>
          <div className="grid grid-cols-2 gap-2">
            {['React Native', 'Flutter', 'TypeScript', 'Node.js'].map((area) => (
              <div key={area} className="bg-[#2c2c2e] rounded-[8px] p-3 text-center">
                <span className="text-white text-[15px]">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Experience Screen
function ExperienceScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col bg-black">
      <StatusBar />
      <NavBarWithBack title="Experience" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1c1c1e] rounded-[10px] p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-[10px] object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-[10px] bg-[#FF9500] flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-white text-[17px] font-semibold">{exp.role}</h3>
                  <p className="text-[#007AFF] text-[15px]">{exp.company}</p>
                  <div className="flex items-center gap-1 text-[#8e8e93] text-[13px] mt-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-3">
                {exp.description.slice(0, 2).map((desc, i) => (
                  <li key={i} className="text-[#8e8e93] text-[14px] flex gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-[12px] rounded-full bg-[#007AFF]/15 text-[#007AFF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Projects Screen
function ProjectsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col bg-black">
      <StatusBar />
      <NavBarWithBack title="Projects" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1c1c1e] rounded-[10px] overflow-hidden"
            >
              {/* Project Header with gradient */}
              <div className="h-16 bg-gradient-to-r from-[#34C759]/20 via-[#30D158]/20 to-[#32D74B]/20 flex items-center justify-center">
                <span className="text-3xl">📁</span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white text-[17px] font-semibold">{project.title}</h3>
                  {project.link && (
                    <ExternalLink className="w-4 h-4 text-[#8e8e93]" />
                  )}
                </div>

                <p className="text-[#8e8e93] text-[14px] mb-3">{project.description}</p>

                <ul className="space-y-1.5 mb-3">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="text-[#8e8e93] text-[13px] flex gap-2">
                      <span className="text-[#34C759]">✓</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[12px] rounded-full bg-[#34C759]/15 text-[#34C759]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Contact Screen
function ContactScreen({ onBack }: { onBack: () => void }) {
  const contacts = [
    {
      icon: '✉️',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      bgColor: '#007AFF',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.social.linkedin,
      bgColor: '#0077B5',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'Check my code',
      href: personalInfo.social.github,
      bgColor: '#333333',
    },
    {
      icon: '𝕏',
      label: 'Twitter',
      value: 'Follow me',
      href: personalInfo.social.twitter,
      bgColor: '#000000',
    },
  ]

  return (
    <div className="h-full flex flex-col bg-black">
      <StatusBar />
      <NavBarWithBack title="Contact" onBack={onBack} />

      <div className="flex-1 px-4 py-4 pb-20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center">
            <span className="text-4xl">💬</span>
          </div>
          <h2 className="text-white text-[22px] font-bold">Let's Connect!</h2>
          <p className="text-[#8e8e93] text-[15px]">I'd love to hear from you</p>
        </div>

        {/* Contact Options */}
        <div className="bg-[#1c1c1e] rounded-[10px] divide-y divide-[#38383a]">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 p-3 active:bg-[#2c2c2e] transition-colors first:rounded-t-[10px] last:rounded-b-[10px]"
            >
              <div 
                className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center text-lg"
                style={{ backgroundColor: contact.bgColor }}
              >
                {contact.icon}
              </div>
              <div className="flex-1">
                <p className="text-white text-[17px] font-medium">{contact.label}</p>
                <p className="text-[#8e8e93] text-[13px]">{contact.value}</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-[#48484a] rotate-180" strokeWidth={2.5} />
            </motion.a>
          ))}
        </div>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[#48484a] text-[13px]">
            ✨ Let's build something amazing together ✨
          </p>
        </motion.div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// ============ MAIN COMPONENT ============

export function PhoneContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for back

  const navigate = (screen: Screen) => {
    setDirection(1)
    setCurrentScreen(screen)
  }
  
  const goBack = () => {
    setDirection(-1)
    setCurrentScreen('home')
  }

  // iOS-style page transition variants
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-30%',
      opacity: direction > 0 ? 1 : 0.5,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-30%' : '100%',
      opacity: direction > 0 ? 0.5 : 1,
    }),
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-black"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentScreen}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className="absolute inset-0"
        >
          {currentScreen === 'home' && <HomeScreen navigate={navigate} />}
          {currentScreen === 'about' && <AboutScreen onBack={goBack} />}
          {currentScreen === 'experience' && <ExperienceScreen onBack={goBack} />}
          {currentScreen === 'projects' && <ProjectsScreen onBack={goBack} />}
          {currentScreen === 'contact' && <ContactScreen onBack={goBack} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PhoneContent
