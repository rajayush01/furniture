import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useReveal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: 'var(--warm-white)' }}
    >
      {/* Decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(184,147,90,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(138,158,138,0.06) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full border animate-spin pointer-events-none"
        style={{ borderColor: 'rgba(184,147,90,0.08)', animationDuration: '30s' }} />
      <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border animate-spin pointer-events-none"
        style={{ borderColor: 'rgba(138,158,138,0.1)', animationDuration: '20s', animationDirection: 'reverse' }} />

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full border mx-auto mb-8 flex items-center justify-center animate-pulse"
          style={{ borderColor: 'var(--sand)', animationDuration: '4s' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--oak)" strokeWidth="1.2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <span
          className="text-xs tracking-widest uppercase block mb-4"
          style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
        >
          Stay Inspired
        </span>

        <h2
          className="text-5xl font-light mb-6 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 300 }}
        >
          Join Our Circle of{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--oak)' }}>Beauty Seekers</em>
        </h2>

        <p
          className="font-light mb-12 max-w-lg mx-auto"
          style={{
            color: 'var(--charcoal)',
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            lineHeight: 1.8,
            opacity: 0.65
          }}
        >
          Get early access to new collections, design inspiration, exclusive offers and behind-the-scenes glimpses into our artisan workshops.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto relative"
          >
            <div
              className="flex-1 relative"
              style={{
                borderBottom: `2px solid ${focused ? 'var(--oak)' : 'var(--sand)'}`,
                transition: 'border-color 0.3s ease'
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                className="w-full px-0 py-4 bg-transparent outline-none text-sm font-light"
                style={{
                  color: 'var(--espresso)',
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  caretColor: 'var(--oak)'
                }}
              />
            </div>
            <button
              type="submit"
              className="sm:ml-6 px-8 py-4 text-xs tracking-widest uppercase relative overflow-hidden group transition-all duration-400 mt-4 sm:mt-0 flex-shrink-0"
              style={{
                background: 'var(--oak)',
                color: 'white',
                fontFamily: 'Jost, sans-serif',
                letterSpacing: '0.2em',
                fontWeight: 400,
                borderRadius: '2px'
              }}
            >
              <span
                className="absolute inset-0 transition-transform duration-500 -translate-x-full group-hover:translate-x-0"
                style={{ background: 'var(--walnut)' }}
              />
              <span className="relative">Subscribe</span>
            </button>
          </form>
        ) : (
          <div
            className="flex flex-col items-center gap-4 py-8"
            style={{ animation: 'scaleIn 0.5s ease both' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'var(--sage-light)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <p
              className="text-xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)' }}
            >
              Welcome to the circle!
            </p>
            <p
              className="text-sm font-light"
              style={{ color: 'var(--charcoal)', opacity: 0.6, fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
            >
              Check your inbox for a warm welcome from us.
            </p>
          </div>
        )}

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 opacity-50">
          {['No spam, ever', 'Unsubscribe anytime', '12,000+ subscribers'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: 'var(--oak)' }} />
              <span
                className="text-xs font-light tracking-wide"
                style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}