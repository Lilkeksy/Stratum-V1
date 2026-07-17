import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronDown, Clock3, Download, FileCheck2, ShieldCheck, TriangleAlert } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'

const bars = [44, 62, 53, 72, 66, 84, 76, 92, 82, 96, 88, 94]

export function DashboardPage({ onToast }: { onToast: (message: string) => void }) {
  return (
    <div className="page-content">
      <div className="page-actions"><button className="date-control"><CalendarDays size={16} /> Last 30 days <ChevronDown size={15} /></button><button className="secondary-button" onClick={() => onToast('Dashboard report downloaded')}><Download size={16} /> Export report</button></div>
      <section className="metric-grid metric-grid--four">
        <MetricCard label="Compliance score" value="92%" detail="4.8% improvement" icon={ShieldCheck} />
        <MetricCard label="Policies reviewed" value="124" detail="18 this week" icon={FileCheck2} tone="blue" />
        <MetricCard label="Avg. resolution" value="2.4d" detail="0.6 days faster" icon={Clock3} tone="violet" />
        <MetricCard label="Critical exposure" value="3" detail="Down from 7" icon={TriangleAlert} tone="amber" />
      </section>

      <section className="content-grid content-grid--chart">
        <article className="panel chart-panel">
          <div className="panel__header"><div><span className="section-label">Compliance performance</span><h3>Risk posture over time</h3></div><span className="trend trend--positive"><ArrowUpRight size={15} /> 8.2%</span></div>
          <div className="chart-scale"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
          <div className="bar-chart">
            {bars.map((height, index) => <div className="bar-column" key={index}><i style={{ height: `${height}%` }} /><span>{['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'][index]}</span></div>)}
          </div>
        </article>

        <article className="panel distribution-panel">
          <div className="panel__header"><div><span className="section-label">Risk distribution</span><h3>By severity</h3></div></div>
          <div className="donut"><div><strong>856</strong><span>Total items</span></div></div>
          <div className="legend"><p><i className="legend__dot legend__dot--green" /> Low risk <strong>68%</strong></p><p><i className="legend__dot legend__dot--amber" /> Medium risk <strong>23%</strong></p><p><i className="legend__dot legend__dot--red" /> High risk <strong>9%</strong></p></div>
        </article>
      </section>

      <section className="panel team-table">
        <div className="panel__header"><div><span className="section-label">Team performance</span><h3>Review activity</h3></div><button className="text-button">View all activity</button></div>
        <div className="table-head"><span>Team member</span><span>Documents</span><span>Resolved</span><span>Avg. response</span><span>Trend</span></div>
        {[
          ['Sarah Chen','SC','42','38','1.8 days','+12%','up'],
          ['David Okafor','DO','36','31','2.2 days','+7%','up'],
          ['Maya Rodriguez','MR','28','26','2.6 days','−3%','down'],
        ].map((row) => <div className="table-row" key={row[0]}><span className="person-cell"><i className="avatar">{row[1]}</i><strong>{row[0]}</strong></span><span>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span><span className={row[6] === 'up' ? 'positive' : 'negative'}>{row[6] === 'up' ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{row[5]}</span></div>)}
      </section>
    </div>
  )
}
