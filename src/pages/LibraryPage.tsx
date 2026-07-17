import { ChevronDown, Download, FilePlus2, FileStack, Filter, Grid2X2, List, MoreHorizontal, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { policies } from '../data'
import { RiskBadge } from '../components/RiskBadge'

export function LibraryPage({ globalQuery, onToast }: { globalQuery: string; onToast: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All policies')
  const [grid, setGrid] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const value = query || globalQuery
  const visible = useMemo(() => policies.filter((policy) => `${policy.title} ${policy.category} ${policy.jurisdiction}`.toLowerCase().includes(value.toLowerCase()) && (filter === 'All policies' || policy.status === filter)), [value, filter])

  return (
    <div className="page-content library-page">
      <div className="page-actions page-actions--space"><div className="inline-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search policies, owners, or jurisdictions" /></div><button className="secondary-button"><Filter size={16} /> Filters</button><button className="primary-button" onClick={() => setUploadOpen(true)}><FilePlus2 size={16} /> Add policy</button></div>
      <section className="library-toolbar"><div className="filter-tabs">{['All policies','Current','Review due','Draft'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}<span>{item === 'All policies' ? policies.length : policies.filter((p) => p.status === item).length}</span></button>)}</div><div className="view-toggles"><button className={!grid ? 'active' : ''} onClick={() => setGrid(false)} aria-label="List view"><List size={17} /></button><button className={grid ? 'active' : ''} onClick={() => setGrid(true)} aria-label="Grid view"><Grid2X2 size={17} /></button></div></section>

      <section className={grid ? 'policy-grid' : 'panel library-table'}>
        {!grid && <div className="library-table__head"><span>Policy</span><span>Category</span><span>Jurisdiction</span><span>Risk</span><span>Status</span><span>Updated</span><span /></div>}
        {visible.map((policy) => grid ? (
          <article className="policy-card" key={policy.id}><div><span className="document-icon"><FileStack size={19} /></span><button><MoreHorizontal size={18} /></button></div><h3>{policy.title}</h3><p>{policy.category} · {policy.jurisdiction}</p><div><RiskBadge level={policy.risk} /><span className={`status status--${policy.status.toLowerCase().replace(' ','-')}`}>{policy.status}</span></div><small>Updated {policy.updated}</small></article>
        ) : (
          <div className="library-table__row" key={policy.id}><span className="policy-name"><i className="document-icon"><FileStack size={18} /></i><strong>{policy.title}</strong></span><span>{policy.category}</span><span>{policy.jurisdiction}</span><RiskBadge level={policy.risk} /><span className={`status status--${policy.status.toLowerCase().replace(' ','-')}`}>{policy.status}</span><span>{policy.updated}</span><button aria-label="More options"><MoreHorizontal size={18} /></button></div>
        ))}
        {!visible.length && <div className="empty-state"><Search size={28} /><h3>No policies found</h3><p>Try a different search or filter.</p></div>}
      </section>

      {uploadOpen && <div className="modal-backdrop"><div className="modal"><div className="modal__header"><div><span className="section-label">Knowledge base</span><h2>Add a new policy</h2></div><button onClick={() => setUploadOpen(false)}><X size={18} /></button></div><label>Policy name<input placeholder="e.g. Data Retention Policy" /></label><div className="form-grid"><label>Category<button className="select-button">Select category <ChevronDown size={15} /></button></label><label>Jurisdiction<button className="select-button">Select region <ChevronDown size={15} /></button></label></div><button className="upload-zone"><Download size={24} /><strong>Drop a document here</strong><span>PDF, DOCX or TXT · up to 25MB</span></button><div className="modal__actions"><button className="secondary-button" onClick={() => setUploadOpen(false)}>Cancel</button><button className="primary-button" onClick={() => { setUploadOpen(false); onToast('Policy added to processing queue') }}>Add policy</button></div></div></div>}
    </div>
  )
}
