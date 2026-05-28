'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Menu, 
  X, 
  ChevronRight,
  Calendar,
  Truck,
  QrCode,
  Shield,
  BarChart3,
  Clock,
  Users,
  FileText,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Package,
  ClipboardCheck,
  Bell,
  Lock,
  Layers,
  Settings,
  PieChart,
  FileSpreadsheet,
  MapPin,
  UserCheck,
  Warehouse,
  Scale,
  Workflow,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const WHATSAPP_NUMBER = '5511989387263'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse no sistema de Agendamento de Entregas da KoreNexus.`
const EMAIL = 'Ohany@korenexus.com.br'

export function AgendamentoHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="KoreNexus" 
                width={40} 
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-foreground">KoreNexus</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </Link>
              <Link href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Benefícios
              </Link>
              <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Como Funciona
              </Link>
              <Link href="#contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Falar no WhatsApp
              </Button>
            </Link>
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Solicitar Demonstração
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground">
                Funcionalidades
              </Link>
              <Link href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground">
                Benefícios
              </Link>
              <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground">
                Como Funciona
              </Link>
              <Link href="#contato" className="text-sm text-muted-foreground hover:text-foreground">
                Contato
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    Falar no WhatsApp
                  </Button>
                </Link>
                <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="w-full">
                    Solicitar Demonstração
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export function AgendamentoHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Sistema de Agendamento Inteligente
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
              Gerencie suas
              <span className="block text-primary">Entregas</span>
              com Precisão
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Plataforma completa para agendamento e controle de recebimento de mercadorias. 
              Elimine filas, reduza tempo de espera e aumente a eficiência do seu centro de distribuição.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Agendar Demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#funcionalidades">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  Ver Funcionalidades
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Redução de Filas</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">45min</div>
                <div className="text-sm text-muted-foreground">Tempo Médio Salvo</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Rastreabilidade</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">
                  Painel de Agendamento
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Doca 01</div>
                        <div className="text-xs text-muted-foreground">08:00 - 09:00</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-600 rounded-full">
                      Confirmado
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Doca 02</div>
                        <div className="text-xs text-muted-foreground">09:30 - 10:30</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-600 rounded-full">
                      Aguardando
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Doca 03</div>
                        <div className="text-xs text-muted-foreground">11:00 - 12:00</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-600 rounded-full">
                      Descarregando
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating QR Code card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl border border-border shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">QR Code</div>
                  <div className="font-semibold text-sm">Check-in Rápido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mainFeatures = [
  {
    icon: Calendar,
    title: 'Agendamento Online',
    description: 'Portal exclusivo para fornecedores realizarem agendamentos 24/7 com geração automática de QR Code para identificação.'
  },
  {
    icon: Warehouse,
    title: 'Gestão de Docas',
    description: 'Controle visual de ocupação das docas em tempo real. Configure capacidade, localização e disponibilidade.'
  },
  {
    icon: Workflow,
    title: 'Fluxo Completo',
    description: 'Acompanhe todo o ciclo: Pendente → Aprovado → Chegada → Descarregando → Finalizado com logs automáticos.'
  },
  {
    icon: BarChart3,
    title: 'Dashboard & Relatórios',
    description: 'Métricas de SLA, ocupação e status em tempo real. Exportação para Excel e PDF com relatórios avançados.'
  },
  {
    icon: Shield,
    title: 'Multi-Tenant Seguro',
    description: 'Cada empresa possui ambiente isolado com dados segregados. Login por papel: Admin, PCP, Portaria, Fiscal.'
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Integrada',
    description: 'Chat interno, notificações WhatsApp automáticas e e-mails por status. Templates personalizáveis.'
  }
]

export function AgendamentoFeatures() {
  return (
    <section id="funcionalidades" className="py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Funcionalidades Principais
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para gerenciar o recebimento de mercadorias com eficiência e controle total.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const detailedFeatures = [
  {
    category: 'Autenticação e Acesso',
    icon: Lock,
    items: [
      'Login segregado: Admin (empresa) e Fornecedor (auto-cadastro por CNPJ)',
      'Modos de acesso: Administrador, PCP, Portaria, Fiscal',
      'Redirecionamento automático por papel de usuário',
      'Recuperação e reset de senha por administrador'
    ]
  },
  {
    category: 'Agendamentos',
    icon: Calendar,
    items: [
      'Criação pelo fornecedor via portal com QR Code automático',
      'Campos: motorista, documento, placa, transportadora, tipo veículo',
      'Volume, carga, peso, NF com numeração automática de ticket',
      'Status completo: Pendente → Aprovado → Chegada → Descarregando → Finalizado',
      'Reagendamento e cancelamento com registro de transições'
    ]
  },
  {
    category: 'Painel de Recebimento (PCP)',
    icon: ClipboardCheck,
    items: [
      'Aprovação/rejeição de agendamentos com motivo',
      'Visualização em grade por doca e horário',
      'Cálculo automático de durações: espera, descarga, tempo total',
      'Comparação peso previsto x peso real'
    ]
  },
  {
    category: 'Portaria',
    icon: Building2,
    items: [
      'Confirmação de chegada do veículo',
      'Listagem de aprovados aguardando',
      'Check-in via QR Code do agendamento',
      'Controle de acesso simplificado'
    ]
  },
  {
    category: 'Portal Fiscal',
    icon: FileText,
    items: [
      'Marcar início e fim de descarga',
      'Verificação de documentos e inspeção de veículo',
      'Registro de lacre, peso real, observações',
      'Finalização e registro de ocorrências'
    ]
  },
  {
    category: 'Cadastros',
    icon: Users,
    items: [
      'Fornecedores com consulta automática de CNPJ',
      'Docas: capacidade, localização, mapa visual',
      'Motoristas (cadastro automático dos agendamentos)',
      'Motoristas bloqueados com motivo',
      'Produtos: SKU, unidade, preço padrão'
    ]
  },
  {
    category: 'Agenda & Configurações',
    icon: Settings,
    items: [
      'Calendário visual e listagem de agenda',
      'Capacidade de recebimento por dia/hora/doca',
      'Regras: antecedência mínima, máx. por dia/hora/doca',
      'Horário de recebimento, dias bloqueados',
      'Janela de tolerância de chegada',
      'Templates de mensagens WhatsApp por status'
    ]
  },
  {
    category: 'Notas Fiscais e Documentos',
    icon: FileSpreadsheet,
    items: [
      'Upload de NF com armazenamento seguro',
      'Gerenciador de NF: chave, série, valor, data',
      'Documentos do agendamento com verificação',
      'PDF de ordem aprovada e individual'
    ]
  }
]

export function AgendamentoDetailedFeatures() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Funcionalidades Detalhadas
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça todos os módulos e recursos disponíveis no sistema de agendamento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {detailedFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.category}</h3>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: Clock,
    title: 'Reduza Tempo de Espera',
    description: 'Elimine filas e reduza o tempo de permanência dos veículos em até 45 minutos por entrega.',
    stat: '-45min'
  },
  {
    icon: PieChart,
    title: 'Aumente a Eficiência',
    description: 'Otimize a utilização das docas e aumente a capacidade de recebimento do seu CD.',
    stat: '+35%'
  },
  {
    icon: Scale,
    title: 'Controle Total',
    description: 'Rastreie cada etapa do processo com logs automáticos e histórico completo.',
    stat: '100%'
  },
  {
    icon: Bell,
    title: 'Comunicação Automatizada',
    description: 'Notificações automáticas via WhatsApp e e-mail mantêm todos informados.',
    stat: '24/7'
  }
]

export function AgendamentoBenefits() {
  return (
    <section id="beneficios" className="py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Benefícios para sua Operação
          </h2>
          <p className="text-lg text-muted-foreground">
            Resultados comprovados que transformam a gestão logística da sua empresa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="relative group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-3xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                {benefit.stat}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    number: '01',
    title: 'Fornecedor Agenda',
    description: 'O fornecedor acessa o portal, seleciona data/hora disponível e preenche os dados da entrega.'
  },
  {
    number: '02',
    title: 'PCP Aprova',
    description: 'O time de PCP recebe a solicitação, analisa e aprova ou solicita ajustes.'
  },
  {
    number: '03',
    title: 'Chegada na Portaria',
    description: 'Motorista apresenta QR Code, portaria confirma chegada e libera para doca.'
  },
  {
    number: '04',
    title: 'Descarga e Conferência',
    description: 'Fiscal acompanha descarga, confere documentos e registra peso real.'
  },
  {
    number: '05',
    title: 'Finalização',
    description: 'Sistema registra tempos, gera relatórios e notifica todas as partes.'
  }
]

export function AgendamentoHowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground">
            Um fluxo simples e eficiente do agendamento à finalização.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AgendamentoCTA() {
  return (
    <section id="contato" className="py-20 lg:py-32 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card rounded-3xl border border-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Pronto para Otimizar seu Recebimento?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Entre em contato conosco e descubra como o Sistema de Agendamento pode transformar a logística da sua empresa.
                </p>
                
                <div className="space-y-4">
                  <Link 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-green-600 transition-colors">
                        WhatsApp
                      </div>
                      <div className="text-sm text-muted-foreground">+55 11 98938-7263</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-green-600 transition-colors" />
                  </Link>
                  
                  <Link 
                    href={`mailto:${EMAIL}?subject=Interesse no Sistema de Agendamento`}
                    className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        E-mail
                      </div>
                      <div className="text-sm text-muted-foreground">{EMAIL}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Solicite uma Demonstração
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Nome</label>
                    <input 
                      type="text" 
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Empresa</label>
                    <input 
                      type="text" 
                      placeholder="Nome da empresa"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
                    <input 
                      type="email" 
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                      Enviar Solicitação
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AgendamentoFooter() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="KoreNexus" 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-semibold text-foreground">KoreNexus</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Início
            </Link>
            <Link href="#funcionalidades" className="hover:text-foreground transition-colors">
              Funcionalidades
            </Link>
            <Link href="#contato" className="hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KoreNexus. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
