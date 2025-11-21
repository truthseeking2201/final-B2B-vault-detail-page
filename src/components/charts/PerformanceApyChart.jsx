import { useMemo, useState } from 'react'
import { performanceApyData } from '../../mock/vaultCharts'

const WIDTH = 720
const HEIGHT = 240
const MARGIN = 12

function formatPct(v) {
  return `${(v * 100).toFixed(2)}%`
}

export default function PerformanceApyChart() {
  const [hoverIndex, setHoverIndex] = useState(null)

  const { bars } = useMemo(() => {
    const apyVals = performanceApyData.map((d) => d.apy)
    const cumVals = performanceApyData.map((d) => d.cumulativeYield)
    const maxVal = Math.max(...apyVals, ...cumVals) || 1
    const minVal = Math.min(...apyVals, ...cumVals, 0)
    const range = maxVal - minVal || 1
    const innerW = WIDTH - MARGIN * 2
    const innerH = HEIGHT - MARGIN * 2
    const barW = innerW / performanceApyData.length

    const mapped = performanceApyData.map((d, idx) => {
      const x = MARGIN + idx * barW
      const apyHeight = ((d.apy - minVal) / range) * innerH
      const lineY = MARGIN + (1 - (d.cumulativeYield - minVal) / range) * innerH
      return {
        ...d,
        x,
        barWidth: Math.max(6, barW * 0.7),
        barHeight: apyHeight,
        barY: HEIGHT - MARGIN - apyHeight,
        lineY,
      }
    })

    return { bars: mapped }
  }, [])

  const handleEnter = (idx) => setHoverIndex(idx)
  const handleLeave = () => setHoverIndex(null)

  const active = hoverIndex !== null ? bars[hoverIndex] : bars[bars.length - 1]

  const labelIndexes = useMemo(() => {
    const arr = []
    bars.forEach((_, idx) => {
      if (idx === 0 || idx === bars.length - 1 || idx % 6 === 0) arr.push(idx)
    })
    return new Set(arr)
  }, [bars])

  const linePath = useMemo(() => {
    if (!bars.length) return ''
    return bars
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x + p.barWidth / 2} ${p.lineY}`)
      .join(' ')
  }, [bars])

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#202126] pb-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-[220px]">
        <defs>
          <linearGradient id="apy-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a8bff" />
            <stop offset="100%" stopColor="#1d67ff" />
          </linearGradient>
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="#202126" rx="12" />

        {Array.from({ length: 4 }).map((_, idx) => {
          const y = MARGIN + ((idx + 1) / 4) * (HEIGHT - MARGIN * 2)
          return (
            <line
              key={`gy-${idx}`}
              x1={MARGIN}
              x2={WIDTH - MARGIN}
              y1={y}
              y2={y}
              stroke="#1f2433"
              strokeWidth="1"
            />
          )
        })}

        <path
          d={linePath}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transition: 'all 200ms ease' }}
        />

        {bars.map((bar, idx) => (
          <rect
            key={bar.date}
            x={bar.x + bar.barWidth * 0.15}
            y={bar.barY}
            width={bar.barWidth}
            height={bar.barHeight}
            rx="4"
            ry="4"
            fill="url(#apy-bar)"
            opacity={hoverIndex === null || hoverIndex === idx ? 1 : 0.45}
            style={{ transition: 'opacity 150ms ease, transform 200ms ease', transformOrigin: 'bottom' }}
            onMouseEnter={() => handleEnter(idx)}
            onMouseLeave={handleLeave}
          />
        ))}

        {bars.map((bar, idx) =>
          labelIndexes.has(idx) ? (
            <text
              key={`lbl-${bar.date}`}
              x={bar.x + bar.barWidth / 2}
              y={HEIGHT - 2}
              textAnchor="middle"
              fill="#7f8595"
              fontSize="10"
            >
              {new Date(bar.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </text>
          ) : null,
        )}
      </svg>

      <div className="absolute bottom-1 left-3 flex items-center gap-4 text-xs text-[#9ca3af]">
        <div className="flex items-center gap-1">
          <span className="h-[2px] w-4 rounded bg-[#e5e7eb]" />
          <span>Cumulative Yields</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-[10px] w-4 rounded bg-gradient-to-b from-[#3a8bff] to-[#1d67ff]" />
          <span>APY</span>
        </div>
      </div>

      {active && (
        <div
          className="pointer-events-none absolute min-w-[180px] rounded-xl border border-[#202637] bg-[#0f1118] px-3 py-2 text-xs text-gray-200 shadow-lg"
          style={{
            left: `calc(${((active.x + active.barWidth / 2) / WIDTH) * 100}% - 90px)`,
            top: 10,
          }}
        >
          <p className="text-sm font-semibold text-white">{active.label}</p>
          <div className="mt-1 space-y-1 text-[11px] text-[#9ca3af]">
            <div className="flex items-center justify-between">
              <span>APY</span>
              <span className="text-white font-semibold">{formatPct(active.apy)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cumulative Yields</span>
              <span className="text-white font-semibold">{formatPct(active.cumulativeYield)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
