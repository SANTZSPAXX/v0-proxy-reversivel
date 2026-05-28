import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TARGET_URL = 'https://sistemas-jundiai.lovable.app'

// Rotas que NÃO devem ser proxiadas (rotas locais)
const LOCAL_ROUTES = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/sobre',
  '/servicos',
  '/contato',
  '/faq',
  '/blog',
]

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
    
    // Se for HTML, reescrever URLs
    if (contentType.includes('text/html')) {
      let html = await response.text()
      
      // Reescrever todas as referências ao domínio original
      html = html.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        ''
      )
      
      return new NextResponse(html, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for CSS, reescrever URLs
    if (contentType.includes('text/css')) {
      let css = await response.text()
      css = css.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        ''
      )
      return new NextResponse(css, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for JavaScript, reescrever URLs
    if (contentType.includes('javascript')) {
      let js = await response.text()
      js = js.replace(
        /https?:\/\/sistemas-jundiai\.lovable\.app/g,
        ''
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
