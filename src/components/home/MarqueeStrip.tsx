const items = [
  '✦ Free Delivery Over ₹50,000',
  '✦ Handcrafted Excellence',
  '✦ 5 Year Warranty',
  '✦ Custom Orders Welcome',
  '✦ Sustainable Materials',
  '✦ White Glove Installation',
  '✦ 30 Day Returns',
]

export default function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{ background: 'var(--espresso)' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 25s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-widest uppercase mx-8 flex-shrink-0"
            style={{
              color: 'rgba(250,247,242,0.7)',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.2em'
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}