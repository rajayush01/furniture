import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal';

const categories = ['All', 'Sofas', 'Chairs', 'Tables', 'Storage', 'Lighting']

const products = [
  { id: 1, name: 'Hestia Sofa', cat: 'Sofas', price: 149000, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', tag: 'Bestseller', color: '#B8935A' },
  { id: 2, name: 'Moss Armchair', cat: 'Chairs', price: 48500, img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80', tag: 'New', color: '#8A9E8A' },
  { id: 3, name: 'Timber Dining Table', cat: 'Tables', price: 92000, img: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&q=80', tag: '', color: '#C4866A' },
  { id: 4, name: 'Oak Sideboard', cat: 'Storage', price: 76000, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', tag: 'Limited', color: '#B8935A' },
  { id: 5, name: 'Wren Lounge Chair', cat: 'Chairs', price: 55000, img: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80', tag: 'Popular', color: '#7D5A3C' },
  { id: 6, name: 'Linen Pendant', cat: 'Lighting', price: 18500, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', tag: 'New', color: '#C9A84C' },
  { id: 7, name: 'Luna Coffee Table', cat: 'Tables', price: 43000, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80', tag: '', color: '#8A9E8A' },
  { id: 8, name: 'Cedar Bookshelf', cat: 'Storage', price: 68000, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80', tag: 'Bestseller', color: '#B8935A' },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [wished, setWished] = useState(false)
  const [adding, setAdding] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useReveal(0.08)

  const handleAddToCart = () => {
    setAdding(true)
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <div
      ref={ref}
      className="reveal group"
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ borderRadius: '4px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden"
          style={{ height: '320px', background: 'var(--linen)' }}
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: 'rgba(44,24,16,0.2)',
              opacity: hovered ? 1 : 0
            }}
          />

          {/* Tag */}
          {product.tag && (
            <div
              className="absolute top-4 left-4 px-3 py-1"
              style={{
                background: product.color,
                color: 'white',
                fontSize: '9px',
                fontFamily: 'Jost, sans-serif',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderRadius: '2px'
              }}
            >
              {product.tag}
            </div>
          )}

          {/* Wishlist */}
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: wished ? 'var(--clay)' : 'rgba(250,247,242,0.9)',
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.8)',
              opacity: hovered ? 1 : 0
            }}
            onClick={() => setWished(!wished)}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill={wished ? 'white' : 'none'}
              stroke={wished ? 'white' : 'var(--charcoal)'}
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>

          {/* Quick add button */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500"
            style={{
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              opacity: hovered ? 1 : 0
            }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full py-3 text-xs tracking-widest uppercase font-light transition-all duration-300 relative overflow-hidden"
              style={{
                background: adding ? 'var(--sage)' : 'var(--espresso)',
                color: 'white',
                fontFamily: 'Jost, sans-serif',
                letterSpacing: '0.2em',
                borderRadius: '2px'
              }}
            >
              {adding ? (
                <span className="flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="animate-spin">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                  </svg>
                  Adding...
                </span>
              ) : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3
                className="text-lg font-light mb-1 group-hover:text-oak transition-colors duration-300"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 400 }}
              >
                {product.name}
              </h3>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--sand)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em' }}
              >
                {product.cat}
              </div>
            </div>
            <div
              className="text-lg font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--charcoal)' }}
            >
              ₹{product.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const titleRef = useReveal()

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.cat === activeCategory)

  return (
    <section className="py-32 px-8" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <span
            className="text-xs tracking-widest uppercase block mb-4"
            style={{ color: 'var(--oak)', fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em' }}
          >
            Handpicked Pieces
          </span>
          <h2
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--espresso)', fontWeight: 300 }}
          >
            Featured <em style={{ fontStyle: 'italic', color: 'var(--oak)' }}>Pieces</em>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-400 relative overflow-hidden"
              style={{
                fontFamily: 'Jost, sans-serif',
                letterSpacing: '0.18em',
                borderRadius: '2px',
                border: `1px solid ${activeCategory === cat ? 'var(--oak)' : 'var(--linen)'}`,
                background: activeCategory === cat ? 'var(--oak)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--charcoal)',
                fontWeight: 300
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button
            className="group px-12 py-4 text-sm tracking-widest uppercase relative overflow-hidden"
            style={{
              border: '1px solid var(--charcoal)',
              color: 'var(--charcoal)',
              fontFamily: 'Jost, sans-serif',
              letterSpacing: '0.2em',
              fontWeight: 300,
              borderRadius: '2px'
            }}
          >
            <span
              className="absolute inset-0 transition-transform duration-500 -translate-y-full group-hover:translate-y-0"
              style={{ background: 'var(--espresso)' }}
            />
            <span className="relative transition-colors duration-300 group-hover:text-white">
              Load More Pieces
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}