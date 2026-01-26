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
}

export const personalInfo = {
  name: "Vishal",
  title: "Full Stack Mobile Developer",
  tagline: "Building beautiful, performant mobile experiences",
  email: "hello@vishal.dev",
  location: "India",
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
    title: "Affinsys AI Pvt Ltd.",
    company: "Affinsys AI",
    companyUrl: "https://www.linkedin.com/company/affinsys-ai/mycompany/",
    logo: "https://media.licdn.com/dms/image/C560BAQG0Bazc7rI1eQ/company-logo_200_200/0/1630617867380",
    role: "Software Developer",
    duration: "Oct 2022 - Present",
    description: [
      "Spearheaded autogen React Native integration in Android project, enhancing functionality",
      "Developed mobile app from scratch with React Native, featuring deep linking and robust notifications",
      "Achieved 30% reduction in development time by leveraging npm packages for form handling",
      "Optimized API handling using RTK Query, ensuring cross-platform performance",
      "Streamlined codebase, conducted reviews, and fostered continuous improvement",
    ],
    skills: ["React Native", "React", "Redux", "RTK Query", "Firebase", "Jest", "Android/iOS"],
  },
  {
    title: "TreeVed",
    company: "TreeVed",
    companyUrl: "https://www.linkedin.com/company/treeved-sarvlok/about/",
    logo: "https://media.licdn.com/dms/image/C560BAQFkbUM7rG49Rw/company-logo_200_200/0/1658988082992",
    role: "Flutter Developer Intern",
    duration: "Jan 2022 - Apr 2022",
    description: [
      "Debugged, managed, and created new screens and features for the app",
      "Enhanced proficiency in Flutter state management using Provider and Bloc packages",
      "Utilized method channels for native API calls and implemented repository pattern",
    ],
    skills: ["Flutter", "Dart", "Bloc", "Provider", "Firebase"],
  },
  {
    title: "Cruv",
    company: "Cruv",
    companyUrl: "https://www.linkedin.com/company/cruv/about/",
    logo: "https://media.licdn.com/dms/image/C4D0BAQGQGClEa5MrMA/company-logo_200_200/0/1669889801468",
    role: "Flutter Developer Intern",
    duration: "Nov 2021 - Jan 2022",
    description: [
      "Implemented pixel-perfect UI designs with attention to detail",
      "Utilized isolates to enhance app performance and manage heavy background tasks",
      "Employed isolates for calling APIs in separate memory threads",
    ],
    skills: ["Flutter", "Dart", "Isolates", "Performance Optimization"],
  },
];

export const projects: Project[] = [
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

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
