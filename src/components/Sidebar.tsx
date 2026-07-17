import {
  BellRing,
  Bot,
  ChevronRight,
  FileStack,
  Gauge,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { Brand } from './Brand'
import type { Page } from '../types'

const navItems: { id: Page; label: string; icon: typeof Gauge }[] = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'assistant', label: 'AI Assistant', icon: Bot },
  { id: 'library', label: 'Policy Library', icon: FileStack },
  { id: 'monitor', label: 'Risk Monitor', icon: BellRing },
]

export function Sidebar({ page, onNavigate, open, onToggle }: {
  page: Page
  onNavigate: (page: Page) => void
  open: boolean
  onToggle: () => void
}) {
  return (
    <>
      <button className="mobile-menu" onClick={onToggle} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && <button className="sidebar-scrim" onClick={onToggle} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand"><Brand /></div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${page === id ? 'nav-item--active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={19} strokeWidth={1.7} />
              <span>{label}</span>
              {id === 'monitor' && <span className="nav-badge">3</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar__bottom">
          <div className="upgrade-card">
            <span className="upgrade-card__icon"><Sparkles size={17} /></span>
            <strong>Enterprise Plus</strong>
            <p>Unlimited policy intelligence and advanced reports.</p>
            <button onClick={() => onNavigate('settings')}>Manage plan <ChevronRight size={14} /></button>
          </div>
          <button className={`nav-item ${page === 'settings' ? 'nav-item--active' : ''}`} onClick={() => onNavigate('settings')}>
            <Settings size={19} strokeWidth={1.7} /><span>Settings</span>
          </button>
          <div className="profile-card">
            <span className="avatar">AS</span>
            <button className="profile-card__copy" onClick={() => onNavigate('settings')}>
              <strong>Alex Sterling</strong><small>Admin</small>
            </button>
            <button className="icon-button icon-button--quiet" onClick={() => onNavigate('logout')} aria-label="Log out"><LogOut size={17} /></button>
          </div>
          <div className="sidebar__status"><ShieldCheck size={14} /><span>All systems operational</span></div>
        </div>
      </aside>
    </>
  )
}
