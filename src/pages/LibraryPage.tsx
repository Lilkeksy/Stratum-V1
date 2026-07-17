import { Check, Search, Scale, X } from 'lucide-react'
import { useMemo, useState } from 'react'

type PolicyTag = 'All' | 'Social' | 'AI' | 'Workspace'

const companyPolicies = [
  { id: 'github', name: 'GitHub', tag: 'Workspace' as PolicyTag, version: 'v1', scanned: 'Jul 12, 2026', description: 'Code and repository data may be used to improve AI code-suggestion features unless disabled in settings.' },
  { id: 'claude', name: 'Claude', tag: 'AI' as PolicyTag, version: 'v1', scanned: 'Jun 28, 2026', description: 'Conversations may be reviewed to improve models unless the user opts out in privacy controls.' },
  { id: 'chatgpt', name: 'ChatGPT', tag: 'AI' as PolicyTag, version: 'v2', scanned: 'May 9, 2026', description: 'Adds enterprise data-retention controls and clarifies model-training opt-out choices.' },
  { id: 'discord', name: 'Discord', tag: 'Social' as PolicyTag, version: 'v1', scanned: 'Apr 30, 2026', description: 'New arbitration clause and updated US-based account data handling terms.' },
  { id: 'notion', name: 'Notion', tag: 'Workspace' as PolicyTag, version: 'v2', scanned: 'Feb 3, 2026', description: 'Clarifies AI feature data handling and adds workspace-level admin export controls.' },
  { id: 'facebook', name: 'Facebook', tag: 'Social' as PolicyTag, version: 'v1', scanned: 'Jan 19, 2026', description: 'Auto-renewal language and subscription-based ad preference terms were updated.' },
]

export function LibraryPage({ globalQuery, onToast }: { globalQuery: string; onToast: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<PolicyTag>('All')
  const [selected, setSelected] = useState<string[]>([])
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const value = query || globalQuery
  const visible = useMemo(() => companyPolicies.filter((policy) => `${policy.name} ${policy.description}`.toLowerCase().includes(value.toLowerCase()) && (tag === 'All' || policy.tag === tag)), [value, tag])

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const selectedPolicies = companyPolicies.filter((policy) => selected.includes(policy.id))

  return (
    <div className="page-content company-library">
      <section className="library-intro"><div><h2>Policy Library</h2><p>Search companies and select two or more policies to compare what they collect, share, and retain.</p></div></section>
      <section className="library-tools">
        <div className="inline-search company-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search companies…" /></div>
        <div className="policy-tags" aria-label="Filter policy types">{(['All','Social','AI','Workspace'] as PolicyTag[]).map((item) => <button key={item} className={tag === item ? 'policy-tag policy-tag--active' : 'policy-tag'} onClick={() => setTag(item)}>{item}</button>)}</div>
      </section>
      <div className="selection-hint" aria-live="polite">
        {!selected.length && 'Click on a policy to select.'}
        {selected.length === 1 && <><span className="selection-count">1 selected</span> Select at least one more policy to compare.</>}
        {selected.length > 1 && <><span className="selection-count">{selected.length} selected</span> Ready to compare selected policies.</>}
      </div>
      <section className="company-card-grid">
        {visible.map((policy) => {
          const active = selected.includes(policy.id)
          return <button key={policy.id} className={`company-policy-card ${active ? 'company-policy-card--selected' : ''}`} onClick={() => toggle(policy.id)} aria-pressed={active}><span className="company-policy-card__top"><strong>{policy.name}</strong><i>{policy.version}</i></span><small>Scanned {policy.scanned} · {policy.tag}</small><p>{policy.description}</p><span className="company-policy-card__select">{active ? <><Check size={14} /> Selected</> : 'Select policy'}</span></button>
        })}
      </section>
      {!visible.length && <div className="empty-state"><Search size={28} /><h3>No company policies found</h3><p>Try another search or category.</p></div>}
      {selected.length > 0 && <div className="selection-bar"><div><strong>{selected.length} {selected.length === 1 ? 'policy' : 'policies'} selected</strong><span>{selected.length < 2 ? 'Choose one more to unlock comparison' : 'Compare data use and risk signals side by side'}</span></div><button className="text-button" onClick={() => setSelected([])}>Clear</button><button className="primary-button" disabled={selected.length < 2} onClick={() => setComparisonOpen(true)}><Scale size={16} /> Compare selected</button></div>}

      {comparisonOpen && <div className="modal-backdrop"><section className="modal comparison-modal"><div className="modal__header"><div><span className="section-label">Demo comparison</span><h2>Policy Comparison</h2><p>A dummy comparison generated from your selected policies.</p></div><button onClick={() => setComparisonOpen(false)}><X size={18} /></button></div><div className="comparison-grid">{selectedPolicies.map((policy, index) => <article key={policy.id} className={index === 0 ? 'comparison-card comparison-card--baseline' : 'comparison-card'}><span>{index === 0 ? 'Baseline' : 'Selected'}</span><h3>{policy.name}</h3><p>{policy.description}</p><h4>Key signals</h4><ul><li className="signal signal--red">AI training language detected</li><li className="signal signal--amber">Data shared with service partners</li><li className="signal signal--green">Account controls available</li></ul></article>)}</div><div className="modal__actions"><button className="secondary-button" onClick={() => setComparisonOpen(false)}>Close</button><button className="primary-button" onClick={() => { setComparisonOpen(false); onToast('Comparison saved to your dashboard') }}>Save comparison</button></div></section></div>}
    </div>
  )
}
