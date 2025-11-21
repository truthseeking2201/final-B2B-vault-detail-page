import { useMemo, useState } from 'react'
import momentumLogo from './assets/logo-momentum.png'
import mmtSuiLogo from './assets/mmt-sui.svg'
import maxDrawdownIcon from './assets/icon-MaxDrawdown.svg'
import copyIcon from './assets/copy.svg'
import suiSmall from './assets/sui-small.svg'
import nodoLogo from './assets/NODO Logo.svg'
import usdcLogo from './assets/usdc.svg'
import usdtLogo from './assets/usdt.svg'
import wbtcLogo from './assets/wbtc.svg'
import VaultSharePriceChart from './components/charts/VaultSharePriceChart'
import PerformanceApyChart from './components/charts/PerformanceApyChart'

const ZAP_IN_RATE = 1
const ZAP_OUT_USDC_RATE = 1
const ZAP_OUT_SUI_RATE = 1

const parseAmount = (value) => {
  const n = parseFloat(value)
  if (Number.isNaN(n) || n < 0) return 0
  return n
}

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

const selectableTokens = [
  {
    symbol: 'xSUI',
    name: 'xSUI',
    subtitle: 'xSUI',
    balance: '0',
    address: '0x2b6..._SUI',
    verified: true,
    gradient: 'linear-gradient(135deg, #1a6aff 0%, #53d1ff 100%)',
    logo: null,
  },
  {
    symbol: 'DEEP',
    name: 'DeepBook Token',
    subtitle: 'DEEP',
    balance: '13.586',
    address: '0xdee...DEEP',
    verified: true,
    gradient: 'linear-gradient(135deg, #0c78ff 0%, #19c7ff 100%)',
    logo: null,
  },
  {
    symbol: 'SUI',
    name: 'Sui',
    subtitle: 'SUI',
    balance: '0.108',
    address: '0x2::...:SUI',
    verified: true,
    gradient: 'linear-gradient(135deg, #1f6bff 0%, #60b9ff 100%)',
    logo: null,
  },
  {
    symbol: 'wUSDT',
    name: 'Tether USD (Wormhole)',
    subtitle: 'wUSDT',
    balance: '0',
    address: '0xc06...COIN',
    verified: true,
    gradient: 'linear-gradient(135deg, #0f9a63 0%, #00c48c 100%)',
    logo: usdtLogo,
  },
  {
    symbol: 'SATYBTC.B',
    name: 'SATYBTC.B',
    subtitle: 'satYBTC.B',
    balance: '0',
    address: '0x9e9...YBTC',
    verified: true,
    gradient: 'linear-gradient(135deg, #ff9d4d 0%, #ef7d1a 100%)',
    logo: wbtcLogo,
  },
  {
    symbol: 'USDY',
    name: 'Ondo US Dollar Yield',
    subtitle: 'USDY',
    balance: '0',
    address: '0x960...USDY',
    verified: true,
    gradient: 'linear-gradient(135deg, #4c70ff 0%, #6e90ff 100%)',
    logo: null,
  },
  {
    symbol: 'wUSDC',
    name: 'USD Coin (Wormhole)',
    subtitle: 'wUSDC',
    balance: '0',
    address: '0x5d4...COIN',
    verified: true,
    gradient: 'linear-gradient(135deg, #2e7bff 0%, #53c6ff 100%)',
    logo: usdcLogo,
  },
]

