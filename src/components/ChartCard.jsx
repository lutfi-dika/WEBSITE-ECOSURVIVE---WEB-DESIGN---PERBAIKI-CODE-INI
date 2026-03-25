import { motion as Motion } from 'framer-motion'
import { hoverLift, revealUp } from '../utils/animations'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const buildLinePath = (values, width, height, padding) => {
  if (values.length === 0) return ''

  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  return values
    .map((value, index) => {
      const x = padding + (innerWidth * index) / Math.max(values.length - 1, 1)
      const y = padding + innerHeight - ((value - min) / range) * innerHeight
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

const buildAreaPath = (values, width, height, padding) => {
  if (values.length === 0) return ''

  const innerWidth = width - padding * 2
  const baseY = height - padding

  return `${buildLinePath(values, width, height, padding)} L ${padding + innerWidth} ${baseY} L ${padding} ${baseY} Z`
}

const ChartLegend = ({ labels = [], colors = [] }) => {
  if (labels.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
      {labels.map((label, index) => (
        <div key={`${label}-${index}`} className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] || '#0ea5e9' }}
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

const LineChart = ({ dataset, labels, height }) => {
  const width = 560
  const padding = 32
  const values = dataset?.data || []
  const path = buildLinePath(values, width, height, padding)
  const areaPath = buildAreaPath(values, width, height, padding)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((step) => {
          const y = padding + innerHeight * step
          return (
            <line
              key={step}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="rgba(148,163,184,0.18)"
              strokeDasharray="6 6"
            />
          )
        })}

        <path d={areaPath} fill={dataset?.backgroundColor || 'rgba(2,132,199,0.12)'} />
        <path
          d={path}
          fill="none"
          stroke={dataset?.borderColor || '#0284c7'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {values.map((value, index) => {
          const x = padding + (innerWidth * index) / Math.max(values.length - 1, 1)
          const y = padding + innerHeight - ((value - min) / range) * innerHeight

          return (
            <g key={`${value}-${index}`}>
              <circle cx={x} cy={y} r="5" fill={dataset?.pointBackgroundColor || '#f97316'} />
              <circle cx={x} cy={y} r="10" fill="transparent">
                <title>{`${labels[index]}: ${value}`}</title>
              </circle>
            </g>
          )
        })}
      </svg>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-6">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}

const BarChart = ({ dataset, labels, height }) => {
  const values = dataset?.data || []
  const max = Math.max(...values, 1)
  const colors = Array.isArray(dataset?.backgroundColor)
    ? dataset.backgroundColor
    : labels.map(() => dataset?.backgroundColor || '#0ea5e9')

  return (
    <div className="flex h-full items-end gap-3">
      {values.map((value, index) => {
        const barHeight = clamp((value / max) * (height - 44), 12, height - 44)

        return (
          <div key={`${labels[index]}-${value}`} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <span className="text-xs font-semibold text-slate-500">{value}</span>
            <div className="flex h-full w-full items-end rounded-2xl bg-slate-100/80 px-2 pb-2">
              <div
                className="w-full rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                style={{
                  height: `${barHeight}px`,
                  background: `linear-gradient(180deg, ${colors[index]} 0%, rgba(15,23,42,0.92) 180%)`,
                }}
                title={`${labels[index]}: ${value}`}
              />
            </div>
            <span className="text-center text-xs text-slate-500">{labels[index]}</span>
          </div>
        )
      })}
    </div>
  )
}

const DoughnutChart = ({ dataset, labels }) => {
  const values = dataset?.data || []
  const colors = dataset?.backgroundColor || ['#0ea5e9', '#22c55e', '#f97316', '#a855f7']
  const total = values.reduce((sum, value) => sum + value, 0) || 1

  const segments = values.reduce((accumulator, value, index) => {
    const currentAngle = accumulator.nextAngle
    const angle = (value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    const largeArc = angle > 180 ? 1 : 0
    const start = polarToCartesian(50, 50, 42, endAngle)
    const end = polarToCartesian(50, 50, 42, startAngle)

    accumulator.items.push({
      id: `${labels[index]}-${value}`,
      color: colors[index % colors.length],
      d: `M ${start.x} ${start.y} A 42 42 0 ${largeArc} 0 ${end.x} ${end.y}`,
    })
    accumulator.nextAngle = endAngle
    return accumulator
  }, { items: [], nextAngle: -90 }).items

  return (
    <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-center">
      <div className="mx-auto aspect-square w-full max-w-[220px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(226,232,240,0.95)" strokeWidth="14" />
          {segments.map((segment) => (
            <path
              key={segment.id}
              d={segment.d}
              fill="none"
              stroke={segment.color}
              strokeWidth="14"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="space-y-3">
        {labels.map((label, index) => {
          const value = values[index]
          const percentage = Math.round((value / total) * 100)

          return (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm font-semibold text-slate-800">{label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-500">{percentage}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartVisual = ({ type, data, height }) => {
  const dataset = data?.datasets?.[0]
  const labels = data?.labels || []

  if (!dataset || labels.length === 0) {
    return (
      <div className="grid h-full place-items-center rounded-2xl bg-slate-50 text-sm font-medium text-slate-500">
        Data belum tersedia.
      </div>
    )
  }

  if (type === 'line') return <LineChart dataset={dataset} labels={labels} height={height} />
  if (type === 'doughnut') return <DoughnutChart dataset={dataset} labels={labels} />
  return <BarChart dataset={dataset} labels={labels} height={height} />
}

const ChartCard = ({ title, description, type = 'bar', data, height = 280 }) => {
  const labels = data?.labels || []
  const colors = data?.datasets?.[0]?.backgroundColor
  const legendColors = Array.isArray(colors) ? colors : labels.map(() => colors || '#0ea5e9')

  return (
    <Motion.article
      variants={revealUp}
      whileHover={hoverLift}
      className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)]"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>

      <div
        className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4"
        style={{ minHeight: `${height}px` }}
      >
        <ChartVisual type={type} data={data} height={height - 32} />
      </div>

      {type !== 'doughnut' && <ChartLegend labels={labels} colors={legendColors} />}
    </Motion.article>
  )
}

export default ChartCard
