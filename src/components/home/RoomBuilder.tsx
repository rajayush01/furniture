import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const rooms = [
  {
    name: 'Living Room',
    icon: '🛋',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    desc: 'Create a space for gathering, relaxing, and making memories.',
    products: ['Hestia Sofa', 'Luna Coffee Table', 'Linen Pendant', 'Wren Armchair']
  },
  {
    name: 'Dining Room',
    icon: '🍽',
    img: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&q=80',
    desc: 'Where families share stories over shared meals.',
    products: ['Timber Dining Table', 'Wren Chairs × 6', 'Cedar Sideboard', 'Linen Pendant']
  },
  {
    name: 'Bedroom',
    icon: '🛏',
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
    desc: 'Your personal sanctuary, designed for deep rest.',
    products: ['Solstice Bed Frame', 'Moss Bedside Tables', 'Oak Dresser', 'Arch Floor Lamp']
  },
  {
    name: 'Home Office',
    icon: '📚',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
    desc: 'Productive, inspired, and beautifully organized.',
    products: ['Cedar Desk', 'Wren Office Chair', 'Cedar Bookshelf', 'Desk Lamp']
  }
]

export default function RoomBuilder() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const titleRef = useReveal()

  const switchRoom = (i: number) => {
    if (i === activeRoom || transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveRoom(i)
      setTransitioning(false)
    }, 500)
  }

  const room = rooms[activeRoom]

  return (
    <section className="py-32 overflow-hidden" style={{ background: 'var(--espresso)' }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <span
            className="text-xs tracking-widest uppercase block mb-4"
            style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
          >
            Inspire Your Space
          </span>
          <h2
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--cream)', fontWeight: 300 }}
          >
            Shop by <em style={{ fontStyle: 'italic', color: 'var(--oak)' }}>Room</em>
          </h2>
        </div>

        {/* Room Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {rooms.map((r, i) => (
            <button
              key={r.name}
              onClick={() => switchRoom(i)}
              className="flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase transition-all duration-400"
              style={{
                background: i === activeRoom ? 'var(--oak)' : 'rgba(250,247,242,0.05)',
                border: `1px solid ${i === activeRoom ? 'var(--oak)' : 'rgba(250,247,242,0.15)'}`,
                color: i === activeRoom ? 'white' : 'rgba(250,247,242,0.5)',
                fontFamily: 'Jost, sans-serif',
                letterSpacing: '0.18em',
                fontWeight: 300,
                borderRadius: '2px'
              }}
            >
              <span>{r.icon}</span>
              <span>{r.name}</span>
            </button>
          ))}
        </div>

        {/* Room Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ borderRadius: '8px' }}>
          {/* Image Side */}
          <div
            className="relative overflow-hidden"
            style={{ height: '560px' }}
          >
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'scale(1.05)' : 'scale(1)',
                filter: 'brightness(0.75) saturate(0.85)'
              }}
            />
            {/* Image overlay with room name */}
            <div
              className="absolute bottom-0 left-0 right-0 p-10"
              style={{
                background: 'linear-gradient(to top, rgba(44,24,16,0.9) 0%, transparent 100%)'
              }}
            >
              <div
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
              >
                {room.icon} {room.name}
              </div>
              <p
                className="text-white font-light text-lg"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
              >
                {room.desc}
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div
            className="p-12 flex flex-col justify-between"
            style={{ background: 'rgba(250,247,242,0.04)', backdropFilter: 'blur(10px)' }}
          >
            <div>
              <h3
                className="text-4xl font-light mb-8"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  color: 'var(--cream)',
                  fontWeight: 300,
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'all 0.5s ease'
                }}
              >
                Complete Your<br/><em style={{ color: 'var(--oak)' }}>{room.name}</em>
              </h3>

              {/* Product List */}
              <div className="space-y-4 mb-10">
                {room.products.map((p, i) => (
                  <div
                    key={p}
                    className="flex items-center justify-between py-4 group cursor-pointer"
                    style={{
                      borderBottom: '1px solid rgba(250,247,242,0.08)',
                      opacity: transitioning ? 0 : 1,
                      transform: transitioning ? 'translateX(20px)' : 'translateX(0)',
                      transition: `all 0.5s ease ${i * 0.08}s`
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                        style={{ background: 'var(--oak)' }}
                      />
                      <span
                        className="text-sm font-light transition-colors duration-300 group-hover:text-white"
                        style={{ color: 'rgba(250,247,242,0.65)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
                      >
                        {p}
                      </span>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                      className="transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: 'rgba(250,247,242,0.2)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4">
              <button
                className="w-full py-4 text-sm tracking-widest uppercase group relative overflow-hidden transition-all duration-500"
                style={{
                  background: 'var(--oak)',
                  color: 'white',
                  fontFamily: 'Jost, sans-serif',
                  letterSpacing: '0.2em',
                  fontWeight: 300,
                  borderRadius: '2px'
                }}
              >
                <span
                  className="absolute inset-0 transition-transform duration-500 -translate-x-full group-hover:translate-x-0"
                  style={{ background: 'var(--walnut)' }}
                />
                <span className="relative">Shop {room.name}</span>
              </button>
              <button
                className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-300"
                style={{
                  border: '1px solid rgba(250,247,242,0.2)',
                  color: 'rgba(250,247,242,0.6)',
                  fontFamily: 'Jost, sans-serif',
                  letterSpacing: '0.2em',
                  fontWeight: 300,
                  borderRadius: '2px',
                  background: 'transparent'
                }}
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}