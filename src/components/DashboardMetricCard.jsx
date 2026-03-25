import clsx from 'clsx'

const DashboardMetricCard = ({
  label,
  value,
  hint,
  tone = 'cyan',
  progress,
  icon: Icon,
  className,
}) => {
  const toneMap = {
    cyan: 'from-cyan-500/18 to-blue-500/6 text-cyan-900 ring-cyan-100',
    emerald: 'from-emerald-500/18 to-lime-500/6 text-emerald-900 ring-emerald-100',
    orange: 'from-orange-500/18 to-amber-500/6 text-orange-900 ring-orange-100',
    violet: 'from-violet-500/18 to-fuchsia-500/6 text-violet-900 ring-violet-100',
    slate: 'from-slate-700/10 to-slate-100 text-slate-900 ring-slate-200',
  }

  const toneClass = toneMap[tone] || toneMap.cyan

  return (
    <article
      className={clsx(
        'rounded-[1.5rem] bg-gradient-to-br p-4 ring-1 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.7)]',
        toneClass,
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className="rounded-2xl bg-white/80 p-2.5 text-slate-700 shadow-sm">
            <Icon size={18} />
          </div>
        )}
      </div>

      {(hint || typeof progress === 'number') && (
        <div className="mt-4 space-y-2">
          {hint && <p className="text-sm text-slate-600">{hint}</p>}
          {typeof progress === 'number' && (
            <div>
              <div className="h-2 rounded-full bg-white/70">
                <div
                  className="h-2 rounded-full bg-slate-900/80"
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default DashboardMetricCard
