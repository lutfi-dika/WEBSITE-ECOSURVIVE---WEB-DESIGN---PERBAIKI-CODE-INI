import { motion as Motion } from 'framer-motion'
import { ArrowRight, ChartNoAxesCombined, ShieldCheck, Sparkles } from 'lucide-react'
import { hoverLift, revealScale, revealUp, staggerContainer, tapPress } from '../utils/animations'

const HomePage = ({ onExploreFeatures, onExploreChallenges, onStartNow }) => {
  return (
    <Motion.section
      id="beranda"
      className="px-4 pb-20 pt-4 sm:px-6"
      variants={staggerContainer(0.1, 0.04)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.8)] backdrop-blur">
        <div className="relative grid gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-200/60 blur-3xl" />

          <Motion.div variants={revealUp} className="relative z-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
              <Sparkles size={14} />
              Gerak kecil, dampak besar
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Platform aksi lingkungan yang membuat kebiasaan hijau terasa nyata, terukur, dan menarik diikuti.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              EcoSurvive menggabungkan edukasi, challenge, dan visual data menjadi pengalaman digital yang ringan
              namun tetap terasa premium untuk generasi yang ingin bergerak lebih sadar terhadap lingkungan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Motion.button
                type="button"
                onClick={onExploreFeatures}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700"
              >
                Jelajahi fitur
                <ArrowRight size={16} />
              </Motion.button>
              <Motion.button
                type="button"
                onClick={onExploreChallenges}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Lihat challenge
              </Motion.button>
              <Motion.button
                type="button"
                onClick={onStartNow}
                whileHover={hoverLift}
                whileTap={tapPress}
                className="rounded-full border border-transparent bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Login dan mulai
              </Motion.button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'UI flow', value: '6 layar utama' },
                { label: 'Pengalaman', value: 'Realtime feel' },
                { label: 'Fokus utama', value: 'Challenge based' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div variants={revealScale} className="relative z-10">
            <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/30">
              <p className="text-sm text-slate-300">Snapshot Hari Ini</p>
              <h3 className="mt-1 text-xl font-semibold">Panel Dampak Pengguna</h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                    <span>Konsistensi challenge</span>
                    <span>82%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/15">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs text-slate-300">Aksi terekam</p>
                    <p className="mt-1 text-xl font-semibold">2.540</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs text-slate-300">Pengguna aktif</p>
                    <p className="mt-1 text-xl font-semibold">1.290</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-100">
                    <div className="inline-flex items-center gap-2 text-xs">
                      <ChartNoAxesCombined size={14} />
                      Visual cepat dibaca
                    </div>
                  </div>
                  <div className="rounded-2xl bg-orange-500/20 p-3 text-orange-100">
                    <div className="inline-flex items-center gap-2 text-xs">
                      <ShieldCheck size={14} />
                      Alur ramah pemula
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  )
}

export default HomePage
