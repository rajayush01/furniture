import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    title: 'Where Craft\nMeets Comfort',
    subtitle: 'Handcrafted furniture for the modern home',
    tag: 'New Collection 2025',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    accent: '#B8935A'
  },
  {
    title: 'Living Spaces\nReimagined',
    subtitle: 'Discover pieces that tell your story',
    tag: 'Exclusive Designs',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    accent: '#8A9E8A'
  },
  {
    title: 'Timeless\nElegance',
    subtitle: 'Built to last, designed to inspire',
    tag: 'Premium Materials',
    img: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&q=80',
    accent: '#C4866A'
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!parallaxRef.current || !textRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      parallaxRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`
      textRef.current.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const goToNext = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(c => (c + 1) % slides.length)
      setAnimating(false)
    }, 600)
  }

  const goTo = (i: number) => {
    if (animating || i === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(i)
      setAnimating(false)
    }, 600)
  }

  const slide = slides[current]

  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ background: 'var(--cream)' }}>
      {/* Background Image with Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 transition-transform duration-700 ease-out scale-105"
        style={{ willChange: 'transform' }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current && !animating ? 1 : 0 }}
          >
            <img
              src={s.img}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.45) saturate(0.8)' }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, rgba(250,247,242,0.97) 0%, rgba(250,247,242,0.7) 45%, rgba(250,247,242,0.1) 100%)'
        }}
      />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full animate-blob"
          style={{
            background: 'radial-gradient(circle, rgba(184,147,90,0.12) 0%, transparent 70%)',
            top: '10%', left: '5%',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full animate-blob"
          style={{
            background: 'radial-gradient(circle, rgba(138,158,138,0.1) 0%, transparent 70%)',
            bottom: '20%', right: '10%',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Main Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-7xl mx-auto px-8 min-h-screen flex items-center"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <div className="max-w-2xl pt-24">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-3 mb-8 transition-all duration-800"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.2s'
            }}
          >
            <span
              className="w-8 h-px"
              style={{ background: 'var(--oak)' }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', fontWeight: 400, letterSpacing: '0.25em' }}
            >
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${current}`}
            className="mb-6 leading-none"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 300,
              color: 'var(--espresso)',
              whiteSpace: 'pre-line',
              animation: 'fadeUp 0.8s ease 0.3s both'
            }}
          >
            {slide.title.split('\n').map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block"
                  style={{
                    animation: `slideRight 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${0.3 + i * 0.15}s both`
                  }}
                >
                  {i === 1 ? (
                    <em style={{ color: 'var(--oak)', fontStyle: 'italic' }}>{line}</em>
                  ) : line}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${current}`}
            className="mb-10 text-lg font-light"
            style={{
              color: 'var(--charcoal)',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              maxWidth: '420px',
              lineHeight: 1.7,
              animation: 'fadeUp 0.8s ease 0.55s both'
            }}
          >
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: 'fadeUp 0.8s ease 0.7s both' }}
          >
            <button
              className="group relative px-10 py-4 text-sm tracking-widest uppercase overflow-hidden transition-all duration-500"
              style={{
                background: 'var(--oak)',
                color: 'white',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.2em',
                borderRadius: '2px'
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'var(--walnut)' }}
              />
              <span className="relative flex items-center gap-3">
                Explore Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>

            <button
              className="group px-10 py-4 text-sm tracking-widest uppercase transition-all duration-500"
              style={{
                border: '1px solid var(--charcoal)',
                color: 'var(--charcoal)',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.2em',
                borderRadius: '2px',
                background: 'transparent'
              }}
            >
              <span className="group-hover:tracking-[0.3em] transition-all duration-500">
                Our Story
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex gap-10 mt-16 pt-10"
            style={{
              borderTop: '1px solid var(--linen)',
              animation: 'fadeUp 0.8s ease 0.9s both'
            }}
          >
            {[
              { num: '2,400+', label: 'Pieces Crafted' },
              { num: '18', label: 'Years of Craft' },
              { num: '98%', label: 'Happy Homes' }
            ].map(stat => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-light mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--oak)' }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', opacity: 0.6, letterSpacing: '0.15em' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative w-px overflow-hidden transition-all duration-500"
            style={{
              height: i === current ? 48 : 24,
              background: 'rgba(44,24,16,0.2)'
            }}
          >
            <span
              className="absolute top-0 left-0 w-full transition-all duration-300"
              style={{
                background: 'var(--oak)',
                height: i === current ? '100%' : '0%'
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ animation: 'fadeIn 1s ease 1.5s both' }}
      >
        <div
          className="w-px h-16 relative overflow-hidden"
          style={{ background: 'rgba(44,24,16,0.15)' }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'var(--oak)',
              animation: 'scrollLine 2s ease-in-out infinite'
            }}
          />
        </div>
        <span
          className="text-xs tracking-widest uppercase rotate-90 mt-2"
          style={{ color: 'var(--charcoal)', opacity: 0.4, fontSize: '9px', letterSpacing: '0.25em' }}
        >
          Scroll
        </span>
        <style>{`
          @keyframes scrollLine {
            0% { top: -40%; }
            100% { top: 140%; }
          }
        `}</style>
      </div>

      {/* Floating decorative element */}
      <div
        className="absolute top-1/2 right-16 -translate-y-1/2 z-10 hidden xl:block animate-floatSlow"
        style={{ animationDelay: '1s' }}
      >
        <div
          className="w-64 h-64 rounded-full border flex items-center justify-center"
          style={{ borderColor: 'rgba(184,147,90,0.2)' }}
        >
          <div
            className="w-48 h-48 rounded-full border flex items-center justify-center animate-spin"
            style={{ borderColor: 'rgba(184,147,90,0.15)', animationDuration: '30s' }}
          >
            <div
              className="text-xs tracking-widest text-center"
              style={{ color: 'var(--oak)', opacity: 0.5, letterSpacing: '0.3em', fontSize: '9px', lineHeight: 2 }}
            >
              HANDCRAFTED<br/>✦<br/>SINCE 2007<br/>✦<br/>ARTISAN
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}