import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/json-ld'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sistemas-jundiai.lovable.app'
const SITE_NAME = 'Sistemas Jundiaí'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Sistemas e soluções tecnológicas para Jundiaí e região. Desenvolvimento de software, aplicativos e sistemas web personalizados.',
  keywords: ['sistemas', 'jundiaí', 'tecnologia', 'software', 'desenvolvimento', 'aplicativos', 'web'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: 'Next.js',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: 'Sistemas e soluções tecnológicas para Jundiaí e região.',
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Sistemas e soluções tecnológicas para Jundiaí e região.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    // google: 'seu-codigo-google',
    // yandex: 'seu-codigo-yandex',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <head>
        {/* Preconnect para recursos externos - melhora LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos que serão usados */}
        <link rel="dns-prefetch" href="https://sistemas-jundiai.lovable.app" />
        
        {/* Structured Data - Organization */}
        <OrganizationSchema
          name={SITE_NAME}
          description="Sistemas e soluções tecnológicas para Jundiaí e região."
          url={BASE_URL}
          logo={`${BASE_URL}/logo.png`}
          sameAs={[
            // Adicione suas redes sociais aqui
            // 'https://facebook.com/sistemasjundiai',
            // 'https://instagram.com/sistemasjundiai',
          ]}
          contactPoint={{
            telephone: '+55-11-99999-9999',
            contactType: 'customer service',
            areaServed: 'BR',
            availableLanguage: ['Portuguese'],
          }}
        />
        
        {/* Structured Data - WebSite */}
        <WebSiteSchema
          name={SITE_NAME}
          description="Sistemas e soluções tecnológicas para Jundiaí e região."
          url={BASE_URL}
          potentialAction={{
            target: `${BASE_URL}/busca?q={search_term_string}`,
            queryInput: 'required name=search_term_string',
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {/* Skip link para acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          Pular para o conteúdo principal
        </a>
        
        <main id="main-content">
          {children}
        </main>
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
