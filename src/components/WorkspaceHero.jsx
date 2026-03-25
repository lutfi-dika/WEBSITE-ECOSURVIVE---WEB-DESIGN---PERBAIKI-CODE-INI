import clsx from 'clsx'

const toneMap = {
  user: 'from-cyan-500/10 via-white to-emerald-500/10 border-cyan-100',
  admin: 'from-orange-500/10 via-white to-violet-500/10 border-orange-100',
}

const WorkspaceHero = ({ eyebrow, title, description, chips = [], actions, tone = 'user' }) => {
  return (
    <section className={clsx('rounded-[1.75rem] border bg-gradient-to-r p-5 shadow-sm sm:p-6', toneMap[tone] || toneMap.user)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
          {description && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>}
          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={`${chip.label}-${chip.value}`}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  {chip.label}: {chip.value}
                </span>
              ))}
            </div>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </section>
  )
}

export default WorkspaceHero
