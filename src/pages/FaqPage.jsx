import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { getManagedContent } from '../utils/contentManager'
import { hoverLift, revealUp, staggerContainer, tapPress } from '../utils/animations'

const FaqPage = () => {
  const [faqList, setFaqList] = useState(() => getManagedContent().faqList)
  const [activeId, setActiveId] = useState(faqList[0]?.id ?? null)

  useEffect(() => {
    const syncContent = () => {
      const nextFaq = getManagedContent().faqList
      setFaqList(nextFaq)
      setActiveId((current) => current ?? nextFaq[0]?.id ?? null)
    }

    window.addEventListener('contentUpdate', syncContent)
    return () => window.removeEventListener('contentUpdate', syncContent)
  }, [])

  return (
    <Motion.section
      id="faq"
      className="px-4 py-8 sm:px-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
      variants={staggerContainer(0.07, 0.02)}
    >
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Motion.div variants={revealUp} className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Jawaban cepat sebelum kamu mulai.
          </h2>
        </Motion.div>

        <div className="space-y-3">
          {faqList.map((item) => {
            const isActive = activeId === item.id

            return (
              <Motion.article
                key={item.id}
                variants={revealUp}
                whileHover={hoverLift}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <Motion.button
                  type="button"
                  onClick={() => setActiveId((value) => (value === item.id ? null : item.id))}
                  whileTap={tapPress}
                  className="flex w-full items-center justify-between gap-3 bg-white px-5 py-4 text-left"
                  aria-expanded={isActive}
                >
                  <span className="font-semibold text-slate-900">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={clsx('shrink-0 text-slate-500 transition-transform', isActive && 'rotate-180')}
                  />
                </Motion.button>

                {isActive && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </Motion.div>
                )}
              </Motion.article>
            )
          })}
        </div>
      </div>
    </Motion.section>
  )
}

export default FaqPage
