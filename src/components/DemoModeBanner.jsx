const DemoModeBanner = ({
  title,
  description,
  steps,
  currentStep,
  onStepSelect,
  onToggle,
  enabled,
}) => {
  return (
    <section className="rounded-[1.75rem] border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Presentation Mode</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            enabled
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {enabled ? 'Matikan demo mode' : 'Aktifkan demo mode'}
        </button>
      </div>

      {enabled && (
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepSelect(step.id)}
              className={`rounded-[1.5rem] border p-4 text-left transition ${
                currentStep === step.id
                  ? 'border-amber-300 bg-white shadow-sm'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Step {index + 1}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default DemoModeBanner
