import { ArrowUp, Bot, Copy, FileText, Paperclip, RefreshCw, Sparkles, ThumbsDown, ThumbsUp, UserRound } from 'lucide-react'
import { useState } from 'react'

interface Message { role: 'user' | 'assistant'; body: string }

const suggestions = [
  'Summarize our exposure under the EU AI Act',
  'Compare our privacy policy with GDPR requirements',
  'What changed in our monitored regulations this week?',
]

export function AssistantPage({ onToast }: { onToast: (message: string) => void }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', body: 'Hello Alex. I’m connected to your Stratum policy library and regulatory intelligence. What would you like to investigate today?' },
  ])
  const [thinking, setThinking] = useState(false)

  const send = (text = input) => {
    const value = text.trim()
    if (!value) return
    setMessages((current) => [...current, { role: 'user', body: value }])
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'assistant', body: 'Based on your current policy library, the most material gap is documentation of human oversight for high-risk AI systems. I found 4 relevant policies and 12 regulatory references. I recommend updating the AI Governance policy first, then assigning evidence owners for model monitoring and incident response.' }])
      setThinking(false)
    }, 700)
  }

  return (
    <div className="assistant-layout">
      <section className="assistant-main">
        <div className="assistant-intro"><span className="assistant-orb"><Sparkles size={27} /></span><div><h2>How can I help?</h2><p>Ask questions across your policies, controls, and monitored regulations.</p></div></div>
        <div className="chat-thread">
          {messages.map((message, index) => (
            <div className={`message message--${message.role}`} key={index}>
              <span className="message__avatar">{message.role === 'assistant' ? <Bot size={18} /> : <UserRound size={18} />}</span>
              <div className="message__body"><span>{message.role === 'assistant' ? 'Stratum AI' : 'You'}</span><p>{message.body}</p>{message.role === 'assistant' && index > 0 && <div className="message__sources"><button onClick={() => onToast('Source opened: AI Governance Policy')}><FileText size={14} /> AI Governance Policy</button><button onClick={() => onToast('Source opened: EU AI Act')}><FileText size={14} /> EU AI Act</button><div><button aria-label="Copy response" onClick={() => onToast('Response copied')}><Copy size={14} /></button><button aria-label="Helpful"><ThumbsUp size={14} /></button><button aria-label="Not helpful"><ThumbsDown size={14} /></button></div></div>}</div>
            </div>
          ))}
          {thinking && <div className="message message--assistant"><span className="message__avatar"><Bot size={18} /></span><div className="typing"><i /><i /><i /></div></div>}
        </div>
        {messages.length === 1 && <div className="prompt-suggestions">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)}><Sparkles size={15} /><span>{suggestion}</span></button>)}</div>}
        <div className="composer"><button aria-label="Attach document" onClick={() => onToast('Document attachment ready')}><Paperclip size={19} /></button><textarea rows={1} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send() } }} placeholder="Ask Stratum about your compliance landscape…" /><button className="composer__send" onClick={() => send()} aria-label="Send"><ArrowUp size={18} /></button><small>Stratum can make mistakes. Verify critical information.</small></div>
      </section>
      <aside className="assistant-context">
        <div className="assistant-context__header"><span className="section-label">Conversation context</span><button onClick={() => setMessages(messages.slice(0,1))}><RefreshCw size={15} /> Reset</button></div>
        <div className="context-stat"><strong>856</strong><span>Documents available</span></div><div className="context-stat"><strong>24</strong><span>Regulatory sources</span></div><div className="context-stat"><strong>7</strong><span>Jurisdictions covered</span></div>
        <div className="context-sources"><h4>Active sources</h4>{['Policy library','Risk monitor','Regulatory updates'].map((source) => <label key={source}><input type="checkbox" defaultChecked /><span>{source}</span></label>)}</div>
      </aside>
    </div>
  )
}
