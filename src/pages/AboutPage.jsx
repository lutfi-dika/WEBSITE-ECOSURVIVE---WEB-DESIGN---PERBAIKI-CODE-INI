import { motion as Motion } from 'framer-motion'
import { CircleGauge, HandHeart, Sparkles } from 'lucide-react'
import { hoverLift, revealUp, staggerContainer } from '../utils/animations'

const AboutPage = () => {
  return (
    <section id="tentang" className="px-4 py-8 sm:px-6">
      <Motion.div
        initial="hidden"
        whileInView="show"
        variants={staggerContainer(0.1, 0.02)}
        viewport={{ once: true, amount: 0.2 }}
        className="kartu-lembut mx-auto max-w-7xl overflow-hidden p-6 sm:p-10"
      >
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <Motion.div variants={revealUp}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700">
              <Sparkles size={14} />
              Misi EcoSurvive
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Membuat aksi ramah lingkungan lebih sederhana, menarik, dan dapat diukur.
            </h2>
            <p className="mt-5 text-slate-600">
              Banyak orang peduli lingkungan, tetapi sering berhenti di niat. EcoSurvive hadir untuk menjembatani
              niat menjadi aksi yang berulang melalui alur yang jelas: pahami data, pilih challenge, jalankan, dan
              tinjau progres.
            </p>
            <p className="mt-4 text-slate-600">
              Kami menerapkan prinsip UI/UX yang fokus pada kejelasan informasi, prioritas aksi, serta umpan balik
              langsung agar pengguna tetap termotivasi tanpa merasa kewalahan.
            </p>
          </Motion.div>

          <Motion.div variants={revealUp} className="grid gap-4">
            <Motion.div
              whileHover={hoverLift}
              className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-100 to-cyan-100 p-6"
            >
              <p className="text-sm font-semibold text-slate-800">Sasaran utama</p>
              <p className="mt-2 text-sm text-slate-600">
                Membentuk kebiasaan hijau yang konsisten melalui data yang mudah dipahami.
              </p>
            </Motion.div>

            <div className="grid grid-cols-2 gap-4">
              <Motion.div whileHover={hoverLift} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500">Pendekatan</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Data driven</p>
                <CircleGauge className="mt-3 text-cyan-600" size={18} />
              </Motion.div>
              <Motion.div whileHover={hoverLift} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500">Nilai inti</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Action first</p>
                <HandHeart className="mt-3 text-orange-500" size={18} />
              </Motion.div>
            </div>

            <Motion.div whileHover={hoverLift} className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
              <p className="text-sm text-slate-300">Tagline</p>
              <p className="mt-1 text-lg font-semibold">Rawat bumi hari ini, jaga masa depan esok.</p>
            </Motion.div>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  )
}

export default AboutPage
