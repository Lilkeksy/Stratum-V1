import { Bell, Check, ChevronRight, Globe2, KeyRound, LockKeyhole, Mail, Moon, Palette, ShieldCheck, SlidersHorizontal, Sparkles, Sun, UserRound } from 'lucide-react'
import { useState } from 'react'
import type { Theme } from '../types'

export function SettingsPage({ theme, onThemeChange, onToast }: {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onToast: (message: string) => void
}) {
  const [notifications, setNotifications] = useState(true)
  const [autoSummary, setAutoSummary] = useState(true)
  const [name, setName] = useState('Alex')
  const [responseStyle, setResponseStyle] = useState(42)

  return (
    <div className="page-content settings-page">
      <section className="settings-profile panel"><div className="avatar avatar--large">AS</div><div><h2>Alex Sterling</h2><p>alex@acmecorp.com · Workspace administrator</p></div><button className="secondary-button" onClick={() => onToast('Profile changes saved')}>Edit profile</button></section>

      <section className="settings-grid settings-grid--preferences">
        <article className="panel setting-card theme-setting"><div className="setting-card__heading"><span><Palette size={19} /></span><div><h3>Appearance</h3><p>Choose how Stratum looks across every page.</p></div></div><div className="theme-options"><button className={theme === 'light' ? 'theme-option theme-option--active' : 'theme-option'} onClick={() => onThemeChange('light')}><span className="theme-preview theme-preview--light"><i /><b /></span><Sun size={16} /><strong>Light</strong>{theme === 'light' && <Check size={15} />}</button><button className={theme === 'dark' ? 'theme-option theme-option--active' : 'theme-option'} onClick={() => onThemeChange('dark')}><span className="theme-preview theme-preview--dark"><i /><b /></span><Moon size={16} /><strong>Dark</strong>{theme === 'dark' && <Check size={15} />}</button></div></article>

        <article className="panel setting-card"><div className="setting-card__heading"><span><UserRound size={19} /></span><div><h3>Personalization</h3><p>Tell Stratum how to tailor your experience.</p></div></div><label className="setting-field">What should Stratum call you?<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your preferred name" /></label><div className="preference-row preference-row--compact"><span><Sparkles size={18} /></span><div><strong>Automatic quick summaries</strong><small>Show a short takeaway when you open a policy</small></div><button className={`toggle ${autoSummary ? 'toggle--on' : ''}`} onClick={() => setAutoSummary(!autoSummary)} aria-label="Toggle automatic summaries"><i /></button></div></article>
      </section>

      <section className="panel response-style-card"><div className="setting-card__heading"><span><SlidersHorizontal size={19} /></span><div><h3>Response style</h3><p>Control how much detail Stratum includes in policy summaries.</p></div><strong>{responseStyle < 34 ? 'Concise' : responseStyle > 66 ? 'Detailed' : 'Balanced'}</strong></div><div className="response-slider"><div className="response-slider__labels"><span>Concise<small>Quick takeaways</small></span><span>Detailed<small>More context and explanation</small></span></div><input type="range" min="0" max="100" value={responseStyle} onChange={(event) => setResponseStyle(Number(event.target.value))} style={{ '--slider-value': `${responseStyle}%` } as React.CSSProperties} /></div></section>

      <section className="settings-grid">
        <article className="panel plan-card"><div className="plan-card__glow" /><div className="panel__header"><div className="plan-card__title"><span><Sparkles size={18} /></span><h3>Subscription plan</h3></div><span className="status status--current">Active</span></div><p className="section-label">Current tier</p><h2>Enterprise Plus</h2><small>Next billing date: 14 September 2026</small><ul><li><Check size={15} />Unlimited policy intelligence</li><li><Check size={15} />Policy comparison and exports</li><li><Check size={15} />Browser summary experience</li></ul><button className="primary-button" onClick={() => onToast('Opening plan management')}>Manage plan</button></article>
        <article className="panel workspace-card"><div className="panel__header"><div><span className="section-label">Organisation</span><h3>Workspace details</h3></div></div><label>Workspace name<input defaultValue="Acme Corporation" /></label><label>Primary region<button className="select-button"><Globe2 size={15} />Europe (London)<ChevronRight size={15} /></button></label><label>Billing email<input defaultValue="billing@acmecorp.com" /></label><button className="secondary-button" onClick={() => onToast(`Preferences saved for ${name || 'you'}`)}>Save changes</button></article>
      </section>

      <section className="panel preferences"><div className="panel__header"><div><span className="section-label">Account controls</span><h3>Security & notifications</h3></div></div>{[
        { icon: LockKeyhole, title: 'Password & authentication', detail: 'Last updated 42 days ago' },
        { icon: KeyRound, title: 'Single sign-on', detail: 'SAML SSO is connected' },
        { icon: Mail, title: 'Email preferences', detail: 'Weekly intelligence digest' },
      ].map(({ icon: Icon, title, detail }) => <button className="preference-row" key={title}><span><Icon size={18} /></span><div><strong>{title}</strong><small>{detail}</small></div><ChevronRight size={17} /></button>)}<div className="preference-row"><span><Bell size={18} /></span><div><strong>Real-time notifications</strong><small>Notify me about high-risk policy changes</small></div><button className={`toggle ${notifications ? 'toggle--on' : ''}`} onClick={() => setNotifications(!notifications)} aria-label="Toggle notifications"><i /></button></div></section>
      <footer className="app-footer"><span>© 2026 Stratum Intelligence</span><button>Privacy policy</button><button>Terms of service</button><span><ShieldCheck size={14} /> Enterprise security</span></footer>
    </div>
  )
}
