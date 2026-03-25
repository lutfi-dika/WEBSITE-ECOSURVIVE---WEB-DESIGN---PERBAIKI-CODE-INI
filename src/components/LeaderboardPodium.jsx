const LeaderboardPodium = ({ leaders = [] }) => {
  if (leaders.length === 0) return null

  const topThree = leaders.slice(0, 3)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-end">
      {[topThree[1], topThree[0], topThree[2]].filter(Boolean).map((leader, index) => {
        const isCenter = index === 1
        return (
          <article key={leader.id} className={`rounded-[1.75rem] border p-5 ${isCenter ? 'border-amber-200 bg-amber-50 lg:pb-10' : 'border-slate-200 bg-white'}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isCenter ? 'Top impact' : 'Community mover'}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{leader.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{leader.badge}</p>
            <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>{leader.score} pts</span>
              <span>{leader.movement}</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default LeaderboardPodium
