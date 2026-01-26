import { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Smartphone,
  Globe,
  ChevronDown,
  Download,
  Eye,
  Star,
  CheckCircle2,
  LucideProps,
} from 'lucide-react'
import { personalInfo, experiences, projects } from '@/data/portfolio-data'

type Screen = 'home' | 'about' | 'experience' | 'projects' | 'contact' | 'resume'

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
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white"/>
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="white"/>
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="white"/>
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.4C10.7 2.4 13.1 3.5 14.8 5.3L16 4C14 1.8 11.2 0.5 8 0.5C4.8 0.5 2 1.8 0 4L1.2 5.3C2.9 3.5 5.3 2.4 8 2.4Z" fill="white"/>
          <path d="M8 5.9C9.9 5.9 11.6 6.7 12.8 8L14 6.7C12.5 5.1 10.4 4.1 8 4.1C5.6 4.1 3.5 5.1 2 6.7L3.2 8C4.4 6.7 6.1 5.9 8 5.9Z" fill="white"/>
          <path d="M8 9.4C9.1 9.4 10.1 9.9 10.8 10.7L12 9.4C11 8.3 9.6 7.6 8 7.6C6.4 7.6 5 8.3 4 9.4L5.2 10.7C5.9 9.9 6.9 9.4 8 9.4Z" fill="white"/>
          <circle cx="8" cy="11.5" r="1.5" fill="white"/>
        </svg>
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

// iOS Settings-style List Item with Lucide icons
function ListItem({
  icon: Icon,
  iconBg,
  label,
  onClick,
  showChevron = true,
}: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  iconBg: string
  label: string
  onClick: () => void
  showChevron?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      className='flex items-center gap-3 w-full px-4 py-[11px] bg-[#1c1c1e] first:rounded-t-[10px] last:rounded-b-[10px] active:bg-[#2c2c2e] transition-colors'
      whileTap={{ scale: 0.98 }}
    >
      <div
        className='w-[29px] h-[29px] rounded-[6px] flex items-center justify-center'
        style={{ background: iconBg }}
      >
        <Icon className='w-[17px] h-[17px] text-white' strokeWidth={2} />
      </div>
      <span className='text-white text-[17px] flex-1 text-left'>{label}</span>
      {showChevron && (
        <ChevronRight className='w-5 h-5 text-[#48484a]' strokeWidth={2.5} />
      )}
    </motion.button>
  )
}


// Playful sparkle effect
function SparkleEffect({ children }: { children: React.ReactNode }) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])

  const addSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setSparkles(prev => [...prev, { id, x, y }])
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 700)
  }

  return (
    <div className="relative" onClick={addSparkle}>
      {children}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          initial={{ x: sparkle.x - 8, y: sparkle.y - 8, scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      ))}
    </div>
  )
}

// ============ SCREENS ============

// Home Screen - iOS Settings Style
function HomeScreen({ navigate }: { navigate: (screen: Screen) => void }) {


  return (
    <div className='absolute inset-0 flex flex-col bg-black'>
      <StatusBar />

      <div className='flex-1 min-h-0 overflow-y-auto'>
        <NavBarLarge title='Portfolio' />
        <div className='mx-4 mb-6'>
          <SparkleEffect>
            <motion.button
              onClick={() => navigate('about')}
              className='w-full flex items-center gap-3 p-3 bg-[#1c1c1e] rounded-[12px] active:bg-[#2c2c2e] transition-colors'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className='w-[60px] h-[60px] rounded-full bg-slate-600 flex items-center justify-center'
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <span className='text-white text-2xl font-semibold'>
                  {personalInfo.name[0]}
                </span>
              </motion.div>

              <div className='flex-1 text-left'>
                <h2 className='text-white text-[17px] font-semibold'>
                  {personalInfo.name}
                </h2>
                <p className='text-[#8e8e93] text-[13px]'>
                  {personalInfo.title}
                </p>
                <p className='text-[#007AFF] text-[13px]'>View Profile →</p>
              </div>
            </motion.button>
          </SparkleEffect>
        </div>

        {/* Menu Items */}
        <motion.div
          className='mx-4 mb-6'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className='divide-y divide-[#38383a]'>
            <ListItem
              icon={User}
              iconBg='#5856D6'
              label='About Me'
              onClick={() => navigate('about')}
            />
            <ListItem
              icon={Briefcase}
              iconBg='#FF9500'
              label='Experience'
              onClick={() => navigate('experience')}
            />
            <ListItem
              icon={FolderKanban}
              iconBg='#34C759'
              label='Projects'
              onClick={() => navigate('projects')}
            />
            <ListItem
              icon={FileText}
              iconBg='#FF2D55'
              label='Resume'
              onClick={() => navigate('resume')}
            />
            <ListItem
              icon={Mail}
              iconBg='#007AFF'
              label='Contact'
              onClick={() => navigate('contact')}
            />
          </div>
        </motion.div>

        {/* Status Section */}
        <motion.div
          className='mx-4 mb-6'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className='text-[#8e8e93] text-[13px] uppercase px-4 mb-2'>
            Status
          </p>

          <div className='bg-[#1c1c1e] rounded-[10px] p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <motion.span
                className='w-2 h-2 bg-[#34C759] rounded-full'
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className='text-[#34C759] text-[15px] font-medium'>
                Available for work
              </span>
            </div>

            <div className='flex items-center gap-1 text-[#8e8e93] text-[13px]'>
              <MapPin className='w-3 h-3' />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </motion.div>
      </div>
      <HomeIndicator />
    </div>
  )
}


