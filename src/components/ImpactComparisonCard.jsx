const ImpactComparisonCard = ({ before, after }) => (
  <div className="grid gap-4 lg:grid-cols-2">
    {[before, after].map((block, index) => (
      <div key={block.title} className={`rounded-[1.75rem] border p-5 ${index === 0 ? 'border-slate-200 bg-slate-50' : 'border-emerald-100 bg-emerald-50'}`}>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{block.metric}</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">{block.title}</h3>
        <div className="mt-4 space-y-2">
          {block.points.map((point) => (
            <p key={point} className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">
              {point}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default ImpactComparisonCard
