import bestBuyLogo from '@/assets/best_buy.png'
import affinsysLogo from '@/assets/affinsys.png'
import treevedLogo from '@/assets/treeved.png'
import cruvLogo from '@/assets/cruv.png'

export interface Experience {
  title: string;
  company: string;
  companyUrl: string;
  logo?: string;
  role: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  link?: string;
  github?: string;
  image?: string;
  funfacts?:string[]
}

export const personalInfo = {
  name: "Vishal",
  title: "Full Stack Mobile Developer",
  tagline: "React Native engineer shipping mobile features at Best Buy and cutting build time with backend-driven UI",
  email: "work.vishal.dev@gmail.com",
  location: "Bengaluru, India",
  bio: `I'm a passionate mobile developer with expertise in React Native, Flutter, and native Android/iOS development.
        I've been building apps for 3+ years, focusing on creating seamless user experiences that help businesses
        succeed while making people's lives better.`,
  social: {
    github: "https://github.com/vishalsingh17-web2",
    linkedin: "https://linkedin.com/in/vishal-singh-1703",
    twitter: "https://twitter.com/Vishal_17_",
  },
};

export const skills = [
  { name: "React Native", level: 95, category: "Mobile" },
  { name: "Flutter", level: 88, category: "Mobile" },
  { name: "React", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Language" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Redux", level: 88, category: "State" },
  { name: "Firebase", level: 85, category: "Backend" },
  { name: "Android", level: 78, category: "Mobile" },
  { name: "iOS", level: 75, category: "Mobile" },
  { name: "Jest", level: 80, category: "Testing" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "Webpack", level: 75, category: "Tools" },
];

