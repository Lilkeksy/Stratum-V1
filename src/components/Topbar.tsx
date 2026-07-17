import { Bell, Search } from 'lucide-react'
import type { Page } from '../types'

const titles: Record<string, { title: string; eyebrow: string }> = {
  dashboard: { title: 'Dashboard', eyebrow: 'Your policy intelligence' },
  library: { title: 'Policy Library', eyebrow: 'Select policies to compare' },
  demo: { title: 'Stratum', eyebrow: 'See the browser experience' },
  help: { title: 'Help & Support', eyebrow: 'Answers when you need them' },
  settings: { title: 'Settings', eyebrow: 'Make Stratum yours' },
}

export function Topbar({ page, query, onQuery, onNavigate }: {
  page: string
  query: string
  onQuery: (value: string) => void
  onNavigate: (page: Page) => void
}) {
  const copy = titles[page] ?? titles.dashboard
  return (
    <header className="topbar">
      <div><span className="topbar__eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1></div>
      <div className="topbar__actions">
        <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search Stratum" /></label>
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><span /></button>
        <button className="header-login" onClick={() => onNavigate('login')}>Log in</button>
        <button className="header-signup" onClick={() => onNavigate('signup')}>Sign up</button>
      </div>
    </header>
  )
}
