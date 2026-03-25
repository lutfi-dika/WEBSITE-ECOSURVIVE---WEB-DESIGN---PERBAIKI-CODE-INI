import clsx from 'clsx'

const AchievementShowcase = ({ achievements = [] }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {achievements.map((achievement) => (
      <article key={achievement.id} className={clsx('rounded-[1.75rem] border p-4', achievement.unlocked ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{achievement.rarity}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{achievement.title}</h3>
          </div>
          <span className={clsx('rounded-full px-2.5 py-1 text-[11px] font-semibold', achievement.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600')}>
            {achievement.unlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-600">{achievement.requirement}</p>
        <div className="mt-4 h-2 rounded-full bg-white">
          <div className="h-2 rounded-full bg-slate-900" style={{ width: `${achievement.progress}%` }} />
        </div>
        <p className="mt-2 text-xs font-semibold text-slate-500">{achievement.progress}% progress</p>
      </article>
    ))}
  </div>
)

export default AchievementShowcase
