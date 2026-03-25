import clsx from 'clsx'
import { motion as Motion } from 'framer-motion'
import { floatingPanel } from '../utils/animations'

const DashboardPanel = ({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}) => {
  return (
    <Motion.section
      variants={floatingPanel}
      initial="hidden"
      animate="show"
      className={clsx('rounded-[1.75rem] border border-slate-200 bg-white shadow-sm', className)}
    >
      {(eyebrow || title || description || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700">{eyebrow}</p>
            )}
            {title && <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>}
            {description && <p className="mt-1 max-w-2xl text-sm text-slate-600">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </header>
      )}

      <div className={clsx('px-5 py-5 sm:px-6', contentClassName)}>{children}</div>
    </Motion.section>
  )
}

export default DashboardPanel
