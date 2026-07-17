import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Toast } from './components/Toast'
import { AssistantPage } from './pages/AssistantPage'
import { LoginPage, LogoutPage, SignupPage } from './pages/AuthPages'
import { DashboardPage } from './pages/DashboardPage'
import { LibraryPage } from './pages/LibraryPage'
import { MonitorPage } from './pages/MonitorPage'
import { OverviewPage } from './pages/OverviewPage'
import { SettingsPage } from './pages/SettingsPage'
import type { Page } from './types'

const pageFromHash = (): Page => {
  const value = window.location.hash.replace('#/', '') as Page
  const pages: Page[] = ['overview', 'dashboard', 'assistant', 'library', 'monitor', 'settings', 'login', 'signup', 'logout']
  return pages.includes(value) ? value : 'overview'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const sync = () => setPage(pageFromHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const navigate = (next: Page) => {
    window.location.hash = `/${next}`
    setPage(next)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'login') return <LoginPage onNavigate={navigate} />
  if (page === 'signup') return <SignupPage onNavigate={navigate} />
  if (page === 'logout') return <LogoutPage onNavigate={navigate} />

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={navigate} open={sidebarOpen} onToggle={() => setSidebarOpen((current) => !current)} />
      <main className="app-main">
        <Topbar page={page} query={query} onQuery={setQuery} />
        {page === 'overview' && <OverviewPage onNavigate={navigate} />}
        {page === 'dashboard' && <DashboardPage onToast={setToast} />}
        {page === 'assistant' && <AssistantPage onToast={setToast} />}
        {page === 'library' && <LibraryPage globalQuery={query} onToast={setToast} />}
        {page === 'monitor' && <MonitorPage globalQuery={query} onToast={setToast} />}
        {page === 'settings' && <SettingsPage onToast={setToast} />}
      </main>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}
