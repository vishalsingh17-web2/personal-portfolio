export interface ExperienceProps {
  months?: number
  years?: number
  title: string
  organizationLink: string
  points: string[]
  range: string
  role: string
  skills: string[]
  organisationLogo?: string
}

export interface ProjectProps {
  title: string
  points: string[]
}

export const ProjectData: ProjectProps[] = [
  {
    title: 'Fall detection',
    points: [
      'Project based on *ML/DL, which detects fall, using smart phone sensors.',
      'Created our own dataset using flutter app and on-board sensors of smartphone *(Accelerometer, *gyroscope and *magnetometer',
      'Pre-processed the collected data.',
      'Analyzed it with different machine learning and deep learning algorithms.',
      'Best accuracy was achieved by *Random *Forest *classifier of *99.25%',
      'Deployed the model on Django server.',
      'Integrated the server with *Flutter *app to predict the fall and other daily life activities *(Walking, *sitting, *standing, *running).',
    ],
  },
  {
    title: 'IoT Smart Farming',
    points: [
      '*Implemented IoT system with Node-MCU, Flutter, and Firebase',
      '*Collected data from sensors (*DHT11 and *Soil *moisture sensor)',
      'Stored sensor data on *RLTD of Firebase',
      '*Fetched data to Flutter app',
      'Generated *alerts based on sensor readings',
      '*Controlled motor-pump remotely using Flutter app',
    ],
  },
  {
    title: 'Chat App',
    points: [
      '*Project based on Flutter/dart with Google authentication and data storage on *cloud *firestore',
      'Can be simply used to chat with your friends, it supports text-based messages including emojis and multiline text',
      'Also, we can create groups with friends, and all of it is backed up by firebase',
      'Used *Provider package for state-management',
    ],
  },
]

export const ExperienceData: ExperienceProps[] = [
  {
    title: 'Affinsys AI Pvt Ltd.',
    organizationLink: 'https://www.linkedin.com/company/affinsys-ai/mycompany/',
    organisationLogo:
      'https://media.licdn.com/dms/image/C560BAQG0Bazc7rI1eQ/company-logo_200_200/0/1630617867380?e=1721260800&v=beta&t=KovALKtv0q6ELiF2eGm85ZDL0dn-WkNRnHyM_319wBY',
    points: [
      'Spearheaded autogen React Native integration in Android project, *enhancing *functionality.',
      'Developed mobile app from scratch with React Native, featuring autogen *deep *linking and *robust *notifications.',
      'Achieved a *30% *reduction in development time by leveraging an *autogen npm package for form handling.',
      'Optimized API handling using autogen *RTK *Query, ensuring cross-platform performance.',
      'Streamlined codebase, *conducted *reviews, and fostered continuous improvement.',
    ],
    range: 'Oct, 2022 - Present',
    role: 'Internship + Full Time',
    skills: [
      'React',
      'Jest',
      'Webpack',
      'React Native',
      'Android/iOS',
      'Redux',
      'RTK Query',
      'Firebase',
      'Node modules',
    ],
  },
  {
    months: 3,
    years: 0,
    title: 'TreeVed.',
    organizationLink: 'https://www.linkedin.com/company/treeved-sarvlok/about/',
    organisationLogo:
      'https://media.licdn.com/dms/image/C560BAQFkbUM7rG49Rw/company-logo_200_200/0/1658988082992?e=1721260800&v=beta&t=jlNRSfsuOD8Nb_JcxeImkYBVeOfA1Pi_7PuAHRIcOjc',
    points: [
      'Debugged, managed, and created new screens and features for the app.',
      'Enhanced proficiency in Flutter state management using *Provider and *Bloc packages, optimizing resource management.',
      'Utilized *method *channels for native API calls in *Flutter/Dart and implemented the *repository *pattern for efficient API management.',
    ],
    range: 'Jan, 2022 - Apr, 2022',
    role: 'Internship',
    skills: ['Flutter', 'Android/iOS', 'Bloc', 'Provider', 'Firebase'],
  },
  {
    months: 3,
    years: 0,
    title: 'Cruv.',
    organizationLink: 'https://www.linkedin.com/company/cruv/about/',
    organisationLogo:
      'https://media.licdn.com/dms/image/C4D0BAQGQGClEa5MrMA/company-logo_200_200/0/1669889801468/cruv_logo?e=1721260800&v=beta&t=VUvee8czbr38KKmM2TTsfleTYVV-32mDnyQpysShIjc',
    points: [
      'Implemented *pixel-perfect UI designs.',
      'Utilized *isolates to enhance app performance.',
      'Employed isolates for calling APIs in separate *memory *threads.',
      'Managed *heavy *background *tasks such as video downloading and running complex algorithms.',
    ],
    range: 'Nov, 2021 - Jan, 2022',
    role: 'Internship',
    skills: ['Flutter', 'Android/iOS', 'Bloc', 'Provider', 'Firebase'],
  },
]
