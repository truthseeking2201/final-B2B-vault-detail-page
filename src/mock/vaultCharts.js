// Mock data for charts
// Vault share price – 30 days
export const vaultSharePriceData = Array.from({ length: 30 }).map((_, idx) => {
  const date = new Date('2025-07-03')
  date.setDate(date.getDate() - (29 - idx))
  const sharePrice = 1.08 + Math.sin(idx * 0.25) * 0.04 + idx * 0.002
  return {
    date: date.toISOString().slice(0, 10),
    label: date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    sharePrice: Number(sharePrice.toFixed(4)),
  }
})

// Performance – 30 days
export const performanceApyData = Array.from({ length: 30 }).map((_, idx) => {
  const date = new Date('2025-07-03')
  date.setDate(date.getDate() - (29 - idx))
  const apy = 0.08 + Math.sin(idx * 0.35) * 0.04 + idx * 0.0008
  const cumulativeYield = 0.05 + idx * 0.002 + Math.cos(idx * 0.3) * 0.01
  return {
    date: date.toISOString().slice(0, 10),
    label: date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    apy: Number(apy.toFixed(4)),
    cumulativeYield: Number(cumulativeYield.toFixed(4)),
  }
})
