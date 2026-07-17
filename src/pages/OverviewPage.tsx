import { ArrowRight, Bot, Clock3, FileCheck2, FileStack, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import { activity, policies } from '../data'
import { MetricCard } from '../components/MetricCard'
import { RiskBadge } from '../components/RiskBadge'
import type { Page } from '../types'

export function OverviewPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="page-content">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="pill"><Sparkles size={14} /> Intelligence brief · 17 July</span>
          <h2>Your compliance posture is <em>strong</em>.</h2>
          <p>Stratum reviewed 36 regulatory changes overnight. Three require your team’s attention this week.</p>
          <div className="button-row">
            <button className="primary-button" onClick={() => onNavigate('monitor')}>Review changes <ArrowRight size={16} /></button>
            <button className="secondary-button" onClick={() => onNavigate('assistant')}><Bot size={16} /> Ask Stratum</button>
          </div>
        </div>
        <div className="posture-ring" aria-label="Compliance score 92 percent">
          <div><strong>92</strong><span>/100</span><small>Compliance score</small></div>
        </div>
      </section>

      <section className="metric-grid metric-grid--four">
        <MetricCard label="Documents monitored" value="856" detail="24 added this month" icon={FileStack} />
        <MetricCard label="Risks resolved" value="48" detail="+12% from last month" icon={FileCheck2} tone="blue" />
        <MetricCard label="Hours saved" value="24.5" detail="Efficiency up 18%" icon={Clock3} tone="violet" />
        <MetricCard label="Open flags" value="12" detail="3 need your review" icon={ShieldAlert} tone="amber" />
      </section>

      <section className="content-grid content-grid--wide">
        <article className="panel">
          <div className="panel__header"><div><span className="section-label">Priority queue</span><h3>Policies needing attention</h3></div><button className="text-button" onClick={() => onNavigate('library')}>View library <ArrowRight size={15} /></button></div>
          <div className="policy-list">
            {policies.slice(0, 4).map((policy) => (
              <button className="policy-row" key={policy.id} onClick={() => onNavigate('library')}>
                <span className="document-icon"><FileStack size={18} /></span>
                <span className="policy-row__title"><strong>{policy.title}</strong><small>{policy.category} · {policy.jurisdiction}</small></span>
                <RiskBadge level={policy.risk} />
                <span className="policy-row__date">{policy.updated}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header"><div><span className="section-label">Live feed</span><h3>Recent activity</h3></div><TrendingUp size={19} /></div>
          <div className="activity-list">
            {activity.map((item) => <div className="activity-item" key={item.title}><span className={`activity-dot activity-dot--${item.tone}`} /><div><strong>{item.title}</strong><small>{item.meta}</small></div></div>)}
          </div>
        </article>
      </section>
    </div>
  )
}
