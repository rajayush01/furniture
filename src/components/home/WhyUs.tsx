import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatItem({ value, label, suffix = '', delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(value, 2200, started)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setStarted(true), delay)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="text-center group">
      <div
        className="text-5xl md:text-6xl font-light mb-3 transition-colors duration-500 group-hover:text-oak"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          color: 'var(--oak)',
          fontWeight: 300
        }}
      >
        {count}{suffix}
      </div>
      <div
        className="text-xs tracking-widest uppercase"
        style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', opacity: 0.6, letterSpacing: '0.2em' }}
      >
        {label}
      </div>
    </div>
  )
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Quality Guaranteed',
    desc: 'Every piece undergoes rigorous quality control. We stand behind our craftsmanship with a 5-year structural warranty.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Made to Order',
    desc: 'Each piece is crafted specifically for you. Customise dimensions, materials and finishes to match your vision perfectly.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M3 6h18M3 12h18M3 18h18"/>
        <circle cx="7" cy="6" r="1" fill="currentColor"/>
        <circle cx="7" cy="12" r="1" fill="currentColor"/>
        <circle cx="7" cy="18" r="1" fill="currentColor"/>
      </svg>
    ),
    title: 'Sustainable Sourcing',
    desc: 'We partner with certified sustainable forests and local artisans to ensure every piece has a minimal environmental footprint.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'White Glove Delivery',
    desc: 'Our dedicated delivery team handles every piece with care, installing furniture in your home exactly where you want it.'
  }
]

export default function WhyUs() {
  const titleRef = useReveal()
  const featureRefs = features.map(() => useReveal(0.1))

  return (
    <section
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: 'var(--cream-dark)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--sand) 0%, transparent 70%)',
          transform: 'translate(40%, -40%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--sage-light) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)'
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20" ref={titleRef}>
          <div className="">
            <span
              className="text-xs tracking-widest uppercase block mb-4"
              style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
            >
              The Artisan Difference
            </span>
            <h2
              className="text-5xl md:text-6xl font-light mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 300 }}
            >
              Why Choose <em style={{ color: 'var(--oak)', fontStyle: 'italic' }}>Artisan</em>
            </h2>
            <p
              className="max-w-xl mx-auto font-light"
              style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}
            >
              More than furniture — we create heirloom pieces that become part of your family story.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-28 py-12"
          style={{ borderTop: '1px solid var(--sand)', borderBottom: '1px solid var(--sand)' }}
        >
          <StatItem value={2400} label="Pieces Crafted" suffix="+" delay={0} />
          <StatItem value={18} label="Years of Craft" suffix="" delay={200} />
          <StatItem value={98} label="Satisfaction Rate" suffix="%" delay={400} />
          <StatItem value={47} label="Master Artisans" suffix="+" delay={600} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={featureRefs[i]}
              className="reveal group cursor-pointer p-8 transition-all duration-500 hover:-translate-y-2"
              style={{
                transitionDelay: `${i * 0.1}s`,
                background: 'var(--warm-white)',
                borderRadius: '4px',
                border: '1px solid transparent'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid var(--sand)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px var(--shadow-md)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid transparent'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <div
                className="mb-6 transition-colors duration-300 group-hover:text-oak"
                style={{ color: 'var(--oak)' }}
              >
                {f.icon}
              </div>
              <div
                className="w-8 h-px mb-5 transition-all duration-500 group-hover:w-16"
                style={{ background: 'var(--sand)' }}
              />
              <h3
                className="text-xl font-light mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 400 }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', fontWeight: 300, opacity: 0.7 }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}