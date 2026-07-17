import { Bell, ChevronDown, Search } from 'lucide-react'

const titles: Record<string, { title: string; eyebrow: string }> = {
  overview: { title: 'Good morning, Alex', eyebrow: 'Command centre' },
  dashboard: { title: 'Intelligence dashboard', eyebrow: 'Performance overview' },
  assistant: { title: 'AI compliance assistant', eyebrow: 'Research workspace' },
  library: { title: 'Policy library', eyebrow: 'Knowledge base' },
  monitor: { title: 'Regulatory risk monitor', eyebrow: 'Live intelligence' },
  settings: { title: 'Account settings', eyebrow: 'Workspace administration' },
}

export function Topbar({ page, query, onQuery }: { page: string; query: string; onQuery: (value: string) => void }) {
  const copy = titles[page] ?? titles.overview
  return (
    <header className="topbar">
      <div>
        <span className="topbar__eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
      </div>
      <div className="topbar__actions">
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search Stratum" />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><span /></button>
        <button className="workspace-switcher"><span className="avatar avatar--small">AC</span><span>Acme Corp</span><ChevronDown size={15} /></button>
      </div>
    </header>
  )
}
