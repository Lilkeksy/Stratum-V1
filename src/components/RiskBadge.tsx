import type { RiskLevel } from '../types'

export function RiskBadge({ level }: { level: RiskLevel | string }) {
  return <span className={`risk-badge risk-badge--${level.toLowerCase()}`}><i />{level}</span>
}
