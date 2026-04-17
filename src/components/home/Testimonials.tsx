import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'

const testimonials = [
  {
    quote: "Every piece we've ordered from Artisan Home has been absolutely exceptional. The quality is incomparable and the team made the whole process seamless. Our living room is now the heart of our home.",
    name: 'Priya Mehta',
    role: 'Interior Designer, Mumbai',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
  },
  {
    quote: "The craftsmanship is unlike anything else. I ordered a custom dining table and they captured my vision perfectly. Three years later, it's still the centerpiece of every dinner party.",
    name: 'Arjun Sharma',
    role: 'Architect, Bangalore',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    quote: "The white glove delivery and installation was impeccable. The team treated our new sofa like it was made of gold — because it might as well be, given how stunning it looks.",
    name: 'Kavya Nair',
    role: 'Home Stylist, Chennai',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
  },
  {
    quote: "Sustainable luxury done right. Knowing that my furniture is crafted from certified sustainable materials and by skilled local artisans makes me love it even more.",
    name: 'Rohit Verma',
    role: 'Entrepreneur, Delhi',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const titleRef = useReveal()

  useEffect(() => {
    const timer = setInterval(() => {
      goNext()
    }, 7000)
    return () => clearInterval(timer)
  }, [current])

  const goNext = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(c => (c + 1) % testimonials.length)
      setTransitioning(false)
    }, 500)
  }

  const goPrev = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
      setTransitioning(false)
    }, 500)
  }

  const t = testimonials[current]

  return (
    <section
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: 'var(--cream-dark)' }}
    >
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <span
          className="text-[20vw] font-light select-none"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(184,147,90,0.07)',
            whiteSpace: 'nowrap'
          }}
        >
          LOVE
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-20">
          <span
            className="text-xs tracking-widest uppercase block mb-4"
            style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
          >
            Happy Homes
          </span>
          <h2
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 300 }}
          >
            What Our <em style={{ fontStyle: 'italic', color: 'var(--oak)' }}>Clients</em> Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          className="text-center transition-all duration-500"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(20px)' : 'translateY(0)'
          }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(t.rating)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </div>

          {/* Quote */}
          <div
            className="text-3xl font-light mb-10 leading-relaxed max-w-3xl mx-auto"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: 'var(--espresso)',
              fontWeight: 300,
              fontStyle: 'italic'
            }}
          >
            <span style={{ color: 'var(--oak)', fontSize: '4rem', lineHeight: 0, verticalAlign: '-0.3em', marginRight: '8px' }}>"</span>
            {t.quote}
            <span style={{ color: 'var(--oak)', fontSize: '4rem', lineHeight: 0, verticalAlign: '-0.3em', marginLeft: '8px' }}>"</span>
          </div>

          {/* Avatar + Name */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2"
              style={{ borderColor: 'var(--oak)' }}
            >
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div
                className="font-light text-base"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 500 }}
              >
                {t.name}
              </div>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--sand)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em' }}
              >
                {t.role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-14">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-oak hover:border-oak group"
            style={{ borderColor: 'var(--sand)' }}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--charcoal)" strokeWidth="1.5"
              className="group-hover:stroke-white transition-all duration-300"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (i !== current) { setTransitioning(true); setTimeout(() => { setCurrent(i); setTransitioning(false) }, 500) } }}
                className="transition-all duration-400"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? 'var(--oak)' : 'var(--sand)'
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group"
            style={{ borderColor: 'var(--sand)' }}
            onMouseEnter={e => {
              const btn = e.currentTarget
              btn.style.background = 'var(--oak)'
              btn.style.borderColor = 'var(--oak)'
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget
              btn.style.background = 'transparent'
              btn.style.borderColor = 'var(--sand)'
            }}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--charcoal)" strokeWidth="1.5"
              className="group-hover:stroke-white transition-all duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Brand logos / Press */}
        <div className="mt-20 pt-12" style={{ borderTop: '1px solid var(--sand)' }}>
          <div
            className="text-center text-xs tracking-widest uppercase mb-8"
            style={{ color: 'var(--sand)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
          >
            As Featured In
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {['Architectural Digest', 'Elle Décor', 'Vogue Living', 'Wallpaper*', 'Dezeen'].map(pub => (
              <span
                key={pub}
                className="text-sm font-light tracking-widest"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--charcoal)', fontStyle: 'italic' }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}