import { motion as Motion } from 'framer-motion'
import clsx from 'clsx'
import { revealUp } from '../utils/animations'

const toneMap = {
  user: 'from-cyan-500/20 via-white to-emerald-500/20 border-cyan-100',
  admin: 'from-orange-500/18 via-white to-violet-500/20 border-orange-100',
}

const AnimatedSectionHeader = ({ eyebrow, title, description, tone = 'user', actions }) => (
  <Motion.div
    variants={revealUp}
    initial="hidden"
    animate="show"
    className={clsx('overflow-hidden rounded-[1.75rem] border bg-gradient-to-r p-5 shadow-sm', toneMap[tone] || toneMap.user)}
  >
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>}
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
    <Motion.div
      animate={{ x: ['-10%', '6%', '-4%'] }}
      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      className="mt-4 h-1.5 w-40 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-sky-500"
    />
  </Motion.div>
)

export default AnimatedSectionHeader
