import { ArrowRight, BadgeCheck, BookOpen, CalendarDays, FileText, FileUp, Layers3, ScanLine, Sparkles } from 'lucide-react'
import type { Page } from '../types'

const recentPolicies = [
  { name: 'GitHub', date: 'Scanned Jul 12, 2026', summary: 'AI code-suggestion data use and repository controls.' },
  { name: 'ChatGPT', date: 'Scanned May 9, 2026', summary: 'Enterprise retention and model-training preferences.' },
  { name: 'Notion', date: 'Scanned Feb 3, 2026', summary: 'Workspace data handling and administrator controls.' },
]

export function DashboardPage({ onNavigate, onUpload }: {
  onNavigate: (page: Page) => void
  onUpload: () => void
}) {
  return (
    <div className="page-content simple-dashboard">
      <section className="account-overview-card panel">
        <div className="account-identity"><span className="avatar account-avatar">JD</span><div><h2>John Doe</h2><p>john.doe@example.com</p></div></div>
        <div className="account-facts">
          <div><span><FileText size={17} /></span><strong>22</strong><small>Documents</small></div>
          <div><span><ScanLine size={17} /></span><strong>47</strong><small>Policies scanned</small></div>
          <div><span><CalendarDays size={17} /></span><strong>Jan 14, 2026</strong><small>Joined</small></div>
          <div><span><BadgeCheck size={17} /></span><strong>Free Plan</strong><small>Current plan</small></div>
        </div>
      </section>

      <section className="dashboard-welcome">
        <div><span className="pill"><Sparkles size={14} /> Policy intelligence made clear</span><h2>Understand policies without the legalese.</h2><p>Upload a policy, compare companies, or use Stratum directly on selected text to see what really matters.</p><div className="button-row"><button className="primary-button" onClick={onUpload}><FileUp size={16} /> Upload a policy</button><button className="secondary-button" onClick={() => onNavigate('library')}><BookOpen size={16} /> Browse library</button></div></div>
        <span className="dashboard-welcome__mark"><Layers3 size={48} /></span>
      </section>

      <section className="dashboard-section"><div className="dashboard-section__heading"><div><span className="section-label">Recent policies</span><h3>Continue where you left off</h3></div><button className="text-button" onClick={() => onNavigate('library')}>View policy library <ArrowRight size={15} /></button></div><div className="recent-policy-grid">{recentPolicies.map((policy) => <button key={policy.name} onClick={() => onNavigate('library')}><span>{policy.name.slice(0, 1)}</span><div><strong>{policy.name}</strong><small>{policy.date}</small><p>{policy.summary}</p></div><ArrowRight size={16} /></button>)}</div></section>

      <section className="dashboard-section"><div className="dashboard-section__heading"><div><span className="section-label">Quick start</span><h3>Three ways to use Stratum</h3></div></div><div className="quick-start-grid"><button onClick={onUpload}><span>1</span><strong>Upload</strong><p>Add a screenshot, PDF, or policy document.</p></button><button onClick={() => onNavigate('library')}><span>2</span><strong>Compare</strong><p>Select two companies and compare policy signals.</p></button><button onClick={() => onNavigate('demo')}><span>3</span><strong>Summarize</strong><p>See how Stratum explains selected policy text.</p></button></div></section>
    </div>
  )
}


