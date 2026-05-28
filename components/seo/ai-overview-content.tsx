interface DirectAnswerBoxProps {
  question: string
  answer: string
  className?: string
}

/**
 * Componente de Resposta Direta para AI Overviews
 * Estruturado para ser facilmente lido por IAs do Google
 */
export function DirectAnswerBox({
  question,
  answer,
  className = '',
}: DirectAnswerBoxProps) {
  return (
    <section
      className={`rounded-lg border bg-card p-6 ${className}`}
      aria-label="Resposta direta"
    >
      <h2 className="mb-3 text-lg font-semibold text-foreground">{question}</h2>
      <p className="text-base leading-relaxed text-muted-foreground">{answer}</p>
    </section>
  )
}

interface KeyPointsProps {
  title: string
  points: string[]
  className?: string
}

/**
 * Lista de pontos-chave estruturada para AI Overviews
 * Usa lista semântica HTML pura
 */
export function KeyPoints({ title, points, className = '' }: KeyPointsProps) {
  return (
    <section className={`rounded-lg border bg-card p-6 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <ul className="list-inside list-disc space-y-2">
        {points.map((point, index) => (
          <li key={index} className="text-muted-foreground">
            {point}
          </li>
        ))}
      </ul>
    </section>
  )
}

interface SummaryTableProps {
  title: string
  data: { label: string; value: string }[]
  className?: string
}

/**
 * Tabela de resumo semântica para AI Overviews
 * Usa tags HTML de tabela puras
 */
export function SummaryTable({ title, data, className = '' }: SummaryTableProps) {
  return (
    <section className={`rounded-lg border bg-card p-6 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <table className="w-full">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b last:border-0"
            >
              <th
                scope="row"
                className="py-3 pr-4 text-left font-medium text-foreground"
              >
                {row.label}
              </th>
              <td className="py-3 text-muted-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

interface StepByStepProps {
  title: string
  steps: { title: string; description: string }[]
  className?: string
}

/**
 * Guia passo a passo estruturado para AI Overviews
 */
export function StepByStep({ title, steps, className = '' }: StepByStepProps) {
  return (
    <section className={`rounded-lg border bg-card p-6 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <ol className="list-inside list-decimal space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="text-foreground">
            <span className="font-medium">{step.title}</span>
            <p className="ml-5 mt-1 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
