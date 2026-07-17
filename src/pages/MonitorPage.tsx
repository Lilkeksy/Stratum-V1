import { BellRing, ChevronRight, ExternalLink, Filter, MapPin, RefreshCw, Search, ShieldAlert } from 'lucide-react'
import { alerts } from '../data'
import { RiskBadge } from '../components/RiskBadge'

export function MonitorPage({ globalQuery, onToast }: { globalQuery: string; onToast: (message: string) => void }) {
  const visible = alerts.filter((alert) => `${alert.title} ${alert.source} ${alert.region}`.toLowerCase().includes(globalQuery.toLowerCase()))
  return (
    <div className="page-content monitor-page">
      <section className="monitor-hero"><div><span className="pill"><BellRing size={14} /> Live monitoring</span><h2>Stay ahead of regulatory change.</h2><p>Stratum continuously monitors your jurisdictions and connects every update to the policies it may affect.</p></div><div className="monitor-hero__signal"><i /><span>24 sources online</span><strong>Last scan: 4 min ago</strong></div></section>
      <section className="monitor-grid">
        <div className="panel alert-feed"><div className="panel__header"><div><span className="section-label">Intelligence feed</span><h3>Recent regulatory alerts</h3></div><div><button className="icon-button"><Filter size={17} /></button><button className="icon-button" onClick={() => onToast('Intelligence feed refreshed')}><RefreshCw size={17} /></button></div></div>{visible.map((alert) => <button className="alert-row" key={alert.title} onClick={() => onToast(`Opened: ${alert.title}`)}><span className={`alert-row__icon alert-row__icon--${alert.severity.toLowerCase()}`}><ShieldAlert size={19} /></span><span><strong>{alert.title}</strong><small>{alert.source} · {alert.region}</small></span><RiskBadge level={alert.severity} /><time>{alert.date}</time><ChevronRight size={17} /></button>)}</div>
        <aside className="panel watchlist"><div className="panel__header"><div><span className="section-label">Coverage</span><h3>Your watchlist</h3></div></div>{['European Union','United Kingdom','United States','Nigeria','Singapore'].map((region, index) => <div className="watchlist__row" key={region}><span><MapPin size={15} />{region}</span><strong>{[8,6,4,3,2][index]} updates</strong></div>)}<button className="secondary-button"><Search size={15} /> Manage watchlist</button></aside>
      </section>
      <section className="panel impact-panel"><div className="panel__header"><div><span className="section-label">Impact mapping</span><h3>Policies affected this week</h3></div><button className="text-button">Open analysis <ExternalLink size={14} /></button></div><div className="impact-grid"><div><strong>17</strong><span>Policies mapped</span></div><div><strong>6</strong><span>Controls affected</span></div><div><strong>3</strong><span>Owner actions due</span></div><div><strong>89%</strong><span>Coverage confidence</span></div></div></section>
    </div>
  )
}
