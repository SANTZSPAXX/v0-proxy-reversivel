// Utilitários para Core Web Vitals

/**
 * Hook para carregar recursos de forma lazy
 * Ajuda a melhorar LCP e INP
 */
export function preloadResource(href: string, as: 'script' | 'style' | 'image' | 'font') {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }
  
  document.head.appendChild(link)
}

/**
 * Pré-conectar a origens externas para melhorar LCP
 */
export function preconnect(origin: string, crossOrigin = true) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  
  if (crossOrigin) {
    link.crossOrigin = 'anonymous'
  }
  
  document.head.appendChild(link)
}

/**
 * DNS prefetch para recursos externos
 */
export function dnsPrefetch(origin: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'dns-prefetch'
  link.href = origin
  document.head.appendChild(link)
}

/**
 * Defer non-critical JavaScript
 * Útil para melhorar INP
 */
export function deferTask(callback: () => void) {
  if (typeof window === 'undefined') {
    callback()
    return
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback)
  } else {
    setTimeout(callback, 1)
  }
}

/**
 * Otimizar animações para evitar CLS
 * Usa transform em vez de propriedades que causam layout
 */
export const optimizedAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: { duration: 0.3 },
  },
  scale: {
    initial: { opacity: 0, transform: 'scale(0.95)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: { duration: 0.2 },
  },
}

/**
 * Reservar espaço para conteúdo dinâmico (evita CLS)
 */
export function createPlaceholderStyle(width: number | string, height: number | string) {
  return {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    minWidth: typeof width === 'number' ? `${width}px` : width,
    minHeight: typeof height === 'number' ? `${height}px` : height,
  }
}
