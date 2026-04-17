const footerLinks = {
  Collections: ['Nordic Living', 'Wabi-Sabi', 'Mid-Century', 'Japandi', 'Bohemian', 'Minimalist'],
  Rooms: ['Living Room', 'Dining Room', 'Bedroom', 'Home Office', 'Outdoor', 'Children'],
  Company: ['Our Story', 'Artisans', 'Sustainability', 'Press', 'Careers', 'Contact'],
  Support: ['Track Order', 'Returns', 'Warranty', 'Care Guide', 'FAQ', 'Financing']
}

const socials = [
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  {
    name: 'Pinterest',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.86-2.6 1.93-2.6.91 0 1.35.68 1.35 1.5 0 .92-.58 2.29-.89 3.56-.25 1.06.53 1.92 1.57 1.92 1.88 0 3.14-2.4 3.14-5.24 0-2.16-1.45-3.8-4.1-3.8-2.99 0-4.85 2.23-4.85 4.72 0 .86.25 1.46.64 1.93.18.21.2.3.14.54l-.24.93c-.07.3-.29.4-.53.29-1.48-.64-2.17-2.37-2.17-4.3 0-3.2 2.71-7.05 8.1-7.05 4.35 0 7.21 3.16 7.21 6.56 0 4.5-2.49 7.85-6.15 7.85-1.23 0-2.39-.67-2.79-1.42l-.75 2.94c-.27 1.03-1 2.33-1.49 3.12.89.27 1.83.42 2.8.42 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    )
  }
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--espresso)' }}>
      {/* Top Banner */}
      <div
        className="py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderBottom: '1px solid rgba(250,247,242,0.06)' }}
      >
        <div>
          <h3
            className="text-3xl font-light text-white mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            Visit Our Studio
          </h3>
          <p
            className="font-light"
            style={{ color: 'rgba(250,247,242,0.5)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
          >
            Experience our collections in person — by appointment
          </p>
        </div>
        <button
          className="px-10 py-4 text-xs tracking-widest uppercase relative overflow-hidden group flex-shrink-0"
          style={{
            border: '1px solid rgba(250,247,242,0.2)',
            color: 'rgba(250,247,242,0.8)',
            fontFamily: 'Jost, sans-serif',
            letterSpacing: '0.2em',
            fontWeight: 300,
            borderRadius: '2px'
          }}
        >
          <span
            className="absolute inset-0 transition-transform duration-500 -translate-x-full group-hover:translate-x-0"
            style={{ background: 'var(--oak)' }}
          />
          <span className="relative group-hover:text-white transition-colors duration-300">
            Book Appointment
          </span>
        </button>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="flex items-center gap-3 mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--oak)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <span
                className="text-xl font-light"
                style={{ color: 'var(--cream)', letterSpacing: '0.12em' }}
              >
                ARTISAN <span style={{ color: 'var(--oak)', fontWeight: 600 }}>HOME</span>
              </span>
            </div>
            <p
              className="font-light mb-8 leading-loose"
              style={{
                color: 'rgba(250,247,242,0.45)',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: 1.9
              }}
            >
              Handcrafted furniture that honours the beauty of natural materials and the skill of master artisans. Building heirlooms since 2007.
            </p>

            {/* Social */}
            <div className="flex gap-4">
              {socials.map(s => (
                <a
                  key={s.name}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    border: '1px solid rgba(250,247,242,0.1)',
                    color: 'rgba(250,247,242,0.4)'
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = 'var(--oak)'
                    el.style.borderColor = 'var(--oak)'
                    el.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'rgba(250,247,242,0.1)'
                    el.style.color = 'rgba(250,247,242,0.4)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-xs tracking-widest uppercase mb-6 font-light"
                style={{
                  color: 'rgba(250,247,242,0.35)',
                  fontFamily: 'Jost, sans-serif',
                  letterSpacing: '0.22em',
                  fontWeight: 400
                }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-light transition-colors duration-300"
                      style={{
                        color: 'rgba(250,247,242,0.45)',
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 300
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--oak)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.45)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(250,247,242,0.06)' }}
      >
        <span
          className="text-xs font-light"
          style={{ color: 'rgba(250,247,242,0.25)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
        >
          © 2025 Artisan Home. All rights reserved. Crafted with love in India.
        </span>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
            <a
              key={item}
              href="#"
              className="text-xs font-light transition-colors duration-300"
              style={{ color: 'rgba(250,247,242,0.25)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--oak)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.25)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}