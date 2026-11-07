// Emphasis only wraps exact substrings. The source sentences remain untouched.
const impactPhrases = [
  'millions of Best Buy customers', 'millions of users', 'reduced feature development time',
  'end to end', 'from scratch', 'cross-platform', 'release readiness',
  'secure, multi-user', 'real-time', '99.25% accuracy', '60%',
  'role-based access control', 'automatic transaction sync', 'remote motor-pump control',
  'keep the UI responsive', 'reduce UI jank', 'pixel-accurate',
  'authentication, rate limiting', 'storage quota management', 'drag-and-drop uploads',
]
const technicalPhrases = [
  'React Native', 'Nx monorepo', 'TypeScript', 'GraphQL', 'native calendar support',
  'native modules', 'Turbo Modules', 'Swift and Kotlin', 'native-to-JS',
  'session-aware cache reset', 'cache reset and invalidation', 'guest-user regressions',
  'backend-driven form builder', 'JSON rendering', 'Strategy pattern',
  'GitHub Actions and Fastlane', 'CI/CD', 'Frida detection and SSL pinning',
  'internationalization', 'Vision Camera and ML Kit', 'OTA updates',
  'Firebase Crashlytics and Sentry', 'deep linking and push notifications',
  'Flutter', 'Provider and Bloc', 'method channels', 'repository pattern', 'Dart isolates',
  'Flask', 'RESTful API endpoints', 'RESTful APIs', 'file metadata extraction',
  'JSON-based rules', 'GitHub Actions', 'React 19', 'Zustand', 'TanStack Query',
  'transaction ingestion', 'dynamic transaction categorization', 'Google OAuth2 and Gmail API',
  'analytics dashboard', 'advanced filters', 'Random Forest classifier', 'custom dataset',
  'Django', 'Node-MCU', 'DHT11 and Soil moisture sensors',
  'Google authentication', 'Cloud Firestore', 'Firebase', 'Provider',
  'file upload, download, and sharing', 'expense tracking and budgeting',
  'smartphone sensors', 'smart agriculture monitoring', 'group messaging',
]
const impact = new Set(impactPhrases.map(phrase => phrase.toLowerCase()))
const phrases = [...impactPhrases, ...technicalPhrases]
  .sort((a, b) => b.length - a.length)
  .map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
const pattern = new RegExp(`(?<!\\w)(?:\\d+(?:\\.\\d+)?%|${phrases.join('|')})(?!\\w)`, 'gi')

export function EmphasizedText({ text }: { text: string }) {
  const matches = [...text.matchAll(pattern)].map(match => ({
    start: match.index,
    text: match[0],
    outcome: impact.has(match[0].toLowerCase()) || /\d+(?:\.\d+)?%/.test(match[0]),
  }))
  // Give outcomes priority, then keep only two focal points per sentence.
  const selected = matches.sort((a, b) => Number(b.outcome) - Number(a.outcome) || a.start - b.start)
    .slice(0, 2).sort((a, b) => a.start - b.start)
  let cursor = 0
  const parts = selected.map(match => {
    const before = text.slice(cursor, match.start)
    cursor = match.start + match.text.length
    return <span key={match.start}>{before}<strong className={match.outcome ? 'ios-emphasis ios-emphasis-outcome' : 'ios-emphasis'}>{match.text}</strong></span>
  })
  return <>{parts}{text.slice(cursor)}</>
}
