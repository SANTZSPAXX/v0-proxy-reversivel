import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TARGET_URL = 'https://sistemas-jundiai.lovable.app'

// Rotas que NÃO devem ser proxiadas (rotas locais do Next.js)
const LOCAL_ROUTES = [
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
]

// Obtém a URL base do domínio atual
function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar rotas de API de proxy (evitar loop)
  if (pathname.startsWith('/api/proxy')) {
    return NextResponse.next()
  }

  // Ignorar _next (assets do Next.js)
  if (pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // Ignorar rotas locais (SEO, páginas do site)
  if (LOCAL_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Ignorar arquivos estáticos locais
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
    return NextResponse.next()
  }

  // Para todas as outras rotas, fazer proxy
  const targetUrl = new URL(pathname, TARGET_URL)
  
  // Preservar query params
  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value)
  })

  const headers = new Headers()
  
  // Copiar headers relevantes
  const headersToForward = [
    'accept',
    'accept-language',
    'content-type',
    'content-length',
    'authorization',
    'cookie',
    'user-agent',
    'cache-control',
    'pragma',
    'if-none-match',
    'if-modified-since',
  ]

  headersToForward.forEach((header) => {
    const value = request.headers.get(header)
    if (value) {
      headers.set(header, value)
    }
  })

  headers.set('host', new URL(TARGET_URL).host)
  headers.set('x-forwarded-host', request.headers.get('host') || '')
  headers.set('x-forwarded-proto', 'https')

  try {
    let body: BodyInit | null = null
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer()
    }

    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body,
      redirect: 'manual',
    })

    const responseHeaders = new Headers()
    
    const responseHeadersToCopy = [
      'content-type',
      'cache-control',
      'expires',
      'last-modified',
      'etag',
      'set-cookie',
      'location',
      'vary',
      'content-encoding',
    ]

    responseHeadersToCopy.forEach((header) => {
      const value = response.headers.get(header)
      if (value) {
        if (header === 'location') {
          const locationUrl = new URL(value, TARGET_URL)
          if (locationUrl.origin === new URL(TARGET_URL).origin) {
            responseHeaders.set(header, locationUrl.pathname + locationUrl.search)
          } else {
            responseHeaders.set(header, value)
          }
        } else {
          responseHeaders.set(header, value)
        }
      }
    })

    responseHeaders.set('access-control-allow-origin', '*')
    responseHeaders.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    responseHeaders.set('access-control-allow-headers', '*')

    const contentType = response.headers.get('content-type') || ''
    
    // Se for HTML, reescrever URLs e remover badge Lovable
    if (contentType.includes('text/html')) {
      let html = await response.text()
      
      // Obter URL base do domínio atual
      const baseUrl = getBaseUrl(request)
      
      // Reescrever todas as referências ao domínio original para o novo domínio
      html = html.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        baseUrl
      )
      
      // Remover badge "Edit with Lovable" (pode estar em diferentes formatos)
      // Remove o elemento completo do Lovable badge
      html = html.replace(
        /<div[^>]*id="lovable-badge"[^>]*>[\s\S]*?<\/div>/gi,
        ''
      )
      html = html.replace(
        /<a[^>]*href="[^"]*lovable\.dev[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
        ''
      )
      html = html.replace(
        /<[^>]*class="[^"]*lovable[^"]*"[^>]*>[\s\S]*?<\/[^>]+>/gi,
        ''
      )
      // Remove qualquer elemento que contenha "Edit with Lovable"
      html = html.replace(
        /<aside[^>]*>[\s\S]*?Edit with Lovable[\s\S]*?<\/aside>/gi,
        ''
      )
      html = html.replace(
        /<div[^>]*>[\s\S]*?Edit with Lovable[\s\S]*?<\/div>/gi,
        ''
      )
      // Remove scripts do Lovable
      html = html.replace(
        /<script[^>]*src="[^"]*lovable[^"]*"[^>]*>[\s\S]*?<\/script>/gi,
        ''
      )
      // Remove o badge inline que geralmente fica no canto
      html = html.replace(
        /<!-- Lovable Badge -->[\s\S]*?<!-- End Lovable Badge -->/gi,
        ''
      )
      // Remove qualquer link para lovable.dev
      html = html.replace(
        /<a[^>]*lovable\.dev[^>]*>[^<]*<\/a>/gi,
        ''
      )
      
      // Substituir telefone e WhatsApp
      html = html.replace(
        /\+?55\s*\(?\d{2}\)?\s*\d{4,5}[-.\s]?\d{4}/g,
        '+55 11 98938-7263'
      )
      html = html.replace(
        /wa\.me\/\d+/g,
        'wa.me/5511989387263'
      )
      html = html.replace(
        /whatsapp\.com\/send\?phone=\d+/g,
        'whatsapp.com/send?phone=5511989387263'
      )
      
      // Substituir email
      html = html.replace(
        /[\w.-]+@[\w.-]+\.\w+/g,
        'Ohany@korenexus.com.br'
      )
      
      // Adicionar CSS para ocultar badge
      const hideBadgeCSS = `<style>
        [class*="lovable"], [id*="lovable"], a[href*="lovable.dev"],
        aside:has(a[href*="lovable"]) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: absolute !important;
          left: -9999px !important;
        }
      </style>`
      html = html.replace('</head>', `${hideBadgeCSS}</head>`)
      
      return new NextResponse(html, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for CSS, reescrever URLs
    if (contentType.includes('text/css')) {
      let css = await response.text()
      const baseUrl = getBaseUrl(request)
      css = css.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        baseUrl
      )
      // Ocultar badge via CSS
      css += `
        [class*="lovable"], 
        [id*="lovable"], 
        a[href*="lovable.dev"],
        aside:has(a[href*="lovable"]) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: absolute !important;
          left: -9999px !important;
        }
      `
      return new NextResponse(css, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for JavaScript, reescrever URLs
    if (contentType.includes('javascript')) {
      let js = await response.text()
      const baseUrl = getBaseUrl(request)
      js = js.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        baseUrl
      )
      return new NextResponse(js, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Para outros tipos de conteúdo, passar direto
    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error('[Middleware Proxy Error]:', error)
    return NextResponse.json(
      { error: 'Proxy error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
