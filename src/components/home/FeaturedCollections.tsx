import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal';
const collections = [
  {
    name: 'Nordic Living',
    pieces: '48 pieces',
    desc: 'Clean lines, natural materials, functional beauty',
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    color: '#B8935A',
    tag: 'Bestseller'
  },
  {
    name: 'Wabi-Sabi',
    pieces: '32 pieces',
    desc: 'Embracing imperfection, celebrating natural beauty',
    img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80',
    color: '#8A9E8A',
    tag: 'New'
  },
  {
    name: 'Mid-Century',
    pieces: '56 pieces',
    desc: 'Timeless silhouettes for the contemporary home',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    color: '#C4866A',
    tag: 'Classic'
  }
]

function CollectionCard({ col, index }: { col: typeof collections[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ref = useReveal(0.1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    })
  }

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div
        className="relative overflow-hidden group cursor-pointer"
        style={{
          borderRadius: '4px',
          transform: hovered ? `perspective(1000px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg) translateZ(10px)` : 'none',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: hovered ? `0 30px 80px rgba(44,24,16,0.2), 0 0 0 1px rgba(184,147,90,0.1)` : '0 8px 30px rgba(44,24,16,0.08)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
        onMouseMove={handleMouseMove}
      >
        {/* Image */}
        <div className="img-zoom relative" style={{ height: '520px' }}>
          <img
            src={col.img}
            alt={col.name}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
            }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, rgba(44,24,16,0.8) 0%, rgba(44,24,16,0.2) 50%, transparent 100%)`,
              opacity: hovered ? 1 : 0.6
            }}
          />

          {/* Tag */}
          <div
            className="absolute top-5 left-5 px-3 py-1 text-xs tracking-widest uppercase"
            style={{
              background: col.color,
              color: 'white',
              fontFamily: 'Jost, sans-serif',
              letterSpacing: '0.2em',
              fontSize: '10px',
              borderRadius: '2px'
            }}
          >
            {col.tag}
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div
              className="mb-1 text-xs tracking-widest uppercase"
              style={{ color: 'rgba(250,247,242,0.6)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.2em' }}
            >
              {col.pieces}
            </div>
            <h3
              className="text-3xl font-light mb-3"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'white', fontWeight: 300 }}
            >
              {col.name}
            </h3>
            <p
              className="text-sm font-light mb-6 transition-all duration-500"
              style={{
                color: 'rgba(250,247,242,0.7)',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                maxHeight: hovered ? '60px' : '0',
                opacity: hovered ? 1 : 0,
                overflow: 'hidden'
              }}
            >
              {col.desc}
            </p>
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                opacity: hovered ? 1 : 0
              }}
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: 'white', fontFamily: 'Jost, sans-serif', letterSpacing: '0.2em' }}
              >
                Explore
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedCollections() {
  const titleRef = useReveal()

  return (
    <section className="py-32 px-8" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div ref={titleRef} className="reveal">
            <span
              className="text-xs tracking-widest uppercase block mb-4"
              style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
            >
              Curated for You
            </span>
            <h2
              className="text-5xl md:text-6xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 300 }}
            >
              Our Collections
            </h2>
          </div>
          <a
            href="#"
            className="line-draw text-sm tracking-widest uppercase mt-6 md:mt-0 self-start md:self-auto pb-1"
            style={{ color: 'var(--charcoal)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.18em', fontWeight: 300 }}
          >
            View All Collections →
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <CollectionCard key={col.name} col={col} index={i} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center mt-20 gap-6">
          <div className="w-16 h-px" style={{ background: 'var(--sand)' }} />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--sand)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
          >
            Handcrafted with Love
          </span>
          <div className="w-16 h-px" style={{ background: 'var(--sand)' }} />
        </div>
      </div>
    </section>
  )
}