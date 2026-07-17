import { FileStack, Gauge, HelpCircle, LayoutDashboard, Menu, Settings, TestTube2, Upload, X } from 'lucide-react'
import { Brand } from './Brand'
import type { Page } from '../types'

const navItems: { id: Page; label: string; icon: typeof Gauge }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'library', label: 'Policy Library', icon: FileStack },
  { id: 'demo', label: 'Demo', icon: TestTube2 },
]

export function Sidebar({ page, onNavigate, onUpload, open, onToggle }: {
  page: Page
  onNavigate: (page: Page) => void
  onUpload: () => void
  open: boolean
  onToggle: () => void
}) {
  return (
    <>
      <button className="mobile-menu" onClick={onToggle} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && <button className="sidebar-scrim" onClick={onToggle} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand"><Brand /></div>
        <nav className="sidebar__nav" aria-label="Primary navigation">
          {navItems.slice(0, 2).map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? 'nav-item--active' : ''}`} onClick={() => onNavigate(id)}><Icon size={19} strokeWidth={1.7} /><span>{label}</span></button>
          ))}
          <button className="nav-item" onClick={onUpload}><Upload size={19} strokeWidth={1.7} /><span>Upload</span></button>
          {navItems.slice(2).map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? 'nav-item--active' : ''}`} onClick={() => onNavigate(id)}><Icon size={19} strokeWidth={1.7} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="sidebar__bottom">
          <button className={`nav-item ${page === 'help' ? 'nav-item--active' : ''}`} onClick={() => onNavigate('help')}><HelpCircle size={19} strokeWidth={1.7} /><span>Help</span></button>
          <button className={`nav-item ${page === 'settings' ? 'nav-item--active' : ''}`} onClick={() => onNavigate('settings')}><Settings size={19} strokeWidth={1.7} /><span>Settings</span></button>
        </div>
      </aside>
    </>
  )
}
