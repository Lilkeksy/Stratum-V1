import { Layers3 } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`}>
      <span className="brand__mark"><Layers3 size={compact ? 18 : 24} strokeWidth={1.8} /></span>
      {!compact && <span className="brand__copy"><strong>Stratum</strong><small>Compliance intelligence</small></span>}
    </div>
  )
}