// About Screen - Simplified without skills bars
function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden">
      <StatusBar />
      <NavBarWithBack title="About Me" onBack={onBack} />

      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 pb-20"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        {/* Profile Header with animation */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5856D6] to-[#AF52DE] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-2xl font-bold">{personalInfo.name[0]}</span>
          </motion.div>
          <div>
            <h2 className="text-white text-xl font-bold">{personalInfo.name}</h2>
            <p className="text-[#8e8e93] text-[15px]">{personalInfo.title}</p>
            <div className="flex items-center gap-1 mt-1 text-[#8e8e93] text-[13px]">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="bg-[#1c1c1e] rounded-[10px] p-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-2">Bio</h3>
          <p className="text-white text-[15px] leading-relaxed">{personalInfo.bio}</p>
        </motion.div>

        {/* What I Do - Playful cards */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-3 px-1">What I Do</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Smartphone, label: 'Mobile Apps', color: '#007AFF' },
              { icon: Globe, label: 'Web Apps', color: '#5856D6' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="bg-[#1c1c1e] rounded-[10px] p-4 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="text-white text-[13px] font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts - Playful */}
        <motion.div
          className="bg-[#1c1c1e] rounded-[10px] p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[#8e8e93] text-[13px] font-medium uppercase mb-3">Fun Facts</h3>
          <div className="space-y-3">
              {[
                { emoji: '☕', text: 'Fueled by coffee & curiosity' },
                { emoji: '🎮', text: 'Chess! when not coding' },
                { emoji: '🎵', text: 'Music is my code companion' },
                { emoji: '🌏', text: 'Love exploring new places' },
                { emoji: '📚', text: 'Always learning something new' },
                { emoji: '🍕', text: 'Pizza is my guilty pleasure' },
                { emoji: '🛠️', text: 'Building side projects for fun' },
              ].map((fact, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="text-xl">{fact.emoji}</span>
                <span className="text-white text-[14px]">{fact.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Smooth spring config for animations
const smoothSpring = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  mass: 0.5,
}

const smoothTween = {
  type: 'tween' as const,
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // easeOutQuad
}

// Helper to highlight important terms in text
function HighlightText({ text }: { text: string }) {
  const keywords = [
    'React Native', 'TypeScript', 'Flutter', 'Firebase', 'GitHub Actions', 'Fastlane',
    'Vision Camera', 'ML Kit', 'Sentry', 'Crashlytics', 'Strategy pattern', 'state observer',
    'CI/CD', 'OTA updates', 'SSL pinning', 'Frida', 'deep linking', 'Native Modules',
    'Turbo modules', 'Provider', 'Bloc', 'isolates', 'Dart', "NX", 'Redux', 'RTK', 'Jest',
    'Node.js', 'RESTful APIs', 'GraphQL', 'i18n', 'internationalization', 'payment gateways',
    'QR code scanning', 'face detection', 'performance optimization', 'accessibility',
    'responsive design', 'unit testing', 'integration testing', 'end-to-end testing',
    'observer pattern', 'backend-driven UI', 'JSON rendering', "swift", "kotlin", "java", "cross-functional teams"
  ]
  const metricPattern = /\b\d+%|\b\d+x\b/g

  let result: React.ReactNode[] = []
  let lastIndex = 0
  let textLower = text.toLowerCase()

  // Find all keyword matches
  type Match = { start: number; end: number; text: string }
  let matches: Match[] = []

  keywords.forEach(kw => {
    let idx = textLower.indexOf(kw.toLowerCase())
    while (idx !== -1) {
      matches.push({ start: idx, end: idx + kw.length, text: text.slice(idx, idx + kw.length) })
      idx = textLower.indexOf(kw.toLowerCase(), idx + 1)
    }
  })

  // Find metric matches
  let match
  while ((match = metricPattern.exec(text)) !== null) {
    matches.push({ start: match.index, end: match.index + match[0].length, text: match[0] })
  }

  // Sort and dedupe overlapping
  matches.sort((a, b) => a.start - b.start)
  matches = matches.filter((m, i) => i === 0 || m.start >= matches[i - 1].end)

  if (matches.length === 0) return <>{text}</>

  matches.forEach((m, i) => {
    if (m.start > lastIndex) {
      result.push(<span key={`t${i}`}>{text.slice(lastIndex, m.start)}</span>)
    }
    result.push(<span key={`h${i}`} className="text-[#5AC8FA] font-medium">{m.text}</span>)
    lastIndex = m.end
  })
  if (lastIndex < text.length) {
    result.push(<span key="end">{text.slice(lastIndex)}</span>)
  }

  return <>{result}</>
}

// Categorize skills by type
const skillCategories: Record<string, string[]> = {
  'Core': ['React', 'TypeScript', 'Redux', 'RTK', 'Flutter', 'Dart', 'Jest'],
  'Mobile': ['Native', 'Android', 'iOS', 'SDK', 'Vision Camera', 'OTA'],
  'Backend': ['Firebase', 'Node', 'API', 'Query'],
  'DevOps': ['CI/CD', 'GitHub Actions', 'Fastlane', 'Pipeline', 'Crashlytics', 'Sentry'],
  'Architecture': ['Pattern', 'Observer', 'Backend-driven', 'JSON', 'Rendering'],
  'Security': ['SSL', 'Pinning', 'Frida', 'Security'],
  'Features': ['Deep Linking', 'Push', 'Notification', 'i18n', 'Internationalization', 'Payment', 'QR', 'Face', 'ML Kit', 'Scanning', 'Detection'],
}

function categorizeSkills(skills: string[]) {
  const categorized: Record<string, string[]> = {}
  const uncategorized: string[] = []

  skills.forEach(skill => {
    let found = false
    for (const [category, keywords] of Object.entries(skillCategories)) {
      if (keywords.some(kw => skill.toLowerCase().includes(kw.toLowerCase()))) {
        if (!categorized[category]) categorized[category] = []
        categorized[category].push(skill)
        found = true
        break
      }
    }
    if (!found) uncategorized.push(skill)
  })

  if (uncategorized.length > 0) {
    categorized['Other'] = uncategorized
  }

  return categorized
}

// Experience Screen - Full width card design
function ExperienceScreen({ onBack }: { onBack: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<Record<number, 'highlights' | 'skills'>>({})

  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden">
      <StatusBar />
      <NavBarWithBack title="Experience" onBack={onBack} />

      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-3 pb-20"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        <div className="space-y-3">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index
            const currentTab = activeTab[index] || 'highlights'

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...smoothSpring,
                  delay: index * 0.1,
                }}
                className="bg-[#1c1c1e] rounded-[16px] overflow-hidden"
              >
                {/* Header with logo */}
                <div
                  className="p-3 flex items-center gap-3 cursor-pointer active:bg-[#2c2c2e] transition-colors"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  {/* Company logo */}
                  <div className="w-11 h-11 rounded-[10px] bg-[#2c2c2e] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-[#007AFF]" />
                    )}
                  </div>

                  {/* Title and meta */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[15px] font-semibold truncate">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-[#007AFF]">{exp.company}</span>
                      <span className="text-[#3a3a3c]">•</span>
                      <span className="text-[#8e8e93]">{exp.duration}</span>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={smoothTween}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#8e8e93]" />
                  </motion.div>
                </div>

                {/* Quick stats when collapsed */}
                <motion.div
                  initial={false}
                  animate={{
                    height: !isExpanded ? 'auto' : 0,
                    opacity: !isExpanded ? 1 : 0,
                  }}
                  transition={{
                    height: { ...smoothTween, duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 flex gap-2">
                    <span className="px-2 py-1 text-[11px] rounded-full bg-[#34C759]/15 text-[#34C759]">
                      {exp.description.length} achievements
                    </span>
                    <span className="px-2 py-1 text-[11px] rounded-full bg-[#007AFF]/15 text-[#007AFF]">
                      {exp.skills.length} skills
                    </span>
                  </div>
                </motion.div>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{
                    height: { ...smoothTween, duration: 0.4 },
                    opacity: { duration: 0.25, ease: 'easeOut' },
                  }}
                  className="overflow-hidden"
                >
                  {/* Tab switcher */}
                  <div className="px-3 pb-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveTab(prev => ({ ...prev, [index]: 'highlights' }))
                      }}
                      className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
                        currentTab === 'highlights'
                          ? 'bg-[#34C759] text-white'
                          : 'bg-[#2c2c2e] text-[#8e8e93]'
                      }`}
                    >
                      ✨ Highlights ({exp.description.length})
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveTab(prev => ({ ...prev, [index]: 'skills' }))
                      }}
                      className={`px-3 py-1.5 text-[12px] rounded-full transition-colors ${
                        currentTab === 'skills'
                          ? 'bg-[#007AFF] text-white'
                          : 'bg-[#2c2c2e] text-[#8e8e93]'
                      }`}
                    >
                      🛠 Skills ({exp.skills.length})
                    </button>
                  </div>

                  {/* Tab content */}
                  <div className="px-3 pb-3">
                    <AnimatePresence mode="wait">
                      {currentTab === 'highlights' ? (
                        <motion.div
                          key="highlights"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2 max-h-[200px] overflow-y-auto pr-1"
                        >
                          {exp.description.map((desc, i) => (
                            <motion.div
                              key={i}
                              className="flex gap-2 text-[13px] leading-relaxed"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <span className="text-[#34C759] flex-shrink-0">▸</span>
                              <span className="text-[#ebebf5]">
                                <HighlightText text={desc} />
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="skills"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 max-h-[200px] overflow-y-auto pr-1"
                        >
                          {Object.entries(categorizeSkills(exp.skills)).map(([category, catSkills], catIdx) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIdx * 0.05 }}
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-[11px] font-medium text-[#8e8e93]">
                                    {category}
                                  </span>
                                  <span className="text-[10px] text-[#636366]">({catSkills.length})</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pl-0">
                                  {catSkills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-1 text-[10px] rounded-full bg-[#2c2c2e] text-[#ebebf5]"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}


// Projects Screen - Card carousel style
function ProjectsScreen({ onBack }: { onBack: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const projectColors = ['#34C759', '#007AFF', '#FF9500', '#AF52DE', '#FF2D55']

  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden">
      <StatusBar />
      <NavBarWithBack title="Projects" onBack={onBack} />

      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 pb-20"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        <div className="space-y-4">
          {projects.map((project, index) => {
            const color = projectColors[index % projectColors.length]
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...smoothSpring,
                  delay: index * 0.08,
                }}
                className='bg-[#1c1c1e] rounded-[16px] overflow-hidden'
              >
                {/* Project Header */}
                <div
                  className='p-4 pb-3'
                  style={{
                    background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                    borderBottom: `1px solid ${color}30`,
                  }}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex items-center gap-3'>
                      <motion.div
                        className='w-10 h-10 rounded-[10px] flex items-center justify-center'
                        style={{ backgroundColor: color }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FolderKanban className='w-5 h-5 text-white' />
                      </motion.div>
                      <div>
                        <h3 className='text-white text-[17px] font-semibold'>
                          {project.title}
                        </h3>
                        <p className='text-[#8e8e93] text-[13px]'>
                          {project.techStack.length} technologies
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='p-2 rounded-full bg-[#2c2c2e]'
                          whileTap={{ scale: 0.85 }}
                        >
                          <Github className='w-4 h-4 text-white' />
                        </motion.a>
                      )}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='p-2 rounded-full bg-[#2c2c2e]'
                          whileTap={{ scale: 0.85 }}
                        >
                          <ExternalLink className='w-4 h-4 text-white' />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                <div className='p-4'>
                  <p className='text-white text-[14px] mb-3'>
                    {project.description}
                  </p>

                  {/* Expandable highlights */}
                  <motion.button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className='flex items-center gap-1 text-[14px] mb-3'
                    style={{ color }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star className='w-4 h-4' />
                    <span>{project.highlights.length} Highlights</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={smoothTween}
                    >
                      <ChevronDown className='w-4 h-4' />
                    </motion.div>
                  </motion.button>

                  {/* Smooth expandable content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      height: { ...smoothTween, duration: 0.4 },
                      opacity: { duration: 0.25, ease: 'easeOut' },
                    }}
                    className='overflow-hidden'
                  >
                    <ul className='space-y-2 mb-4'>
                      {project.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          className='text-[#8e8e93] text-[13px] flex gap-2'
                          initial={{ opacity: 0, y: 5 }}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 5,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: isExpanded ? i * 0.04 : 0,
                            ease: 'easeOut',
                          }}
                        >
                          <CheckCircle2
                            className='w-4 h-4 flex-shrink-0 mt-0.5'
                            style={{ color }}
                          />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {/* Fun Fact Footer */}

                    {isExpanded &&
                      project?.funfacts?.length &&
                      project?.funfacts?.length > 0 && (
                        <>
                          <span className=' text-[#848484] text-[12px]'>
                            Fun fact:
                          </span>
                          <div className=' bg-[#232325] rounded-[8px] p-2 mb-3 flex flex-col'>
                            {project.funfacts.map((fact) => (
                              <span className='text-[#848484] text-[13px]'>
                                {fact}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                  </motion.div>

                  {/* Tech stack */}
                  <div className='flex flex-wrap gap-1.5'>
                    {project.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className='px-2 py-1 text-[12px] rounded-full'
                        style={{
                          backgroundColor: `${color}15`,
                          color: color,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + i * 0.03,
                          ease: 'easeOut',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Resume Screen - New
function ResumeScreen({ onBack }: { onBack: () => void }) {
  const resumeUrl = '/resume.pdf' // Place your resume PDF in public folder

  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden">
      <StatusBar />
      <NavBarWithBack title="Resume" onBack={onBack} />

      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-6 pb-20 flex flex-col items-center justify-center"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        {/* Resume Icon Animation */}
        <motion.div
          className="w-32 h-40 bg-[#1c1c1e] rounded-[12px] mb-6 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Paper effect */}
          <div className="absolute inset-2 bg-white rounded-lg flex flex-col p-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5856D6] to-[#AF52DE] mb-2" />
            <div className="space-y-1.5">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 bg-gray-200 rounded"
                  style={{ width: `${60 + Math.random() * 30}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Corner fold */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-[#2c2c2e]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        </motion.div>

        <motion.h2
          className="text-white text-[22px] font-bold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          My Resume
        </motion.h2>

        <motion.p
          className="text-[#8e8e93] text-[15px] text-center mb-8 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Download or view my complete resume with all my experience and skills
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex gap-3 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#1c1c1e] rounded-[10px] text-white"
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
            <span className="text-[15px] font-medium">View</span>
          </motion.a>

          <motion.a
            href={resumeUrl}
            download="Vishal_Resume.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#007AFF] rounded-[10px] text-white"
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span className="text-[15px] font-medium">Download</span>
          </motion.a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="mt-8 w-full bg-[#1c1c1e] rounded-[10px] p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-[#8e8e93] text-[13px] uppercase mb-3">Quick Overview</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '3+', label: 'Years Exp' },
              { value: `${experiences.length}`, label: 'Companies' },
              { value: `${projects.length}+`, label: 'Projects' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <p className="text-white text-[20px] font-bold">{stat.value}</p>
                <p className="text-[#8e8e93] text-[12px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// Contact Screen
function ContactScreen({ onBack }: { onBack: () => void }) {
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      bgColor: '#007AFF',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.social.linkedin,
      bgColor: '#0077B5',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Check my code',
      href: personalInfo.social.github,
      bgColor: '#333333',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: 'Follow me',
      href: personalInfo.social.twitter,
      bgColor: '#1DA1F2',
    },
  ]

  return (
    <div className="h-full w-full flex flex-col bg-black overflow-hidden">
      <StatusBar />
      <NavBarWithBack title="Contact" onBack={onBack} />

      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 pb-20"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(52, 199, 89, 0.4)',
                '0 0 0 20px rgba(52, 199, 89, 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-white text-[22px] font-bold">Let's Connect!</h2>
          <p className="text-[#8e8e93] text-[15px]">I'd love to hear from you</p>
        </motion.div>

        {/* Contact Options */}
        <div className="bg-[#1c1c1e] rounded-[10px] divide-y divide-[#38383a]">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 active:bg-[#2c2c2e] transition-colors first:rounded-t-[10px] last:rounded-b-[10px]"
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: contact.bgColor }}
              >
                <contact.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-[17px] font-medium">{contact.label}</p>
                <p className="text-[#8e8e93] text-[13px]">{contact.value}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#48484a]" strokeWidth={2.5} />
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
          <motion.p
            className="text-[#48484a] text-[13px]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Let's build something amazing together ✨
          </motion.p>
        </motion.div>
      </div>

      <HomeIndicator />
    </div>
  )
}

// ============ MAIN COMPONENT ============

export function PhoneContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [direction, setDirection] = useState(1)

  const navigate = (screen: Screen) => {
    setDirection(1)
    setCurrentScreen(screen)
  }

  const goBack = () => {
    setDirection(-1)
    setCurrentScreen('home')
  }

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
      className="w-full h-full relative bg-black"
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
          {currentScreen === 'resume' && <ResumeScreen onBack={goBack} />}
          {currentScreen === 'contact' && <ContactScreen onBack={goBack} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PhoneContent
