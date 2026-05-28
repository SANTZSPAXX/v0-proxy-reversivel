import type { Metadata } from 'next'
import {
  AgendamentoHeader,
  AgendamentoHero,
  AgendamentoFeatures,
  AgendamentoDetailedFeatures,
  AgendamentoBenefits,
  AgendamentoHowItWorks,
  AgendamentoCTA,
  AgendamentoFooter
} from '@/components/agendamento/agendamento-sections'
import { 
  OrganizationSchema, 
  WebSiteSchema,
  LocalBusinessSchema,
  FAQSchema
} from '@/components/seo/json-ld'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://korenexus.com.br'

export const metadata: Metadata = {
  title: 'Sistema de Agendamento de Entregas para Logística | KoreNexus',
  description: 'Plataforma completa de agendamento de entregas para centros de distribuição e indústrias. Controle de docas, QR Code, dashboard em tempo real, notificações WhatsApp. Reduza filas e aumente a eficiência.',
  keywords: [
    'agendamento de entregas',
    'sistema de agendamento logística',
    'controle de docas',
    'gestão de recebimento',
    'software logística',
    'agendamento CD',
    'centro de distribuição',
    'controle de entregas',
    'gestão de docas',
    'agendamento fornecedores',
    'QR Code entregas',
    'dashboard logística',
    'SLA entregas',
    'KoreNexus'
  ],
  authors: [{ name: 'KoreNexus' }],
  creator: 'KoreNexus',
  publisher: 'KoreNexus',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: `${BASE_URL}/agendamento`,
  },
  openGraph: {
    title: 'Sistema de Agendamento de Entregas | KoreNexus',
    description: 'Plataforma completa para agendamento e controle de recebimento de mercadorias. Elimine filas, reduza tempo de espera e aumente a eficiência.',
    url: `${BASE_URL}/agendamento`,
    siteName: 'KoreNexus',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sistema de Agendamento de Entregas KoreNexus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistema de Agendamento de Entregas | KoreNexus',
    description: 'Plataforma completa para agendamento e controle de recebimento de mercadorias.',
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
}

const faqItems = [
  {
    question: 'O que é o Sistema de Agendamento de Entregas?',
    answer: 'É uma plataforma completa para gestão de agendamento e recebimento de mercadorias em centros de distribuição e indústrias. Permite que fornecedores agendem entregas online, com controle total de docas, QR Code para check-in, dashboard em tempo real e notificações automáticas.'
  },
  {
    question: 'Como funciona o agendamento pelo fornecedor?',
    answer: 'O fornecedor acessa o portal com seu CNPJ, seleciona a data e horário disponíveis, preenche os dados da entrega (motorista, placa, NF, volume) e recebe automaticamente um QR Code para apresentar na chegada.'
  },
  {
    question: 'Quais são os módulos disponíveis no sistema?',
    answer: 'O sistema possui módulos para: Administração, PCP (aprovação de agendamentos), Portaria (check-in de veículos), Fiscal (conferência e descarga), além de Dashboard, Relatórios, Cadastros e Configurações.'
  },
  {
    question: 'O sistema envia notificações automáticas?',
    answer: 'Sim! O sistema envia notificações via WhatsApp e e-mail para cada mudança de status: aprovação, rejeição, chegada, início de descarga, finalização e ocorrências. Os templates são personalizáveis.'
  },
  {
    question: 'É possível controlar múltiplas docas?',
    answer: 'Sim! Você pode cadastrar todas as docas do seu CD, definir capacidade por doca, horários de funcionamento, e visualizar a ocupação em tempo real através de um mapa visual.'
  },
  {
    question: 'O sistema gera relatórios?',
    answer: 'Sim! O sistema oferece relatórios avançados com métricas de SLA, tempo de espera, tempo de descarga, ocupação das docas, histórico por fornecedor, com exportação para Excel e PDF.'
  },
  {
    question: 'Como solicitar uma demonstração?',
    answer: 'Entre em contato pelo WhatsApp +55 11 98938-7263 ou envie um e-mail para Ohany@korenexus.com.br. Nossa equipe irá agendar uma demonstração personalizada para sua empresa.'
  }
]

export default function AgendamentoPage() {
  return (
    <>
      <head>
        {/* Structured Data - Organization */}
        <OrganizationSchema
          name="KoreNexus"
          description="KoreNexus - Desenvolvimento de Software Sob Medida. Especialistas em sistemas de agendamento e logística."
          url={BASE_URL}
          logo={`${BASE_URL}/logo.png`}
          sameAs={[]}
          contactPoint={{
            telephone: '+55-11-98938-7263',
            contactType: 'sales',
            areaServed: 'BR',
            availableLanguage: ['Portuguese'],
          }}
        />
        
        {/* Structured Data - LocalBusiness */}
        <LocalBusinessSchema
          name="KoreNexus"
          description="Sistema de Agendamento de Entregas para Logística - Plataforma completa para gestão de recebimento de mercadorias."
          url={`${BASE_URL}/agendamento`}
          telephone="+55-11-98938-7263"
          email="Ohany@korenexus.com.br"
          address={{
            streetAddress: 'São Paulo',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            postalCode: '00000-000',
            addressCountry: 'BR',
          }}
          geo={{
            latitude: -23.5505,
            longitude: -46.6333,
          }}
          priceRange="$$"
          openingHours={['Mo-Fr 09:00-18:00']}
        />
        
        {/* Structured Data - FAQ */}
        <FAQSchema items={faqItems} />
        
        {/* Software Application Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Sistema de Agendamento de Entregas KoreNexus',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
                description: 'Solicite uma demonstração gratuita'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '127'
              },
              featureList: [
                'Agendamento online 24/7',
                'QR Code para check-in',
                'Dashboard em tempo real',
                'Controle de docas',
                'Notificações WhatsApp',
                'Relatórios avançados',
                'Multi-tenant seguro'
              ]
            })
          }}
        />
      </head>
      
      <div className="min-h-screen bg-background">
        <AgendamentoHeader />
        <main>
          <AgendamentoHero />
          <AgendamentoFeatures />
          <AgendamentoDetailedFeatures />
          <AgendamentoBenefits />
          <AgendamentoHowItWorks />
          <AgendamentoCTA />
        </main>
        <AgendamentoFooter />
      </div>
    </>
  )
}
