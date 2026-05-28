import { generateSEOMetadata } from '@/components/seo/seo-head'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { LocalBusinessSchema, FAQSchema } from '@/components/seo/json-ld'
import { DirectAnswerBox, KeyPoints, SummaryTable } from '@/components/seo/ai-overview-content'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sistemas-jundiai.lovable.app'

// Metadata otimizada para SEO
export const metadata = generateSEOMetadata({
  title: 'Sistemas Jundiaí - Soluções Tecnológicas',
  description: 'Desenvolvimento de sistemas, aplicativos e soluções web personalizadas para empresas em Jundiaí e região. Transforme seu negócio com tecnologia.',
  path: '/',
  keywords: [
    'sistemas jundiaí',
    'desenvolvimento software',
    'aplicativos',
    'soluções web',
    'tecnologia',
    'automação empresarial',
  ],
})

// FAQ para AI Overviews e Schema
const faqItems = [
  {
    question: 'Quais serviços são oferecidos?',
    answer: 'Oferecemos desenvolvimento de sistemas web, aplicativos mobile, automação de processos, integração de sistemas e consultoria tecnológica para empresas de todos os portes.',
  },
  {
    question: 'Qual a área de atendimento?',
    answer: 'Atendemos principalmente empresas em Jundiaí e região metropolitana, mas também realizamos projetos remotos para todo o Brasil.',
  },
  {
    question: 'Como funciona o processo de desenvolvimento?',
    answer: 'Nosso processo inclui: análise de requisitos, proposta técnica, desenvolvimento iterativo, testes e homologação, implantação e suporte contínuo.',
  },
]

// Informações do negócio para Schema
const businessInfo = {
  name: 'Sistemas Jundiaí',
  description: 'Empresa especializada em desenvolvimento de sistemas e soluções tecnológicas.',
  telephone: '+55-11-99999-9999',
  email: 'contato@sistemasjundiai.com.br',
  address: {
    streetAddress: 'Rua Principal, 123',
    addressLocality: 'Jundiaí',
    addressRegion: 'SP',
    postalCode: '13201-000',
    addressCountry: 'BR',
  },
  geo: {
    latitude: -23.1868,
    longitude: -46.8844,
  },
  priceRange: '$$',
}

export default function HomePage() {
  return (
    <>
      {/* Dados Estruturados */}
      <LocalBusinessSchema {...businessInfo} />
      <FAQSchema items={faqItems} />

      <div className="min-h-screen bg-background">
        {/* Navegação com Breadcrumbs */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs items={[]} />
          </div>
        </header>

        {/* Conteúdo Principal - Resposta Direta para AI Overviews */}
        <section className="container mx-auto px-4 py-8">
          {/* Resposta direta estruturada no topo para Google AI Overviews */}
          <DirectAnswerBox
            question="O que é Sistemas Jundiaí?"
            answer="Sistemas Jundiaí é uma empresa especializada em desenvolvimento de software, sistemas web e aplicativos móveis para empresas na região de Jundiaí, SP. Oferecemos soluções tecnológicas personalizadas para automatizar processos e impulsionar negócios."
            className="mb-8"
          />

          {/* Pontos-chave em lista semântica */}
          <KeyPoints
            title="Nossos Principais Serviços"
            points={[
              'Desenvolvimento de sistemas web personalizados',
              'Criação de aplicativos mobile (iOS e Android)',
              'Automação de processos empresariais',
              'Integração de sistemas e APIs',
              'Consultoria em tecnologia da informação',
              'Suporte técnico e manutenção',
            ]}
            className="mb-8"
          />

          {/* Tabela de resumo em HTML semântico */}
          <SummaryTable
            title="Informações de Contato"
            data={[
              { label: 'Localização', value: 'Jundiaí, SP - Brasil' },
              { label: 'Telefone', value: '+55 (11) 99999-9999' },
              { label: 'Email', value: 'contato@sistemasjundiai.com.br' },
              { label: 'Horário', value: 'Segunda a Sexta, 9h às 18h' },
            ]}
            className="mb-8"
          />

          {/* FAQ Section com HTML semântico */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Perguntas Frequentes
            </h2>
            <dl className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <dt className="font-medium text-foreground">{item.question}</dt>
                  <dd className="mt-2 text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>

        {/* Footer com informações estruturadas */}
        <footer className="border-t bg-card mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Sobre</h3>
                <p className="text-sm text-muted-foreground">
                  Sistemas Jundiaí - Soluções tecnológicas para transformar seu negócio.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Contato</h3>
                <address className="text-sm text-muted-foreground not-italic">
                  <p>Rua Principal, 123</p>
                  <p>Jundiaí, SP - 13201-000</p>
                  <p>Tel: +55 (11) 99999-9999</p>
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Links Úteis</h3>
                <nav aria-label="Links do rodapé">
                  <ul className="text-sm space-y-2">
                    <li>
                      <a href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                        Sobre Nós
                      </a>
                    </li>
                    <li>
                      <a href="/servicos" className="text-muted-foreground hover:text-foreground transition-colors">
                        Serviços
                      </a>
                    </li>
                    <li>
                      <a href="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
                        Contato
                      </a>
                    </li>
                    <li>
                      <a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Sistemas Jundiaí. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
