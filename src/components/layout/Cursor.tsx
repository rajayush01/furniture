import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0
    let mx = 0, my = 0
    let animFrame: number

    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const animate = () => {
      dotX += (mx - dotX) * 0.9
      dotY += (my - dotY) * 0.9
      ringX += (mx - ringX) * 0.12
      ringY += (my - ringY) * 0.12

      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'

      animFrame = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(2.5)'
      ring.style.borderColor = 'var(--oak)'
      ring.style.opacity = '0.6'
    }

    const onLeave = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.borderColor = 'var(--charcoal)'
      ring.style.opacity = '1'
    }

    const onMouseDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2)'
      ring.style.transform = 'translate(-50%, -50%) scale(0.6)'
    }

    const onMouseUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    animFrame = requestAnimationFrame(animate)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'var(--oak)', transition: 'transform 0.15s ease' }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1.5px solid var(--charcoal)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, opacity 0.3s'
        }}
      />
    </>
  )
}