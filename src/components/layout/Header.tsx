import { useState, useEffect } from 'react'

const links = ['Collections', 'Rooms', 'Materials', 'About', 'Contact']

export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(2)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184,147,90,0.15)' : '1px solid transparent',
          padding: scrolled ? '16px 0' : '28px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ background: 'var(--oak)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span
              className="text-2xl font-light tracking-widest"
              style={{ color: 'var(--espresso)', letterSpacing: '0.12em' }}
            >
              ARTISAN
              <span className="font-semibold" style={{ color: 'var(--oak)' }}> HOME</span>
            </span>
          </a>

          {/* Center Links */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map(link => (
              <li key={link}>
                <a
                  href="#"
                  className="line-draw text-sm tracking-widest uppercase transition-colors duration-300"
                  style={{
                    color: 'var(--charcoal)',
                    fontFamily: 'Jost, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.18em'
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 group">
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--charcoal)" strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart */}
            <button className="relative flex items-center group">
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="var(--charcoal)" strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: 'var(--oak)', fontSize: '10px' }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <a
              href="#"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-500 overflow-hidden relative group"
              style={{
                border: '1px solid var(--oak)',
                color: 'var(--oak)',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.2em',
                borderRadius: '2px'
              }}
            >
              <span
                className="absolute inset-0 transition-transform duration-500 -translate-x-full group-hover:translate-x-0"
                style={{ background: 'var(--oak)' }}
              />
              <span className="relative transition-colors duration-300 group-hover:text-white">
                Visit Studio
              </span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className="block h-px w-7 transition-all duration-300"
                style={{
                  background: 'var(--charcoal)',
                  transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none'
                }}
              />
              <span
                className="block h-px w-5 transition-all duration-300"
                style={{
                  background: 'var(--charcoal)',
                  opacity: menuOpen ? 0 : 1
                }}
              />
              <span
                className="block h-px w-7 transition-all duration-300"
                style={{
                  background: 'var(--charcoal)',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-700"
        style={{
          background: 'var(--warm-white)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          clipPath: menuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link, i) => (
            <a
              key={link}
              href="#"
              className="text-4xl font-light transition-all duration-500"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: 'var(--espresso)',
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: menuOpen ? 1 : 0,
                transitionDelay: `${i * 80}ms`
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <div
            className="w-12 h-px mt-4"
            style={{ background: 'var(--sand)' }}
          />
          <a
            href="#"
            className="text-sm tracking-widest uppercase"
            style={{
              color: 'var(--oak)',
              fontFamily: 'Jost, sans-serif',
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.5s ease 0.5s'
            }}
          >
            Visit Studio
          </a>
        </div>
      </div>
    </>
  )
}