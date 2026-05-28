const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sistemas-jundiai.lovable.app'

interface CanonicalLinkProps {
  path?: string
}

export function CanonicalLink({ path = '' }: CanonicalLinkProps) {
  const canonicalUrl = `${BASE_URL}${path}`

  return <link rel="canonical" href={canonicalUrl} />
}

// Função helper para gerar metadata com canonical
export function generateCanonicalMetadata(path: string) {
  const canonicalUrl = `${BASE_URL}${path}`

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
