import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { getManagedContent } from '../utils/contentManager'
import { hoverLift, revealUp, staggerContainer, tapPress } from '../utils/animations'

const levelColor = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Healthy: 'bg-cyan-100 text-cyan-700',
  Intermediate: 'bg-orange-100 text-orange-700',
  Wellness: 'bg-fuchsia-100 text-fuchsia-700',
  Impact: 'bg-violet-100 text-violet-700',
}

const headerGradient = {
  Beginner: 'from-emerald-500 to-emerald-600',
  Healthy: 'from-cyan-500 to-sky-600',
  Intermediate: 'from-orange-500 to-amber-600',
  Wellness: 'from-fuchsia-500 to-purple-600',
  Impact: 'from-violet-500 to-purple-600',
}

const ChallengeShowcase = ({ onPrimaryAction }) => {
  const [challengeList, setChallengeList] = useState(() => getManagedContent().challengeList)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const syncContent = () => {
      const nextChallenges = getManagedContent().challengeList
      setChallengeList(nextChallenges)

      if (selectedChallenge) {
        const nextSelected = nextChallenges.find((item) => item.id === selectedChallenge.id) || null
        setSelectedChallenge(nextSelected)
      }
    }

    window.addEventListener('contentUpdate', syncContent)
    return () => window.removeEventListener('contentUpdate', syncContent)
  }, [selectedChallenge])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setSelectedChallenge(null)
    }

    if (selectedChallenge) {
      document.addEventListener('keydown', handleKey)
      window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    }

    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedChallenge])

  return (
    <Motion.section
      id="tantangan"
      className="px-4 py-8 sm:px-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={staggerContainer(0.08, 0.03)}
    >
      <div className="mx-auto max-w-7xl">
        <Motion.div variants={revealUp} className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Eco Challenge</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Tantangan progresif untuk membentuk kebiasaan berkelanjutan.
          </h2>
        </Motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {challengeList.map((challenge) => (
            <Motion.article
              key={challenge.id}
              variants={revealUp}
              whileHover={hoverLift}
              onClick={() => setSelectedChallenge(challenge)}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${levelColor[challenge.level] ?? 'bg-slate-100 text-slate-700'}`}
                >
                  {challenge.level}
                </span>
                <span className="text-xs font-medium text-slate-500">{challenge.duration}</span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">{challenge.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{challenge.description}</p>

              <Motion.button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedChallenge(challenge)
                }}
                whileTap={tapPress}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Lihat detail
                <ArrowRight size={15} />
              </Motion.button>
            </Motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedChallenge && (
          <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedChallenge(null)}
            className="relative mx-auto mt-6 w-full max-w-7xl"
          >
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-0 rounded-2xl bg-slate-900/8 backdrop-blur-xs"
            />

            <Motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
              role="region"
              aria-labelledby="challenge-title"
              tabIndex={-1}
            >
              <div
                className={`relative shrink-0 bg-gradient-to-r ${headerGradient[selectedChallenge.level] ?? 'from-violet-500 to-purple-600'} px-6 py-6 text-white`}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedChallenge(null)}
                  className="absolute right-5 top-5 rounded-full bg-white/20 p-2 transition hover:bg-white/30"
                  aria-label="Tutup detail"
                >
                  <X size={18} className="text-white" />
                </button>

                <div className="pr-12">
                  <span className="inline-block rounded-full bg-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {selectedChallenge.level} level
                  </span>
                  <h3 id="challenge-title" className="mt-3 text-xl font-bold leading-tight sm:text-2xl">
                    {selectedChallenge.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium opacity-90">Durasi: {selectedChallenge.duration}</p>
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Deskripsi</p>
                  <p className="text-base font-medium leading-relaxed text-slate-600">{selectedChallenge.description}</p>
                </div>

                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Cara Melakukannya</p>
                  <p className="text-base leading-relaxed text-slate-600">{selectedChallenge.detail}</p>
                </div>

                <Motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.06 }}
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-4"
                >
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700">Dampak Positif</p>
                  <p className="text-sm font-bold leading-relaxed text-emerald-800">{selectedChallenge.impact}</p>
                </Motion.div>

                <div className="pt-2">
                  <Motion.button
                    type="button"
                    onClick={onPrimaryAction}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-base font-bold text-white transition-all hover:bg-gray-700 active:scale-95"
                  >
                    Login untuk ikut tantangan
                  </Motion.button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.section>
  )
}

export default ChallengeShowcase
