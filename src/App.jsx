import { useMemo, useState } from 'react'
import momentumLogo from './assets/logo-momentum.png'
import mmtSuiLogo from './assets/mmt-sui.svg'
import maxDrawdownIcon from './assets/icon-MaxDrawdown.svg'
import quillauditsLogo from './assets/quillaudits-logo.png'

const navLinks = [
  'Trade',
  'Liquidity',
  'xSUI',
  'Vaults',
  'Portfolio',
  'Bridge',
  'Leaderboard',
]

const distributionRows = [
  {
    user: '0xA1B2...C3D4',
    deposit: '123,456,789.12 USDC',
    value: '$196.49M',
    share: '37.89%',
  },
  {
    user: '0xB2C3...D4E5',
    deposit: '234,567,890.34 USDC',
    value: '$196.49M',
    share: '54.32%',
  },
  {
    user: '0xC3D4...E5F6',
    deposit: '345,678,901.56 USDC',
    value: '$196.49M',
    share: '29.76%',
  },
  {
    user: '0xD4E5...F6G7',
    deposit: '456,789,012.78 USDC',
    value: '$196.49M',
    share: '63.45%',
  },
  {
    user: '0xE5F6...G7H8',
    deposit: '567,890,123.90 USDC',
    value: '$196.49M',
    share: '48.21%',
  },
]

const allocationHistory = [
  {
    date: '2023-10-09 17:01',
    amount: '$1,291.56 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3390...APD ?',
  },
  {
    date: '2023-10-09 17:00',
    amount: '$1,293.95 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3939...APD ?',
  },
  {
    date: '2023-10-09 16:59',
    amount: '$1,339.52 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3939...APD ?',
  },
  {
    date: '2023-10-09 16:58',
    amount: '$1,265.36 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3390...APD ?',
  },
  {
    date: '2023-10-09 16:57',
    amount: '$1,238.95 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3939...APD ?',
  },
  {
    date: '2023-10-09 16:56',
    amount: '$1,268.36 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3939...APD ?',
  },
  {
    date: '2023-10-09 16:55',
    amount: '$1,298.36 USDC',
    asset: '0x3390...APD ?',
    tx: '0x3390...APD ?',
  },
]

const lpBreakdown = [
  { label: 'USDC', percent: 62, amount: '$100,084,918', color: '#3ab4ff' },
  { label: 'SUI', percent: 38, amount: '$400,000,248', color: '#6e7cff' },
]

function App() {
  const [mode, setMode] = useState('vault')
  const [section, setSection] = useState('overview')
  const [depositTab, setDepositTab] = useState('deposit')
  const [zap, setZap] = useState(true)
  const [currency, setCurrency] = useState('USD')
  const [showSuccess, setShowSuccess] = useState(false)

  const depositHandler = () => {
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopBanner />
      <NavBar />
      <main className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 pb-16">
        <div className="mt-6 flex w-full max-w-[1200px] flex-col items-start self-stretch rounded-[24px] border border-[#1F2937] bg-[#202126] p-6 lg:p-7">
          <div className="grid lg:grid-cols-[1.6fr,1fr] gap-6 items-start w-full">
            <div className="space-y-6">
              <VaultHeader currency={currency} setCurrency={setCurrency} />
              <VaultTabs
                mode={mode}
                section={section}
                onModeChange={setMode}
                onSectionChange={setSection}
              />
              {mode === 'vault' ? (
                <>
                  <VaultHero />
                  <SectionTabs section={section} onSectionChange={setSection} />
                  {section === 'overview' && <OverviewSection />}
                  {section === 'risk' && <RiskSection />}
                  {section === 'distribution' && <DistributionSection />}
                  {section === 'activities' && <ActivitiesSection />}
                </>
              ) : (
                <>
                  <PositionsHero />
                  <PositionsSection />
                </>
              )}
            </div>
            <div className="lg:sticky lg:top-6 self-start">
              <DepositCard
                tab={depositTab}
                onTabChange={setDepositTab}
                zap={zap}
                onZapChange={setZap}
                onDeposit={depositHandler}
              />
            </div>
          </div>
        </div>
      </main>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  )
}

function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-[#0052f3] via-[#0f63f6] to-[#00a0ff] text-white text-sm text-center py-2 px-4">
      <span className="inline-flex items-center justify-center gap-2 font-medium">
        <span role="img" aria-label="gift">
          🎁
        </span>
        xBTC is live! Earn $2.5M in rewards and Momentum airdrops at
        <a
          href="#"
          className="underline underline-offset-4 decoration-white hover:opacity-90"
        >
          OKX Earn campaign
        </a>
      </span>
    </div>
  )
}

