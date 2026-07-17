import type { Policy } from './types'

export const policies: Policy[] = [
  { id: 1, title: 'Data Protection & Privacy Policy', category: 'Data privacy', jurisdiction: 'Global', updated: '12 Jul 2026', risk: 'High', status: 'Review due' },
  { id: 2, title: 'Anti-Money Laundering Framework', category: 'Financial crime', jurisdiction: 'UK & EU', updated: '08 Jul 2026', risk: 'Medium', status: 'Current' },
  { id: 3, title: 'Information Security Standard', category: 'Cybersecurity', jurisdiction: 'Global', updated: '30 Jun 2026', risk: 'Low', status: 'Current' },
  { id: 4, title: 'Third-Party Risk Management', category: 'Vendor risk', jurisdiction: 'United States', updated: '24 Jun 2026', risk: 'Medium', status: 'Draft' },
  { id: 5, title: 'Employee Conduct & Ethics', category: 'Governance', jurisdiction: 'Global', updated: '18 Jun 2026', risk: 'Low', status: 'Current' },
  { id: 6, title: 'AI Governance & Responsible Use', category: 'Technology', jurisdiction: 'EU', updated: '11 Jun 2026', risk: 'High', status: 'Review due' },
]

export const activity = [
  { title: 'EU AI Act update detected', meta: 'AI Governance · 18 minutes ago', tone: 'violet' },
  { title: 'Privacy policy review completed', meta: 'Data Protection · 2 hours ago', tone: 'green' },
  { title: '3 documents require attention', meta: 'Policy Library · Yesterday', tone: 'amber' },
  { title: 'Risk report exported by Sarah', meta: 'Analytics · 14 Jul 2026', tone: 'blue' },
]

export const alerts = [
  { title: 'EU AI Act enforcement timeline', source: 'European Commission', region: 'European Union', severity: 'High', date: '16 Jul 2026' },
  { title: 'Updated AML reporting threshold', source: 'Financial Conduct Authority', region: 'United Kingdom', severity: 'Medium', date: '14 Jul 2026' },
  { title: 'Cross-border data transfer guidance', source: 'ICO', region: 'United Kingdom', severity: 'Medium', date: '11 Jul 2026' },
  { title: 'Cyber incident disclosure rules', source: 'SEC', region: 'United States', severity: 'Low', date: '08 Jul 2026' },
]
