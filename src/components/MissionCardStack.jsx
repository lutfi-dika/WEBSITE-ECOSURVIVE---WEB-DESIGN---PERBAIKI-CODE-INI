import clsx from 'clsx'

const urgencyTone = {
  high: 'border-orange-200 bg-orange-50',
  medium: 'border-cyan-200 bg-cyan-50',
  low: 'border-slate-200 bg-white',
}

const MissionCardStack = ({ missions = [], onSelect }) => (
  <div className="space-y-3">
    {missions.map((mission) => (
      <button
        key={mission.id}
        type="button"
        onClick={() => onSelect?.(mission)}
        className={clsx('block w-full rounded-[1.5rem] border p-4 text-left transition hover:-translate-y-0.5', urgencyTone[mission.urgency] || urgencyTone.low)}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{mission.title}</p>
            <p className="mt-1 text-sm text-slate-600">{mission.description}</p>
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">{mission.status}</span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white">
          <div className="h-2 rounded-full bg-slate-900" style={{ width: `${mission.progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{mission.reward}</span>
          <span>{mission.progress}%</span>
        </div>
      </button>
    ))}
  </div>
)

export default MissionCardStack
