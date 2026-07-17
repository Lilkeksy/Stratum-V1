import { Bell, Check, ChevronRight, CreditCard, Globe2, KeyRound, LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'

export function SettingsPage({ onToast }: { onToast: (message: string) => void }) {
  const [notifications, setNotifications] = useState(true)
  return (
    <div className="page-content settings-page">
      <section className="settings-profile panel"><div className="avatar avatar--large">AS</div><div><h2>Alex Sterling</h2><p>alex@acmecorp.com · Workspace administrator</p></div><button className="secondary-button" onClick={() => onToast('Profile changes saved')}>Edit profile</button></section>
      <section className="metric-grid metric-grid--four settings-metrics">
        <article className="metric-card"><p>Documents analysed</p><strong>856</strong><small>High accuracy</small></article><article className="metric-card"><p>Hours saved</p><strong>24.5</strong><small>Efficiency +18%</small></article><article className="metric-card"><p>Risk flags</p><strong>12</strong><small>3 pending review</small></article><article className="metric-card"><p>Team members</p><strong>8</strong><small>2 seats available</small></article>
      </section>
      <section className="settings-grid">
        <article className="panel plan-card"><div className="plan-card__glow" /><div className="panel__header"><div className="plan-card__title"><span><Sparkles size={18} /></span><h3>Subscription plan</h3></div><span className="status status--current">Active</span></div><p className="section-label">Current tier</p><h2>Enterprise Plus</h2><small>Next billing date: 14 September 2026</small><ul><li><Check size={15} />Unlimited policy intelligence</li><li><Check size={15} />Advanced analytics and exports</li><li><Check size={15} />Priority support and SSO</li></ul><button className="primary-button" onClick={() => onToast('Opening plan management')}>Manage plan</button></article>
        <article className="panel workspace-card"><div className="panel__header"><div><span className="section-label">Organisation</span><h3>Workspace details</h3></div></div><label>Workspace name<input defaultValue="Acme Corporation" /></label><label>Primary region<button className="select-button"><Globe2 size={15} />Europe (London)<ChevronRight size={15} /></button></label><label>Billing email<input defaultValue="billing@acmecorp.com" /></label><button className="secondary-button" onClick={() => onToast('Workspace details updated')}>Save changes</button></article>
      </section>
      <section className="panel preferences"><div className="panel__header"><div><span className="section-label">Account controls</span><h3>Security & preferences</h3></div></div>{[
        { icon: LockKeyhole, title: 'Password & authentication', detail: 'Last updated 42 days ago' },
        { icon: KeyRound, title: 'Single sign-on', detail: 'SAML SSO is connected' },
        { icon: Mail, title: 'Email preferences', detail: 'Weekly intelligence digest' },
      ].map(({ icon: Icon, title, detail }) => <button className="preference-row" key={title}><span><Icon size={18} /></span><div><strong>{title}</strong><small>{detail}</small></div><ChevronRight size={17} /></button>)}<div className="preference-row"><span><Bell size={18} /></span><div><strong>Real-time notifications</strong><small>Notify me about high-risk regulatory changes</small></div><button className={`toggle ${notifications ? 'toggle--on' : ''}`} onClick={() => setNotifications(!notifications)} aria-label="Toggle notifications"><i /></button></div></section>
      <footer className="app-footer"><span>© 2026 Stratum Intelligence</span><button>Privacy policy</button><button>Terms of service</button><span><ShieldCheck size={14} /> Enterprise security</span></footer>
    </div>
  )
}
