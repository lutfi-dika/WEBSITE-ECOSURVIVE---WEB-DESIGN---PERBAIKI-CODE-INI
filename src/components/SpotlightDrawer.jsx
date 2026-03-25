import clsx from 'clsx'

const SpotlightDrawer = ({ isOpen, title, subtitle, children, onClose, tone = 'user' }) => (
  <div className={clsx('fixed inset-y-0 right-0 z-40 w-full max-w-md transform border-l border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] transition duration-300', isOpen ? 'translate-x-0' : 'translate-x-full')}>
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{tone}</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">
        Tutup
      </button>
    </div>
    <div className="h-[calc(100%-88px)] overflow-y-auto p-5">{children}</div>
  </div>
)

export default SpotlightDrawer
