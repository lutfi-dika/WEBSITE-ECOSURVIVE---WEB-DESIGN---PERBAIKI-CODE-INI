import clsx from 'clsx'

const toneMap = {
  user: 'from-slate-950 via-cyan-950 to-emerald-950',
  admin: 'from-slate-950 via-orange-950 to-violet-950',
}

const ImpactMeterHero = ({ title, subtitle, value, caption, tone = 'user', sideContent }) => (
  <section className={clsx('overflow-hidden rounded-[2rem] bg-gradient-to-br p-6 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,1)]', toneMap[tone] || toneMap.user)}>
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">{subtitle}</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{caption}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-end">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60">Impact meter</p>
          <p className="mt-2 text-5xl font-semibold">{value}%</p>
          <div className="mt-4 h-3 rounded-full bg-white/10">
            <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-white" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
          {sideContent}
        </div>
      </div>
    </div>
  </section>
)

export default ImpactMeterHero
