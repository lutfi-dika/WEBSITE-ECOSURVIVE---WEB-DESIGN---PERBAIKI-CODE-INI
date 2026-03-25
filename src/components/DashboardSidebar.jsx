import clsx from 'clsx'
import { motion as Motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { floatingPanel, hoverLift, revealUp, staggerContainer, tapPress } from '../utils/animations'

const defaultSize = {
  widthClass: 'lg:w-[320px]',
  fixedClass: 'lg:fixed lg:inset-y-0 lg:left-0 lg:h-screen',
}

const DashboardSidebar = ({
  label,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  statsTitle = 'Ringkasan',
  stats = [],
  onLogout,
  logoutLabel = 'Keluar',
  size = {},
  className,
}) => {
  const widthClass = size.widthClass || defaultSize.widthClass
  const fixedClass = size.fixedClass || defaultSize.fixedClass
  const activeTabMeta = tabs.find((tab) => tab.id === activeTab)

  return (
    <Motion.aside
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.06, 0.02)}
      className={clsx(
        'border-b border-slate-200 bg-slate-900 p-5 text-slate-100 lg:z-40 lg:border-b-0 lg:border-r lg:px-6 lg:py-0 lg:overflow-hidden',
        widthClass,
        fixedClass,
        className,
      )}
    >
      <div className="flex h-full flex-col lg:pb-6 lg:pt-5">
        <div className="min-h-0 flex-1 overflow-y-auto lg:pr-1">
          <Motion.div variants={revealUp} className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{label}</p>
          <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
          </Motion.div>

          {activeTabMeta && (
            <Motion.div
              variants={floatingPanel}
              className="mb-5 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-slate-300"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Current space</p>
              <p className="mt-2 text-lg font-semibold text-white">{activeTabMeta.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Halaman aktif untuk eksplorasi data, interaksi, dan kontrol utama workspace.
              </p>
            </Motion.div>
          )}

          <nav className="grid gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <Motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  variants={revealUp}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className={clsx(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition',
                    activeTab === tab.id
                      ? 'bg-white text-slate-900'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <Icon size={17} />
                  {tab.label}
                </Motion.button>
              )
            })}
          </nav>

          {stats.length > 0 && (
            <Motion.div variants={revealUp} className="mt-8 rounded-2xl bg-white/10 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">{statsTitle}</p>
              <div className="mt-3 grid gap-2">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/6 px-3 py-2">
                    <span>{item.label}</span>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}
        </div>

        <Motion.button
          type="button"
          onClick={onLogout}
          variants={revealUp}
          whileHover={hoverLift}
          whileTap={tapPress}
          className="mt-4 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <LogOut size={16} />
          {logoutLabel}
        </Motion.button>
      </div>
    </Motion.aside>
  )
}

export default DashboardSidebar
