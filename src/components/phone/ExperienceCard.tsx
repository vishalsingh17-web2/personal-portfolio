import { Fragment, useId } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import type { Experience } from '@/data/portfolio-data'
import { EmphasizedText } from './EmphasizedText'

const technologyCategories = [
  { label: 'Mobile', pattern: /react native|flutter|swift|kotlin|android|ios|native modules|turbo modules/i },
  { label: 'Language', pattern: /^(typescript|javascript|dart)$/i },
  { label: 'Data & state', pattern: /graphql|query|rxjs|redux|bloc|provider|^firebase$/i },
  { label: 'Delivery & tools', pattern: /nx |github|fastlane|ci\/cd|jest|sentry|crashlytics|ota/i },
]

function NativeBridge() {
  const id = useId()
  const reduceMotion = useReducedMotion()
  return (
    <figure className="ios-bridge-figure">
      <svg className="ios-bridge" viewBox="0 0 360 92" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>React Native connected to Swift and Kotlin through custom native modules</title>
        <path id={`${id}-ios`} className="wire" pathLength="1" d="M112 46 H168 C204 46 214 18 250 18" />
        <path id={`${id}-android`} className="wire" pathLength="1" d="M112 46 H168 C204 46 214 74 250 74" />
        <rect className="node" x=".5" y="30.5" width="111" height="31" rx="8" />
        <text x="56" y="50.5">React Native</text>
        <rect className="node" x="250.5" y="2.5" width="109" height="31" rx="8" />
        <text x="305" y="22.5">Swift (iOS)</text>
        <rect className="node" x="250.5" y="58.5" width="109" height="31" rx="8" />
        <text x="305" y="78.5">Kotlin (Android)</text>
        {!reduceMotion && ['ios', 'android'].map((platform, index) => (
          <circle key={platform} className="dot" r="3" opacity="0">
            <animateMotion dur="1.3s" begin={`${1 + index * .15}s`} fill="freeze"><mpath href={`#${id}-${platform}`} /></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="1.3s" begin={`${1 + index * .15}s`} fill="freeze" />
          </circle>
        ))}
      </svg>
      <figcaption>Custom native modules connect the app to both platforms.</figcaption>
    </figure>
  )
}

function ContributionList({ items }: { items: string[] }) {
  return <ul className="ios-contributions">{items.map(item => <li key={item}><EmphasizedText text={item} limit={1} /></li>)}</ul>
}

export function ExperienceCard({ experience: exp, current }: { experience: Experience; current: boolean }) {
  const leadIndex = exp.description.findIndex(sentence => /\d+(?:\.\d+)?%/.test(sentence))
  const featuredIndex = leadIndex < 0 ? 0 : leadIndex
  const visibleIndices = current ? [1] : []
  const remainingIndices = exp.description.map((_, index) => index).filter(index => index !== featuredIndex && !visibleIndices.includes(index))
  const groups = exp.contributionGroups ?? [{ title: 'Contributions', indices: remainingIndices }]
  const assigned = new Set(groups.flatMap(group => group.indices))
  const ungrouped = remainingIndices.filter(index => !assigned.has(index))
  const detailGroups = ungrouped.length ? [...groups, { title: 'Further contributions', indices: ungrouped }] : groups
  const technologies = technologyCategories.map(category => ({
    label: category.label,
    items: exp.skills.filter(skill => technologyCategories.find(candidate => candidate.pattern.test(skill)) === category),
  })).filter(category => category.items.length)
  const otherSkills = exp.skills.filter(skill => !technologyCategories.some(category => category.pattern.test(skill)))
  if (otherSkills.length) technologies.push({ label: 'Architecture & features', items: otherSkills })

  return (
    <article className="ios-career-card" data-current={current} aria-label={`${exp.role} at ${exp.company}`}>
      <header className="ios-career-heading">
        <h2>{exp.role}</h2>
        <div className="ios-career-meta">
          <div className="ios-career-company">
            {exp.logo && <img src={exp.logo} alt="" className="ios-company-logo" />}
            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${exp.company} (opens in a new tab)`}>{exp.company}<ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <span className="ios-date">{exp.duration}</span>
          {current && <span className="ios-current">Current role</span>}
        </div>
      </header>
      <div className="ios-career-body">
        <p className="ios-career-lead"><EmphasizedText text={exp.description[featuredIndex]} limit={1} /></p>
        {exp.nativeBridge && <NativeBridge />}
        {visibleIndices.length > 0 && <ContributionList items={visibleIndices.map(index => exp.description[index])} />}
        <details className="ios-disclosure">
          <summary>More about this role<ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="ios-disclosure-content">
            {detailGroups.map(group => <section key={group.title}><h3 className="ios-group-title">{group.title}</h3><ContributionList items={group.indices.map(index => exp.description[index])} /></section>)}
          </div>
        </details>
        <details className="ios-disclosure ios-career-tools">
          <summary>Technologies<ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="ios-disclosure-content">
            <dl className="ios-career-stack">{technologies.map(category => <Fragment key={category.label}><dt>{category.label}</dt><dd>{category.items.join(', ')}</dd></Fragment>)}</dl>
          </div>
        </details>
      </div>
    </article>
  )
}
