import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, BookOpen, Check, ChevronRight, CircleHelp, FileText, FlaskConical, LoaderCircle, Search, Sparkles } from 'lucide-react'
import './styles.css'

const SAMPLE_CLAIM = 'Artificial intelligence improves software development productivity.'

const mockResult = {
  verdict: 'Partially Supported',
  confidence: 78,
  critique: 'The claim points to a measurable trend, but its effect depends on the development task, team experience, and how productivity is measured. Current evidence supports gains in some workflows rather than a universal improvement.',
  reason: 'Studies report faster completion for selected coding and documentation tasks, while effects vary across task complexity and quality controls. The evidence is promising, but not yet consistent enough to support an unqualified claim.',
  evidence: [
    {
      quote: 'Participants using an AI coding assistant completed the programming task 55.8% faster than the control group, with meaningful variation across experience levels.',
      title: 'The Impact of AI on Developer Productivity',
      authors: 'Peng et al.',
      year: '2023',
      source: 'arXiv preprint'
    },
    {
      quote: 'Generative AI tools can improve performance on specific software engineering activities, but their impact is moderated by task type and review practices.',
      title: 'Generative AI and the Nature of Work',
      authors: 'Noy & Zhang',
      year: '2023',
      source: 'Science'
    }
  ]
}

function SectionCard({ number, eyebrow, title, children, className = '' }) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

function EvidenceCard({ item, index }) {
  return (
    <article className="evidence-item">
      <div className="evidence-index">0{index + 1}</div>
      <div className="evidence-content">
        <p className="evidence-quote">“{item.quote}”</p>
        <div className="paper-meta">
          <FileText size={16} strokeWidth={1.8} />
          <div>
            <strong>{item.title}</strong>
            <span>{item.authors} · {item.year} · {item.source}</span>
          </div>
        </div>
      </div>
      <button className="icon-button" aria-label={`View ${item.title}`} title="View paper">
        <ArrowUpRight size={17} />
      </button>
    </article>
  )
}

function App() {
  const [claim, setClaim] = useState('')
  const [result, setResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function analyzeClaim(event) {
    event.preventDefault()
    if (!claim.trim() || isAnalyzing) return
    setIsAnalyzing(true)
    setResult(null)
    window.setTimeout(() => {
      setResult({ ...mockResult, claim: claim.trim() })
      setIsAnalyzing(false)
    }, 900)
  }

  function useExample() {
    setClaim(SAMPLE_CLAIM)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ClaimLens home">
          <span className="brand-mark"><FlaskConical size={19} /></span>
          <span>Claim<span className="brand-accent">Lens</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> Research workspace <CircleHelp size={15} /></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="kicker"><Sparkles size={14} /> Evidence-informed analysis</div>
            <h1>Interrogate a claim.<br /><em>Understand the evidence.</em></h1>
            <p className="hero-description">A focused workspace for examining scientific claims, weighing research evidence, and calibrating confidence.</p>
          </div>
          <div className="hero-rule"><span>01</span><div /></div>
        </section>

        <form className="claim-form" onSubmit={analyzeClaim}>
          <div className="form-header">
            <label htmlFor="claim-input"><span className="label-marker">01</span> Enter a scientific claim</label>
            <button type="button" className="example-button" onClick={useExample}>Use an example <ChevronRight size={14} /></button>
          </div>
          <textarea
            id="claim-input"
            value={claim}
            onChange={(event) => setClaim(event.target.value)}
            placeholder="e.g. Artificial intelligence improves software development productivity."
            rows="4"
          />
          <div className="form-footer">
            <span className="input-hint"><Search size={14} /> Claims are compared against retrieved research evidence</span>
            <button className="analyze-button" type="submit" disabled={!claim.trim() || isAnalyzing}>
              {isAnalyzing ? <><LoaderCircle className="spin" size={17} /> Analyzing</> : <>Analyze claim <ArrowUpRight size={17} /></>}
            </button>
          </div>
        </form>

        {isAnalyzing && <div className="loading-state"><LoaderCircle className="spin" size={20} /><span>Retrieving relevant research and calibrating verdict...</span></div>}

        {result && (
          <div className="results" aria-live="polite">
            <div className="results-intro"><div><p className="eyebrow">Analysis complete</p><h2>Research brief</h2></div><span className="result-id">MOCK ANALYSIS / 001</span></div>

            <SectionCard number="02" eyebrow="The input" title="Scientific claim">
              <div className="claim-display">{result.claim}</div>
            </SectionCard>

            <div className="summary-grid">
              <SectionCard number="03" eyebrow="Assessment" title="Verdict" className="verdict-card">
                <div className="verdict-line"><span className="verdict-dot" />{result.verdict}</div>
                <p className="card-note">Evidence points in a positive direction, with meaningful conditions and limitations.</p>
              </SectionCard>
              <SectionCard number="04" eyebrow="Calibrated estimate" title="Confidence score" className="confidence-card">
                <div className="confidence-value">{result.confidence}<span>%</span></div>
                <div className="score-track"><div style={{ width: `${result.confidence}%` }} /></div>
                <p className="card-note">Based on evidence consistency and study relevance.</p>
              </SectionCard>
            </div>

            <SectionCard number="05" eyebrow="Interpretation" title="Scientific critique">
              <p className="body-copy">{result.critique}</p>
            </SectionCard>

            <SectionCard number="06" eyebrow="Classification rationale" title="Reason">
              <div className="reason-block"><Check size={18} /><p>{result.reason}</p></div>
            </SectionCard>

            <SectionCard number="07" eyebrow="Retrieved literature" title="Evidence / proof" className="evidence-section">
              <div className="evidence-list">{result.evidence.map((item, index) => <EvidenceCard key={item.title} item={item} index={index} />)}</div>
            </SectionCard>

            <SectionCard number="08" eyebrow="Source trail" title="References">
              <div className="reference-list">{result.evidence.map((item, index) => <a className="reference-row" href="#" key={item.title}><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.authors} · {item.year}</small></div><span className="view-link">View paper <ArrowUpRight size={14} /></span></a>)}</div>
            </SectionCard>
          </div>
        )}
      </main>
      <footer><span>ClaimLens</span><span>Designed for careful reading, not instant certainty.</span></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
