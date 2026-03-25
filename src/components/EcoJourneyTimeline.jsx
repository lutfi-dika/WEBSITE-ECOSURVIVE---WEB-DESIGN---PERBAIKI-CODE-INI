import clsx from 'clsx'

const toneMap = {
  cyan: 'bg-cyan-500',
  emerald: 'bg-emerald-500',
  orange: 'bg-orange-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-500',
}

const EcoJourneyTimeline = ({ items = [] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={item.id} className="grid grid-cols-[20px_1fr] gap-4">
        <div className="flex flex-col items-center">
          <span className={clsx('h-4 w-4 rounded-full ring-4 ring-white', toneMap[item.tone] || toneMap.slate)} />
          {index < items.length - 1 && <span className="mt-2 h-full w-px bg-slate-200" />}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-slate-900">{item.title}</p>
            <span className="text-xs font-semibold text-slate-500">{item.meta}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
)

export default EcoJourneyTimeline