export const experiences: Experience[] = [
  {
    title: 'Best Buy',
    company: 'Best Buy',
    companyUrl: 'https://www.linkedin.com/company/best-buy/mycompany/',
    logo: bestBuyLogo,
    role: 'Software Engineer 1',
    description: [
      'Ship features in a large Nx monorepo powering a React Native retail app used by millions of Best Buy customers.',
      'Investigated and fixed iOS-only guest-user regressions by comparing cross-platform behavior and tracing state differences across app layers.',
      'Resolved React Native bridge issues in logout flows by fixing stale native-to-JS data handoff and user-session synchronization gaps.',
      'Debugged GraphQL query failures behind inconsistent saved-items state and improved reliability with targeted cache reset and invalidation fixes.',
      'Implemented session-aware cache reset logic so guest and signed-in users consistently see correct, user-specific data after auth transitions.',
      'Partnered with product, QA, and backend teams to unblock guest-user requirements and reduce ambiguity before implementation.',
      'Delivered an event management feature end to end in the Best Buy consumer app, from requirements to production rollout.',
      'Integrated native calendar support in Swift and Kotlin so users can save in-app events directly to their device calendars.',
      'Built reminder scheduling flows that push event notifications into the device calendar with native bridge support on both platforms.',
      'Implemented custom native modules for cross-platform communication between React Native and iOS/Android codebases.',
      'Maintain mobile features in a production React Native app at Best Buy scale, with quality and edge-case handling expected for millions of users.',
    ],
    duration: 'Sept 2025 - Present',
    skills: [
  // Mobile & Frontend
      "React Native",
      "TypeScript",
      "JavaScript",
      "GraphQL",
      "TanStack Query",
      "RxJS",
      "Nx Monorepo",

      // Native Mobile
      "Swift",
      "Kotlin",
      "Android (Java)",
      "iOS Development",
    ],
  },
  {
    title: 'Affinsys AI Pvt Ltd.',
    company: 'Affinsys AI',
    companyUrl: 'https://www.linkedin.com/company/affinsys-ai/mycompany/',
    logo: affinsysLogo,
    role: 'Software Developer',
    duration: 'Oct 2022 - Sept 2025',
    description: [
      'Led React Native app development from scratch in TypeScript, shaping architecture, feature delivery, and release readiness across multiple client projects.',
      'Built Project Autogen, a backend-driven form builder using JSON rendering, and reduced feature development time by 60% for form-heavy workflows.',
      'Designed payment processors with the Strategy pattern and state-based retry handling to make payment failures explicit, recoverable, and easier to extend.',
      'Automated Android delivery with GitHub Actions and Fastlane, replacing manual release steps with a repeatable CI/CD pipeline.',
      'Implemented Native Modules and Turbo Modules to bridge React Native with platform-specific APIs when JavaScript alone was not enough.',
      'Added Frida detection and SSL pinning to harden production builds against reverse engineering and traffic interception.',
      'Rolled out internationalization support for multilingual apps, making the product usable across multiple language regions.',
      'Integrated Vision Camera and ML Kit features for QR scanning and face detection in real mobile use cases.',
      'Added OTA updates plus Firebase Crashlytics and Sentry to speed up fixes and improve crash visibility after release.',
      'Implemented deep linking and push notifications to improve user acquisition flows and re-engagement inside the app.',
    ],
    skills: [
      'React Native',
      'React',
      'TypeScript',
      'Redux',
      'RTK Query',
      'Firebase',
      'Jest',
      'Android/iOS',

      // Architecture & Patterns
      'Strategy Pattern',
      'State Observer Pattern',
      'Backend-driven UI',
      'JSON-based Form Rendering',

      // Mobile Platform & Native
      'Native Modules',
      'Turbo Modules',
      'Android SDK',
      'iOS SDK',

      // CI/CD & DevOps
      'GitHub Actions',
      'Fastlane',
      'CI/CD Pipelines',

      // Security
      'SSL Pinning',
      'Frida Detection',
      'Mobile App Security',

      // ML & Camera
      'React Native Vision Camera',
      'ML Kit',
      'QR Code Scanning',
      'Face Detection',

      // Reliability & Updates
      'OTA Updates',
      'Firebase Crashlytics',
      'Sentry',

      // App Features
      'Deep Linking',
      'Push Notifications',
      'Internationalization (i18n)',

      // Payments
      'Payment Processing',
      'Retry & Failure Handling',
    ],
  },
  {
    title: 'TreeVed',
    company: 'TreeVed',
    companyUrl: 'https://www.linkedin.com/company/treeved-sarvlok/about/',
    logo: treevedLogo,
    role: 'Flutter Developer Intern',
    duration: 'Jan 2022 - Apr 2022',
    description: [
      'Delivered new Flutter screens and fixes across a 4-month internship while learning to ship against an existing codebase.',
      'Strengthened app architecture with Provider and Bloc-based state management patterns for more maintainable feature work.',
      'Used method channels for native API access and implemented the repository pattern to keep data and UI concerns separated.',
    ],
    skills: ['Flutter', 'Dart', 'Bloc', 'Provider', 'Firebase'],
  },
  {
    title: 'Cruv',
    company: 'Cruv',
    companyUrl: 'https://www.linkedin.com/company/cruv/about/',
    logo: cruvLogo,
    role: 'Flutter Developer Intern',
    duration: 'Nov 2021 - Jan 2022',
    description: [
      'Built pixel-accurate Flutter interfaces from design specs with close attention to spacing, alignment, and interaction details.',
      'Used Dart isolates to move heavy background work off the main thread and keep the UI responsive.',
      'Handled API work in separate memory threads with isolates to reduce UI jank during network-heavy flows.',
    ],
    skills: ['Flutter', 'Dart', 'Isolates', 'Performance Optimization'],
  },
]

