import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Toast } from './components/Toast'
import { UploadModal } from './components/UploadModal'
import { LoginPage, LogoutPage, SignupPage } from './pages/AuthPages'
import { DashboardPage } from './pages/DashboardPage'
import { DemoPage } from './pages/DemoPage'
import { HelpPage } from './pages/HelpPage'
import { LibraryPage } from './pages/LibraryPage'
import { LanguagePage, OnboardingPage } from './pages/OnboardingPages'
import { SettingsPage } from './pages/SettingsPage'
import type { Page, Theme } from './types'

const pageFromHash = (): Page => {
  const value = window.location.hash.replace('#/', '') as Page
  const pages: Page[] = ['dashboard', 'library', 'demo', 'help', 'settings', 'login', 'signup', 'logout', 'language', 'onboarding']
  if (value === 'language' || value === 'onboarding' || value === 'login' || value === 'signup' || value === 'logout') return value
  if (localStorage.getItem('stratum-onboarding-complete') !== 'true') return 'language'
  return pages.includes(value) ? value : 'dashboard'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('stratum-theme') as Theme) || 'light')

  useEffect(() => {
    const sync = () => setPage(pageFromHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('stratum-theme', theme)
  }, [theme])

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
  if (page === 'language') return <LanguagePage onNavigate={navigate} />
  if (page === 'onboarding') return <OnboardingPage onNavigate={navigate} />

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={navigate} onUpload={() => setUploadOpen(true)} open={sidebarOpen} onToggle={() => setSidebarOpen((current) => !current)} />
      <main className="app-main">
        <Topbar page={page} query={query} onQuery={setQuery} onNavigate={navigate} />
        {page === 'dashboard' && <DashboardPage onNavigate={navigate} onUpload={() => setUploadOpen(true)} />}
        {page === 'library' && <LibraryPage globalQuery={query} onToast={setToast} />}
        {page === 'demo' && <DemoPage />}
        {page === 'help' && <HelpPage onToast={setToast} />}
        {page === 'settings' && <SettingsPage theme={theme} onThemeChange={setTheme} onToast={setToast} />}
      </main>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUploaded={(name) => setToast(`${name} added to your policy library`)} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}
