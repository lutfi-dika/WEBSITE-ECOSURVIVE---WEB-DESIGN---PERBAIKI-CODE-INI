import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Activity, CircleGauge, Eye, Sparkles } from 'lucide-react'
import { getManagedContent } from '../utils/contentManager'
import { hoverLift, revealUp, staggerContainer, tapPress } from '../utils/animations'

const iconMap = {
  'eco-score': CircleGauge,
  'pollution-analyzer': Activity,
  'daily-action-log': Sparkles,
  'home-insight': Eye,
}

const FeaturesSection = () => {
  const [featureList, setFeatureList] = useState(() => getManagedContent().featureList)

  useEffect(() => {
    const syncContent = () => setFeatureList(getManagedContent().featureList)
    window.addEventListener('contentUpdate', syncContent)
    return () => window.removeEventListener('contentUpdate', syncContent)
  }, [])

  return (
    <Motion.section id="fitur" className="px-4 py-8 sm:px-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }} variants={staggerContainer(0.08, 0.03)}>
      <div className="mx-auto max-w-7xl">
        <Motion.div variants={revealUp} className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Fitur Inti</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Kumpulan alat digital untuk aksi hijau yang lebih terarah.
          </h2>
        </Motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureList.map((feature, index) => {
            const Icon = iconMap[feature.id] || [CircleGauge, Activity, Sparkles, Eye][index % 4]

            return (
              <Motion.article
                key={feature.id}
                variants={revealUp}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="kartu-lembut group p-5"
              >
                <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${feature.accent} p-3 text-white`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-700">{feature.metric}</p>
              </Motion.article>
            )
          })}
        </div>
      </div>
    </Motion.section>
  )
}

export default FeaturesSection
