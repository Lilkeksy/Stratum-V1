import { ArrowLeft, ArrowRight, Check, FileSearch, FileUp, Globe2, Languages, ScanText, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Brand } from '../components/Brand'
import type { Page } from '../types'

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬' },
]

const slides = [
  {
    eyebrow: 'Bring your documents',
    title: 'Upload any policy in seconds.',
    description: 'Add a PDF, screenshot, or document. Stratum organizes it and surfaces the clauses worth your attention.',
    icon: FileUp,
    accent: 'blue',
    visual: <div className="onboarding-upload"><FileUp size={26} /><strong>Drop your policy here</strong><span>PDF, JPG, PNG or DOCX</span><i>Upload policy</i></div>,
  },
  {
    eyebrow: 'See the difference',
    title: 'Compare policies side by side.',
    description: 'Choose two or more companies to quickly understand how their privacy, data, and AI terms compare.',
    icon: FileSearch,
    accent: 'mint',
    visual: <div className="onboarding-compare"><article><span>G</span><div><strong>GitHub</strong><small>AI · Workspace</small></div><Check size={15} /></article><article><span>C</span><div><strong>ChatGPT</strong><small>AI · Data</small></div><Check size={15} /></article><button>Compare 2 policies <ArrowRight size={14} /></button></div>,
  },
  {
    eyebrow: 'Understand the fine print',
    title: 'Summarize selected text instantly.',
    description: 'Highlight dense policy language and let Stratum turn it into a clear summary with simple risk signals.',
    icon: ScanText,
    accent: 'violet',
    visual: <div className="onboarding-summary"><p>This service may share selected account data with advertising partners...</p><button><Sparkles size={14} /> Summarize with Stratum</button><article><strong><Sparkles size={14} /> Stratum Summary</strong><span>Data may be shared with advertising partners.</span><small>● Review recommended</small></article></div>,
  },
]

function IntroHeader({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <header className="intro-header"><Brand /><div><button className="header-login" onClick={() => onNavigate('login')}>Log in</button><button className="header-signup" onClick={() => onNavigate('signup')}>Sign up</button></div></header>
}

export function LanguagePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selected, setSelected] = useState(() => localStorage.getItem('stratum-language') || 'en')
  const continueToOnboarding = () => {
    localStorage.setItem('stratum-language', selected)
    onNavigate('onboarding')
  }

  return <main className="intro-shell language-page">
    <IntroHeader onNavigate={onNavigate} />
    <section className="language-card">
      <span className="intro-icon"><Languages size={25} /></span>
      <span className="section-label">Welcome to Stratum</span>
      <h1>Choose your language</h1>
      <p>Select the language you’d like to use. You can change this later in Settings.</p>
      <div className="language-grid" role="radiogroup" aria-label="Language">
        {languages.map((language) => <button key={language.code} role="radio" aria-checked={selected === language.code} className={selected === language.code ? 'language-option language-option--selected' : 'language-option'} onClick={() => setSelected(language.code)}><span>{language.flag}</span><div><strong>{language.native}</strong><small>{language.name}</small></div>{selected === language.code && <i><Check size={14} /></i>}</button>)}
      </div>
      <button className="primary-button language-continue" onClick={continueToOnboarding}>Continue <ArrowRight size={17} /></button>
      <small className="language-note"><Globe2 size={13} /> More languages will be added soon.</small>
    </section>
  </main>
}

export function OnboardingPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [step, setStep] = useState(0)
  const slide = slides[step]
  const Icon = slide.icon
  const finish = () => {
    localStorage.setItem('stratum-onboarding-complete', 'true')
    onNavigate('dashboard')
  }

  return <main className="intro-shell onboarding-page">
    <IntroHeader onNavigate={onNavigate} />
    <section className={`onboarding-card onboarding-card--${slide.accent}`}>
      <div className="onboarding-copy">
        <span className="onboarding-step-icon"><Icon size={23} /></span>
        <span className="section-label">{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
        <div className="onboarding-progress" aria-label={`Step ${step + 1} of ${slides.length}`}>{slides.map((_, index) => <button key={index} aria-label={`Go to step ${index + 1}`} className={index === step ? 'active' : ''} onClick={() => setStep(index)} />)}<span>{step + 1} of {slides.length}</span></div>
        <div className="onboarding-actions">
          {step === 0 ? <button className="secondary-button" onClick={() => onNavigate('language')}><ArrowLeft size={16} /> Language</button> : <button className="secondary-button" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button>}
          <button className="primary-button" onClick={() => step === slides.length - 1 ? finish() : setStep(step + 1)}>{step === slides.length - 1 ? 'Start using Stratum' : 'Next'} <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="onboarding-visual" key={step}>{slide.visual}</div>
    </section>
    <button className="onboarding-skip" onClick={finish}>Skip introduction</button>
  </main>
}
