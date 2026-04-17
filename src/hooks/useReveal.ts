import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useRevealAll(selector: string, threshold = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    const observers: IntersectionObserver[] = []

    elements.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add('visible')
            }, i * 120)
            observer.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [selector, threshold])

  return containerRef
}