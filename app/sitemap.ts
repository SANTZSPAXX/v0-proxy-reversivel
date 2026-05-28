import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sistemas-jundiai.lovable.app'

// Defina suas páginas aqui
const staticPages = [
  '',
  '/sobre',
  '/servicos',
  '/contato',
  '/faq',
  '/blog',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString()

  // Páginas estáticas
  const staticRoutes = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Você pode adicionar páginas dinâmicas aqui
  // const dynamicPages = await fetchDynamicPages()

  return [...staticRoutes]
}
