export type Page =
  | 'overview'
  | 'dashboard'
  | 'assistant'
  | 'library'
  | 'monitor'
  | 'settings'
  | 'login'
  | 'signup'
  | 'logout'

export type RiskLevel = 'Low' | 'Medium' | 'High'

export interface Policy {
  id: number
  title: string
  category: string
  jurisdiction: string
  updated: string
  risk: RiskLevel
  status: 'Current' | 'Review due' | 'Draft'
}
