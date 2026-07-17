import type { LucideIcon } from 'lucide-react'

export function MetricCard({ label, value, detail, icon: Icon, tone = 'green' }: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: string
}) {
  return (
    <article className="metric-card">
      <div className={`metric-card__icon tone-${tone}`}><Icon size={20} /></div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}
