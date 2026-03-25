import clsx from 'clsx'

const PresentationStepper = ({ steps = [], activeStep = 0, onSelect }) => (
  <div className="grid gap-3 md:grid-cols-3">
    {steps.map((step, index) => (
      <button
        key={step.id}
        type="button"
        onClick={() => onSelect?.(index)}
        className={clsx('rounded-[1.5rem] border p-4 text-left transition', activeStep === index ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50')}
      >
        <p className={clsx('text-xs uppercase tracking-[0.18em]', activeStep === index ? 'text-white/60' : 'text-slate-400')}>Step {index + 1}</p>
        <p className="mt-2 text-lg font-semibold">{step.title}</p>
        <p className={clsx('mt-2 text-sm leading-relaxed', activeStep === index ? 'text-white/75' : 'text-slate-600')}>{step.description}</p>
      </button>
    ))}
  </div>
)

export default PresentationStepper
