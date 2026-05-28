import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string
  width: number
  height: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

/**
 * Componente de imagem otimizada para Core Web Vitals
 * - Declara width e height explicitamente para evitar CLS
 * - Usa loading lazy por padrão para LCP
 * - Suporta priority para imagens above-the-fold
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading,
  className = '',
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={loading || (priority ? 'eager' : 'lazy')}
      className={className}
      // Placeholder para evitar CLS
      placeholder="empty"
      // Otimização de qualidade
      quality={85}
      // Tamanhos responsivos
      sizes={props.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      {...props}
    />
  )
}

interface ResponsiveImageProps {
  src: string
  alt: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9'
  priority?: boolean
  className?: string
  containerClassName?: string
}

const aspectRatioMap = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:2': 'aspect-[3/2]',
  '21:9': 'aspect-[21/9]',
}

/**
 * Imagem responsiva com aspect ratio fixo para evitar CLS
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16:9',
  priority = false,
  className = '',
  containerClassName = '',
}: ResponsiveImageProps) {
  return (
    <div
      className={`relative overflow-hidden ${aspectRatioMap[aspectRatio]} ${containerClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
    </div>
  )
}

interface BackgroundImageProps {
  src: string
  alt: string
  children: React.ReactNode
  priority?: boolean
  className?: string
  overlayClassName?: string
}

/**
 * Imagem de background otimizada
 */
export function BackgroundImage({
  src,
  alt,
  children,
  priority = false,
  className = '',
  overlayClassName = '',
}: BackgroundImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover"
        sizes="100vw"
        quality={80}
      />
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