export const projects: Project[] = [
  {
    title: "Cloud Storage",
    description: "Cloud storage solution with file upload, download, and sharing features",
    highlights: [
      "Architected and implemented a secure, multi-user cloud storage backend using Flask, supporting file upload, download, preview, streaming (with range support), search, and directory management.",
      "Designed and enforced robust per-user storage quota management with dynamic usage calculation and reserved disk space for custom quotas.",
      "Built RESTful API endpoints for all major file operations, including upload, download, preview, stream, search, delete, rename, and folder creation.",
      "Integrated authentication, rate limiting, and middleware to secure file operations and ensure fair resource usage.",
      "Developed utility modules for efficient storage calculation, file metadata extraction, and file type detection.",
      "Enabled scalable configuration via JSON-based rules for user quotas, credentials, and operational policies.",
      "Automated CI/CD pipelines using GitHub Actions to run tests, lint code, manage secrets, and deploy on every push or pull request.",
      "Created shell scripts for local server management and credential handling, streamlining developer onboarding and environment setup.",
      "Built a modern, responsive file manager frontend using React 19, TypeScript 5, Vite, Tailwind CSS, Radix UI, and Framer Motion.",
      "Implemented advanced file management UX including drag-and-drop uploads, real-time progress tracking, previews, theming (light/dark), Zustand state management, TanStack Query synchronization, and shareable links with React Router."
    ],
    techStack: ["Flask", "Python", "React", "TypeScript", "Vite", "Tailwind CSS", "ShadCN", "Zustand", "TanStack Query", "GitHub Actions"],
    funfacts: [
      "- This whole project was deployed on my spare android device initially, before moving to my VPS.",
      "- You can use it as PWA on your phone too!"
    ]
  },
  {
    title: "Personal Finance dashboard",
    description: "Personal finance dashboard with expense tracking and budgeting features",
    highlights: [
      "Built a secure, multi-user personal finance dashboard for viewing, searching, and categorizing transactions.",
      "Automated transaction ingestion using custom regex parsers for bank statements and email notifications (HDFC, ICICI).",
      "Implemented dynamic transaction categorization with merchant rules, amount thresholds, and manual overrides.",
      "Developed RESTful APIs for transactions, categories, search, and reporting.",
      "Integrated Google OAuth2 and Gmail API for secure authentication and automatic transaction sync.",
      "Built an analytics dashboard with summary metrics, category breakdowns, and interactive charts.",
      "Implemented advanced filters (date, type, payment mode, category) and real-time data refresh.",
      "Automated CI/CD with GitHub Actions and enforced role-based access control."
    ],
    techStack: ["Flask", "Python", "React", "TypeScript", "Vite", "Tailwind CSS", "ShadCN", "Zustand", "TanStack Query", "GitHub Actions", "Google OAuth2", "Gmail API"],
  },
  {
    title: "Fall Detection System",
    description: "ML/DL powered fall detection system using smartphone sensors",
    highlights: [
      "Created custom dataset using Flutter app with Accelerometer, Gyroscope, and Magnetometer",
      "Achieved 99.25% accuracy with Random Forest classifier",
      "Deployed model on Django server and integrated with Flutter app",
      "Predicts falls and daily activities like walking, sitting, standing, running",
    ],
    techStack: ["Flutter", "Python", "Django", "Machine Learning", "TensorFlow"],
    image: "/projects/fall-detection.png",
  },
  {
    title: "IoT Smart Farming",
    description: "Complete IoT system for smart agriculture monitoring",
    highlights: [
      "Implemented IoT system with Node-MCU, Flutter, and Firebase",
      "Real-time data collection from DHT11 and Soil moisture sensors",
      "Generated alerts based on sensor readings",
      "Remote motor-pump control via Flutter app",
    ],
    techStack: ["Flutter", "Firebase", "Node-MCU", "IoT", "Embedded Systems"],
    image: "/projects/smart-farming.png",
  },
  {
    title: "Chat Application",
    description: "Real-time chat application with group messaging",
    highlights: [
      "Google authentication and Cloud Firestore integration",
      "Text-based messages with emojis and multiline support",
      "Group creation and messaging with Firebase backup",
      "State management using Provider package",
    ],
    techStack: ["Flutter", "Firebase", "Cloud Firestore", "Provider"],
    image: "/projects/chat-app.png",
  },
];

export interface Education {
  degree: string;
  institution: string;
  logo?: string;
  duration: string;
  description: string;
  achievements?: string[];
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: 'Vellore Institute of Technology (VIT), Vellore',
    duration: '2019 - 2023', // update if different
    description:
      'Undergraduate program in Electronics and Communication Engineering.',
    achievements: ['GPA: 9.09 / 10.0'],
  },
]

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
