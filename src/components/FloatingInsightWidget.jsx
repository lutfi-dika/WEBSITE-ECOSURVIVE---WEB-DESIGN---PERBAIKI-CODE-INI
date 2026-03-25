import { Lightbulb } from 'lucide-react'

const FloatingInsightWidget = ({ title, description, actionLabel, onAction }) => (
  <div className="fixed bottom-5 right-5 z-30 hidden max-w-xs rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.55)] backdrop-blur lg:block">
    <div className="flex items-start gap-3">
      <div className="rounded-2xl bg-amber-100 p-2 text-amber-700">
        <Lightbulb size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
    {actionLabel && (
      <button type="button" onClick={onAction} className="mt-3 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
        {actionLabel}
      </button>
    )}
  </div>
)

export default FloatingInsightWidget
