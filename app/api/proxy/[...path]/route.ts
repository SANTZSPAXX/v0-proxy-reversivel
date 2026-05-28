import { NextRequest, NextResponse } from 'next/server'

const TARGET_URL = 'https://sistemas-jundiai.lovable.app'

// Obtém a URL base do domínio atual
function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

// Remove o badge da Lovable do HTML
function removeLovableBadge(html: string): string {
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
  
  // Adiciona CSS para ocultar qualquer badge remanescente
  const hideCSS = `<style>
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
  </style>`
  
  html = html.replace('</head>', `${hideCSS}</head>`)
  
  return html
}

async function handleProxy(request: NextRequest, path: string) {
  const targetUrl = new URL(path || '/', TARGET_URL)
  
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
    'referer',
    'origin',
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

  // Definir host correto
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

    // Processar resposta
    const responseHeaders = new Headers()
    
    // Headers para copiar da resposta
    const responseHeadersToCopy = [
      'content-type',
      'cache-control',
      'expires',
      'last-modified',
      'etag',
      'set-cookie',
      'location',
      'vary',
    ]

    responseHeadersToCopy.forEach((header) => {
      const value = response.headers.get(header)
      if (value) {
        // Reescrever location para manter no proxy
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

    // Permitir CORS
    responseHeaders.set('access-control-allow-origin', '*')
    responseHeaders.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    responseHeaders.set('access-control-allow-headers', '*')

    const contentType = response.headers.get('content-type') || ''
    
    // Se for HTML, reescrever URLs
    if (contentType.includes('text/html')) {
      let html = await response.text()
      
      // Obter URL base do domínio atual
      const baseUrl = getBaseUrl(request)
      
      // Reescrever URLs absolutas para o domínio target
      html = html.replace(
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        baseUrl
      )
      
      // Remover badge Lovable
      html = removeLovableBadge(html)
      
      // Reescrever URLs de assets
      html = html.replace(/href="\//g, 'href="/')
      html = html.replace(/src="\//g, 'src="/')
      
      // Adicionar base tag para recursos relativos
      if (!html.includes('<base')) {
        html = html.replace(
          '<head>',
          `<head><base href="/">`
        )
      }

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
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        baseUrl
      )
      // Adicionar CSS para ocultar badge
      css += `
        [class*="lovable"], 
        [id*="lovable"], 
        a[href*="lovable.dev"],
        aside:has(a[href*="lovable"]) {
          display: none !important;
          visibility: hidden !important;
        }
      `
      return new NextResponse(css, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for JavaScript, reescrever URLs
    if (contentType.includes('javascript') || contentType.includes('application/json')) {
      let content = await response.text()
      const baseUrl = getBaseUrl(request)
      content = content.replace(
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        baseUrl
      )
      return new NextResponse(content, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Para outros tipos, retornar como stream
    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error('[Proxy Error]:', error)
    return NextResponse.json(
      { error: 'Proxy error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const fullPath = '/' + (path?.join('/') || '')
  return handleProxy(request, fullPath)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const fullPath = '/' + (path?.join('/') || '')
  return handleProxy(request, fullPath)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const fullPath = '/' + (path?.join('/') || '')
  return handleProxy(request, fullPath)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const fullPath = '/' + (path?.join('/') || '')
  return handleProxy(request, fullPath)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const fullPath = '/' + (path?.join('/') || '')
  return handleProxy(request, fullPath)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'access-control-allow-headers': '*',
      'access-control-max-age': '86400',
    },
  })
}
