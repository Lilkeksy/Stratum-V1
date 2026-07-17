import { ChevronDown, LifeBuoy, Mail } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  ['How does Stratum summarize a policy?', 'Stratum identifies the most important obligations, data practices, and risk clauses, then rewrites them in clear language while preserving links to the source text.'],
  ['Does Stratum work outside the app?', 'Yes. The browser experience can summarize selected policy text on supported sites without requiring you to copy and paste it into Stratum.'],
  ['What do the colored flags mean?', 'Red flags indicate high-impact clauses, amber flags deserve review, and green flags show protective language or available controls.'],
  ['Can I compare two policies?', 'Yes. Open Policy Library, select at least two company cards, and choose Compare selected.'],
  ['How do I delete my account?', 'Contact support from this page. We will confirm ownership and guide you through exporting or deleting your workspace data.'],
]

export function HelpPage({ onToast }: { onToast: (message: string) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="page-content help-page">
      <section className="help-heading"><span className="help-icon"><LifeBuoy size={24} /></span><div><h2>Help & Support</h2><p>Find answers to common questions, or reach out if you need more help.</p></div></section>
      <section className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item ${open === index ? 'faq-item--open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? null : index)}><strong>{question}</strong><ChevronDown size={17} /></button>{open === index && <p>{answer}</p>}</article>)}</section>
      <section className="support-card"><span><Mail size={20} /></span><h3>Still need help?</h3><p>Reach out to our support team and we’ll get back to you shortly.</p><button className="primary-button" onClick={() => onToast('Support request started — check your email')}>Contact Support</button></section>
    </div>
  )
}
