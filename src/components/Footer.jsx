import { motion as Motion } from 'framer-motion'
import { hoverLift, revealUp, staggerContainer } from '../utils/animations'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Motion.footer
      className="px-4 pb-8 pt-10 sm:px-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(0.08, 0.04)}
    >
      <Motion.div
        variants={revealUp}
        className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <Motion.div whileHover={hoverLift}>
            <p className="font-heading text-xl font-semibold text-slate-900">EcoSurvive</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Platform digital untuk menyatukan aksi lingkungan, edukasi data, dan challenge berkelanjutan.
            </p>
          </Motion.div>

          <Motion.div whileHover={hoverLift}>
            <p className="text-sm font-semibold text-slate-900">Navigasi Cepat</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <a href="#beranda" className="hover:text-slate-900">Beranda</a>
              <a href="#tentang" className="hover:text-slate-900">Tentang kami</a>
              <a href="#fitur" className="hover:text-slate-900">Fitur</a>
              <a href="#statistik" className="hover:text-slate-900">Statistik</a>
              <a href="#tantangan" className="hover:text-slate-900">Tantangan</a>
            </div>
          </Motion.div>

          <Motion.div whileHover={hoverLift}>
            <p className="text-sm font-semibold text-slate-900">Catatan Eco</p>
            <p className="mt-3 text-sm text-slate-600">
              Aksi kecil yang dilakukan terus-menerus akan menghasilkan dampak lebih besar daripada perubahan sesaat.
            </p>
          </Motion.div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
          © {year} EcoSurvive. Rawat bumi, jaga keberlanjutan hidup.
        </div>
      </Motion.div>
    </Motion.footer>
  )
}

export default Footer
