import { useState, useEffect, useRef } from 'react'
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

const ChallengeSection = ({ onPrimaryAction }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const { challengeList } = getManagedContent()

  const closeBtnRef = useRef(null)
  const modalRef = useRef(null)

  // Previously prevented background scroll for a centered modal.
  // Now the detail card expands inline in the section, so we don't block body scroll.
  useEffect(() => {
    return () => { }
  }, [selectedChallenge])

  // Fokus dan keyboard handling (Escape untuk menutup)
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setSelectedChallenge(null)
    }

    if (selectedChallenge) {
      // fokuskan tombol tutup agar pengguna keyboard langsung bisa menutup
      setTimeout(() => { closeBtnRef.current?.focus() }, 0)
      document.addEventListener('keydown', handleKey)
    }

    return () => { document.removeEventListener('keydown', handleKey) }
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
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelColor[challenge.level] ?? 'bg-slate-100 text-slate-700'}`}>
                  {challenge.level}
                </span>
                <span className="text-xs font-medium text-slate-500">{challenge.duration}</span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">{challenge.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{challenge.description}</p>

              <Motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChallenge(challenge);
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
            className="mx-auto mt-6 w-full max-w-7xl relative"
          >
            {/* Backdrop within the section to dim content behind the inline popup */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setSelectedChallenge(null)}
              className="absolute inset-0 z-0 rounded-2xl bg-slate-900/8 backdrop-blur-xs"
            />
            <Motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              ref={modalRef}
              className="relative z-10 w-full overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100 flex flex-col"
              role="region"
              aria-labelledby="challenge-title"
              tabIndex={-1}
            >
              <div className={`relative shrink-0 bg-gradient-to-r ${selectedChallenge.level === 'Beginner' ? 'from-emerald-500 to-emerald-600' :
                selectedChallenge.level === 'Healthy' ? 'from-cyan-500 to-sky-600' :
                  selectedChallenge.level === 'Intermediate' ? 'from-orange-500 to-amber-600' :
                    selectedChallenge.level === 'Wellness' ? 'from-fuchsia-500 to-purple-600' :
                      'from-violet-500 to-purple-600'
                } px-6 py-6 text-white`}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSelectedChallenge(null)}
                  className="absolute right-5 top-5 rounded-full bg-white/20 p-2 transition hover:bg-white/30"
                  aria-label="Tutup detail"
                >
                  <X size={18} className="text-white" />
                </button>

                <div className="pr-12">
                  <span className="inline-block rounded-full bg-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {selectedChallenge.level} Level
                  </span>
                  <h3 id="challenge-title" className="mt-3 text-xl sm:text-2xl font-bold leading-tight">{selectedChallenge.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium opacity-90">
                    <span>⏱️ Durasi: {selectedChallenge.duration}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Deskripsi</p>
                  <p className="text-base leading-relaxed text-slate-600 font-medium">{selectedChallenge.description}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Cara Melakukannya</p>
                  <p className="text-base leading-relaxed text-slate-600">{selectedChallenge.detail}</p>
                </div>

                <Motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.06 }}
                  className="rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 border border-emerald-100"
                >
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
                    🌱 Dampak Positif
                  </p>
                  <p className="text-sm text-emerald-800 font-bold leading-relaxed">{selectedChallenge.impact}</p>
                </Motion.div>

                <div className="pt-2">
                  <Motion.button
                    type="button"
                    onClick={onPrimaryAction}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-base font-bold text-white transition-all hover:bg-violet-700 active:scale-95"
                  >
                    ✨ Login untuk ikut challenge
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

export default ChallengeSection
