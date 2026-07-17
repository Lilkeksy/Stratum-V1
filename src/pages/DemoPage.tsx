import { CheckCircle2, LoaderCircle, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type DemoState = 'idle' | 'selected' | 'loading' | 'complete'

export function DemoPage() {
  const [state, setState] = useState<DemoState>('idle')
  useEffect(() => {
    if (state !== 'loading') return
    const timer = window.setTimeout(() => setState('complete'), 1400)
    return () => window.clearTimeout(timer)
  }, [state])

  const reset = () => setState('idle')
  return (
    <div className="page-content demo-page">
      <section className="demo-stage panel">
        <div className="demo-stage__header"><div><span className="section-label">Interactive browser demo</span><h2>Summarize any policy text without leaving the page</h2><p>Simulate selecting text, then ask Stratum for a plain-language summary.</p></div><button className="secondary-button" onClick={() => setState('selected')}>Simulate text selection</button></div>
        <article className="sample-policy">
          <div className="sample-browser-bar"><i /><i /><i /><span>example.com/privacy-policy</span></div>
          <div className="sample-policy__body"><small>Section 8 · Data use</small><h3>How your information may be used</h3><p className={state !== 'idle' ? 'simulated-selection' : ''}>This app can share your data with advertising partners, and you are giving up your right to use it in court. Information collected through the service may also be used to improve automated systems unless you opt out through account settings.</p></div>
          {state !== 'idle' && <button className="summarize-selection" onClick={() => setState('loading')} disabled={state === 'loading'}><Sparkles size={15} /> Summarize with Stratum</button>}
          {(state === 'loading' || state === 'complete') && <section className="summary-popover"><div className="summary-popover__title"><span><Sparkles size={15} /></span><strong>Stratum Summary</strong><button onClick={reset} aria-label="Close summary"><X size={15} /></button></div>{state === 'loading' ? <div className="summary-loading"><LoaderCircle size={18} /><span>Summarizing…</span><i /></div> : <div className="summary-result"><blockquote>This app can share your data with advertisers, and you’re giving up your right to use it in court.</blockquote><ul><li className="signal signal--red">Auto-renewal clause detected</li><li className="signal signal--amber">Shares data with advertising partners</li><li className="signal signal--green"><CheckCircle2 size={13} /> No arbitration opt-out found</li></ul></div>}</section>}
        </article>
      </section>
      <section className="demo-steps"><article><span>1</span><div><strong>Select</strong><p>Highlight text on any policy page.</p></div></article><article><span>2</span><div><strong>Summarize</strong><p>Choose “Summarize with Stratum”.</p></div></article><article><span>3</span><div><strong>Understand</strong><p>Get plain language and risk signals.</p></div></article></section>
    </div>
  )
}