function NavBar() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur">
      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 py-4 flex items-center gap-6">
        <Logo />
        <nav className="flex-1 hidden md:flex items-center gap-5 text-sm">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="text-gray-300 text-xl">⋯</div>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-lg border border-border bg-panel px-3 py-2 text-sm text-gray-200">
            TVL : <span className="ml-1 font-semibold">$160,364,699</span>
          </div>
          <button className="hidden sm:flex h-[20px] w-[20px] items-center justify-center rounded-full border border-border bg-panel">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#00d0ff] to-[#0047ff]" />
          </button>
          <button className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-panel hover:bg-primaryStrong transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <div className="flex items-center">
      <img src={momentumLogo} alt="Momentum logo" className="h-[20px] w-auto select-none" />
    </div>
  )
}

function VaultHeader({ currency, setCurrency }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <div className="h-8 w-8 grid place-items-center rounded-full bg-panelMuted border border-border">
          <ArrowLeft />
        </div>
        <span className="text-[24px] leading-[31.92px] font-medium text-[#FAFAFA]">
          Deposit
        </span>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-2">
          <img
            src={mmtSuiLogo}
            alt="MMT SUI"
            className="h-[50px] w-[50px] flex-shrink-0 object-contain"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-[28px] leading-[24px] font-medium text-white">
                Steakhouse SUI
              </p>
              <RoundedIcon>ℹ️</RoundedIcon>
              <RoundedIcon>
                <ExternalIcon />
              </RoundedIcon>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1">
                <OrangeDot />
                Powered by <span className="text-orange-400 font-semibold">nodo</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {['USD', 'SUI'].map((item) => (
            <button
              key={item}
              onClick={() => setCurrency(item)}
              className={`h-9 px-4 rounded-lg border text-sm font-semibold transition-colors ${
                currency === item
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-border bg-panel text-gray-300 hover:border-primary/60'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function VaultTabs({ mode, section, onModeChange, onSectionChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-6 text-base font-semibold text-gray-300">
        {['vault', 'positions'].map((item) => (
          <button
            key={item}
            onClick={() => onModeChange(item)}
            className={`flex flex-col items-center rounded-[6px] px-4 pt-[7.25px] pb-[7.77px] ${
              mode === item
                ? 'bg-[rgba(40,112,255,0.30)] text-[#7EA9FF]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {item === 'vault' ? 'Vault' : 'Positions'}
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionTabs({ section, onSectionChange }) {
  if (!section) return null
  return (
    <div className="flex items-center gap-5 text-sm font-semibold text-gray-300">
      {[
        ['overview', 'Overview'],
        ['risk', 'Risk'],
        ['distribution', 'User Distribution'],
        ['activities', 'Activities'],
      ].map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSectionChange(key)}
          className={`flex flex-col items-center rounded-[6px] px-4 pt-[7.25px] pb-[7.77px] ${
            section === key
              ? 'bg-[rgba(40,112,255,0.30)] text-[#7EA9FF]'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function VaultHero() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatBlock
          label="APY"
          value="26.82%"
          helper="+2.82% last 24h"
          positive
          icon={<SparkIcon />}
        />
        <StatBlock
          label="Total Deposits"
          renderContent={<TotalDepositsBlock />}
        />
        <StatBlock
          label="Vault Share Price"
          value="0.425"
          helper="+12.82% last 24h"
          positive
          prefix={<PriceIcon />}
        />
      </div>

      <div className="flex w-full flex-col items-start self-stretch gap-6 rounded-[16px] border border-border bg-[#2B2C31] px-5 py-[17px] text-sm text-gray-100">
        <p className="text-base leading-6 text-gray-200 w-full">
          The Steakhouse SUI vault aims to optimize yields by lending SUI against blue
          chip crypto and real world asset (RWA) collateral markets, depending on market
          conditions. We call this the “dual engine.”
        </p>
        <hr className="w-full border-t border-border" />
        <div className="flex w-full flex-nowrap items-center justify-between gap-10">
          <div className="flex flex-nowrap items-center gap-8 whitespace-nowrap flex-shrink-0">
            <TokenCluster label="Collateral" token={{ name: 'SUI', color: '#6cd1ff' }} />
            <TokenCluster label="Receipt Token" token={{ name: 'NDLP', color: '#f59f0b' }} />
            <TokenCluster label="Incentive Token" token={{ name: 'XP Shares', color: '#faab3d' }} />
          </div>
          <div className="ml-auto flex flex-shrink-0 flex-col gap-1 text-base text-gray-100">
            <div className="flex items-baseline gap-2 text-gray-300">
              <span className="text-white font-semibold">2%</span>
              <span className="text-gray-400">Management Fee</span>
            </div>
            <div className="flex items-baseline gap-2 text-gray-300">
              <span className="text-white font-semibold">14.2%</span>
              <span className="text-gray-400">Performance Fee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PositionsHero() {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-panelMuted px-4 py-3">
          <p className="text-sm text-muted">Total Liquidity</p>
          <div className="flex items-center gap-3 mt-2">
            <RingGauge />
            <div>
              <p className="text-2xl font-semibold text-white">4,926.00</p>
              <p className="text-sm text-muted">≈ $5,216.00</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-panelMuted px-4 py-3">
          <p className="text-sm text-muted">Break-even</p>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-2xl font-semibold text-white">$1.00</p>
            <p className="text-sm text-muted">Current Vault Shares price: $1.12</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-panelMuted">
        <div className="border-b border-border px-5 py-4">
          <p className="text-lg font-semibold text-white">All Time P&amp;L Breakdown</p>
        </div>
        <div className="px-5 py-4 space-y-2 text-sm text-gray-100">
          <BreakdownRow label="Compounded Rewards" value="+$248" positive />
          <BreakdownRow label="Impermanent Loss" value="-$173" />
          <div className="pt-2 border-t border-border/80">
            <BreakdownRow label="Net P&L" value="+$248" positive bold />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBlock({ label, value, helper, positive, icon, prefix, renderContent }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-lg text-gray-400 font-semibold">{label}</p>
      {renderContent ? (
        renderContent
      ) : (
        <>
          <div className="flex items-center gap-3">
            {prefix}
            <span className="flex w-[100px] h-8 flex-col justify-center text-white text-[28px] font-medium leading-[140%]">
              {value}
            </span>
            {icon && <span className="text-3xl">{icon}</span>}
          </div>
          <p
            className={`text-[14px] font-semibold ${
              positive ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {helper}
          </p>
        </>
      )}
    </div>
  )
}

function TotalDepositsBlock() {
  return (
    <div className="flex items-center gap-4">
      <RingGaugeLarge />
      <div className="flex flex-col gap-1">
        <span className="flex w-[112px] h-8 flex-col justify-center text-[28px] font-medium leading-[140%] text-[#FAFBFC]">
          $13.00M
        </span>
        <span className="text-[14px] font-semibold text-gray-400">
          Out of <span className="text-white">$61.09M</span>
        </span>
      </div>
    </div>
  )
}

function RingGaugeLarge() {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(#2e7bff_0deg_250deg,#2b2c31_250deg_360deg)]" />
      <div className="absolute inset-2 rounded-full bg-panel" />
    </div>
  )
}

function TokenRow({ label, tokens }) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-muted text-sm min-w-[90px]">{label}</p>
      <div className="flex items-center gap-2">
        {tokens.map((token) => (
          <span
            key={token.name}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-2 text-sm font-semibold text-gray-100"
          >
            <TokenIcon
              label={token.name.charAt(0)}
              gradient={`linear-gradient(135deg, ${token.color} 0%, #0b62ff 100%)`}
            />
            {token.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function TokenCluster({ label, token }) {
  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
          <span className="token-row-label">{label}</span>
      <div className="flex items-center gap-2 text-lg font-semibold text-white">
        <TokenIcon
          label={token.name.charAt(0)}
          gradient={`linear-gradient(135deg, ${token.color} 0%, #0b62ff 100%)`}
        />
        <span className="leading-none">{token.name}</span>
        <RoundedIcon>
          <ExternalIcon />
        </RoundedIcon>
      </div>
    </div>
  )
}

function DepositCard({ tab, onTabChange, zap, onZapChange, onDeposit }) {
  return (
    <div className="rounded-2xl border border-primary bg-[#0f121c] shadow-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
          {['deposit', 'withdraw'].map((item) => (
            <button
              key={item}
              onClick={() => onTabChange(item)}
              className={`rounded-md px-3 py-2 ${
                tab === item ? 'bg-white text-[#0f121c]' : 'bg-panel text-gray-200'
              }`}
            >
              {item === 'deposit' ? 'Deposit' : 'Withdraw'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <span>Zap in</span>
          <button
            onClick={() => onZapChange(!zap)}
            className={`relative h-6 w-12 rounded-full border border-border transition-colors ${
              zap ? 'bg-primary' : 'bg-panelMuted'
            }`}
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white transition-all ${
                zap ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>Slippage</span>
        <span>0.5%</span>
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Vault APR:</span>
        <span className="text-white font-semibold">1,260.05%</span>
      </div>

      <FieldBlock label="0.1" subLabel="$0.20" badge="USDC" />
      <div className="flex items-center justify-end gap-2 text-xs text-gray-300">
        <button className="rounded-md border border-border px-2 py-1 hover:border-primary/60">
          50%
        </button>
        <button className="rounded-md border border-border px-2 py-1 hover:border-primary/60">
          MAX
        </button>
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Balance: 0103626528</span>
      </div>

      <FieldBlock label="0.1" badge="NDLP" border />

      <button
        onClick={onDeposit}
        className="w-full rounded-lg bg-primary py-3 text-center text-white font-semibold hover:bg-primaryStrong transition-colors"
      >
        {tab === 'deposit' ? 'Deposit' : 'Withdraw'}
      </button>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted pt-2 border-t border-border">
          <span className="uppercase tracking-wide text-green-500 font-semibold">
            Security. Audited by
          </span>
        <span className="audit-logo" aria-label="QuillAudits">
          <img src={quillauditsLogo} alt="QuillAudits logo" className="h-5 w-auto" />
        </span>
        <span>hashlock</span>
        <span>HYBRIDANTIVE</span>
      </div>
    </div>
  )
}

function FieldBlock({ label, subLabel, badge, border }) {
  return (
    <div
      className={`relative rounded-xl ${
        border ? 'border border-border bg-panelMuted' : 'bg-panel'
      } px-4 py-3`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">{label}</p>
          {subLabel && <p className="text-sm text-muted">{subLabel}</p>}
        </div>
        <div className="flex items-center gap-2">
          <TokenIcon label={badge.charAt(0)} />
          <div className="rounded-md border border-border bg-panelMuted px-3 py-2 text-sm font-semibold text-white">
            {badge}
          </div>
          <RoundedIcon>
            <ChevronDown />
          </RoundedIcon>
        </div>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <section className="mt-6 space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-1 flex-col items-start justify-start gap-4 rounded-lg bg-white/5 p-5">
          <div className="flex w-full items-center justify-between text-sm text-gray-200">
            <p className="card-title">Vault Share Price</p>
            <RoundedIcon>1D</RoundedIcon>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-xl border border-[#1F2937] bg-[#202126] overflow-hidden">
            <VaultShareChart />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start justify-start gap-4 rounded-lg bg-white/5 p-5">
          <div className="flex w-full items-center justify-between text-sm text-gray-200">
            <p className="card-title">Performance (APY)</p>
            <RoundedIcon>1D</RoundedIcon>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-xl border border-[#1F2937] bg-[#202126] overflow-hidden">
            <PerformanceChart />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start justify-start gap-4 rounded-lg bg-white/5 p-5">
        <div className="flex items-center justify-between w-full">
          <p className="card-title">Vault Information</p>
        </div>
        <div className="space-y-4 w-full">
          <div className="grid sm:grid-cols-3 gap-6">
            <InfoBlock
              label="Vault Contract Address"
              value="0x24bf...125d"
              cta="Copy"
            />
            <InfoBlock
              label="Liquidity Pool Address"
              value="0x51e8...d2ab"
              cta="Copy"
            />
            <InfoBlock label="Vault Deployment Date" value="12/09/2025 (65 days)" />
          </div>
          <div className="border-t border-border pt-4 space-y-4">
            <h4 className="text-base font-semibold text-gray-100">Vault Token Info</h4>
            <div className="grid sm:grid-cols-3 gap-6">
              <InfoBlock label="Name" value="SUI/USDC Momentum" />
              <InfoBlock label="Symbol" value="NDLP" />
              <InfoBlock label="Price" value="$1.0923 (+7% in 7d)" />
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <InfoBlock label="Contract Address" value="0x2sf…34cb" cta="View" />
              <InfoBlock
                label="Can’t see NDLP in Wallet?"
                value="Watch Tutorial"
                cta="Open"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start justify-start gap-4 rounded-lg bg-white/5 p-5">
        <p className="card-title">Strategy Explanation</p>
        <p className="text-sm text-gray-200 leading-relaxed w-full">
          This vault maintains a balanced approach to liquidity provision on SUI/USDC,
          using AI to predict optimal rebalancing times while minimizing impermanent
          loss. The strategy focuses on sustainable yields with controlled risk
          exposure.
        </p>
        <div className="flex w-full flex-col gap-5 self-stretch rounded-[28px] border border-[#1e2028] bg-[#17181d] p-2 shadow-panel lg:flex-row lg:items-center lg:gap-10 lg:p-2">
          <div className="flex items-center gap-3 rounded-2xl bg-[#292A2F] p-3">
            <div className="grid h-16 w-16 place-items-center rounded-[18px] shadow-lg shadow-transparent">
              <img src={maxDrawdownIcon} alt="Max drawdown icon" className="h-[20px] w-[20px]" />
            </div>

            <div className="flex flex-col gap-1">
              <p
                className="text-lg font-semibold text-transparent"
                style={{
                  fontFamily: '"DM Sans", "Work Sans", system-ui, sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '16px',
                  background:
                    'linear-gradient(90deg, #FFE8C9 0%, #F9F4E9 25%, #E3F6FF 60%, #C9D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Max Drawdown
              </p>
              <p
                className="text-[24px] font-black leading-none"
                style={{
                  fontFamily: '"IBM Plex Mono", "Work Sans", system-ui, sans-serif',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '16px',
                  background:
                    'linear-gradient(90deg, #FFE8C9 0%, #F9F4E9 9.37%, #E3F6FF 22.49%, #C9D4FF 37.48%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                8%
              </p>
            </div>
          </div>

          <p
            className="flex-1 text-[12px] leading-[16.8px] font-normal text-white"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            If your vault position drops by 8%, it will automatically exit and move funds to
            stablecoins, helping protect your capital from further loss.
          </p>
        </div>
      </div>
    </section>
  )
}

function RiskSection() {
  return (
    <section className="mt-6 space-y-6">
      <div className="glass-card shadow-panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="card-title">Risk Disclosures</p>
        </div>
        <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-6">
          <div className="rounded-2xl border border-border bg-panelMuted p-4 space-y-3 text-sm text-gray-200">
            <InfoRow label="Creator" value="51BB" helper="Contract Owner" />
            <InfoRow label="Date" value="2021-09-04" helper="Date of creation" />
            <InfoRow label="Gas Fee" value="SAFE 6/10" helper="Gas Fee & Surcharges" />
            <InfoRow label="Incentives" value="Loss" helper="Platform Incentives" />
            <InfoRow label="Audit" value="SAFE 7/10" helper="Vault version" />
          </div>
          <div className="rounded-2xl border border-border bg-panelMuted p-4 space-y-3 text-sm text-gray-200 leading-relaxed">
            <p className="text-white font-semibold">Market Risk Disclosures</p>
            <p>
              Steakhouse-branded vaults are developed and operated by Cambrialo Tropical
              using stringent governance processes. While market or compliance
              conditions may change, our strategies remain secured by rigorously tested
              controls and risk mitigation to provide steady returns even during
              unexpected volatility.
            </p>
            <p>
              In case of unusual market stress or rapidly rising gas costs the vault
              will prioritize existing risk mitigation and pause new deposits until
              normal conditions resume. Withdrawals remain available according to vault
              policy.
            </p>
            <p className="text-sm text-primary">
              Further details on vault structures and asset choices can be found in{' '}
              <span className="underline">key information on Steakhouse Branded Vaults</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card shadow-panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="card-title">Risk Curation</p>
        </div>
        <div className="rounded-2xl border border-border bg-panelMuted p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-200">
            <InfoRow label="Allocator Address" value="0x0020...6370" />
            <InfoRow label="Allocated Address" value="0x0000...00A0" />
            <InfoRow label="Allocated Assets" value="Oracle, xSUI" />
            <InfoRow label="Risk" value="Checked" />
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <AllocationChart />
          </div>
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="grid grid-cols-[2fr,1fr,1fr] text-xs uppercase tracking-wide text-muted px-4 py-3 border-b border-border">
              <span>Date</span>
              <span>Amount</span>
              <span>Transaction</span>
            </div>
            <div className="divide-y divide-border">
              {allocationHistory.map((row) => (
                <div
                  key={row.date + row.tx}
                  className="grid grid-cols-[2fr,1fr,1fr] items-center px-4 py-3 text-sm text-gray-100"
                >
                  <span>{row.date}</span>
                  <div className="flex items-center gap-2">
                    <TokenIcon label="$" />
                    <span>{row.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{row.tx}</span>
                    <ExternalIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DistributionSection() {
  return (
    <section className="mt-6">
      <div className="glass-card shadow-panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="card-title">User Distribution</p>
          <div className="flex items-center gap-2 text-sm text-muted">
            <RoundedIcon>USD</RoundedIcon>
            <RoundedIcon>3 Months</RoundedIcon>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-panelMuted overflow-hidden">
          <div className="grid grid-cols-[4fr,4fr,3fr] text-xs uppercase tracking-wide text-muted px-4 py-3 border-b border-border">
            <span>User</span>
            <span>Deposit</span>
            <span>% of Deposit</span>
          </div>
          <div className="divide-y divide-border">
            {distributionRows.map((row) => (
              <div
                key={row.user}
                className="grid grid-cols-[4fr,4fr,3fr] items-center px-4 py-4 text-sm text-gray-100"
              >
                <div className="flex items-center gap-2">
                  <TokenIcon label={row.user.charAt(2)} />
                  <span>{row.user}</span>
                  <ExternalIcon />
                </div>
                <div className="flex items-center gap-2">
                  <span>{row.deposit}</span>
                  <span className="rounded-full bg-panel px-2 py-1 text-xs border border-border">
                    {row.value}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-primary grid place-items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>{row.share}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 px-4 py-3 text-sm text-gray-200">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  )
}

function PositionsSection() {
  const donutStyle = useMemo(
    () => ({
      background: `conic-gradient(#3ab4ff 0% ${
        lpBreakdown[0].percent
      }%, #3f4fff ${lpBreakdown[0].percent}% 100%)`,
    }),
    [],
  )

  return (
    <section className="mt-6 space-y-6">
      <div className="glass-card shadow-panel p-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <QuickStat
            title="Total Liquidity"
            value="4,926.00"
            helper="≈ $5,216.00"
            ringColor="#f7931a"
          />
          <QuickStat
            title="Break-even"
            value="$1.00"
            helper="Current NDLP share price: $1.12"
            ringColor="#3ab4ff"
          />
        </div>

        <div className="rounded-2xl border border-border bg-panelMuted">
          <div className="border-b border-border px-5 py-4">
            <p className="text-lg font-semibold text-white">All Time P&amp;L Breakdown</p>
          </div>
          <div className="px-5 py-4 space-y-2 text-sm text-gray-100">
            <BreakdownRow label="Compounded Rewards" value="+$248" positive />
            <BreakdownRow label="Impermanent Loss" value="-$173" />
            <div className="pt-2 border-t border-border/80">
              <BreakdownRow label="Net P&L" value="+$248" positive bold />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-panelMuted p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">Estimated LP Breakdown</p>
            <p className="text-xs text-muted">Secure updates ~1h • Updated 09:23:08</p>
          </div>
          <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-6">
            <div className="space-y-3">
              {lpBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TokenIcon label={item.label === 'USDC' ? 'U' : 'S'} />
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-muted">{item.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-panel px-3 py-1 text-sm font-semibold border border-border">
                      {item.value ?? item.amount}
                    </span>
                    <span className="text-sm text-white">{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-40 w-40 rounded-full border-8 border-panel" style={donutStyle}>
                <div className="absolute inset-4 rounded-full bg-panel"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-panelMuted p-5 space-y-3">
          <p className="text-lg font-semibold text-white">Cashflow</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-100">
            <InfoRow label="Total Deposits" value="$120,684" />
            <InfoRow label="Total Withdrawals" value="$76,927" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ActivitiesSection() {
  return (
    <section className="mt-6">
      <div className="glass-card shadow-panel p-6 flex items-center justify-center text-muted text-sm">
        Activity feed is coming soon.
      </div>
    </section>
  )
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[360px] max-w-[90vw] rounded-2xl bg-[#1f1f22] px-6 py-6 shadow-panel text-center space-y-4">
        <svg
          className="mx-auto h-14 w-14"
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
        >
          <g clipPath="url(#clip0_514_5307)">
            <path
              d="M34 68C52.7777 68 68 52.7777 68 34C68 15.2223 52.7777 0 34 0C15.2223 0 0 15.2223 0 34C0 52.7777 15.2223 68 34 68Z"
              fill="#05C96A"
              fillOpacity="0.25"
            />
            <path
              d="M47.9861 22.3484C48.6696 21.6652 49.7774 21.6651 50.4607 22.3484L52.7937 24.6814C53.4772 25.3649 53.4772 26.4736 52.7937 27.157L31.9764 47.9744C31.8031 48.1476 31.6025 48.2767 31.3885 48.3621C30.7556 48.6207 30.0018 48.493 29.4881 47.9793L17.2508 35.742C16.5674 35.0586 16.5676 33.9508 17.2508 33.2674L19.5838 30.9334C20.2672 30.25 21.376 30.25 22.0594 30.9334L30.7303 39.6043L47.9861 22.3484Z"
              fill="#05C96A"
            />
          </g>
          <defs>
            <clipPath id="clip0_514_5307">
              <rect width="68" height="68" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="space-y-1">
          <p className="modal-title">Transaction Success</p>
          <p className="modal-subtitle">View on Explorer</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ExplorerButton label="SuiVision" active />
          <ExplorerButton label="SuiScan" />
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-md bg-[#3089ff] py-3 text-white font-semibold"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

function ExplorerButton({ label, active }) {
  return (
    <button className={`explorer-button ${active ? 'active shadow-lg' : 'inactive'}`}>
      <TokenIcon label={label === 'SuiVision' ? 'S' : 'O'} />
      <span>{label}</span>
      <span className="explorer-button-icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.3346 8.99942C13.3346 9.92908 13.3346 10.3939 13.2425 10.7775C12.9499 11.9964 11.9983 12.948 10.7794 13.2406C10.3958 13.3327 9.93097 13.3327 9.0013 13.3327H8.0013C6.13446 13.3327 5.20104 13.3327 4.488 12.9694C3.8608 12.6499 3.35086 12.1399 3.03128 11.5127C2.66797 10.7997 2.66797 9.86628 2.66797 7.99942V7.66608C2.66797 6.11292 2.66797 5.33635 2.9217 4.72378C3.26002 3.90702 3.90893 3.2581 4.72569 2.91979C5.2436 2.70527 5.87873 2.67212 7.0013 2.66699M13.1744 6.30238C13.3494 5.21382 13.3811 4.11258 13.2692 3.02694C13.2612 2.9482 13.2266 2.87838 13.1744 2.8262M13.1744 2.8262C13.1223 2.77402 13.0524 2.7395 12.9737 2.73139C11.8881 2.61952 10.7868 2.6513 9.6983 2.8262M13.1744 2.8262L6.66797 9.33268"
            stroke="#174DFF"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}

function QuickStat({ title, value, helper, ringColor }) {
  return (
    <div className="rounded-2xl border border-border bg-panelMuted px-4 py-3 flex items-center gap-4">
      <div
        className="h-12 w-12 rounded-full border-[6px]"
        style={{ borderColor: ringColor }}
      />
      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-sm text-muted">{helper}</p>
      </div>
    </div>
  )
}

function BreakdownRow({ label, value, positive, bold }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-gray-200">{label}</p>
      <p
        className={`${
          positive ? 'text-green-400' : 'text-gray-200'
        } ${bold ? 'font-semibold' : ''}`}
      >
        {value}
      </p>
    </div>
  )
}

function InfoBlock({ label, value, cta }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted">{label}</p>
      <div className="info-value-row">
        {value}
        {cta && <RoundedIcon>{cta === 'Copy' ? '⧉' : '↗'}</RoundedIcon>}
      </div>
    </div>
  )
}

function InfoRow({ label, value, helper }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
      {helper && <p className="text-xs text-muted">{helper}</p>}
    </div>
  )
}

function Pagination() {
  return (
    <div className="flex items-center gap-2">
      {['K', '<', '1', '2', '3', '>', '⏭'].map((item) => (
        <button
          key={item}
          className={`h-8 w-8 rounded-md border border-border bg-panel text-sm font-semibold ${
            item === '2' ? 'bg-primary text-white border-primary' : 'text-gray-200'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function TokenIcon({ label, gradient }) {
  return (
    <div
      className="h-[20px] w-[20px] rounded-full grid place-items-center text-white font-semibold text-sm border border-border"
      style={{
        background:
          gradient ??
          'linear-gradient(135deg, #0e6bff 0%, #53c6ff 100%)',
      }}
    >
      {label}
    </div>
  )
}

function RoundedIcon({ children }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-panel text-sm text-gray-200">
      {children}
    </span>
  )
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-gray-200">
      <path
        d="M11.25 5 6.5 9.75 11.25 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-muted">
      <path
        d="M11 4h5v5m0-5-6 6m-1 1H4v6h6v-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PriceIcon() {
  return (
    <div className="h-[20px] w-[20px] rounded-full bg-[#0f6cff] text-white grid place-items-center text-sm font-semibold">
      1
    </div>
  )
}

function SparkIcon() {
  return <span className="text-green-400">✦</span>
}

function RingIcon() {
  return <div className="h-[20px] w-[20px] rounded-full border-[6px] border-primary" />
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gray-200">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OrangeDot() {
  return <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-400" />
}

function VaultShareChart() {
  const [hoveredData, setHoveredData] = useState(null)

  // Generate chart data
  const data = useMemo(() => {
    const points = []
    const width = 620
    const steps = 60 // Number of data points
    const basePrice = 1.12
    const startDate = new Date('2025-07-03T20:50:00')

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      // Create a "random" but deterministic curve
      const normalizedX = i / steps
      // SVG Y is inverted (0 is top). We want price to go UP (y decreases)
      // Map curve to Y coords (200 to 50)
      const y = 200 - (normalizedX * 80 + Math.sin(i * 0.3) * 15 + Math.cos(i * 0.1) * 10)

      const date = new Date(startDate)
      date.setDate(date.getDate() - (steps - i))
      
      // Simulate a price based on the Y value
      // y=200 -> lowest price, y=50 -> highest
      const price = (basePrice + (200 - y) * 0.001).toFixed(4)

      points.push({
        x,
        y,
        price, 
        date: date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
      })
    }
    return points
  }, [])

  // Create path string from data points
  const pathD = useMemo(() => {
    if (data.length === 0) return ''
    return (
      `M ${data[0].x} ${data[0].y} ` +
      data.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')
    )
  }, [data])

  // Create area path for gradient fill
  const areaD = useMemo(() => {
      if (data.length === 0) return ''
      return `${pathD} L ${data[data.length - 1].x} 260 L ${data[0].x} 260 Z`
  }, [pathD, data])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    
    // Scale x to SVG coordinate space (620 width)
    // We use a safeguard to clamp values
    const svgX = Math.max(0, Math.min(620, (x / rect.width) * 620))

    // Find closest data point
    const closest = data.reduce((prev, curr) => {
      return Math.abs(curr.x - svgX) < Math.abs(prev.x - svgX) ? curr : prev
    })

    setHoveredData(closest)
  }

  const handleMouseLeave = () => {
    setHoveredData(null)
  }

  const activeItem = hoveredData || data[data.length - 1]

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Floating Tooltip */}
       <div className="absolute left-4 top-4 z-10 min-w-[200px] rounded-xl border border-border bg-panel p-3 text-xs text-gray-200 shadow-lg pointer-events-none transition-opacity duration-200">
        <p className="text-muted">{activeItem.date}</p>
        <div className="mt-2 flex items-center justify-between">
          <span>Share Price</span>
          <span className="font-semibold text-white">${activeItem.price}</span>
        </div>
      </div>

      <svg viewBox="0 0 620 260" className="w-full h-[210px] cursor-crosshair">
        <defs>
          <linearGradient id="vaultGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c6bff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1c6bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <rect width="620" height="260" fill="#0f121a" />
        
        {/* Grid Lines */}
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" x2="620" y1={y} y2={y} stroke="#1e2533" strokeWidth="1" />
        ))}
        {[80, 180, 280, 380, 480, 580].map((x) => (
          <line key={x} y1="0" y2="260" x1={x} x2={x} stroke="#1e2533" strokeWidth="1" />
        ))}

        {/* Area Fill */}
        <path d={areaD} fill="url(#vaultGradient)" />

        {/* Line Path */}
        <path
          d={pathD}
          fill="none"
          stroke="#2e7bff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive Elements (visible on hover) */}
        {hoveredData && (
          <>
            {/* Vertical Crosshair */}
            <line
              x1={hoveredData.x}
              y1="0"
              x2={hoveredData.x}
              y2="260"
              stroke="#4b5563"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Data Point Dot */}
            <circle
              cx={hoveredData.x}
              cy={hoveredData.y}
              r="6"
              fill="#2e7bff"
              stroke="#fff"
              strokeWidth="2"
            />
          </>
        )}
        
        {/* Default End Dot (hidden on hover) */}
        {!hoveredData && (
             <circle cx={data[data.length-1].x} cy={data[data.length-1].y} r="6" fill="#2e7bff" stroke="#fff" strokeWidth="2" />
        )}
      </svg>
    </div>
  )
}

function PerformanceChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const data = useMemo(() => {
    const baseDate = new Date('2025-07-03T20:50:00')
    return [
      20, 38, 32, 34, 30, 40, 36, 42, 48, 55, 61, 64, 58, 52, 68, 64, 70, 66, 60, 72, 68,
      74, 70, 66, 72, 70, 74, 52, 48, 56,
    ].map((h, i) => {
      const d = new Date(baseDate)
      d.setDate(d.getDate() - (29 - i))
      return {
        date: d.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        apy: (10 + h * 0.2).toFixed(1) + '%',
        yield:
          '$' +
          (4000 + i * 30 + h * 2).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        height: h,
      }
    })
  }, [])

  const activeItem = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1]

  return (
    <div className="relative">
      <div className="absolute left-4 top-4 z-10 w-[220px] rounded-xl border border-border bg-panel p-3 text-xs text-gray-200 shadow-lg transition-colors">
        <p className="text-muted">{activeItem.date}</p>
        <div className="mt-2 flex items-center justify-between">
          <span>APY</span>
          <span className="font-semibold text-white">{activeItem.apy}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span>Cumulative Yields</span>
          <span className="font-semibold text-white">{activeItem.yield}</span>
        </div>
      </div>
      <div className="grid grid-cols-[60px,1fr] gap-3">
        <div className="flex flex-col justify-between pb-8 text-xs text-muted">
          <span>25%</span>
          <span>20%</span>
          <span>15%</span>
          <span>10%</span>
          <span>5%</span>
        </div>
        <div>
          <div className="group relative flex h-[220px] items-end gap-1 rounded-xl border border-border bg-panel/40 p-3">
            {data.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex-1 cursor-crosshair rounded-full bg-gradient-to-t from-[#1d67ff] to-[#1b9eff] transition-all duration-200 ${
                  hoveredIndex === idx
                    ? 'scale-y-110 opacity-100 shadow-[0_0_10px_rgba(29,103,255,0.5)]'
                    : hoveredIndex !== null
                    ? 'opacity-40'
                    : 'opacity-80'
                }`}
                style={{ height: `${item.height + 20}px`, transformOrigin: 'bottom' }}
              />
            ))}
            <svg
              viewBox="0 0 540 220"
              className="pointer-events-none absolute inset-0 opacity-50"
            >
              <path
                d="M10 160 C120 150 180 130 240 150 C300 170 360 120 420 150 C480 180 520 140 530 180"
                fill="none"
                stroke="#c8d2e4"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted">
            <Legend color="#c8d2e4" label="Cumulative Yields" />
            <Legend color="#1d67ff" label="APY" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AllocationChart() {
  return (
    <svg viewBox="0 0 620 220" className="w-full h-full min-h-[220px]">
      <rect width="620" height="220" rx="12" fill="#0f121a" />
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1="40" x2="600" y1={y} y2={y} stroke="#1e2533" strokeWidth="1" />
      ))}
      {[80, 180, 280, 380, 480, 580].map((x) => (
        <line key={x} y1="20" y2="200" x1={x} x2={x} stroke="#1e2533" strokeWidth="1" />
      ))}
      <path
        d="M50 120 C110 105 150 138 200 130 C260 120 300 150 360 140 C420 130 470 160 520 145 C560 135 590 170 600 160"
        fill="none"
        stroke="#2e7bff"
        strokeWidth="3"
      />
      <circle cx="200" cy="130" r="6" fill="#2e7bff" stroke="#fff" strokeWidth="2" />
      <circle cx="520" cy="145" r="6" fill="#2e7bff" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="h-2 w-10 rounded-full" style={{ background: color }} />
      {label}
    </div>
  )
}

function RingGauge() {
  return (
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-4 border-[#f59f0b]" />
      <div className="absolute inset-2 rounded-full bg-panel" />
    </div>
  )
}

export default App
