import { NextRequest, NextResponse } from 'next/server'

const TARGET_URL = 'https://sistemas-jundiai.lovable.app'

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
      
      // Reescrever URLs absolutas para o domínio target
      html = html.replace(
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        ''
      )
      
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
      css = css.replace(
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        ''
      )
      return new NextResponse(css, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    // Se for JavaScript, reescrever URLs
    if (contentType.includes('javascript') || contentType.includes('application/json')) {
      let content = await response.text()
      content = content.replace(
        new RegExp(`https?://sistemas-jundiai\\.lovable\\.app`, 'g'),
        ''
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