function CurrencyToggle({ currency, setCurrency, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="inline-flex rounded-full bg-[#151823] p-[2px]">
        {['USD', 'SUI'].map((item) => {
          const isActive = currency === item
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCurrency(item)}
              className={
                isActive
                  ? 'flex items-center justify-center rounded-[6px] bg-[rgba(40,112,255,0.30)] px-4 py-[7.25px] text-[13.2px] leading-[16px] font-medium text-[#7EA9FF]'
                  : 'flex items-center justify-center rounded-full px-3 py-2 text-[13.2px] leading-[16px] font-medium text-[#9096A5]'
              }
              style={{
                fontFamily:
                  'Work Sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('vault')
  const [section, setSection] = useState('overview')
  const [depositTab, setDepositTab] = useState('deposit')
  const [zap, setZap] = useState(true)
  const [currency, setCurrency] = useState('USD')
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('xSUI')
  const [showTokenModal, setShowTokenModal] = useState(false)

  const depositHandler = () => {
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopBanner />
      <NavBar />
      <main className="w-full max-w-[1300px] mx-auto px-4 lg:px-6 pb-16">
        <div className="mt-6 flex w-full max-w-[1200px] mx-auto flex-col items-start self-stretch rounded-[24px] border border-[#1F2937] bg-[#202126] p-6 lg:p-7">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="h-8 w-8 grid place-items-center rounded-full bg-panelMuted border border-border">
              <ArrowLeft />
            </div>
            <span className="text-[24px] leading-[31.92px] font-medium text-[#FAFAFA]">
              Deposit
            </span>
          </div>

          <div className="mt-4 flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="space-y-6 flex-1">
              <VaultHeader currency={currency} setCurrency={setCurrency} />
              <VaultTabs mode={mode} setMode={setMode} />
              {mode === 'vault' ? (
                <>
                  <div className="lg:hidden">
                    <DepositCard
                      tab={depositTab}
                      onTabChange={setDepositTab}
                      zap={zap}
                      onZapChange={setZap}
                      onDeposit={depositHandler}
                      selectedAsset={selectedAsset}
                      onSelectAsset={() => setShowTokenModal(true)}
                    />
                  </div>
                  <VaultHero
                    mode={mode}
                    section={section}
                    setSection={setSection}
                    currency={currency}
                    setCurrency={setCurrency}
                  />
                  <SectionTabs section={section} onSectionChange={setSection} />
                  {section === 'overview' && <OverviewSection />}
                  {section === 'risk' && <RiskSection />}
                  {section === 'distribution' && <DistributionSection />}
                  {section === 'activities' && <ActivitiesSection />}
                </>
              ) : (
                <PositionsSection />
              )}
            </div>
            <aside className="hidden lg:block lg:sticky lg:top-6 w-full mt-6 lg:mt-0 lg:w-[400px] xl:w-[440px] lg:self-start">
              <DepositCard
                tab={depositTab}
                onTabChange={setDepositTab}
                zap={zap}
                onZapChange={setZap}
                onDeposit={depositHandler}
                selectedAsset={selectedAsset}
                onSelectAsset={() => setShowTokenModal(true)}
              />
            </aside>
          </div>
        </div>
      </main>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      {showTokenModal && (
        <TokenSelectModal
          tokens={selectableTokens}
          selected={selectedAsset}
          onSelect={(sym) => {
            setSelectedAsset(sym)
            setShowTokenModal(false)
          }}
          onClose={() => setShowTokenModal(false)}
        />
      )}
    </div>
  )
}

function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-[#0052f3] via-[#0f63f6] to-[#00a0ff] px-4 py-2 text-center text-xs text-white sm:text-sm">
      <span className="mx-auto flex max-w-screen-sm flex-wrap items-center justify-center gap-2 font-medium">
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
    <header className="border-b border-border bg-surface/80 backdrop-blur px-0 pt-4">
      <div className="flex w-full items-center gap-6 pb-4 px-4">
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <img
              src={mmtSuiLogo}
              alt="MMT SUI"
              className="h-[64px] w-[64px] flex-shrink-0 object-contain"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-[28px] leading-[24px] font-medium text-white">
                  Steakhouse SUI
                </p>
                <RoundedIcon>
                  <img src={copyIcon} alt="copy icon" className="h-[28px] w-[28px]" />
                </RoundedIcon>
                <RoundedIcon>
                  <ExternalIcon />
                </RoundedIcon>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  Powered by
                  <img src={nodoLogo} alt="nodo logo" className="h-4 w-auto" />
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
          </div>
        </div>
      </div>
    </div>
  )
}

function VaultTabs({ mode, setMode }) {
  const tabs = [
    { id: 'vault', label: 'Vault' },
    { id: 'positions', label: 'Positions' },
  ];

  return (
    <div className="flex items-center gap-8">
      {tabs.map((tab) => {
        const isActive = mode === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className="relative overflow-hidden text-ellipsis whitespace-nowrap"
            style={{
              fontFamily: 'Work Sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            <span
              className={
                isActive
                  ? 'text-[#FAFAFA] text-[20px] leading-[31.92px] font-medium'
                  : 'text-[#94969C] text-[20px] leading-[31.92px] font-normal'
              }
            >
              {tab.label}
            </span>

            {isActive && (
              <span className="mt-1 block h-[3px] w-full rounded-full bg-[#FAFAFA]" />
            )}
          </button>
        )
      })}
    </div>
  )
}

function SectionTabs({ section, onSectionChange }) {
  if (!section) return null
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-300 sm:gap-5">
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

function VaultHero({ mode, section, setSection, currency, setCurrency }) {
  void mode;
  void section;
  void setSection;

  return (
    <div className="space-y-5">
      <div className="mt-4 mb-2 flex w-full justify-start lg:hidden">
        <CurrencyToggle currency={currency} setCurrency={setCurrency} />
      </div>
      <div className="grid w-full grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
        <div className="mt-4 mb-3 h-px w-full bg-[#4B4C50]" />
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Left: 3 token columns */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:w-auto">
            <TokenCluster label="Collateral" token={{ name: 'SUI', color: '#6cd1ff' }} />
            <TokenCluster label="Receipt Token" token={{ name: 'NDLP', color: '#f59f0b' }} />
            <TokenCluster label="Incentive Token" token={{ name: 'XP Shares', color: '#faab3d' }} />
          </div>

          {/* Right: fee column */}
          <div className="flex w-full flex-col gap-1 text-base text-gray-100 lg:w-auto lg:text-right">
            <div className="flex items-baseline gap-2 text-gray-300 lg:justify-end lg:self-end">
              <span className="text-white font-semibold">2%</span>
              <span className="text-gray-400 whitespace-nowrap">Management Fee</span>
            </div>
            <div className="flex items-baseline gap-2 text-gray-300 lg:justify-end lg:self-end">
              <span className="text-white font-semibold">14.2%</span>
              <span className="text-gray-400 whitespace-nowrap">Performance Fee</span>
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
              <p
                className="text-[#FAFBFC] text-[28px] font-medium leading-[140%]"
                style={{
                  fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontStyle: 'normal',
                }}
              >
                4,926.00
              </p>
              <p className="text-sm text-muted">≈ $5,216.00</p>
            </div>
          </div>
          </div>
        <div className="rounded-2xl border border-border bg-panelMuted px-4 py-3">
          <p className="text-sm text-muted">Break-even</p>
          <div className="flex items-center gap-3 mt-2">
            <p
              className="text-[#FAFBFC] text-[28px] font-medium leading-[140%]"
              style={{
                fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                fontStyle: 'normal',
              }}
            >
              $1.00
            </p>
            <p className="text-sm text-muted">Current Vault Shares price: $1.12</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBlock({ label, value, helper, positive, icon, prefix, renderContent }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base sm:text-lg text-gray-400 font-semibold">{label}</p>
      {renderContent ? (
        renderContent
      ) : (
        <>
          <div className="flex items-center gap-2 sm:gap-3">
            {prefix}
            <span className="flex flex-col justify-center text-white text-[22px] sm:text-[28px] font-semibold leading-[130%]">
              {value}
            </span>
            {icon && <span className="text-3xl">{icon}</span>}
          </div>
          <p
            className={`text-[13px] sm:text-[14px] font-semibold ${
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
    <div className="flex items-center gap-3 sm:gap-4">
      <RingGaugeLarge />
      <div className="flex flex-col gap-1">
        <span className="flex flex-col justify-center text-white text-[22px] sm:text-[28px] font-semibold leading-[130%]">
          $13.00M
        </span>
        <span className="text-[13px] sm:text-[14px] font-semibold text-gray-400">
          Out of <span className="text-white">$61.09M</span>
        </span>
      </div>
    </div>
  )
}

function RingGaugeLarge() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(#2e7bff_0deg_250deg,#2b2c31_250deg_360deg)]" />
      <div className="absolute inset-[3px] rounded-full bg-panel" />
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
      <span
        className="leading-[20px] whitespace-nowrap"
        style={{
          color: '#94969C',
          fontFamily: 'Work Sans',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2 text-lg font-semibold text-white">
        <TokenIcon
          label={token.name.charAt(0)}
          gradient={`linear-gradient(135deg, ${token.color} 0%, #0b62ff 100%)`}
        />
        <span className="text-sm font-medium text-gray-100 whitespace-nowrap">{token.name}</span>
        <RoundedIcon>
          <ExternalIcon />
        </RoundedIcon>
      </div>
    </div>
  )
}

function DepositCard({
  tab,
  onTabChange,
  zap,
  onZapChange,
  onDeposit,
  selectedAsset,
  onSelectAsset,
}) {
  const isWithdraw = tab === 'withdraw'
  const payoutToken = selectedAsset || 'USDC'
  const [depositAmount, setDepositAmount] = useState('')
  const [depositReceiveNdlp, setDepositReceiveNdlp] = useState('')

  const [withdrawNdlpAmount, setWithdrawNdlpAmount] = useState('')
  const [withdrawReceiveUsdc, setWithdrawReceiveUsdc] = useState('')
  const [withdrawReceiveSui, setWithdrawReceiveSui] = useState('')

  return (
    <div className="w-full rounded-[12px] border border-[#2870ff] bg-[#202126] p-[17px] shadow-panel text-white space-y-4">
      <div className="flex items-center justify-between gap-3">
        <SegmentedTabs active={tab} onChange={onTabChange} />
        <ZapToggle label={isWithdraw ? 'Zap Out' : 'Zap in'} value={zap} onToggle={() => onZapChange(!zap)} />
      </div>

      {isWithdraw ? (
        <WithdrawBody
          zap={zap}
          payoutToken={payoutToken}
          onSelectAsset={onSelectAsset}
          onDeposit={onDeposit}
          withdrawNdlpAmount={withdrawNdlpAmount}
          setWithdrawNdlpAmount={setWithdrawNdlpAmount}
          withdrawReceiveUsdc={withdrawReceiveUsdc}
          withdrawReceiveSui={withdrawReceiveSui}
          setWithdrawReceiveUsdc={setWithdrawReceiveUsdc}
          setWithdrawReceiveSui={setWithdrawReceiveSui}
        />
      ) : (
        <DepositBody
          zap={zap}
          payoutToken={payoutToken}
          onSelectAsset={onSelectAsset}
          onDeposit={onDeposit}
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          depositReceiveNdlp={depositReceiveNdlp}
          setDepositReceiveNdlp={setDepositReceiveNdlp}
        />
      )}
    </div>
  )
}

function DepositBody({
  zap,
  payoutToken,
  onSelectAsset,
  onDeposit,
  depositAmount,
  setDepositAmount,
  depositReceiveNdlp,
  setDepositReceiveNdlp,
}) {
  return (
    <>
      <div className="space-y-2">
        <StatRow label="Slippage">
          <div className="flex items-center gap-2 text-sm">
            <span>0.5%</span>
            <GearIcon />
          </div>
        </StatRow>
        <StatRow label="Vault APR:">
          <div className="flex items-center gap-1 text-sm">
            <span>1,260.05%</span>
            <InfoCircle />
          </div>
        </StatRow>
      </div>

      {zap ? (
        <SingleDepositInput
          amount={depositAmount}
          fiat="$0.20"
          token={payoutToken}
          balance="0.108256258"
          onSelectToken={onSelectAsset}
          onChangeAmount={(value) => {
            setDepositAmount(value)
            if (zap) {
              const n = parseAmount(value)
              setDepositReceiveNdlp(value === '' ? '' : (n * ZAP_IN_RATE).toString())
            } else {
              setDepositReceiveNdlp('')
            }
          }}
        />
      ) : (
        <DualDepositInput
          topToken={{ amount: '1', fiat: '$2.054', symbol: 'SUI', balance: '0' }}
          bottomToken={{ amount: '4.92761', fiat: '$2.292', symbol: 'MMT', balance: '0' }}
        />
      )}

      <ReceiveSection
        title="Est. Receive"
        tokens={['NDLP']}
        amounts={{ NDLP: depositReceiveNdlp === '' ? '0.0' : depositReceiveNdlp }}
      />
      <PrimaryActionButton label="Deposit" onClick={onDeposit} />
    </>
  )
}

function WithdrawBody({
  zap,
  payoutToken,
  onSelectAsset,
  onDeposit,
  withdrawNdlpAmount,
  setWithdrawNdlpAmount,
  withdrawReceiveUsdc,
  withdrawReceiveSui,
  setWithdrawReceiveUsdc,
  setWithdrawReceiveSui,
}) {
  const receiveTokens = ['USDC', 'SUI']

  return (
    <>
      <div className="space-y-2">
        <StatRow label="Rate">
          <div className="flex items-center gap-2 text-sm">
            <RateBadge />
            <span>1 USDC = 1.05 NDLP</span>
            <RefreshBadge />
          </div>
        </StatRow>
        <StatRow label="Transaction Fee">
          <span className="text-sm">Free</span>
        </StatRow>
      </div>

      {zap && (
        <SelectorRow label="Select Payout Token">
          <TokenPill symbol={payoutToken} onClick={onSelectAsset} />
        </SelectorRow>
      )}

      <AmountSection
        title="Withdraw Amount"
        editable
        inputValue={withdrawNdlpAmount}
        onInputChange={(value) => {
          setWithdrawNdlpAmount(value)
          if (zap) {
            const n = parseAmount(value)
            setWithdrawReceiveUsdc(value === '' ? '' : (n * ZAP_OUT_USDC_RATE).toString())
            setWithdrawReceiveSui(value === '' ? '' : (n * ZAP_OUT_SUI_RATE).toString())
          } else {
            setWithdrawReceiveUsdc('')
            setWithdrawReceiveSui('')
          }
        }}
        fiatHint="$0.20"
        tokenSymbol="NDLP"
        balance="0.108256258"
        showActions
      />

      <ReceiveSection
        title="Est. Max Receive"
        tokens={receiveTokens}
        amounts={{
          USDC: withdrawReceiveUsdc === '' ? '0.0' : withdrawReceiveUsdc,
          SUI: withdrawReceiveSui === '' ? '0.0' : withdrawReceiveSui,
        }}
      />

      <PrimaryActionButton label="Withdraw" onClick={onDeposit} />
    </>
  )
}

function SegmentedTabs({ active, onChange }) {
  const options = [
    { key: 'deposit', label: 'Deposit' },
    { key: 'withdraw', label: 'Withdraw' },
  ]

  return (
    <div className="flex items-center gap-1 rounded-[6px] bg-white/[0.04] p-1 border border-transparent">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`relative h-8 min-w-[96px] rounded-[6px] px-4 text-sm font-semibold transition-colors ${
            active === opt.key ? 'bg-white text-[#202126]' : 'text-white/75'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function ZapToggle({ label, value, onToggle }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-medium text-[#94969c]">
      <span>{label}</span>
      <button
        onClick={onToggle}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          value ? 'bg-[#174dff]' : 'bg-[#292a2f]'
        }`}
      >
        <span
          className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
            value ? 'left-[2px]' : 'left-[18px]'
          }`}
        />
      </button>
    </div>
  )
}

function StatRow({ label, children }) {
  return (
    <div className="flex items-center justify-between text-sm text-white">
      <span className="text-white">{label}</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

function SelectorRow({ label, children }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] border border-[#2f323b] bg-white/[0.04] px-3 py-2 text-sm">
      <span>{label}</span>
      {children}
    </div>
  )
}

function SingleDepositInput({ amount, fiat, token, balance, onSelectToken, onChangeAmount }) {
  return (
    <div className="rounded-[16px] border border-[#2d3038] bg-white/[0.05] px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-[6px]">
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => onChangeAmount?.(e.target.value)}
            className="w-full bg-transparent text-[32px] leading-none outline-none"
            style={{
              color: 'rgb(250 250 250 / var(--tw-text-opacity, 1))',
              fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '36px',
              fontWeight: 400,
            }}
            placeholder="0.0"
          />
          <p className="text-[20px] leading-[28px] text-[rgba(133,136,142,0.6)]">{fiat}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TokenPill symbol={token} onClick={onSelectToken} />
          <p className="text-[12px] leading-[18px] text-[#61646c]">
            Balance: <span className="text-[#94969c]">{balance}</span>
          </p>
          <div className="flex items-center gap-2">
            <MiniActionButton>50%</MiniActionButton>
            <MiniActionButton>MAX</MiniActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function DualDepositInput({ topToken, bottomToken }) {
  return (
    <div className="rounded-[16px] border border-[#2d3038] bg-white/[0.05] overflow-hidden">
      <DepositField {...topToken} />
      <div className="h-px bg-[#2f323b] mx-3" />
      <DepositField {...bottomToken} />
    </div>
  )
}

function DepositField({ amount, fiat, symbol, balance }) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-[6px]">
          <p className="text-[36px] leading-[44px] tracking-[-0.04em] text-white">{amount}</p>
          <p className="text-[20px] leading-[28px] text-[rgba(133,136,142,0.6)]">{fiat}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TokenPill symbol={symbol} showCaret={false} />
          <p className="text-[12px] leading-[18px] text-[#61646c]">
            Balance: <span className="text-[#94969c]">{balance}</span>
          </p>
          <div className="flex items-center gap-2">
            <MiniActionButton>50%</MiniActionButton>
            <MiniActionButton>MAX</MiniActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function AmountSection({
  title,
  value,
  fiatHint,
  tokenSymbol,
  balance,
  onSelectToken,
  showActions,
  editable,
  inputValue,
  onInputChange,
}) {
  const selectable = Boolean(onSelectToken) && tokenSymbol !== 'NDLP'

  return (
    <div className="space-y-2">
      <p className="text-base text-white">{title}</p>
      <div className="rounded-[12px] border border-[#2d3038] bg-white/[0.04] px-3 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-[6px]">
            {editable ? (
              <input
                type="number"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => onInputChange?.(e.target.value)}
                className="w-full bg-transparent text-[32px] leading-none outline-none"
                style={{
                  color: 'rgb(250 250 250 / var(--tw-text-opacity, 1))',
                  fontFamily:
                    'Work Sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '36px',
                  fontWeight: 400,
                }}
                placeholder="0.0"
              />
            ) : (
              <p className="text-[36px] leading-[44px] tracking-[-0.04em] text-white">{value}</p>
            )}
            {fiatHint && (
              <p className="text-[20px] leading-[28px] text-[rgba(133,136,142,0.6)]">{fiatHint}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={selectable ? onSelectToken : undefined}
              className={`inline-flex items-center gap-2 rounded-[30px] border border-transparent px-2.5 py-1 ${
                selectable ? 'bg-white/[0.13] hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primaryStrong' : 'bg-transparent cursor-default'
              }`}
            >
              <TokenGlyph symbol={tokenSymbol} size={18} />
              <span className="token-pill-label">{tokenSymbol || 'USDC'}</span>
              {selectable ? <ChevronDown className="h-4 w-4 text-white" /> : <InfoDot />}
            </button>
            {balance && (
              <>
                <p className="text-[12px] leading-[18px] text-[#61646c]">
                  Balance: <span className="text-[#94969c]">{balance}</span>
                </p>
                {showActions && (
                  <div className="flex items-center gap-2">
                    <MiniActionButton>50%</MiniActionButton>
                    <MiniActionButton>MAX</MiniActionButton>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ReceiveSection({ title, tokens, stacked, amounts }) {
  return (
    <div className="space-y-2">
      <p className="text-base text-white">{title}</p>
      <div className="rounded-[12px] border border-[#2d3038] bg-white/[0.04] px-3 py-3 space-y-3">
        {tokens.map((token) => (
          <ReceiveRow
            key={token}
            token={token}
            amount={amounts?.[token]}
            compact={stacked}
          />
        ))}
      </div>
    </div>
  )
}

function ReceiveRow({ token, amount, compact }) {
  const displayAmount = amount ?? '0.1'
  return (
    <div className="flex items-center justify-between gap-3">
      <p
        className={`tracking-[-0.04em] text-white ${compact ? 'text-[32px] leading-[40px]' : 'text-[36px] leading-[44px]'}`}
      >
        {displayAmount}
      </p>
      <div className="flex items-center gap-2 text-[18px] font-medium">
        <TokenGlyph symbol={token} size={22} />
        <span>{token}</span>
      </div>
    </div>
  )
}

function PrimaryActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[6px] bg-[#2870ff] py-3 text-center text-[16px] font-medium text-white hover:brightness-110 transition-colors"
    >
      {label}
    </button>
  )
}

function TokenPill({ symbol, onClick, showCaret = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-[30px] border border-transparent bg-white/[0.13] px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-primaryStrong disabled:cursor-default"
      disabled={!onClick}
    >
      <TokenGlyph symbol={symbol} size={16} />
      <span className="text-[14px] font-medium text-white">{symbol}</span>
      {showCaret && <ChevronDown className="h-4 w-4 text-white" />}
    </button>
  )
}

function TokenGlyph({ symbol, size = 24 }) {
  if (symbol === 'USDC') {
    return <USDCIcon size={size} />
  }
  if (symbol === 'SUI') {
    return <SuiIcon size={size} />
  }
  if (symbol === 'MMT') {
    return <img src={mmtSuiLogo} alt="MMT" style={{ width: size, height: size }} className="rounded-full" />
  }
  if (symbol === 'NDLP') {
    return <NdplIcon size={size} />
  }
  return <TokenIcon label={symbol?.charAt(0) || 'T'} gradient="linear-gradient(135deg, #0e6bff 0%, #53c6ff 100%)" />
}

function RateBadge() {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#14c36b]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M12 5.5c-2.2 0-4 1.8-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M12 18.5c2.2 0 4-1.8 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M10 16 8 14m6-8-2 2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-[#14c36b]">7</span>
    </div>
  )
}

function RefreshBadge() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#45464a] text-white/80">
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
        <path
          d="M16.5 10a6.5 6.5 0 0 1-6.5 6.5A6.5 6.5 0 0 1 3.5 10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M3.5 10A6.5 6.5 0 0 1 10 3.5c1.85 0 3.5.78 4.67 2.03"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path d="M5 8.5h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function MiniActionButton({ children }) {
  return (
    <button className="action-pill leading-none px-2.5 py-1 text-[12px]">{children}</button>
  )
}

function NdplIcon({ size = 20 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(100% 100% at 30% 30%, #ffce00 0%, #f55500 100%)',
        boxShadow: 'inset 0 0 0 2px #202126, inset 0 0 0 3px #f5e0c3',
      }}
    />
  )
}

function InfoDot() {
  return (
    <span className="grid place-items-center rounded-full bg-[#45464a] text-white/80" style={{ width: 20, height: 20 }}>
      i
    </span>
  )
}

function GearIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-[#8b8f9b]">
      <path
        d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 10.5V9.5l1.3-.2a5 5 0 0 1 .5-1.2l-.8-1 1-1 .9.7c.4-.2.8-.4 1.2-.5l.2-1.3h2l.2 1.3c.4.1.8.3 1.2.5l1-.7 1 1-.7 1c.2.4.4.8.5 1.2l1.3.2v1l-1.3.2c-.1.4-.3.8-.5 1.2l.7 1-1 1-1-.7c-.4.2-.8.4-1.2.5l-.2 1.3h-2l-.2-1.3a5 5 0 0 1-1.2-.5l-1 .7-1-1 .7-1c-.2-.4-.4-.8-.5-1.2l-1.3-.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InfoCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 6.49998C5.21473 6.78705 5.48868 7.02457 5.80328 7.19645C6.11787 7.36833 6.46575 7.47054 6.82333 7.49615C7.1809 7.52176 7.53979 7.47017 7.87567 7.34487C8.21155 7.21958 8.51656 7.02352 8.77 6.76998L10.27 5.26998C10.7254 4.79848 10.9774 4.16697 10.9717 3.51148C10.966 2.85599 10.7031 2.22896 10.2395 1.76544C9.77603 1.30192 9.14899 1.03899 8.4935 1.0333C7.83801 1.0276 7.20651 1.27959 6.735 1.73498L5.875 2.58998"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99912 5.5006C6.7844 5.21354 6.51044 4.97601 6.19585 4.80413C5.88125 4.63225 5.53337 4.53004 5.1758 4.50443C4.81823 4.47883 4.45933 4.53042 4.12345 4.65571C3.78757 4.781 3.48257 4.97707 3.22912 5.2306L1.72912 6.7306C1.27373 7.20211 1.02174 7.83361 1.02744 8.4891C1.03313 9.1446 1.29606 9.77163 1.75958 10.2351C2.2231 10.6987 2.85013 10.9616 3.50562 10.9673C4.16111 10.973 4.79262 10.721 5.26412 10.2656L6.11912 9.4106"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
            <VaultSharePriceChart />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start justify-start gap-4 rounded-lg bg-white/5 p-5">
          <div className="flex w-full items-center justify-between text-sm text-gray-200">
            <p className="card-title">Performance (APY)</p>
            <RoundedIcon>1D</RoundedIcon>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-xl border border-[#1F2937] bg-[#202126] overflow-hidden">
            <PerformanceApyChart />
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
      <div className="space-y-4 rounded-2xl border border-border bg-panelMuted p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="card-title">Risk Disclosures</p>
        </div>
        <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-6">
          <div className="space-y-3 rounded-2xl border border-border bg-panelMuted p-4 text-sm text-gray-200">
            <InfoRow label="Creator" value="51BB" helper="Contract Owner" />
            <InfoRow label="Date" value="2021-09-04" helper="Date of creation" />
            <InfoRow label="Gas Fee" value="SAFE 6/10" helper="Gas Fee & Surcharges" />
            <InfoRow label="Incentives" value="Loss" helper="Platform Incentives" />
            <InfoRow label="Audit" value="SAFE 7/10" helper="Vault version" />
          </div>
          <div className="space-y-3 rounded-2xl border border-border bg-panelMuted p-4 leading-relaxed text-sm text-gray-200">
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

      <div className="space-y-4 rounded-2xl border border-border bg-panelMuted p-5 shadow-panel">
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
            <div className="hidden grid-cols-[2fr,1fr,1fr] border-b border-border px-4 py-3 text-xs uppercase tracking-wide text-muted md:grid">
              <span>Date</span>
              <span>Amount</span>
              <span>Transaction</span>
            </div>
            <div className="divide-y divide-border">
              {allocationHistory.map((row) => (
                <div
                  key={row.date + row.tx}
                  className="grid grid-cols-1 items-start gap-3 px-4 py-3 text-sm text-gray-100 md:grid-cols-[2fr,1fr,1fr]"
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
    <section className="mt-6 space-y-6">
      <div className="space-y-4 rounded-2xl border border-border bg-panelMuted p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="card-title">User Distribution</p>
          <div className="flex items-center gap-2 text-sm text-muted">
            <RoundedIcon>USD</RoundedIcon>
            <RoundedIcon>3 Months</RoundedIcon>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-panelMuted overflow-hidden">
          <div className="hidden grid-cols-[4fr,4fr,3fr] border-b border-border px-4 py-3 text-xs uppercase tracking-wide text-muted sm:grid">
            <span>User</span>
            <span>Deposit</span>
            <span>% of Deposit</span>
          </div>
          <div className="divide-y divide-border">
            {distributionRows.map((row) => (
              <div
                key={row.user}
                className="grid grid-cols-1 items-start gap-3 px-4 py-4 text-sm text-gray-100 sm:grid-cols-[4fr,4fr,3fr] sm:items-center"
              >
                <div className="flex items-center gap-2">
                  <TokenIcon label={row.user.charAt(2)} />
                  <span>{row.user}</span>
                  <ExternalIcon />
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
  return (
    <section className="mt-6 space-y-4">
      <StatsStrip />
      <AllTimePnLCard />
      <LpBreakdownCard />
      <CashflowCard />
    </section>
  )
}

function StatsStrip() {
  return (
    <div className="flex flex-wrap items-center gap-8 text-white">
      <div className="flex items-center gap-3">
        <div
          className="relative grid place-items-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background:
              'conic-gradient(#f7931a 0deg 250deg, #2b2c31 250deg 360deg)',
          }}
        >
          <div className="absolute inset-[6px] rounded-full bg-[#101015]" />
        </div>
        <div>
          <p className="text-[13px] text-[#aeb3c1]">Total Liquidity</p>
          <p
            className="text-[#FAFBFC]"
            style={{
              fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '140%',
            }}
          >
            $4,926.00
          </p>
          <p
            className="text-[#8f95a6]"
            style={{
              color: 'rgba(255, 255, 255, 0.40)',
              fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '16px',
            }}
          >
            ≈ $5,216.00
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="grid place-items-center rounded-full"
          style={{
            width: 32,
            height: 32,
            background: '#0f141d',
            border: '2px solid #1f2a3a',
          }}
        />
        <div>
          <p className="text-[13px] text-[#aeb3c1]">Break-even</p>
          <p
            className="text-[#FAFBFC]"
            style={{
              fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '140%',
            }}
          >
            $1.00
          </p>
          <p
            className="text-[#8f95a6]"
            style={{
              color: 'rgba(255, 255, 255, 0.40)',
              fontFamily: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '16px',
            }}
          >
            Current Vault Share price: $1.12
          </p>
        </div>
      </div>
    </div>
  )
}

function AllTimePnLCard() {
  return (
    <div
      className="shadow-panel"
      style={{
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: '#26272f',
        border: '1px solid #1f2128',
      }}
    >
      <p className="text-[20px] font-semibold text-white">All Time P&amp;L Breakdown</p>
      <div className="w-full h-px bg-[#32343e]" />
      <div className="flex w-full flex-col gap-3 text-[15px]">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-[#c4c8d2]">
            <span>Compounded Rewards</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3E3F43]">
              <ChevronRightIcon className="h-3 w-3 text-[#c4c8d2]" />
            </span>
          </button>
          <span className="text-emerald-400 text-sm font-semibold">+$248</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#c4c8d2]">Impermanent Loss</span>
          <span className="text-[#FF7A45] text-sm font-semibold">-$173</span>
        </div>

        <div className="my-4 w-full" style={{ height: '1px', background: '#4B4C50' }} />

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#c4c8d2]">Net P&L</span>
          <span className="text-emerald-400 text-sm font-semibold">+$248</span>
        </div>
      </div>
    </div>
  )
}

function LpBreakdownCard() {
  const pillStyle = {
    padding: '6px 12px',
    borderRadius: '14px',
    background: '#0e1420',
    border: '1px solid #101722',
    color: '#e8ebf2',
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '18px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
  }

  return (
    <div
      className="shadow-panel"
      style={{
        display: 'flex',
        padding: '17px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '18px',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: '#292A2F',
        border: '1px solid #1f2128',
      }}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm text-[#8f95a6] w-full">
        <p className="text-[18px] font-semibold text-white">Estimated LP Breakdown</p>
        <span className="text-[13px] text-[#8f95a6]">Secure updates ~1h • Updated 09:23:08</span>
      </div>

      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-4 w-full items-center">
        <div className="flex flex-col gap-4">
          {lpBreakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <TokenIcon
                  label={item.label === 'USDC' ? 'U' : 'S'}
                  gradient="linear-gradient(135deg,#0e6bff 0%,#111827 100%)"
                  size={32}
                />
                <div className="leading-tight">
                  <p className="text-[15px] font-semibold text-white">{item.label}</p>
                  <p className="text-[13px] text-[#8f95a6]">{item.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={pillStyle}>{item.amount}</span>
                <span className="text-[14px] font-semibold text-white">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #12141b 58%, transparent 60%)',
              boxShadow: 'inset 0 0 0 12px #0f1118',
            }}
          >
            <div
              className="absolute inset-[12px] rounded-full"
              style={{
                background: `conic-gradient(#2e7bff 0% ${lpBreakdown[0].percent}%, #171820 ${lpBreakdown[0].percent}% 100%)`,
              }}
            />
            <div className="absolute inset-[26px] rounded-full bg-[#0f1118]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CashflowCard() {
  return (
    <div
      className="shadow-panel"
      style={{
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
        gap: '16px',
        alignSelf: 'stretch',
        borderRadius: '18px',
        background: '#0b0e1a',
        border: '1px solid #0f111a',
      }}
    >
      <p className="text-[18px] font-semibold text-white">Cashflow</p>
      <div className="grid sm:grid-cols-2 gap-4 text-[14px]">
        <div className="space-y-1">
          <p className="text-[#7f8595]">Total Deposits</p>
          <p className="text-white font-semibold">$120,684</p>
        </div>
        <div className="space-y-1">
          <p className="text-[#7f8595]">Total Withdrawals</p>
          <p className="text-white font-semibold">$76,927</p>
        </div>
      </div>
    </div>
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

function TokenSelectModal({ tokens, selected, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const filteredTokens = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return tokens
    return tokens.filter((token) => {
      const parts = [
        token.name,
        token.symbol,
        token.subtitle,
        token.address,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return parts.includes(keyword)
    })
  }, [query, tokens])

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="token-modal" onClick={(e) => e.stopPropagation()}>
        <p className="token-modal__title">Select Token</p>

        <div className="token-modal__search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12.75 12.75L16 16"
              stroke="#7D8292"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="8.75"
              cy="8.75"
              r="4.75"
              stroke="#7D8292"
              strokeWidth="1.5"
            />
          </svg>
          <input
            type="text"
            placeholder="Search name, symbol or paste address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            className="token-modal__reset"
            aria-label="Clear search"
            onClick={() => setQuery('')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.5 3.5 3.5 10.5M3.5 3.5l7 7"
                stroke="#7D8292"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="token-modal__list">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => onSelect(token.symbol)}
              className={`token-modal__row ${
                selected === token.symbol ? 'token-modal__row--selected' : ''
              }`}
            >
              <div className="token-modal__left">
                <TokenIcon
                  label={token.symbol.charAt(0)}
                  gradient={token.gradient}
                  src={token.logo}
                  size={32}
                />
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center gap-2">
                    <span className="token-modal__symbol">{token.name}</span>
                    {token.verified && <VerifiedBadge />}
                  </div>
                  <span className="token-modal__subtitle">{token.subtitle ?? token.symbol}</span>
                </div>
              </div>

              <div className="token-modal__right">
                <span className="token-modal__amount">{token.balance}</span>
                <span className="token-modal__address">
                  {token.address || token.chain}
                  <ExternalMiniIcon />
                </span>
              </div>
            </button>
          ))}
        </div>
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
        {cta && (
          <RoundedIcon>
            {cta === 'Copy' ? (
              <img src={copyIcon} alt="Copy" className="h-5 w-5" />
            ) : (
              '↗'
            )}
          </RoundedIcon>
        )}
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

function TokenIcon({ label, gradient, size = 20, src }) {
  const bg = gradient ?? '#1a1b21'
  const fontSize = size >= 32 ? 16 : 14

  return (
    <div
      className="grid place-items-center rounded-full text-white font-semibold border border-border"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={`${label} logo`}
          style={{ width: size * 0.7, height: size * 0.7, objectFit: 'contain' }}
        />
      ) : (
        label
      )}
    </div>
  )
}

function VerifiedBadge() {
  return (
    <span className="token-verified" aria-label="Verified token">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" fill="#2E7BFF" />
        <path
          d="M11.2 6.2 7.125 10.2 4.8 8.1"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function ExternalMiniIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 6.49998C5.21473 6.78705 5.48868 7.02457 5.80328 7.19645C6.11787 7.36833 6.46575 7.47054 6.82333 7.49615C7.1809 7.52176 7.53979 7.47017 7.87567 7.34487C8.21155 7.21958 8.51656 7.02352 8.77 6.76998L10.27 5.26998C10.7254 4.79848 10.9774 4.16697 10.9717 3.51148C10.966 2.85599 10.7031 2.22896 10.2395 1.76544C9.77603 1.30192 9.14899 1.03899 8.4935 1.0333C7.83801 1.0276 7.20651 1.27959 6.735 1.73498L5.875 2.58998"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99912 5.5006C6.7844 5.21354 6.51044 4.97601 6.19585 4.80413C5.88125 4.63225 5.53337 4.53004 5.1758 4.50443C4.81823 4.47883 4.45933 4.53042 4.12345 4.65571C3.78757 4.781 3.48257 4.97707 3.22912 5.2306L1.72912 6.7306C1.27373 7.20211 1.02174 7.83361 1.02744 8.4891C1.03313 9.1446 1.29606 9.77163 1.75958 10.2351C2.2231 10.6987 2.85013 10.9616 3.50562 10.9673C4.16111 10.973 4.79262 10.721 5.26412 10.2656L6.11912 9.4106"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function USDCIcon({ size = 32, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      style={{ width: size, height: size }}
    >
      <circle cx="32" cy="32" r="32" fill="#2e7bff" />
      <path
        d="M32 18c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14Zm0 24c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10Z"
        fill="#fff"
      />
      <path
        d="M30 37.5v-3.2c-1.8-.4-3-1.6-3-3.5 0-2.6 2.1-3.6 5-4.1v-2.1c0-.4.3-.7.7-.7h0.6c.4 0 .7.3.7.7v2c1.5.1 2.9.5 4 1.1.2.1.4.4.4.6v1c0 .5-.5.9-1 .6-.9-.5-2-.8-3.4-1v3.6c2.5.6 4.2 1.6 4.2 3.8 0 2.6-2.1 3.7-4.9 4.1v2.1c0 .4-.3.7-.7.7h-.6c-.4 0-.7-.3-.7-.7v-2c-1.6-.1-3.1-.5-4.5-1.2-.2-.1-.4-.3-.4-.6v-1c0-.5.5-.9 1-.6 1 .5 2.3.9 3.8 1v-3.5c-2.6-.6-4.2-1.7-4.2-3.8 0-2.3 1.9-3.6 4.2-4Z"
        fill="#fff"
      />
    </svg>
  )
}

function SuiIcon({ size = 24, className }) {
  return <img src={suiSmall} alt="SUI" style={{ width: size, height: size }} className={className} />
}

function RoundedIcon({ children }) {
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-sm text-gray-200"
      style={{ background: 'rgba(255, 255, 255, 0.10)' }}
    >
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
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-muted"
    >
      <path
        d="M4.66602 4.66602H11.3327V11.3327"
        stroke="currentColor"
        strokeOpacity="0.64"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66602 11.3327L11.3327 4.66602"
        stroke="currentColor"
        strokeOpacity="0.64"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PriceIcon() {
  return (
    <img src={suiSmall} alt="SUI" className="h-[20px] w-[20px]" />
  )
}

function SparkIcon() {
  return <span className="text-green-400">✦</span>
}

function RingIcon() {
  return <div className="h-[20px] w-[20px] rounded-full border-[6px] border-primary" />
}

function ChevronDown({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? 'h-4 w-4 text-gray-200'}>
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

function ChevronRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" fill="none" className={className}>
      <path
        d="m1 1 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
      <div
        className={`absolute left-4 top-4 z-10 w-[220px] rounded-xl border border-border bg-panel p-3 text-xs text-gray-200 shadow-lg transition-all duration-200 ${
          hoveredIndex !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
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
