import { useMemo, useRef, useState } from 'react'
import { vaultSharePriceData } from '../../mock/vaultCharts'

const WIDTH = 720
const HEIGHT = 240
const MARGIN = 12

function formatPrice(v) {
  return `$${v.toFixed(4)}`
}

export default function VaultSharePriceChart() {
  const [hoverIndex, setHoverIndex] = useState(null)
  const svgRef = useRef(null)

  const { points } = useMemo(() => {
    const min = Math.min(...vaultSharePriceData.map((d) => d.sharePrice))
    const max = Math.max(...vaultSharePriceData.map((d) => d.sharePrice))
    const range = max - min || 1
    const innerW = WIDTH - MARGIN * 2
    const innerH = HEIGHT - MARGIN * 2

    const pts = vaultSharePriceData.map((d, idx) => {
      const x = MARGIN + (idx / (vaultSharePriceData.length - 1)) * innerW
      const y =
        MARGIN + (1 - (d.sharePrice - min) / range) * innerH
      return { ...d, x, y }
    })

    return { points: pts }
  }, [])

  const pathD = useMemo(() => {
    if (!points.length) return ''
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  }, [points])

  const areaD = useMemo(() => {
    if (!points.length) return ''
    return `${pathD} L ${points[points.length - 1].x} ${HEIGHT - MARGIN} L ${
      points[0].x
    } ${HEIGHT - MARGIN} Z`
  }, [pathD, points])

  const activeIndex = hoverIndex ?? points.length - 1
  const active = points[activeIndex]

  const handleMove = (e) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const innerW = WIDTH - MARGIN * 2
    const ratio = (x - MARGIN) / innerW
    const idx = Math.max(
      0,
      Math.min(points.length - 1, Math.round(ratio * (points.length - 1))),
    )
    setHoverIndex(idx)
  }

  const handleLeave = () => setHoverIndex(null)

  // Label thinning for mobile: show first, mid, last only
  const labelIndexes = useMemo(() => {
    const arr = []
    points.forEach((_, idx) => {
      if (idx === 0 || idx === points.length - 1 || idx === Math.floor(points.length / 2)) {
        arr.push(idx)
      }
    })
    return new Set(arr)
  }, [points])

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#202126] pb-3">
      <div
        ref={svgRef}
        className="relative w-full"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-[220px]">
          <defs>
            <linearGradient id="vault-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e7bff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#2e7bff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width={WIDTH} height={HEIGHT} fill="#202126" rx="12" />

          {/* Grid */}
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

          <path d={areaD} fill="url(#vault-area)" />
          <path
            d={pathD}
            fill="none"
            stroke="#2e7bff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke 200ms ease, opacity 200ms ease' }}
          />

          {/* Active dot */}
          {active && (
            <g>
              <circle cx={active.x} cy={active.y} r="7" fill="#2e7bff" stroke="#fff" strokeWidth="2" />
              {hoverIndex !== null && (
                <line
                  x1={active.x}
                  x2={active.x}
                  y1={MARGIN}
                  y2={HEIGHT - MARGIN}
                  stroke="#4b5563"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}
            </g>
          )}

          {/* X labels (thinned) */}
          {points.map((p, idx) =>
            labelIndexes.has(idx) ? (
              <text
                key={p.date}
                x={p.x}
                y={HEIGHT - 4}
                textAnchor="middle"
                fill="#7f8595"
                fontSize="10"
              >
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </text>
            ) : null,
          )}
        </svg>
      </div>

      {active && (
        <div
          className="pointer-events-none absolute min-w-[180px] rounded-xl border border-[#202637] bg-[#0f1118] px-3 py-2 text-xs text-gray-200 shadow-lg"
          style={{
            left: `calc(${(active.x / WIDTH) * 100}% - 90px)`,
            top: 12,
          }}
        >
          <p className="text-sm font-semibold text-white">{active.label}</p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[#9ca3af]">
            <span>Share Price</span>
            <span className="text-white font-semibold">{formatPrice(active.sharePrice)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
